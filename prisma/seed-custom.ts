import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Tracing Custom Shop Seeds...');

    const products = [
        {
            name: 'Enterprise LMS Solution',
            description: 'A fully-featured Learning Management System built for scale. Includes course builders, student analytics, customizable graduation certificates, and integrated billing. Deploy immediately or request extensive customization.',
            price: 899.00,
            category: 'management_systems',
            approvedForSale: true,
            demoUrl: 'https://lms.mindscapeanalytics.com/en',
            techStack: ['Next.js 15', 'PostgreSQL', 'Tailwind CSS', 'Stripe Integration', 'Vercel Deployment'],
            features: [
                'Drag-and-Drop Course Builder',
                'Student Progress Tracking',
                'Automated Certificate Generation',
                'White-label Customization available'
            ],
            images: {
                create: [
                    {
                        url: '/images/projects/LMS.webp',
                    },
                ],
            },
        },
        {
            name: 'BreachData Intelligence Platform',
            description: 'Advanced data breach monitoring and intelligence dashboard. Tracks compromised credentials across the dark web with high-frequency alerts. Built for security firms or enterprise IT protection.',
            price: 999.00,
            category: 'saas',
            approvedForSale: true,
            demoUrl: 'https://breachdata.mindscapeanalytics.com/',
            techStack: ['React Enterprise', 'ElasticSearch Vectors', 'Redis Caching', 'Dark Web Telemetry'],
            features: [
                'Live Breach Search Engine',
                'Compromised Credential Alerts',
                'Domain & Identity Parsing',
                'Extensive custom scraping available'
            ],
            images: {
                create: [
                    {
                        url: '/images/projects/breachdata.webp',
                    },
                ],
            },
        },
        {
            name: 'Global Formations LLC Portal',
            description: 'Complete automated incorporation and registered agent platform. Allows users to form LLCs, generate operating agreements, and file state compliances automatically. Essential for legal tech startups.',
            price: 1199.00,
            category: 'saas',
            approvedForSale: true,
            demoUrl: 'https://llc.mindscapeanalytics.com/',
            techStack: ['System Automation', 'PDF Auto-Generation', 'Stripe Billing', 'DocuSign Integration'],
            features: [
                'One-Click LLC Incorporation',
                'Registered Agent Dashboard',
                'Compliance Reminders & Filings',
                'State API automation ready'
            ],
            images: {
                create: [
                    {
                        url: '/images/projects/global_formations.webp',
                    },
                ],
            },
        }
    ];

    for (const product of products) {
        // Upsert to prevent crashing if seeded multiple times
        await prisma.product.create({
            data: product,
        });
        console.log(`✅ Seeded custom product: ${product.name}`);
    }

    console.log('🎉 Store seeding completed!');
}

main()
    .catch((e) => {
        console.error('❌ Seeding failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
