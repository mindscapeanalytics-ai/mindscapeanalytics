import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://mindscapeanalytics.com'

    // Static core routes
    const staticRoutes = [
        '',
        '/about',
        '/contact',
        '/solutions',
        '/solutions/ai-genai',
        '/solutions/cloud-infrastructure',
        '/solutions/enterprise-software',
        '/solutions/blockchain',
        '/services',
        '/projects',
        '/shop',
        '/pricing',
        '/legal/privacy',
        '/legal/terms',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    // Dynamic products from database
    let productRoutes: MetadataRoute.Sitemap = []
    try {
        const products = await prisma.product.findMany({
            where: { approvedForSale: true },
            select: { id: true, updatedAt: true }
        })

        productRoutes = products.map((product) => ({
            url: `${baseUrl}/shop/${product.id}`,
            lastModified: product.updatedAt,
            changeFrequency: 'monthly' as const,
            priority: 0.6,
        }))
    } catch (error) {
        console.error('Sitemap product fetch failed:', error)
    }

    return [...staticRoutes, ...productRoutes]
}
