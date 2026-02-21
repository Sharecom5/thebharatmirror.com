import Link from "next/link";
import { WPCategory, PostData } from "@/lib/types";
import NewsCard from "@/components/news/NewsCard";
import AdBanner from "@/components/ads/AdBanner";

interface CategoryTemplateProps {
    category: WPCategory;
    posts: PostData[];
}

export default function CategoryTemplate({ category, posts }: CategoryTemplateProps) {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
            <header className="mb-12 text-center">
                <span className="text-brand-red font-bold tracking-wider uppercase text-sm mb-2 block">
                    Category
                </span>
                <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">
                    {category.name}
                </h1>
                <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-medium">
                    {category.description || `Latest updates and breaking news in the world of ${category.name}.`}
                </p>

                {/* Category Top Ad */}
                <AdBanner size="leaderboard" position="category-top" />
            </header>

            {posts.length > 0 ? (
                <div className="space-y-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.slice(0, 6).map((post) => (
                            <NewsCard key={post.id} post={post} />
                        ))}
                    </div>

                    {/* Middle Leaderboard */}
                    {posts.length > 6 && <AdBanner size="leaderboard" position="leaderboard" />}

                    {posts.length > 6 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {posts.slice(6).map((post) => (
                                <NewsCard key={post.id} post={post} />
                            ))}
                        </div>
                    )}
                </div>
            ) : (
                <div className="text-center py-20 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700">
                    <p className="text-xl text-gray-500 font-bold">
                        No articles found in {category.name}.
                    </p>
                    <Link
                        href="/"
                        className="mt-4 inline-block text-brand-red font-bold hover:underline"
                    >
                        Back to Home
                    </Link>
                </div>
            )}
        </div>
    );
}
