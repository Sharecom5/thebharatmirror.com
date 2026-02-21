import Link from "next/link";
import Image from "next/image";
import { Calendar, Share2, User } from "lucide-react";
import { PostData } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import AdBanner from "@/components/ads/AdBanner";
import TrendingSidebar from "@/components/news/TrendingSidebar";
import DOMPurify from "isomorphic-dompurify";

interface ArticleTemplateProps {
    post: PostData;
    trendingPosts: PostData[];
}

export default function ArticleTemplate({ post, trendingPosts }: ArticleTemplateProps) {
    const imageUrl = post.image.url;
    const formattedDate = formatDate(post.date);
    const category = post.categories?.[0];
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://thebharatmirror.com";
    const canonicalUrl = `${siteUrl}/${post.slug}`;

    // NewsArticle Schema
    const newsArticleSchema = {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        "headline": post.title,
        "description": post.seo.description || post.excerpt,
        "image": [imageUrl],
        "datePublished": post.date,
        "dateModified": post.date, // WP usually provides modified date, but using date for now
        "author": [{
            "@type": "Person",
            "name": post.author.name || "Editorial Team",
            "url": siteUrl
        }],
        "publisher": {
            "@type": "Organization",
            "name": "The Bharat Mirror",
            "logo": {
                "@type": "ImageObject",
                "url": `${siteUrl}/logo.png` // Assuming logo.png exists
            }
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": canonicalUrl
        }
    };

    // Breadcrumb Schema
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": siteUrl
            },
            ...(category ? [{
                "@type": "ListItem",
                "position": 2,
                "name": category.name,
                "item": `${siteUrl}/${category.slug}`
            }] : []),
            {
                "@type": "ListItem",
                "position": category ? 3 : 2,
                "name": post.title,
                "item": canonicalUrl
            }
        ]
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
            {/* Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(newsArticleSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />

            {/* Breadcrumb UI */}
            <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8 font-medium">
                <Link href="/" className="hover:text-brand-red transition-colors uppercase tracking-wider">
                    Home
                </Link>
                <span>/</span>
                {category && (
                    <>
                        <Link
                            href={`/${category.slug}`}
                            className="hover:text-brand-red transition-colors uppercase tracking-wider"
                        >
                            {category.name}
                        </Link>
                        <span>/</span>
                    </>
                )}
                <span className="text-gray-900 dark:text-gray-300 truncate max-w-[200px]">
                    {post.title}
                </span>
            </nav>

            {/* Article Top Ad */}
            <AdBanner size="leaderboard" position="article-top" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Main Content */}
                <article className="lg:col-span-8">
                    <header className="mb-8">
                        {category && (
                            <Link href={`/${category.slug}`}>
                                <span className="inline-block bg-brand-red text-white text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 mb-4">
                                    {category.name}
                                </span>
                            </Link>
                        )}
                        <h1 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-6 leading-tight tracking-tight">
                            {post.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-800 pb-8">
                            <div className="flex items-center gap-3">
                                {post.author.avatar ? (
                                    <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-brand-red p-0.5">
                                        <Image
                                            src={post.author.avatar}
                                            alt={post.author.name}
                                            fill
                                            className="object-cover rounded-full"
                                        />
                                    </div>
                                ) : (
                                    <div className="w-10 h-10 bg-brand-red text-white rounded-full flex items-center justify-center font-bold">
                                        <User className="w-5 h-5" />
                                    </div>
                                )}
                                <div>
                                    <span className="block font-bold text-gray-900 dark:text-white">
                                        {post.author.name || "Editorial Team"}
                                    </span>
                                    <span className="text-xs font-semibold tracking-wide text-brand-red">
                                        News Desk
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-brand-red" />
                                <span>{formattedDate}</span>
                            </div>
                        </div>
                    </header>

                    <div className="mb-10 rounded-2xl overflow-hidden shadow-2xl relative aspect-video bg-gray-100 dark:bg-gray-800">
                        <Image
                            src={imageUrl}
                            alt={post.image.alt || post.title}
                            fill
                            priority
                            sizes="(max-w-768px) 100vw, 800px"
                            className="object-cover"
                        />
                    </div>
                    {post.image.caption && (
                        <div className="bg-gray-50 dark:bg-gray-900/50 p-4 border-l-4 border-brand-red mb-8">
                            <span
                                className="text-sm text-gray-600 dark:text-gray-400 italic"
                                dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(post.image.caption),
                                }}
                            />
                        </div>
                    )}

                    <div className="prose prose-xl dark:prose-invert max-w-none article-body-container">
                        <div
                            className="text-gray-800 dark:text-gray-200 leading-relaxed text-lg lg:text-xl selection:bg-brand-red selection:text-white"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        >
                        </div>
                    </div>

                    {/* Social Share */}
                    <div className="mt-12 border-t border-gray-100 dark:border-gray-800 pt-8 flex flex-wrap items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <span className="font-black text-gray-900 dark:text-white uppercase tracking-wider">
                                Share This News:
                            </span>
                            <div className="flex gap-2">
                                <button className="p-3 bg-brand-red text-white rounded-full hover:scale-110 transition-transform shadow-lg">
                                    <Share2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-4 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-full text-[10px] font-black uppercase tracking-widest text-gray-600 dark:text-gray-400">
                                #TheBharatMirror
                            </span>
                            <span className="px-4 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-full text-[10px] font-black uppercase tracking-widest text-gray-600 dark:text-gray-400">
                                #BreakingNews
                            </span>
                            <span className="px-4 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-full text-[10px] font-black uppercase tracking-widest text-gray-600 dark:text-gray-400">
                                #IndiaNews
                            </span>
                        </div>
                    </div>

                    {/* Article Bottom Ad */}
                    <div className="mt-12">
                        <AdBanner size="leaderboard" position="article-bottom" />
                    </div>
                </article>

                {/* Sidebar */}
                <aside className="lg:col-span-4 space-y-8">
                    <div className="sticky top-24">
                        <TrendingSidebar posts={trendingPosts} />

                        <div className="mt-8 space-y-8">
                            <AdBanner size="rectangle" position="sidebar-mid" />
                            <AdBanner size="rectangle" position="sidebar-bottom" />
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}
