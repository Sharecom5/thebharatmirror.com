import { notFound } from "next/navigation";
import { Metadata, ResolvingMetadata } from "next";
import {
    getCategoryBySlug,
    getPostBySlug,
    getAllPosts
} from "@/lib/wordpress";
import CategoryTemplate from "@/components/templates/CategoryTemplate";
import ArticleTemplate from "@/components/templates/ArticleTemplate";

interface PageProps {
    params: { slug: string };
    searchParams: { [key: string]: string | string[] | undefined };
}

// Generate Metadata dynamically based on resolved type
export async function generateMetadata(
    { params }: PageProps
): Promise<Metadata> {
    const slug = params.slug;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://thebharatmirror.com";

    // Try Category First
    const category = await getCategoryBySlug(slug);
    if (category) {
        return {
            title: `${category.name} News - The Bharat Mirror`,
            description: `Latest ${category.name} news and updates from The Bharat Mirror.`,
            alternates: {
                canonical: `${siteUrl}/${slug}`,
            },
            openGraph: {
                title: `${category.name} News - The Bharat Mirror`,
                description: `Latest ${category.name} news and updates.`,
                url: `${siteUrl}/${slug}`,
            },
        };
    }

    // Try Post Second
    const post = await getPostBySlug(slug);
    if (post) {
        return {
            title: post.seo.title,
            description: post.seo.description || post.excerpt,
            alternates: {
                canonical: `${siteUrl}/${slug}`,
            },
            openGraph: {
                title: post.seo.title,
                description: post.seo.description || post.excerpt,
                images: [post.image.url],
                type: "article",
                publishedTime: post.date,
                authors: [post.author.name],
                url: `${siteUrl}/${slug}`,
            },
            twitter: {
                card: "summary_large_image",
                title: post.seo.title,
                description: post.seo.description || post.excerpt,
                images: [post.image.url],
            },
        };
    }

    return {
        title: "Not Found",
    };
}

export default async function ResolverPage({ params }: PageProps) {
    const slug = params.slug;

    // 1. Check Category
    const category = await getCategoryBySlug(slug);
    if (category) {
        // Fetch posts for this category
        const posts = await getAllPosts(1, 20, category.id);
        return <CategoryTemplate category={category} posts={posts} />;
    }

    // 2. Check Article
    const post = await getPostBySlug(slug);
    if (post) {
        // Fetch trending/related posts
        const trendingPosts = await getAllPosts(1, 5); // Just grab 5 recent
        // Filter out current post from trending
        const filteredTrending = trendingPosts.filter((p) => p.id !== post.id);
        return <ArticleTemplate post={post} trendingPosts={filteredTrending} />;
    }

    // 3. Not Found
    notFound();
}

// Optional: static params for popular categories/posts (ISR)
// export async function generateStaticParams() {
//   // fetch popular categories or recent posts to pre-render
//   return [];
// }
