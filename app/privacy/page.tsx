import React from "react"
import { SectionDivider } from "@/components/section-divider"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Privacy Policy",
    description: "Privacy Policy for Mindscape Analytics AI platform.",
}

export default function PrivacyPolicy() {
    const lastUpdated = "January 24, 2026"

    return (
        <main className="min-h-screen w-full bg-black text-white py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-blue-500">
                    Privacy Policy
                </h1>
                <p className="text-zinc-400 mb-8">Last Updated: {lastUpdated}</p>

                <SectionDivider variant="gradient" className="mb-12 opacity-30" />

                <div className="prose prose-invert max-w-none space-y-12">
                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-white">1. Introduction</h2>
                        <p className="text-zinc-300 leading-relaxed">
                            Welcome to Mindscape Analytics ("we," "our," or "us"). We are committed to protecting your privacy and ensuring the security of your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our AI-powered analytics platform.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-white">2. Information We Collect</h2>
                        <p className="text-zinc-300 leading-relaxed">
                            We collect information that you provide directly to us, such as when you create an account, request a consultation, or interact with our AI services. This may include:
                        </p>
                        <ul className="list-disc pl-6 mt-4 text-zinc-300 space-y-2">
                            <li>Contact information (e.g., name, email address, phone number)</li>
                            <li>Account credentials</li>
                            <li>Business information (e.g., company name, industry)</li>
                            <li>Data provided for AI analysis (NLP, Computer Vision, Predictive Analytics)</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-white">3. How We Use Your Information</h2>
                        <p className="text-zinc-300 leading-relaxed">
                            We use the collected information for various purposes, including:
                        </p>
                        <ul className="list-disc pl-6 mt-4 text-zinc-300 space-y-2">
                            <li>Providing and maintaining our AI services</li>
                            <li>Personalizing your experience on our platform</li>
                            <li>Improving our machine learning models (using anonymized data where applicable)</li>
                            <li>Communicating with you about updates, security alerts, and support</li>
                            <li>Processing payments and orders</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-white">4. Data Security</h2>
                        <p className="text-zinc-300 leading-relaxed">
                            Mindscape Analytics employs enterprise-grade security measures, including bank-grade encryption and secure access controls, to protect your data from unauthorized access, disclosure, or alteration. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-white">5. Your Rights</h2>
                        <p className="text-zinc-300 leading-relaxed">
                            Depending on your location, you may have certain rights regarding your personal information, such as the right to access, correct, or delete your data, or the right to object to or restrict certain processing activities.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-white">6. Contact Us</h2>
                        <p className="text-zinc-300 leading-relaxed">
                            If you have any questions or concerns about this Privacy Policy or our data practices, please contact our Data Protection Officer at:
                        </p>
                        <div className="mt-4 p-6 bg-zinc-900/50 border border-zinc-800 rounded-lg">
                            <p className="text-zinc-300">Email: privacy@mindscapeanalytics.com</p>
                            <p className="text-zinc-300">Address: Mindscape Analytics HQ, Wyoming, USA</p>
                        </div>
                    </section>
                </div>

                <SectionDivider variant="dots" className="mt-20 opacity-20" />
            </div>
        </main>
    )
}
