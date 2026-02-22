
import { prisma } from "@/lib/prisma";
import React from "react";

export default async function AdminOrdersPage() {
    const orders = await prisma.order.findMany({
        orderBy: { createdAt: 'desc' },
        include: { user: true }
    }).catch(() => []) as any[];

    return (
        <div>
            <h1
                className="text-3xl font-bold mb-8"
                style={{ fontSize: "clamp(1.875rem, 4vw, 2.25rem)" }}
            >
                Orders
            </h1>

            <div className="bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden backdrop-blur-xl">
                <table className="w-full text-left">
                    <thead className="bg-white/5 border-b border-white/10">
                        <tr>
                            <th className="p-4 text-white/60 font-mono text-sm uppercase">Order ID</th>
                            <th className="p-4 text-white/60 font-mono text-sm uppercase">Customer</th>
                            <th className="p-4 text-white/60 font-mono text-sm uppercase">Amount</th>
                            <th className="p-4 text-white/60 font-mono text-sm uppercase">Status</th>
                            <th className="p-4 text-white/60 font-mono text-sm uppercase">Date</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {orders.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="p-8 text-center text-white/40">
                                    No orders found.
                                </td>
                            </tr>
                        ) : (
                            orders.map((order) => (
                                <tr key={order.id} className="hover:bg-white/5 transition">
                                    <td className="p-4 font-mono text-sm text-white/50">#{order.id.slice(-6)}</td>
                                    <td className="p-4">{order.user?.email || "Unknown"}</td>
                                    <td className="p-4 font-mono">${order.amount}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${order.status === 'completed' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'
                                            }`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-white/50 text-sm">
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
