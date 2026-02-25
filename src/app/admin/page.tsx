
export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/get-session";
import React from "react";
import { Package, ShoppingBag, Users, TrendingUp, DollarSign } from "lucide-react";

export default async function AdminDashboard() {
    const session = await getSession();

    const isSeller = session?.user?.role === "seller";
    const userId = session?.user?.id;

    // Fetch real data from prisma with role-based filtering
    const [productCount, orderCount, userCount, sellerCount] = await Promise.all([
        prisma.product.count({
            where: isSeller ? { sellerId: userId } : {}
        }).catch((err) => { console.error("Prisma count error (products):", err); return 0; }),

        prisma.order.count({
            where: isSeller ? { items: { some: { product: { sellerId: userId } } } } : {}
        }).catch((err) => { console.error("Prisma count error (orders):", err); return 0; }),

        isSeller ? Promise.resolve(0) : prisma.user.count().catch((err) => { console.error("Prisma count error (users):", err); return 0; }),
        isSeller ? Promise.resolve(0) : prisma.user.count({ where: { role: "seller" } }).catch((err) => { console.error("Prisma count error (sellers):", err); return 0; }),
    ]);

    const stats = isSeller ? [
        { label: "My Products", value: productCount, icon: Package },
        { label: "My Orders", value: orderCount, icon: ShoppingBag },
    ] : [
        { label: "Total Products", value: productCount, icon: Package },
        { label: "Total Orders", value: orderCount, icon: ShoppingBag },
        { label: "Total Users", value: userCount, icon: Users },
        { label: "Total Sellers", value: sellerCount, icon: TrendingUp },
    ];

    return (
        <div className="space-y-12">
            <div>
                <h1
                    className="text-5xl font-black mb-2 tracking-tighter uppercase"
                    style={{ fontSize: "clamp(2.5rem, 6vw, 3rem)" }}
                >
                    {isSeller ? "SELLER HUB" : "MANAGEMENT"}
                </h1>
                <p className="text-white/40 font-medium uppercase tracking-widest text-sm">{isSeller ? "Vendor Analytics & Listings" : "Platform Overview & Analytics"}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <div key={stat.label} className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all group card-premium">
                        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <stat.icon className="text-white" size={24} />
                        </div>
                        <h3 className="text-white/40 text-xs font-black uppercase tracking-widest mb-1">{stat.label}</h3>
                        <p className="text-4xl font-black tracking-tighter">{stat.value}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-md">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xl font-bold uppercase tracking-tight">Recent Activity</h3>
                        <button className="text-white/40 text-[10px] font-black uppercase tracking-widest hover:text-white transition underline underline-offset-4 decoration-white/10">View All</button>
                    </div>
                    <div className="space-y-6">
                        <div className="flex items-center gap-4 text-sm text-white/40">
                            No recent activity found.
                        </div>
                    </div>
                </div>

                <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-md">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xl font-bold uppercase tracking-tight">Platform Status</h3>
                        <div className="px-3 py-1 bg-white/5 text-white/60 text-[10px] font-black uppercase tracking-widest rounded-full border border-white/10">
                            Healthy
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-white/40 font-medium uppercase tracking-wider text-xs">Database</span>
                            <span className="font-bold text-green-400">Connected</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-white/40 font-medium uppercase tracking-wider text-xs">Authentication</span>
                            <span className="font-bold text-green-400">Ready</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-white/40 font-medium uppercase tracking-wider text-xs">Stripe API</span>
                            <span className="font-bold text-yellow-500">Sandbox</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
