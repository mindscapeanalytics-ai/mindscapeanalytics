import React from "react"
import { SectionDivider } from "@/components/section-divider"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Terms of Service",
    description: "Terms of Service for Mindscape Analytics AI platform.",
}

export default function TermsOfService() {
    const lastUpdated = "January 24, 2026"

    return (
        <main className="min-h-screen w-full bg-black text-white py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
                    Terms of Service
                </h1>
                <p className="text-zinc-400 mb-8">Last Updated: {lastUpdated}</p>

                <SectionDivider variant="gradient" className="mb-12 opacity-30" />

                <div className="prose prose-invert max-w-none space-y-12">
                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-white">1. Agreement to Terms</h2>
                        <p className="text-zinc-300 leading-relaxed">
                            By accessing or using Mindscape Analytics' website and AI services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-white">2. Use License</h2>
                        <p className="text-zinc-300 leading-relaxed">
                            Permission is granted to temporarily use the Mindscape Analytics platform for personal or business analytics purposes. This is the grant of a license, not a transfer of title, and under this license, you may not:
                        </p>
                        <ul className="list-disc pl-6 mt-4 text-zinc-300 space-y-2">
                            <li>Attempt to decompile or reverse engineer any software contained on the platform</li>
                            <li>Remove any copyright or other proprietary notations from the materials</li>
                            <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
                            <li>Use the platform for any illegal or unauthorized purpose</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-white">3. AI Services and Data</h2>
                        <p className="text-zinc-300 leading-relaxed">
                            Our platform provides AI-generated insights and predictions. While we strive for high accuracy (up to 99.9%), these insights are provided for informational purposes. Mindscape Analytics is not responsible for any business decisions made based on AI output. You retain ownership of the data you upload for analysis.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-white">4. Limitations of Liability</h2>
                        <p className="text-zinc-300 leading-relaxed">
                            In no event shall Mindscape Analytics or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-white">5. Service Availability</h2>
                        <p className="text-zinc-300 leading-relaxed">
                            We aim for 99.9% uptime, but we do not guarantee that our services will be uninterrupted or error-free. We reserve the right to modify or discontinue any part of our service without notice.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-white">6. Governing Law</h2>
                        <p className="text-zinc-300 leading-relaxed">
                            These terms and conditions are governed by and construed in accordance with the laws of the State of Wyoming, USA, and you irrevocably submit to the exclusive jurisdiction of the courts in that State.
                        </p>
                    </section>
                </div>

                <SectionDivider variant="dots" className="mt-20 opacity-20" />
            </div>
        </main>
    )
}
