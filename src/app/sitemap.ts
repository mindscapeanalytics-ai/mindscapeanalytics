import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://mindscapeanalytics.com'

    // Core routes
    const routes = [
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

    return [...routes]
}
