
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { LayoutDashboard, Package, ShoppingCart, Users, Settings, LogOut, ArrowLeft, DollarSign } from "lucide-react";
import LogoutButton from "@/components/auth/LogoutButton";

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
        // Special flag for connection-level failures
        if (error.message?.includes("Can't reach database") || error.code === "P1001") {
            (global as any)._db_connection_error = true;
        }
    }

    const isDbError = (global as any)._db_connection_error;
    const isAuthError = !session || !session.user || (session.user.role !== "admin" && session.user.role !== "seller");

    // ONLY redirect if it's a clear auth failure (logged in but not admin/seller)
    // If it's a DB error, we stay on the page to show the error state
    if (!isDbError && isAuthError) {
        console.warn("[AdminLayout] Unauthorized access attempt, redirecting to home.");
        redirect("/");
    }

    const isSeller = session?.user?.role === "seller";

    const navItems = [
        { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
        { label: "Products", href: "/admin/products", icon: Package },
        { label: "Orders", href: "/admin/orders", icon: ShoppingCart },
        { label: "Payments", href: "/admin/payments", icon: DollarSign }, // Visible to both
        ...(!isSeller ? [{ label: "Users", href: "/admin/users", icon: Users }] : []),
    ];

    return (
        <div className="min-h-screen bg-transparent text-white flex">
            {/* Sidebar */}
            <aside className="w-72 border-r border-white/10 p-8 hidden lg:flex flex-col sticky top-0 h-screen backdrop-blur-xl bg-white/[0.02]">
                <div className="mb-12">
                    <Image
                        src="/images/logo/mindscape-analytics.png"
                        alt="Mindscape Analytics"
                        width={180}
                        height={40}
                        className="h-10 w-auto object-contain brightness-0 invert opacity-90 transition-all duration-500 hover:opacity-100"
                    />
                    <div className="mt-2 text-[8px] font-mono text-white/20 uppercase tracking-[0.5em]">
                        Central // Hub
                    </div>
                </div>

                <nav className="space-y-2 flex-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition-all group"
                        >
                            <item.icon size={20} className="group-hover:text-blue-400 transition-colors" />
                            <span className="font-bold text-sm tracking-wide uppercase">{item.label}</span>
                        </Link>
                    ))}
                </nav>

                <div className="pt-8 border-t border-white/10 space-y-2 mt-auto">
                    <Link
                        href="/admin/settings"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition-all"
                    >
                        <Settings size={20} />
                        <span className="font-bold text-sm uppercase">Settings</span>
                    </Link>
                    <LogoutButton />
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
                <div className="max-w-7xl mx-auto">
                    {isDbError ? (
                        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
                            <div className="w-16 h-16 rounded-3xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-6">
                                <Settings size={32} className="text-red-400 animate-spin-slow" />
                            </div>
                            <h2 className="text-2xl font-black mb-2 uppercase tracking-tight text-red-400">Database Offline</h2>
                            <p className="text-white/40 max-w-sm text-sm uppercase tracking-widest font-medium mb-8">
                                Connection to port 5432 timed out. Please verify your .env credentials.
                            </p>
                            <div className="bg-white/5 p-4 rounded-xl border border-white/10 text-xs font-mono text-left max-w-md w-full overflow-hidden">
                                <p className="text-white/20 mb-2">DEBUG_INFO:</p>
                                <p className="text-green-400">HOST: db.ovntdcmlbstbtquolkmb.supabase.co</p>
                                <p className="text-yellow-400">ERROR: PrismaClientInitializationError (P1001)</p>
                            </div>
                        </div>
                    ) : !session ? (
                        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
                            <div className="w-16 h-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 animate-pulse">
                                <Settings size={32} className="text-white/20" />
                            </div>
                            <h2 className="text-2xl font-black mb-2 uppercase tracking-tight">Authenticating</h2>
                            <p className="text-white/40 max-w-sm text-sm uppercase tracking-widest font-medium">
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
