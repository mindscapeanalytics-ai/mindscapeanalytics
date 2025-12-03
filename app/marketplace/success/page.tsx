"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Download, Mail, ArrowRight, Home } from "lucide-react"
import Link from "next/link"

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const paymentIntentId = searchParams.get('payment_intent')
  const [orderDetails, setOrderDetails] = useState<any>(null)

  useEffect(() => {
    // Get order details from localStorage
    const cartData = localStorage.getItem('marketplace_cart')
    if (cartData) {
      try {
        const items = JSON.parse(cartData)
        setOrderDetails({
          items,
          total: items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0),
          paymentIntentId,
        })
        // Clear cart after successful purchase
        localStorage.removeItem('marketplace_cart')
      } catch (error) {
        console.error('Error parsing order details:', error)
      }
    }
  }, [paymentIntentId])

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Success Icon */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/20 mb-4">
              <CheckCircle2 className="h-12 w-12 text-green-500" />
            </div>
            <h1 className="text-4xl font-bold mb-2">Payment Successful!</h1>
            <p className="text-white/60">
              Thank you for your purchase. Your order has been confirmed.
            </p>
          </div>

          {/* Order Details */}
          {orderDetails && (
            <Card className="bg-white/5 border-white/10 mb-6">
              <CardHeader>
                <CardTitle className="text-white">Order Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-white/60 mb-1">Order ID</p>
                  <p className="font-mono text-sm text-white">{paymentIntentId || 'N/A'}</p>
                </div>

                <div className="border-t border-white/10 pt-4">
                  <h3 className="font-semibold mb-3">Items Purchased</h3>
                  <div className="space-y-2">
                    {orderDetails.items.map((item: any) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-white/80">
                          {item.title} x{item.quantity}
                        </span>
                        <span className="text-white">${(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-white/10 pt-3 mt-3 flex justify-between font-bold">
                    <span>Total:</span>
                    <span className="text-red-400">${orderDetails.total.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Next Steps */}
          <Card className="bg-white/5 border-white/10 mb-6">
            <CardHeader>
              <CardTitle className="text-white">What's Next?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-red-400 mt-0.5" />
                <div>
                  <h4 className="font-semibold mb-1">Check Your Email</h4>
                  <p className="text-sm text-white/60">
                    We've sent download links and installation instructions to your email address.
                    Please check your inbox (and spam folder) within the next few minutes.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Download className="h-5 w-5 text-red-400 mt-0.5" />
                <div>
                  <h4 className="font-semibold mb-1">Access Your Products</h4>
                  <p className="text-sm text-white/60">
                    You can also access your purchased products from your dashboard.
                    All files and documentation will be available there.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/marketplace/orders" className="flex-1">
              <Button className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400">
                View My Orders
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/marketplace" className="flex-1">
              <Button variant="outline" className="w-full border-white/10 hover:bg-white/5">
                Continue Shopping
              </Button>
            </Link>
            <Link href="/">
              <Button variant="ghost" className="w-full sm:w-auto text-white/60 hover:text-white">
                <Home className="mr-2 h-4 w-4" />
                Home
              </Button>
            </Link>
          </div>

          {/* Support */}
          <div className="mt-8 text-center">
            <p className="text-sm text-white/40">
              Need help? Contact us at{" "}
              <a href="mailto:support@mindscape-analytics.com" className="text-red-400 hover:underline">
                support@mindscape-analytics.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

