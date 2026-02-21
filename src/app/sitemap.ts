import { MetadataRoute } from 'next';
import { getAllPosts, getAllCategories } from '@/lib/wordpress';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://thebharatmirror.com';

    // 1. Fetch Categories
    const categories = await getAllCategories();
    const categoryUrls = categories.map((cat) => ({
        url: `${siteUrl}/${cat.slug}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.8,
    }));

    // 2. Fetch Recent Posts (top 500 for the main sitemap)
    const posts = await getAllPosts(1, 100); // For now fetching 100 recent
    const postUrls = posts.map((post) => ({
        url: `${siteUrl}/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
    }));

    // 3. Static Pages
    const staticPages = [
        {
            url: siteUrl,
            lastModified: new Date(),
            changeFrequency: 'always' as const,
            priority: 1,
        },
        {
            url: `${siteUrl}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.3,
        },
        {
            url: `${siteUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.3,
        }
    ];

    return [...staticPages, ...categoryUrls, ...postUrls];
}
