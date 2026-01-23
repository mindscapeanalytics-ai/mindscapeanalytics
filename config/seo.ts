// SEO Configuration for Mindscape Analytics
// Advanced SEO targeting for AI Analytics services

export const seoConfig = {
    siteName: "Mindscape Analytics",
    siteUrl: "https://mindscapeanalytics.com",
    defaultTitle: "Mindscape Analytics | AI Analytics Platform & Machine Learning Solutions",
    defaultDescription:
        "Leading AI analytics platform offering machine learning, computer vision, NLP, and custom AI solutions. Transform your business with enterprise-grade AI technology. Get started today with expert AI consultants.",

    // Primary target keywords for ranking
    primaryKeywords: [
        "AI analytics platform",
        "machine learning solutions",
        "artificial intelligence services",
        "AI consulting",
        "enterprise AI solutions",
    ],

    // Service-specific keywords
    serviceKeywords: [
        "computer vision AI",
        "natural language processing",
        "NLP services",
        "custom AI development",
        "AI model training",
        "predictive analytics",
        "data analytics AI",
        "AI automation",
        "GPT app development",
        "AI chatbot development",
        "voice AI integration",
    ],

    // Industry-specific keywords
    industryKeywords: [
        "AI for business",
        "enterprise machine learning",
        "AI transformation",
        "AI implementation services",
        "AI integration",
        "AI for supply chain",
        "AI for real estate",
        "blockchain AI analytics",
        "AI for healthcare",
        "AI for finance",
    ],

    // Long-tail keywords (high conversion)
    longTailKeywords: [
        "custom AI solutions for enterprise",
        "AI analytics for supply chain optimization",
        "AI powered business intelligence platform",
        "machine learning consulting services",
        "AI development company for startups",
        "enterprise AI transformation consulting",
        "custom GPT application development",
        "AI voice assistant integration services",
    ],

    // Structured data for rich snippets
    structuredData: {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Organization",
                "@id": "https://mindscapeanalytics.com/#organization",
                name: "Mindscape Analytics",
                url: "https://mindscapeanalytics.com",
                logo: {
                    "@type": "ImageObject",
                    url: "https://mindscapeanalytics.com/images/logo.png",
                    width: 250,
                    height: 60,
                },
                sameAs: [
                    "https://www.linkedin.com/company/mindscapeanalytics/",
                    "https://twitter.com/mindscapeai",
                ],
                contactPoint: {
                    "@type": "ContactPoint",
                    telephone: "+1-307-210-6155",
                    contactType: "Customer Service",
                    areaServed: "Worldwide",
                    availableLanguage: ["English"],
                },
            },
            {
                "@type": "WebSite",
                "@id": "https://mindscapeanalytics.com/#website",
                url: "https://mindscapeanalytics.com",
                name: "Mindscape Analytics",
                publisher: {
                    "@id": "https://mindscapeanalytics.com/#organization",
                },
                potentialAction: {
                    "@type": "SearchAction",
                    target: "https://mindscapeanalytics.com/search?q={search_term_string}",
                    "query-input": "required name=search_term_string",
                },
            },
            {
                "@type": "ProfessionalService",
                "@id": "https://mindscapeanalytics.com/#service",
                name: "Mindscape Analytics",
                image: "https://mindscapeanalytics.com/images/og-image.png",
                description:
                    "Enterprise AI analytics platform offering machine learning, computer vision, NLP, and custom AI development services.",
                priceRange: "$$-$$$",
                address: {
                    "@type": "PostalAddress",
                    addressCountry: "US",
                },
                aggregateRating: {
                    "@type": "AggregateRating",
                    ratingValue: "4.9",
                    reviewCount: "127",
                },
                serviceType: [
                    "AI Analytics",
                    "Machine Learning",
                    "Computer Vision",
                    "Natural Language Processing",
                    "AI Consulting",
                ],
            },
            {
                "@type": "ItemList",
                "@id": "https://mindscapeanalytics.com/#services",
                name: "AI Services",
                itemListElement: [
                    {
                        "@type": "ListItem",
                        position: 1,
                        item: {
                            "@type": "Service",
                            name: "Custom AI Agents & RAG",
                            description: "Context-aware AI agents with vector database integration",
                            offers: {
                                "@type": "Offer",
                                price: "649",
                                priceCurrency: "USD",
                            },
                        },
                    },
                    {
                        "@type": "ListItem",
                        position: 2,
                        item: {
                            "@type": "Service",
                            name: "Full GPT App Development",
                            description: "Complete GPT application development with custom UI/UX",
                            offers: {
                                "@type": "Offer",
                                price: "799",
                                priceCurrency: "USD",
                            },
                        },
                    },
                    {
                        "@type": "ListItem",
                        position: 3,
                        item: {
                            "@type": "Service",
                            name: "Voice AI Integrations",
                            description: "Real-world conversational AI with multi-language support",
                            offers: {
                                "@type": "Offer",
                                price: "899",
                                priceCurrency: "USD",
                            },
                        },
                    },
                ],
            },
            {
                "@type": "FAQPage",
                "@id": "https://mindscapeanalytics.com/#faq",
                mainEntity: [
                    {
                        "@type": "Question",
                        name: "What AI services does Mindscape Analytics offer?",
                        acceptedAnswer: {
                            "@type": "Answer",
                            text: "Mindscape Analytics offers comprehensive AI solutions including custom AI agents, RAG systems, GPT app development, voice AI integrations, computer vision, natural language processing, and enterprise AI consulting services.",
                        },
                    },
                    {
                        "@type": "Question",
                        name: "How much does AI implementation cost?",
                        acceptedAnswer: {
                            "@type": "Answer",
                            text: "Our AI solutions start from $499 for UI/UX design systems, $649 for custom AI agents, $799 for full GPT app development, and $899 for voice AI integrations. Enterprise solutions are custom-priced based on requirements.",
                        },
                    },
                    {
                        "@type": "Question",
                        name: "How long does AI implementation take?",
                        acceptedAnswer: {
                            "@type": "Answer",
                            text: "Implementation timelines vary by project complexity. Simple integrations can be completed in 2-3 weeks, while comprehensive enterprise AI solutions typically take 2-3 months. We provide agile delivery with updates every 48 hours.",
                        },
                    },
                ],
            },
        ],
    },

    // Social media handles
    social: {
        twitter: "@mindscapeai",
        linkedin: "mindscapeanalytics",
    },
}

export default seoConfig
