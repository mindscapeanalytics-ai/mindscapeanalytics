"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    ShoppingCart,
    Search,
    Star,
    Check,
    ArrowRight,
    Zap,
    TrendingUp,
    ExternalLink,
    CreditCard,
    Trash2,
    Plus,
    Minus,
    Mail,
    Phone,
    User,
    Building,
    Sparkles,
    Heart,
    MessageSquare,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

interface MarketplaceProduct {
    id: string
    title: string
    description: string
    shortDescription: string
    price: number
    originalPrice?: number
    rating: number
    reviews: number
    image: string
    category: string
    features: string[]
    techStack: string[]
    demoUrl?: string
    bestSeller?: boolean
    popular?: boolean
    new?: boolean
}

interface CartItem extends MarketplaceProduct {
    quantity: number
}

const marketplaceProducts: MarketplaceProduct[] = [
    {
        id: "2",
        title: "E-Commerce Platform Pro",
        description: "Full-featured e-commerce solution with inventory management, payment processing, and customer analytics.",
        shortDescription: "Complete e-commerce solution",
        price: 3999,
        rating: 4.8,
        reviews: 203,
        image: "/images/projects/our_web_designs.png",
        category: "E-commerce",
        features: [
            "Product catalog management",
            "Multi-payment gateway",
            "Inventory tracking",
            "Customer analytics",
            "Mobile responsive",
            "SEO optimized"
        ],
        techStack: ["Next.js", "Stripe", "MongoDB", "Redis"],
        popular: true,
    },
    {
        id: "3",
        title: "Blockchain Portfolio Tracker",
        description: "Track your cryptocurrency investments across multiple blockchains with real-time updates and portfolio analytics.",
        shortDescription: "Multi-chain crypto portfolio tracker",
        price: 2499,
        rating: 4.7,
        reviews: 156,
        image: "/images/projects/Crypto_folio_App.png",
        category: "Blockchain",
        features: [
            "Multi-chain support",
            "Real-time price tracking",
            "Portfolio analytics",
            "Transaction history",
            "Tax reporting",
            "Wallet integration"
        ],
        techStack: ["React", "Web3.js", "Node.js", "MongoDB"],
        new: true,
    },
    {
        id: "4",
        title: "Computer Vision API",
        description: "Advanced computer vision API for object detection, facial recognition, and image classification.",
        shortDescription: "AI-powered computer vision API",
        price: 5999,
        originalPrice: 8999,
        rating: 4.9,
        reviews: 89,
        image: "/images/projects/image_annotation_tool.png",
        category: "Computer Vision",
        features: [
            "Object detection",
            "Facial recognition",
            "Image classification",
            "Real-time processing",
            "Custom model training",
            "API documentation"
        ],
        techStack: ["Python", "TensorFlow", "OpenCV", "FastAPI"],
        bestSeller: true,
    },
    {
        id: "5",
        title: "Automotive Diagnostics System",
        description: "Professional automotive diagnostics software with OBD-II integration and comprehensive vehicle analysis.",
        shortDescription: "Professional auto diagnostics tool",
        price: 3499,
        rating: 4.6,
        reviews: 134,
        image: "/images/projects/vehicle_analysis_dashboard.png",
        category: "Automotive",
        features: [
            "OBD-II integration",
            "Real-time diagnostics",
            "Error code database",
            "Performance monitoring",
            "Maintenance scheduling",
            "Report generation"
        ],
        techStack: ["C++", "Qt", "SQLite", "Python"],
    },
    {
        id: "6",
        title: "ContentForge AI Writer",
        description: "AI-powered content generation platform for blogs, social media, and marketing materials.",
        shortDescription: "AI content generation platform",
        price: 1999,
        rating: 4.8,
        reviews: 267,
        image: "/images/projects/our_web_designs.png",
        category: "Data Analytics",
        features: [
            "AI content generation",
            "SEO optimization",
            "Multi-language support",
            "Plagiarism detection",
            "Content scheduling",
            "Analytics dashboard"
        ],
        techStack: ["Next.js", "OpenAI", "PostgreSQL", "Redis"],
        popular: true,
    },
    {
        id: "7",
        title: "Financial Trading Bot",
        description: "Automated trading system with advanced algorithms, risk management, and real-time market analysis.",
        shortDescription: "Automated trading system",
        price: 6999,
        originalPrice: 9999,
        rating: 4.9,
        reviews: 78,
        image: "/images/projects/Automated Workflows.png",
        category: "Finance",
        features: [
            "Algorithmic trading",
            "Risk management",
            "Backtesting engine",
            "Real-time analysis",
            "Multi-exchange support",
            "Performance tracking"
        ],
        techStack: ["Python", "Pandas", "NumPy", "PostgreSQL"],
        bestSeller: true,
    },
    {
        id: "8",
        title: "Investment Insights Platform",
        description: "Comprehensive investment analysis platform with market data, news sentiment, and technical analysis to provide actionable investment insights.",
        shortDescription: "AI investment analysis platform",
        price: 4499,
        rating: 4.7,
        reviews: 101,
        image: "/images/projects/Investment Insights.png",
        category: "Finance",
        features: [
            "Market sentiment analysis",
            "Technical indicators",
            "Portfolio tracking",
            "Risk assessment",
            "News integration",
            "Custom alerts"
        ],
        techStack: ["React", "Python", "MongoDB", "AWS", "TensorFlow"],
        bestSeller: true,
    },
]

