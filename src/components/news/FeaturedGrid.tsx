import Link from "next/link";
import Image from "next/image";
import { PostData } from "@/lib/types";
import { formatDate } from "@/lib/utils";

interface FeaturedGridProps {
    mainPost: PostData;
    sidePosts: PostData[];
}

export default function FeaturedGrid({ mainPost, sidePosts }: FeaturedGridProps) {
    if (!mainPost) return null;

    const mainSlug = mainPost.slug;
    const mainImageUrl = mainPost.image.url;
    const mainDate = formatDate(mainPost.date);
    const mainCategory = mainPost.categories?.[0]?.name || "News";

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12 items-start">
            {/* 1. Primary Feature */}
            <div className="lg:col-span-2 group">
                <Link href={`/${mainSlug}`} className="block overflow-hidden rounded-xl mb-4 relative aspect-[16/10] shadow-sm bg-gray-100">
                    <Image
                        src={mainImageUrl}
                        alt={mainPost.title}
                        fill
                        priority
                        sizes="(max-w-768px) 100vw, 800px"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                        <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-tighter">
                            {mainCategory}
                        </span>
                    </div>
                </Link>
                <Link href={`/${mainSlug}`}>
                    <h1 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-gray-900 dark:text-white leading-[1.1] mb-3 hover:text-red-600 transition-colors tracking-tight">
                        {mainPost.title}
                    </h1>
                </Link>
                <div
                    className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-4 leading-relaxed font-medium"
                    dangerouslySetInnerHTML={{ __html: mainPost.excerpt }}
                />
                <div className="flex items-center gap-3 text-[10px] font-bold text-gray-400 uppercase tracking-wide border-t border-gray-100 dark:border-gray-800 pt-3">
                    <span className="text-red-600">By {mainPost.author.name}</span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                    <span>{mainDate}</span>
                </div>
            </div>

            {/* 2. Secondary Stack */}
            <div className="lg:col-span-1 border-x border-gray-100 dark:border-gray-800 px-0 lg:px-6 flex flex-col gap-8">
                {sidePosts.slice(0, 2).map((post) => {
                    const cat = post.categories?.[0]?.name || "News";
                    return (
                        <div key={post.slug} className="group">
                            <span className="text-[10px] font-bold text-red-600 uppercase mb-2 block tracking-tight">
                                {cat}
                            </span>
                            <Link href={`/${post.slug}`}>
                                <h3 className="text-base font-bold text-gray-900 dark:text-white leading-tight mb-2 group-hover:text-red-600 transition-colors tracking-tight">
                                    {post.title}
                                </h3>
                            </Link>
                            <div
                                className="text-gray-500 dark:text-gray-400 text-xs line-clamp-2 leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: post.excerpt }}
                            />
                        </div>
                    );
                })}
            </div>

            {/* 3. Quick List */}
            <div className="lg:col-span-1 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 border-b border-gray-100 dark:border-gray-800 pb-2">
                    Quick Read
                </h4>
                {sidePosts.slice(2).concat(sidePosts.slice(0, 1)).map((post, i) => (
                    <Link key={post.slug + i} href={`/${post.slug}`} className="block group border-b border-gray-50 dark:border-gray-800/50 pb-3 last:border-0">
                        <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200 leading-snug group-hover:text-red-500 transition-colors">
                            {post.title}
                        </h4>
                    </Link>
                ))}
            </div>
        </div>
    );
}
