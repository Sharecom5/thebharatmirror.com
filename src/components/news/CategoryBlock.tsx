import Link from "next/link";
import { ArrowRight } from "lucide-react";
import NewsCard from "./NewsCard";
import { PostData } from "@/lib/types";

interface CategoryBlockProps {
    category: string;
    posts: PostData[];
}

export default function CategoryBlock({ category, posts }: CategoryBlockProps) {
    return (
        <section className="mb-20">
            <div className="flex justify-between items-end mb-8 border-b-2 border-black dark:border-white pb-3">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                    {category}
                </h2>
                <Link
                    href={`/${category.toLowerCase().replace(/ /g, "-")}`}
                    className="group flex items-center gap-1 text-[10px] font-bold text-red-600 hover:text-black dark:hover:text-white transition-colors uppercase tracking-wide"
                >
                    Explore {category} <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
                {posts.map((post) => (
                    <NewsCard key={post.id} post={post} variant="compact" />
                ))}
            </div>
        </section>
    );
}
