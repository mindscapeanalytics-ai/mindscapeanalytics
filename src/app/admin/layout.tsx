
export const dynamic = "force-dynamic";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import { LayoutDashboard, Package, ShoppingCart, Users, Settings, DollarSign } from "lucide-react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    let session = null;
    try {
        session = await auth.api.getSession({
            headers: await headers(),
        });
    } catch (error: any) {
        console.error("[AdminLayout] Session check failed:", error);
        if (error.message?.includes("Can't reach database") || error.code === "P1001") {
            (global as any)._db_connection_error = true;
        }
    }

    const isDbError = (global as any)._db_connection_error;
    const isAuthError = !session || !session.user || (session.user.role !== "admin" && session.user.role !== "seller");

    if (!isDbError && isAuthError) {
        redirect("/");
    }

    const isSeller = session?.user?.role === "seller";

    const navItems = [
        { label: "Dashboard", href: "/admin", icon: "LayoutDashboard" },
        { label: "Products", href: "/admin/products", icon: "Package" },
        { label: "Orders", href: "/admin/orders", icon: "ShoppingCart" },
        { label: "Payments", href: "/admin/payments", icon: "DollarSign" },
        ...(!isSeller ? [{ label: "Users", href: "/admin/users", icon: "Users" }] : []),
    ];

    return (
        <div className="min-h-screen bg-transparent text-foreground flex flex-col lg:flex-row">
            <AdminSidebar navItems={navItems} />

            {/* Main Content */}
            <main className="flex-1 p-8 lg:p-12 overflow-y-auto w-full">
                <div className="max-w-7xl mx-auto w-full">
                    {isDbError ? (
                        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
                            <div className="w-16 h-16 rounded-3xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-6">
                                <Settings size={32} className="text-red-400 animate-spin-slow" />
                            </div>
                            <h2 className="text-2xl font-black mb-2 uppercase tracking-tight text-red-400">Database Offline</h2>
                            <p className="text-foreground/40 max-w-sm text-sm uppercase tracking-widest font-medium mb-8">
                                Connection to port 5432 timed out. Please verify your .env credentials.
                            </p>
                            <div className="bg-foreground/5 p-4 rounded-xl border border-border text-xs font-mono text-left max-w-md w-full overflow-hidden">
                                <p className="text-foreground/20 mb-2">DEBUG_INFO:</p>
                                <p className="text-green-400">HOST: db.ovntdcmlbstbtquolkmb.supabase.co</p>
                                <p className="text-yellow-400">ERROR: PrismaClientInitializationError (P1001)</p>
                            </div>
                        </div>
                    ) : !session ? (
                        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
                            <div className="w-16 h-16 rounded-3xl bg-foreground/5 border border-border flex items-center justify-center mb-6 animate-pulse">
                                <Settings size={32} className="text-foreground/20" />
                            </div>
                            <h2 className="text-2xl font-black mb-2 uppercase tracking-tight">Authenticating</h2>
                            <p className="text-foreground/40 max-w-sm text-sm uppercase tracking-widest font-medium">
                                Verifying your administrative credentials...
                            </p>
                        </div>
                    ) : (
                        children
                    )}
                </div>
            </main>
        </div>
    );
}
