"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { loadStripe } from "@stripe/stripe-js"
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Loader2, CheckCircle2, XCircle, ArrowLeft, CreditCard } from "lucide-react"
import Link from "next/link"
import { stripeConfig } from "@/config/payment-config"

// Initialize Stripe
const stripePromise = loadStripe(stripeConfig.publishableKey)

interface CheckoutItem {
  id: string
  title: string
  price: number
  quantity: number
}

function CheckoutForm({ items, total }: { items: CheckoutItem[], total: number }) {
  const stripe = useStripe()
  const elements = useElements()
  const router = useRouter()
  const { toast } = useToast()
  const [isProcessing, setIsProcessing] = useState(false)
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
  })

  // Create payment intent when component mounts
  useEffect(() => {
    const createPaymentIntent = async () => {
      // Don't create if no items or invalid total
      if (items.length === 0 || total <= 0) {
        return
      }

      try {
        const response = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: total,
            currency: 'usd',
            items: items.map(item => ({
              id: item.id,
              title: item.title,
              price: item.price,
              quantity: item.quantity,
            })),
            metadata: {
              customerName: customerInfo.name || 'Guest',
              customerEmail: customerInfo.email || '',
            },
          }),
        })

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          throw new Error(errorData.error?.message || 'Failed to create payment intent')
        }

        const data = await response.json()

        if (data.error) {
          throw new Error(data.error.message || 'Payment intent creation failed')
        }

        if (!data.clientSecret) {
          throw new Error('No client secret received')
        }

        setClientSecret(data.clientSecret)
      } catch (error) {
        console.error('Error creating payment intent:', error)
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "Failed to initialize payment. Please try again.",
          variant: "destructive",
        })
      }
    }

    createPaymentIntent()
  }, [total, items, customerInfo.name, customerInfo.email, toast])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements || !clientSecret) {
      return
    }

    setIsProcessing(true)

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/marketplace/success`,
          payment_method_data: {
            billing_details: {
              name: customerInfo.name,
              email: customerInfo.email,
              phone: customerInfo.phone,
            },
          },
        },
        redirect: 'if_required',
      })

      if (error) {
        toast({
          title: "Payment Failed",
          description: error.message || "Your payment could not be processed.",
          variant: "destructive",
        })
        setIsProcessing(false)
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        // Create order in database
        try {
          await fetch('/api/orders', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              paymentIntentId: paymentIntent.id,
              amount: total,
              currency: 'usd',
              items: items,
              customerInfo: customerInfo,
            }),
          })
        } catch (error) {
          console.error('Error creating order:', error)
          // Don't block the success flow if order creation fails
        }

        // Clear cart from localStorage
        localStorage.removeItem('marketplace_cart')

        // Redirect to success page
        router.push(`/marketplace/success?payment_intent=${paymentIntent.id}`)
      }
    } catch (error) {
      console.error('Payment error:', error)
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
      setIsProcessing(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Customer Information */}
      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Customer Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-white/70 mb-2 block">Full Name *</label>
              <Input
                required
                value={customerInfo.name}
                onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                className="bg-white/5 border-white/10 text-white"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="text-sm text-white/70 mb-2 block">Email *</label>
              <Input
                required
                type="email"
                value={customerInfo.email}
                onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                className="bg-white/5 border-white/10 text-white"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label className="text-sm text-white/70 mb-2 block">Company</label>
              <Input
                value={customerInfo.company}
                onChange={(e) => setCustomerInfo({ ...customerInfo, company: e.target.value })}
                className="bg-white/5 border-white/10 text-white"
                placeholder="Your Company"
              />
            </div>
            <div>
              <label className="text-sm text-white/70 mb-2 block">Phone</label>
              <Input
                value={customerInfo.phone}
                onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                className="bg-white/5 border-white/10 text-white"
                placeholder="+1 (555) 000-0000"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Element */}
      {clientSecret && (
        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Payment Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <PaymentElement />
          </CardContent>
        </Card>
      )}

      {/* Order Summary */}
      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm text-white/70">
              <span>{item.title} x{item.quantity}</span>
              <span>${(item.price * item.quantity).toLocaleString()}</span>
            </div>
          ))}
          <div className="border-t border-white/10 pt-2 mt-2 flex justify-between font-bold text-lg text-white">
            <span>Total:</span>
            <span className="text-red-400">${total.toLocaleString()}</span>
          </div>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={!stripe || !elements || isProcessing || !clientSecret}
        className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-bold py-6 text-lg"
      >
        {isProcessing ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            Complete Purchase
            <ArrowLeft className="ml-2 h-5 w-5 rotate-180" />
          </>
        )}
      </Button>

      <p className="text-xs text-white/40 text-center">
        Your payment is secured by Stripe. We never store your card details.
      </p>
    </form>
  )
}

function CheckoutContent() {
  const router = useRouter()
  const [items, setItems] = useState<CheckoutItem[]>([])
  const [total, setTotal] = useState(0)

  useEffect(() => {
    // Get cart items from localStorage or URL params
    const cartData = localStorage.getItem('marketplace_cart')
    if (cartData) {
      try {
        const cartItems = JSON.parse(cartData)
        setItems(cartItems)
        const cartTotal = cartItems.reduce((sum: number, item: CheckoutItem) =>
          sum + (item.price * item.quantity), 0
        )
        setTotal(cartTotal)
      } catch (error) {
        console.error('Error parsing cart data:', error)
        router.push('/marketplace')
      }
    } else {
      // If no cart data, redirect to marketplace
      router.push('/marketplace')
    }
  }, [router])

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">No items in cart</h1>
          <p className="text-white/60 mb-6">Please add items to your cart first.</p>
          <Link href="/marketplace">
            <Button className="bg-red-600 hover:bg-red-700">
              Return to Marketplace
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <Link href="/marketplace">
            <Button variant="ghost" className="mb-6 text-white/60 hover:text-white">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Marketplace
            </Button>
          </Link>

          <h1 className="text-4xl font-bold mb-8">Checkout</h1>

          <Elements
            stripe={stripePromise}
            options={{
              appearance: {
                theme: 'night',
                variables: {
                  colorPrimary: '#dc2626',
                  colorBackground: '#000000',
                  colorText: '#ffffff',
                  colorDanger: '#ef4444',
                  fontFamily: 'system-ui, sans-serif',
                  spacingUnit: '4px',
                  borderRadius: '8px',
                },
              },
            }}
          >
            <CheckoutForm items={items} total={total} />
          </Elements>
        </div>
      </div>
    </div>
  )
}

import { Suspense } from "react"

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-red-500" />
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  )
}

