import Link from "next/link";
import { TrendingUp } from "lucide-react";
import { PostData } from "@/lib/types";

interface TrendingSidebarProps {
    posts: PostData[];
}

export default function TrendingSidebar({ posts }: TrendingSidebarProps) {
    return (
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-6 border-b border-gray-200 dark:border-gray-700 pb-2">
                <TrendingUp className="text-brand-red w-5 h-5" />
                <h3 className="font-bold text-lg text-gray-900 dark:text-white tracking-tight">
                    Trending Now
                </h3>
            </div>

            <div className="flex flex-col gap-6">
                {posts.map((post, index) => (
                    <div key={post.id} className="group flex items-start gap-4">
                        <span className="text-3xl font-bold text-gray-200 dark:text-gray-700 group-hover:text-brand-red/50 transition-colors">
                            {String(index + 1).padStart(2, "0")}
                        </span>
                        <div>
                            <Link href={`/${post.slug}`}>
                                <h4 className="font-bold text-gray-900 dark:text-gray-100 leading-snug group-hover:text-brand-red dark:group-hover:text-brand-red transition-colors tracking-tight text-sm">
                                    {post.title}
                                </h4>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
