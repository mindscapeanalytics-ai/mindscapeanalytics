import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding database...');

    // Create sample products
    const products = [
        {
            name: 'Premium Dashboard UI Kit',
            description: 'Modern, responsive dashboard template with 50+ components. Built with React and Tailwind CSS.',
            price: 49.99,
            category: 'ui_ux',
            approvedForSale: true,
            images: {
                create: [
                    {
                        url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
                    },
                ],
            },
        },
        {
            name: 'SaaS Starter Template',
            description: 'Complete SaaS boilerplate with authentication, billing, and multi-tenancy. Next.js 14 + Stripe.',
            price: 99.99,
            category: 'saas',
            approvedForSale: true,
            images: {
                create: [
                    {
                        url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
                    },
                ],
            },
        },
        {
            name: 'N8N Automation Workflows',
            description: 'Pre-built automation workflows for common business processes. Includes CRM, email, and social media automations.',
            price: 29.99,
            category: 'n8n_workflows',
            approvedForSale: true,
            images: {
                create: [
                    {
                        url: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800',
                    },
                ],
            },
        },
        {
            name: 'Excel Financial Dashboard',
            description: 'Professional financial analysis dashboard with automated reports and KPI tracking.',
            price: 39.99,
            category: 'excel_powerbi_dashboards',
            approvedForSale: true,
            images: {
                create: [
                    {
                        url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
                    },
                ],
            },
        },
        {
            name: 'Inventory Management System',
            description: 'Full-stack inventory management with real-time tracking, alerts, and reporting.',
            price: 149.99,
            category: 'management_systems',
            approvedForSale: true,
            images: {
                create: [
                    {
                        url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800',
                    },
                ],
            },
        },
    ];

    for (const product of products) {
        await prisma.product.create({
            data: product,
        });
        console.log(`✅ Created product: ${product.name}`);
    }

    console.log('🎉 Seeding completed!');
}

main()
    .catch((e) => {
        console.error('❌ Seeding failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
