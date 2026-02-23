import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: "Seller Portal | MSA Architect Network",
    description: "Manage your architectural assets, track sales, and optimize your persistent revenue streams in the MSA Seller Dashboard.",
};

export default function SellerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
