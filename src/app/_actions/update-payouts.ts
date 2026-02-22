"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/get-session";
import { revalidatePath } from "next/cache";

export async function updatePayouts(prevState: any, formData: FormData) {
    const session = await getSession();

    if (!session?.user) {
        return { success: false, error: "Authentication required.", url: null };
    }

    const payoutMethod = formData.get("payoutMethod") as string | null;
    const payoutDetails = formData.get("payoutDetails") as string | null;

    if (!payoutMethod || !payoutDetails?.trim()) {
        return { success: false, error: "Both protocol and destination are required for settlement configuration.", url: null };
    }

    try {
        await prisma.user.update({
            where: { id: session.user.id },
            data: {
                payoutMethod: payoutMethod,
                payoutDetails: payoutDetails.trim(),
            },
        });

        console.log(`[PAYOUT_CONFIG_UPDATED] User ${session.user.id} updated protocol to ${payoutMethod}`);

        revalidatePath("/admin/payments");
        revalidatePath("/seller");

        return { success: true, error: null };
    } catch (error: any) {
        console.error("[PAYOUT_UPDATE_ERROR]", error);
        return {
            success: false,
            error: error.message || "Failed to update settlement configuration.",
        };
    }
}
