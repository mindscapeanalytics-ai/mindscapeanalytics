"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, Package, CheckCircle2, XCircle, Clock, RefreshCw, Download, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

// Disable static generation for this page
export const dynamic = 'force-dynamic'

interface OrderItem {
  id: string
  title: string
  price: number
  quantity: number
}

interface Order {
  id: string
  paymentIntentId: string
  status: string
  amount: number
  currency: string
  items: OrderItem[]
  customerInfo: {
    name?: string
    email?: string
  }
  createdAt: string
  updatedAt: string
}

const statusConfig = {
  PENDING: { label: "Pending", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30", icon: Clock },
  PROCESSING: { label: "Processing", color: "bg-blue-500/20 text-blue-400 border-blue-500/30", icon: RefreshCw },
  COMPLETED: { label: "Completed", color: "bg-green-500/20 text-green-400 border-green-500/30", icon: CheckCircle2 },
  FAILED: { label: "Failed", color: "bg-red-500/20 text-red-400 border-red-500/30", icon: XCircle },
  REFUNDED: { label: "Refunded", color: "bg-gray-500/20 text-gray-400 border-gray-500/30", icon: RefreshCw },
}

export default function OrdersPage() {
  const sessionResult = useSession()
  const session = sessionResult?.data || null
  const status = sessionResult?.status || "loading"
  const router = useRouter()
  const { toast } = useToast()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  // Handle client-side mounting
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    if (status === "unauthenticated") {
      router.push("/api/auth/signin?callbackUrl=/marketplace/orders")
      return
    }

    if (status === "authenticated") {
      fetchOrders()
    }
  }, [status, router, mounted])

  const fetchOrders = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch("/api/orders")
      
      if (!response.ok) {
        if (response.status === 401) {
          router.push("/api/auth/signin?callbackUrl=/marketplace/orders")
          return
        }
        throw new Error("Failed to fetch orders")
      }

      const data = await response.json()
      setOrders(data.orders || [])
    } catch (error) {
      console.error("Error fetching orders:", error)
      setError(error instanceof Error ? error.message : "Failed to load orders")
      toast({
        title: "Error",
        description: "Failed to load your orders. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // Show loading state during SSR or before mount
  if (!mounted || status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-red-500 mx-auto mb-4" />
          <p className="text-white/60">Loading your orders...</p>
        </div>
      </div>
    )
  }

  if (status === "unauthenticated") {
    return null
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <Link href="/marketplace">
                <Button variant="ghost" className="mb-4 text-white/60 hover:text-white">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Marketplace
                </Button>
              </Link>
              <h1 className="text-4xl font-bold mb-2">My Orders</h1>
              <p className="text-white/60">View and manage your purchase history</p>
            </div>
            <Button
              onClick={fetchOrders}
              variant="outline"
              className="border-white/10 hover:bg-white/5"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
          </div>

          {/* Error State */}
          {error && (
            <Card className="bg-red-500/10 border-red-500/30 mb-6">
              <CardContent className="pt-6">
                <p className="text-red-400">{error}</p>
              </CardContent>
            </Card>
          )}

          {/* Orders List */}
          {orders.length === 0 ? (
            <Card className="bg-white/5 border-white/10">
              <CardContent className="pt-12 pb-12 text-center">
                <Package className="h-16 w-16 text-white/20 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No orders yet</h3>
                <p className="text-white/60 mb-6">You haven't made any purchases yet.</p>
                <Link href="/marketplace">
                  <Button className="bg-red-600 hover:bg-red-700">
                    Browse Marketplace
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => {
                const StatusIcon = statusConfig[order.status as keyof typeof statusConfig]?.icon || Clock
                const statusInfo = statusConfig[order.status as keyof typeof statusConfig] || statusConfig.PENDING

                return (
                  <Card key={order.id} className="bg-white/5 border-white/10 hover:border-white/20 transition-all">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div>
                            <CardTitle className="text-white mb-1">Order #{order.paymentIntentId.slice(-8)}</CardTitle>
                            <p className="text-sm text-white/60">
                              {new Date(order.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </p>
                          </div>
                        </div>
                        <Badge className={statusInfo.color}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {statusInfo.label}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {/* Order Items */}
                        <div>
                          <h4 className="font-semibold mb-2 text-white">Items</h4>
                          <div className="space-y-2">
                            {Array.isArray(order.items) && order.items.map((item: any, index: number) => (
                              <div key={index} className="flex justify-between text-sm bg-white/5 rounded-lg p-3">
                                <span className="text-white/80">
                                  {item.title || `Item ${index + 1}`} x{item.quantity || 1}
                                </span>
                                <span className="text-white">
                                  ${((item.price || 0) * (item.quantity || 1)).toLocaleString()}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Order Total */}
                        <div className="border-t border-white/10 pt-4 flex justify-between items-center">
                          <span className="text-lg font-semibold text-white">Total</span>
                          <span className="text-2xl font-bold text-red-400">
                            ${order.amount.toLocaleString()} {order.currency.toUpperCase()}
                          </span>
                        </div>

                        {/* Actions */}
                        {order.status === 'COMPLETED' && (
                          <div className="flex gap-3 pt-4 border-t border-white/10">
                            <Button
                              variant="outline"
                              className="flex-1 border-white/10 hover:bg-white/5"
                            >
                              <Download className="mr-2 h-4 w-4" />
                              Download Products
                            </Button>
                            <Button
                              variant="outline"
                              className="border-white/10 hover:bg-white/5"
                            >
                              View Invoice
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

