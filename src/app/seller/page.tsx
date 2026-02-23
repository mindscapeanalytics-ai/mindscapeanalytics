import { getSession } from "@/lib/get-session";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Plus, Package, DollarSign, TrendingUp, AlertTriangle } from "lucide-react";
import { getSellerStats } from "@/app/_actions/dashboard";

export const dynamic = "force-dynamic";

export default async function SellerDashboard() {
    const session = await getSession();

    if (!session?.user) {
        redirect("/sign-in?callbackUrl=/seller");
    }

    // Check if user is a seller
    const isSeller = session.user.role === "seller" || (session.user as any).isSeller;
    const isVerified = (session.user as any).sellerVerified;

    if (!isSeller) {
        return (
            <div className="min-h-screen bg-monochrome-cinematic text-white flex items-center justify-center p-6 relative">
                <div className="fixed inset-0 z-0 pointer-events-none opacity-20">
                    <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
                </div>
                <div className="text-center max-w-md relative z-10">
                    <div className="inline-block p-4 bg-white/5 border border-white/10 rounded-2xl mb-8">
                        <Package size={48} className="text-white/20 animate-pulse" />
                    </div>
                    <h1
                        className="text-4xl font-black mb-6 uppercase tracking-tight"
                        style={{ fontSize: "clamp(2rem, 5vw, 2.25rem)" }}
                    >
                        Access Protocol Required
                    </h1>
                    <p className="text-white/40 mb-10 text-sm font-medium uppercase tracking-widest italic leading-relaxed">
                        Your identity has not been localized within the seller registry. Enroll to initialize your vendor terminal.
                    </p>
                    <Link href="/become-seller">
                        <button className="w-full py-5 bg-white text-black rounded-2xl font-black text-[10px] uppercase tracking-[0.4em] hover:bg-white/90 transition-all active:scale-95 shadow-2xl">
                            Initialize Enrollment
                        </button>
                    </Link>
                </div>
            </div>
        );
    }

    // Fetch real stats and products from prisma
    const products = await prisma.product.findMany({
        where: { sellerId: session.user.id },
        include: { images: true },
        orderBy: { createdAt: 'desc' },
        take: 5
    });

    const stats = await getSellerStats();

    return (
        <div className="min-h-screen bg-monochrome-cinematic text-white relative">
            <div className="fixed inset-0 z-0 pointer-events-none opacity-30">
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
                <div className="glow-spot top-0 right-0 w-[50%] h-[50%] opacity-10" />
            </div>

            <Navbar />

            <main className="relative z-10 pt-44 pb-32 px-6 max-w-[1500px] mx-auto">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-20 pb-12 border-b border-white/5">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full mb-4">
                                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40">Terminal ID: {session.user.id.slice(0, 8)}</span>
                            </div>
                            <h1
                                className="text-6xl font-black mb-4 uppercase tracking-tighter italic"
                                style={{ fontSize: "clamp(3rem, 8vw, 6rem)" }}
                            >
                                VENDOR <span className="text-white/20 not-italic">COMMAND.</span>
                            </h1>
                            <p className="text-white/40 text-[11px] font-black uppercase tracking-[0.5em] italic">Ecosystem Management & Strategic Allocation</p>
                        </div>
                        <Link href="/admin/products/new">
                            <button className="flex items-center gap-4 px-10 py-5 bg-white text-black rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-white/90 shadow-2xl transition-all active:scale-95 group">
                                <Plus size={16} />
                                Release New Asset
                            </button>
                        </Link>
                    </div>

                    {!isVerified && (
                        <div className="mb-12 p-6 bg-amber-500/10 border border-amber-500/20 rounded-[2rem] flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="flex items-center gap-6">
                                <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center text-amber-500">
                                    <AlertTriangle size={24} />
                                </div>
                                <div>
                                    <h3 className="text-sm font-black uppercase tracking-widest text-white">Stripe Onboarding Incomplete</h3>
                                    <p className="text-[10px] text-white/40 uppercase tracking-tight italic">You must complete Stripe Connect setup to enable settlements and list products.</p>
                                </div>
                            </div>
                            <Link href="/admin/payments">
                                <button className="px-8 py-3 bg-white text-black rounded-xl font-black text-[9px] uppercase tracking-[0.3em] hover:bg-white/90 transition-all">
                                    Configure Payouts
                                </button>
                            </Link>
                        </div>
                    )}

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                        {[
                            { label: "ACTIVE ASSETS", value: stats.totalProducts, icon: <Package size={20} /> },
                            { label: "TOTAL SETTLEMENTS", value: stats.totalSales, icon: <TrendingUp size={20} /> },
                            { label: "INSTITUTIONAL CAPITAL", value: `$${stats.totalRevenue}`, icon: <DollarSign size={20} /> }
                        ].map((stat, i) => (
                            <div key={i} className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-10 relative overflow-hidden group hover:border-white/10 transition-all">
                                <div className="absolute top-0 right-0 p-8 text-white/[0.02] group-hover:text-white/[0.05] transition-colors pointer-events-none">
                                    {stat.icon}
                                </div>
                                <div className="relative z-10">
                                    <div className="text-[9px] font-black uppercase tracking-[0.4em] text-white/20 mb-4">{stat.label}</div>
                                    <div className="text-5xl font-black tracking-tightest leading-none">{stat.value}</div>
                                </div>
                                <div className="absolute bottom-4 right-4 flex gap-1 opacity-20">
                                    <div className="w-1 h-1 bg-white rounded-full" />
                                    <div className="w-1 h-1 bg-white rounded-full animate-pulse" />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Products Section */}
                    <div className="bg-white/[0.02] border border-white/5 rounded-[3rem] p-12 md:p-16 relative overflow-hidden shadow-2xl">
                        <div className="flex items-center justify-between mb-12">
                            <h2 className="text-2xl font-black uppercase tracking-tighter italic flex items-center gap-4">
                                <span className="w-px h-6 bg-white/20" />
                                Asset <span className="text-white/20 not-italic">Inventory</span>
                            </h2>
                            <Link href="/admin/products" className="text-[9px] font-black uppercase tracking-[0.4em] text-white/20 hover:text-white transition-colors">
                                View Full Registry //
                            </Link>
                        </div>

                        {products.length === 0 ? (
                            <div className="text-center py-24 border border-dashed border-white/5 rounded-[2.5rem]">
                                <Package size={64} strokeWidth={0.5} className="mx-auto mb-10 text-white/5" />
                                <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.5em] mb-12 italic">No architectural assets localized in registry.</p>
                                <Link href="/admin/products/new">
                                    <button className="px-12 py-5 bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-white/10 rounded-2xl font-black text-[10px] uppercase tracking-[0.4em] transition-all">
                                        Initialize Protocol
                                    </button>
                                </Link>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-4">
                                {products.map((product) => (
                                    <div key={product.id} className="flex items-center justify-between p-6 bg-white/[0.03] border border-white/5 rounded-3xl hover:border-white/10 transition-all group">
                                        <div className="flex items-center gap-6">
                                            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/5 overflow-hidden flex-shrink-0">
                                                {product.images?.[0] ? (
                                                    <img src={product.images[0].url} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-white/10">
                                                        <Package size={24} />
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold uppercase tracking-tight">{product.name}</h3>
                                                <p className="text-white/30 text-[10px] font-black uppercase tracking-widest">{product.category}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-8">
                                            <div className="text-right">
                                                <div className="text-sm font-bold">${product.price}</div>
                                                <div className={`text-[8px] font-black uppercase tracking-[0.3em] ${product.approvedForSale ? 'text-green-500/50' : 'text-amber-500/50'}`}>
                                                    {product.approvedForSale ? 'ACTIVE' : 'PENDING_REVIEW'}
                                                </div>
                                            </div>
                                            <Link href={`/admin/products/${product.id}/edit`}>
                                                <button className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all">
                                                    Edit
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