export default function MarketplacePage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("All")
    const [sortBy, setSortBy] = useState("popular")
    const [cart, setCart] = useState<CartItem[]>([])
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
    const [isCustomRequestOpen, setIsCustomRequestOpen] = useState(false)
    const [checkoutForm, setCheckoutForm] = useState({
        name: "",
        email: "",
        company: "",
        phone: "",
    })
    const [customRequestForm, setCustomRequestForm] = useState({
        name: "",
        email: "",
        company: "",
        phone: "",
        projectDescription: "",
        budget: "",
        timeline: "",
    })
    const [selectedProduct, setSelectedProduct] = useState<MarketplaceProduct | null>(null)
    const [wishlist, setWishlist] = useState<string[]>([])
    const { toast } = useToast()

    // Load cart and wishlist from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('marketplace_cart')
        if (savedCart) {
            try {
                const cartItems = JSON.parse(savedCart)
                setCart(cartItems)
            } catch (error) {
                console.error('Error loading cart from localStorage:', error)
            }
        }

        const savedWishlist = localStorage.getItem('marketplace_wishlist')
        if (savedWishlist) {
            try {
                const wishlistItems = JSON.parse(savedWishlist)
                setWishlist(wishlistItems)
            } catch (error) {
                console.error('Error loading wishlist from localStorage:', error)
            }
        }
    }, [])

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        if (cart.length > 0) {
            localStorage.setItem('marketplace_cart', JSON.stringify(cart))
        } else {
            localStorage.removeItem('marketplace_cart')
        }
    }, [cart])

    // Save wishlist to localStorage whenever it changes
    useEffect(() => {
        if (wishlist.length > 0) {
            localStorage.setItem('marketplace_wishlist', JSON.stringify(wishlist))
        } else {
            localStorage.removeItem('marketplace_wishlist')
        }
    }, [wishlist])

    const categories = ["All", "Finance", "Data Analytics", "E-commerce", "Blockchain", "Computer Vision", "Automotive"]

    const filteredProducts = marketplaceProducts
        .filter(product => {
            const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.description.toLowerCase().includes(searchQuery.toLowerCase())
            const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
            return matchesSearch && matchesCategory
        })
        .sort((a, b) => {
            if (sortBy === "price-low") return a.price - b.price
            if (sortBy === "price-high") return b.price - a.price
            if (sortBy === "rating") return b.rating - a.rating
            return 0
        })

    const addToCart = (product: MarketplaceProduct) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === product.id)
            if (existingItem) {
                return prevCart.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                )
            }
            return [...prevCart, { ...product, quantity: 1 }]
        })
        toast({
            title: "Added to cart",
            description: `${product.title} has been added to your cart.`,
        })
        setIsCartOpen(true)
    }

    const toggleWishlist = (e: React.MouseEvent, productId: string) => {
        e.stopPropagation()
        setWishlist(prev => {
            if (prev.includes(productId)) {
                toast({
                    title: "Removed from wishlist",
                    description: "Item removed from your wishlist.",
                })
                return prev.filter(id => id !== productId)
            }
            toast({
                title: "Added to wishlist",
                description: "Item saved to your wishlist.",
            })
            return [...prev, productId]
        })
    }

    const removeFromCart = (productId: string) => {
        setCart(prevCart => prevCart.filter(item => item.id !== productId))
    }

    const updateQuantity = (productId: string, newQuantity: number) => {
        if (newQuantity < 1) {
            removeFromCart(productId)
            return
        }
        setCart(prevCart =>
            prevCart.map(item =>
                item.id === productId ? { ...item, quantity: newQuantity } : item
            )
        )
    }

    const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0)
    const cartCount = cart.reduce((count, item) => count + item.quantity, 0)

    const handleCheckout = () => {
        setIsCartOpen(false)
        setIsCheckoutOpen(true)
    }

    const handlePurchase = async (e: React.FormEvent) => {
        e.preventDefault()
        
        // Save cart to localStorage for checkout page
        localStorage.setItem('marketplace_cart', JSON.stringify(cart))
        
        // Redirect to dedicated checkout page with Stripe
        window.location.href = '/marketplace/checkout'
    }

    const handleCustomRequest = async (e: React.FormEvent) => {
        e.preventDefault()
        
        try {
            const response = await fetch('/api/marketplace/custom-request', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(customRequestForm),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error?.message || 'Failed to submit request')
            }

            toast({
                title: "Request Submitted",
                description: `Thank you ${customRequestForm.name}! We've received your custom software request. Our team will contact you at ${customRequestForm.email} within 24 hours.`,
            })

            setIsCustomRequestOpen(false)
            setCustomRequestForm({ name: "", email: "", company: "", phone: "", projectDescription: "", budget: "", timeline: "" })
        } catch (error) {
            console.error('Error submitting custom request:', error)
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "Failed to submit request. Please try again.",
                variant: "destructive",
            })
        }
    }

    return (
        <main className="min-h-screen w-full bg-black text-white relative overflow-x-hidden">
            {/* Background Effects */}
            <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900/10 via-black to-black z-0" />
            <div className="fixed inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,transparent,black)]" />

            {/* Floating Cart Button */}
            <AnimatePresence>
                {cartCount > 0 && (
                    <motion.button
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        onClick={() => setIsCartOpen(true)}
                        className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white rounded-full p-4 shadow-2xl shadow-red-500/50 hover:shadow-red-500/70 transition-all duration-300 group"
                    >
                        <ShoppingCart className="h-6 w-6 group-hover:scale-110 transition-transform" />
                        <span className="absolute -top-2 -right-2 bg-white text-red-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                            {cartCount}
                        </span>
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Hero Section - Single Column Centered */}
            <section className="relative z-10 pt-20 pb-16 px-4">
                <div className="max-w-4xl mx-auto relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-500/30 rounded-full px-3 py-1 mb-6 backdrop-blur-sm">
                            <Sparkles className="h-3 w-3 text-red-400 animate-pulse" />
                            <span className="text-[10px] font-bold text-red-300 uppercase tracking-wider">Premium Software Solutions</span>
                        </div>

                        {/* Title */}
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-[1.1]">
                            <span className="bg-gradient-to-r from-white via-red-100 to-red-300 bg-clip-text text-transparent">
                                Software Marketplace
                            </span>
                        </h1>

                        {/* Subtitle */}
                        <p className="text-sm md:text-base text-white/50 max-w-2xl mx-auto mb-8 leading-relaxed">
                            Enterprise-ready solutions • Instant deployment • Save 6+ months development time
                        </p>

                        {/* CTAs - Centered */}
                        <div className="flex flex-wrap gap-2.5 justify-center mb-10">
                            <Button
                                onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                                className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-semibold px-4 py-2 text-xs group shadow-lg shadow-red-500/30 rounded-xl h-auto border-0"
                            >
                                <ShoppingCart className="h-3 w-3 mr-1.5 group-hover:scale-110 transition-transform" />
                                Browse Products
                                <ArrowRight className="h-3 w-3 ml-1.5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                            <Button
                                onClick={() => setIsCustomRequestOpen(true)}
                                variant="outline"
                                className="border-2 border-purple-500/60 bg-purple-500/10 hover:bg-purple-500/20 text-white font-semibold px-4 py-2 text-xs group backdrop-blur-sm rounded-xl h-auto"
                            >
                                <Sparkles className="h-3 w-3 mr-1.5 group-hover:rotate-12 transition-transform text-purple-400" />
                                Custom Software
                            </Button>
                        </div>

                        {/* Search & Filters - Single Row Compact */}
                        <div className="max-w-5xl mx-auto bg-gradient-to-br from-white/[0.07] to-white/[0.03] backdrop-blur-xl border border-white/10 rounded-xl p-3 shadow-2xl shadow-black/20">
                            <div className="flex items-center gap-3">
                                {/* Search Input */}
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                                    <Input
                                        type="text"
                                        placeholder="Search products..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="pl-10 pr-3 py-2 bg-black/30 border-white/20 text-white placeholder:text-white/40 h-10 text-sm rounded-lg focus:border-red-400/50 focus:ring-1 focus:ring-red-400/20 transition-all"
                                    />
                                </div>

                                {/* Category Select */}
                                <div className="w-48">
                                    <select
                                        value={selectedCategory}
                                        onChange={(e) => setSelectedCategory(e.target.value)}
                                        className="w-full px-3 py-2 bg-black/30 border border-white/20 rounded-lg text-white text-sm cursor-pointer hover:bg-black/40 hover:border-white/30 transition-all focus:border-red-400/50 focus:ring-1 focus:ring-red-400/20 h-10"
                                    >
                                        {categories.map(cat => (
                                            <option key={cat} value={cat} className="bg-black">{cat}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Sort Select */}
                                <div className="w-48">
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="w-full px-3 py-2 bg-black/30 border border-white/20 rounded-lg text-white text-sm cursor-pointer hover:bg-black/40 hover:border-white/30 transition-all focus:border-red-400/50 focus:ring-1 focus:ring-red-400/20 h-10"
                                    >
                                        <option value="popular" className="bg-black">Popular</option>
                                        <option value="price-low" className="bg-black">Price: Low to High</option>
                                        <option value="price-high" className="bg-black">Price: High to Low</option>
                                        <option value="rating" className="bg-black">Highest Rated</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Product Details Modal */}
            <Dialog open={!!selectedProduct} onOpenChange={(open) => !open && setSelectedProduct(null)}>
                <DialogContent className="max-w-4xl bg-black/90 border-white/10 text-white backdrop-blur-xl max-h-[90vh] overflow-y-auto">
                    {selectedProduct && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="relative h-64 md:h-full min-h-[300px] rounded-xl overflow-hidden">
                                <img
                                    src={selectedProduct.image}
                                    alt={selectedProduct.title}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                <div className="absolute bottom-4 left-4 right-4">
                                    <div className="flex flex-wrap gap-2 mb-2">
                                        {selectedProduct.techStack.map((tech) => (
                                            <Badge key={tech} variant="secondary" className="bg-white/10 hover:bg-white/20 text-white border-0">
                                                {tech}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col h-full">
                                <DialogHeader>
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <Badge variant="outline" className="mb-2 border-red-500/30 text-red-400">
                                                {selectedProduct.category}
                                            </Badge>
                                            <DialogTitle className="text-3xl font-bold mb-2">{selectedProduct.title}</DialogTitle>
                                            <div className="flex items-center gap-2 text-sm text-white/60 mb-4">
                                                <div className="flex items-center text-amber-400">
                                                    <Star className="h-4 w-4 fill-current mr-1" />
                                                    {selectedProduct.rating}
                                                </div>
                                                <span>•</span>
                                                <span>{selectedProduct.reviews} reviews</span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-3xl font-bold text-white">${selectedProduct.price.toLocaleString()}</div>
                                            {selectedProduct.originalPrice && (
                                                <div className="text-sm text-white/40 line-through">
                                                    ${selectedProduct.originalPrice.toLocaleString()}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </DialogHeader>

                                <div className="flex-1 py-6">
                                    <p className="text-white/80 leading-relaxed mb-6">
                                        {selectedProduct.description}
                                    </p>

                                    <div className="space-y-4">
                                        <h4 className="font-semibold text-white flex items-center gap-2">
                                            <Zap className="h-4 w-4 text-red-400" />
                                            Key Features
                                        </h4>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {selectedProduct.features.map((feature, idx) => (
                                                <div key={idx} className="flex items-start gap-2 text-sm text-white/70">
                                                    <Check className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                                                    <span>{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-3 mt-auto pt-6 border-t border-white/10">
                                    <Button
                                        className="flex-1 bg-red-600 hover:bg-red-700 text-white h-12 text-lg"
                                        onClick={() => {
                                            addToCart(selectedProduct)
                                            setSelectedProduct(null)
                                        }}
                                    >
                                        <ShoppingCart className="mr-2 h-5 w-5" />
                                        Add to Cart
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="h-12 w-12 p-0 border-white/10 hover:bg-white/5"
                                        onClick={(e) => toggleWishlist(e, selectedProduct.id)}
                                    >
                                        <Heart className={cn("h-5 w-5", wishlist.includes(selectedProduct.id) ? "fill-red-500 text-red-500" : "text-white")} />
                                    </Button>
                                    {selectedProduct.demoUrl && (
                                        <Button variant="secondary" className="h-12 px-6 bg-white/10 hover:bg-white/20 text-white">
                                            <ExternalLink className="mr-2 h-5 w-5" />
                                            Live Demo
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            {/* Products Grid - 4 Columns */}
            <section id="products" className="relative z-10 px-4 pb-20">
                <div className="max-w-[1600px] mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredProducts.map((product, index) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                            >
                                <Card className="group relative bg-white/5 backdrop-blur-xl border-white/10 hover:border-red-500/50 transition-all duration-300 overflow-hidden hover-lift h-full flex flex-col">
                                    {/* Badges */}
                                    <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                                        {product.bestSeller && (
                                            <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0">
                                                <Star className="h-3 w-3 mr-1" />
                                                Best Seller
                                            </Badge>
                                        )}
                                        {product.popular && (
                                            <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white border-0">
                                                <TrendingUp className="h-3 w-3 mr-1" />
                                                Popular
                                            </Badge>
                                        )}
                                        {product.new && (
                                            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0">
                                                <Zap className="h-3 w-3 mr-1" />
                                                New
                                            </Badge>
                                        )}
                                    </div>

                                    {product.originalPrice && (
                                        <div className="absolute top-4 right-4 z-10">
                                            <Badge className="bg-red-500 text-white border-0 text-sm font-bold">
                                                {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                                            </Badge>
                                        </div>
                                    )}

                                    {/* Wishlist Button */}
                                    <button
                                        onClick={(e) => toggleWishlist(e, product.id)}
                                        className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 backdrop-blur-md hover:bg-black/70 transition-colors opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 duration-300"
                                        style={{ right: product.originalPrice ? '5.5rem' : '1rem' }}
                                    >
                                        <Heart className={cn("h-4 w-4", wishlist.includes(product.id) ? "fill-red-500 text-red-500" : "text-white")} />
                                    </button>

                                    <div className="relative h-48 overflow-hidden bg-black/20">
                                        <img
                                            src={product.image}
                                            alt={product.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 cursor-pointer"
                                            onClick={() => setSelectedProduct(product)}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                    </div>

                                    <CardContent className="p-6 flex-1 flex flex-col">
                                        <div className="mb-3">
                                            <Badge variant="outline" className="border-red-500/30 text-red-400 text-xs">
                                                {product.category}
                                            </Badge>
                                        </div>

                                        <h3
                                            className="text-xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors line-clamp-2 cursor-pointer"
                                            onClick={() => setSelectedProduct(product)}
                                        >
                                            {product.title}
                                        </h3>

                                        <p className="text-sm text-white/60 mb-4 line-clamp-2 flex-1">
                                            {product.shortDescription}
                                        </p>

                                        <div className="flex items-center gap-2 mb-4">
                                            <div className="flex items-center gap-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={cn(
                                                            "h-4 w-4",
                                                            i < Math.floor(product.rating)
                                                                ? "fill-amber-400 text-amber-400"
                                                                : "text-white/20"
                                                        )}
                                                    />
                                                ))}
                                            </div>
                                            <span className="text-sm text-white/60">
                                                {product.rating} ({product.reviews})
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
                                            <div>
                                                <div className="text-2xl font-bold text-white">${product.price.toLocaleString()}</div>
                                                {product.originalPrice && (
                                                    <div className="text-sm text-white/40 line-through">
                                                        ${product.originalPrice.toLocaleString()}
                                                    </div>
                                                )}
                                            </div>
                                            <Button
                                                onClick={() => addToCart(product)}
                                                className="bg-red-600 hover:bg-red-700 text-white"
                                            >
                                                <ShoppingCart className="h-4 w-4 mr-2" />
                                                Add
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Shopping Cart Modal */}
            <Dialog open={isCartOpen} onOpenChange={setIsCartOpen}>
                <DialogContent className="bg-black/95 backdrop-blur-xl border-white/10 text-white max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                        <div className="flex items-center justify-between">
                            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                                <ShoppingCart className="h-6 w-6 text-red-400" />
                                Shopping Cart ({cartCount} {cartCount === 1 ? 'item' : 'items'})
                            </DialogTitle>
                            {cart.length > 0 && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setCart([])}
                                    className="text-white/40 hover:text-red-400 hover:bg-red-500/10"
                                >
                                    Clear All
                                </Button>
                            )}
                        </div>
                    </DialogHeader>

                    {cart.length === 0 ? (
                        <div className="text-center py-12">
                            <ShoppingCart className="h-16 w-16 text-white/20 mx-auto mb-4" />
                            <p className="text-white/60">Your cart is empty</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {cart.map(item => (
                                <div key={item.id} className="flex gap-4 bg-white/5 rounded-lg p-4 border border-white/10">
                                    <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded-lg" />
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-white mb-1">{item.title}</h4>
                                        <p className="text-sm text-white/60 mb-2">${item.price.toLocaleString()} each</p>
                                        <div className="flex items-center gap-2">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className="h-8 w-8 p-0 border-white/20"
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            >
                                                <Minus className="h-3 w-3" />
                                            </Button>
                                            <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className="h-8 w-8 p-0 border-white/20"
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            >
                                                <Plus className="h-3 w-3" />
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-white mb-2">${(item.price * item.quantity).toLocaleString()}</p>
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                                            onClick={() => removeFromCart(item.id)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}

                            <div className="border-t border-white/10 pt-4">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-lg font-semibold">Total:</span>
                                    <span className="text-3xl font-bold text-red-400">${cartTotal.toLocaleString()}</span>
                                </div>
                                <Button
                                    onClick={handlePurchase}
                                    className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-bold py-6 text-lg shadow-lg shadow-red-500/20"
                                >
                                    Proceed to Checkout
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            {/* Checkout Modal - Now redirects to dedicated checkout page */}
            <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
                <DialogContent className="bg-black/95 backdrop-blur-xl border-white/10 text-white max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                            <CreditCard className="h-6 w-6 text-red-400" />
                            Proceed to Secure Checkout
                        </DialogTitle>
                    </DialogHeader>

                    <div className="space-y-6">
                        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                            <h4 className="font-semibold mb-2">Order Summary</h4>
                            {cart.map(item => (
                                <div key={item.id} className="flex justify-between text-sm text-white/70 mb-1">
                                    <span>{item.title} x{item.quantity}</span>
                                    <span>${(item.price * item.quantity).toLocaleString()}</span>
                                </div>
                            ))}
                            <div className="border-t border-white/10 mt-2 pt-2 flex justify-between font-bold text-lg">
                                <span>Total:</span>
                                <span className="text-red-400">${cartTotal.toLocaleString()}</span>
                            </div>
                        </div>

                        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                            <div className="flex items-start gap-3">
                                <CreditCard className="h-5 w-5 text-green-400 mt-0.5" />
                                <div>
                                    <h4 className="font-semibold text-green-400 mb-1">Secure Payment</h4>
                                    <p className="text-sm text-white/60">
                                        Your payment will be processed securely through Stripe. 
                                        We accept all major credit and debit cards.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <Button 
                            onClick={handlePurchase}
                            className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-bold py-6 text-lg"
                        >
                            Proceed to Checkout
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Custom Software Request Modal */}
            <Dialog open={isCustomRequestOpen} onOpenChange={setIsCustomRequestOpen}>
                <DialogContent className="bg-black/95 backdrop-blur-xl border-white/10 text-white max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                            <Sparkles className="h-6 w-6 text-purple-400" />
                            Custom Software Request
                        </DialogTitle>
                    </DialogHeader>

                    <form onSubmit={handleCustomRequest} className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm text-white/70 mb-2 block">Full Name *</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
                                    <Input
                                        required
                                        value={customRequestForm.name}
                                        onChange={(e) => setCustomRequestForm({ ...customRequestForm, name: e.target.value })}
                                        className="pl-10 bg-white/5 border-white/10 text-white"
                                        placeholder="John Doe"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-sm text-white/70 mb-2 block">Email *</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
                                    <Input
                                        required
                                        type="email"
                                        value={customRequestForm.email}
                                        onChange={(e) => setCustomRequestForm({ ...customRequestForm, email: e.target.value })}
                                        className="pl-10 bg-white/5 border-white/10 text-white"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-sm text-white/70 mb-2 block">Company</label>
                                <div className="relative">
                                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
                                    <Input
                                        value={customRequestForm.company}
                                        onChange={(e) => setCustomRequestForm({ ...customRequestForm, company: e.target.value })}
                                        className="pl-10 bg-white/5 border-white/10 text-white"
                                        placeholder="Your Company"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-sm text-white/70 mb-2 block">Phone</label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
                                    <Input
                                        value={customRequestForm.phone}
                                        onChange={(e) => setCustomRequestForm({ ...customRequestForm, phone: e.target.value })}
                                        className="pl-10 bg-white/5 border-white/10 text-white"
                                        placeholder="+1 (555) 000-0000"
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="text-sm text-white/70 mb-2 block">Project Description *</label>
                            <div className="relative">
                                <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-white/50" />
                                <Textarea
                                    required
                                    value={customRequestForm.projectDescription}
                                    onChange={(e) => setCustomRequestForm({ ...customRequestForm, projectDescription: e.target.value })}
                                    className="pl-10 bg-white/5 border-white/10 text-white min-h-[120px]"
                                    placeholder="Describe your project requirements..."
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm text-white/70 mb-2 block">Budget Range</label>
                                <select
                                    value={customRequestForm.budget}
                                    onChange={(e) => setCustomRequestForm({ ...customRequestForm, budget: e.target.value })}
                                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm"
                                >
                                    <option value="" className="bg-black">Select budget</option>
                                    <option value="<10k" className="bg-black">Less than $10,000</option>
                                    <option value="10k-50k" className="bg-black">$10,000 - $50,000</option>
                                    <option value="50k-100k" className="bg-black">$50,000 - $100,000</option>
                                    <option value=">100k" className="bg-black">More than $100,000</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-sm text-white/70 mb-2 block">Timeline</label>
                                <select
                                    value={customRequestForm.timeline}
                                    onChange={(e) => setCustomRequestForm({ ...customRequestForm, timeline: e.target.value })}
                                    className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm"
                                >
                                    <option value="" className="bg-black">Select timeline</option>
                                    <option value="<1month" className="bg-black">Less than 1 month</option>
                                    <option value="1-3months" className="bg-black">1-3 months</option>
                                    <option value="3-6months" className="bg-black">3-6 months</option>
                                    <option value=">6months" className="bg-black">More than 6 months</option>
                                </select>
                            </div>
                        </div>

                        <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white font-bold py-6 text-lg">
                            Submit Request
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </main>
    )
}
