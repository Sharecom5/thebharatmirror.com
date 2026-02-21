import Link from "next/link";
import Image from "next/image";
import { cn, formatDate } from "@/lib/utils";
import { PostData } from "@/lib/types";

interface NewsCardProps {
    post: PostData;
    variant?: "default" | "lead" | "horizontal" | "compact" | "text-only" | "sidebar";
    className?: string;
}

export default function NewsCard({ post, variant = "default", className }: NewsCardProps) {
    const postSlug = post.slug;
    const imageUrl = post.image.url;
    const formattedDate = formatDate(post.date);

    // Variant Styles
    const isLead = variant === "lead";
    const isHorizontal = variant === "horizontal";
    const isCompact = variant === "compact";
    const isTextOnly = variant === "text-only";
    const isSidebar = variant === "sidebar";

    // Determine category slug
    const categorySlug = post.categories?.[0]?.slug || "news";
    const categoryName = post.categories?.[0]?.name || "News";

    if (isTextOnly) {
        return (
            <div className={cn("group border-b border-gray-100 dark:border-gray-800 py-3 last:border-0 bg-white dark:bg-transparent", className)}>
                <Link href={`/${categorySlug}`} className="text-[9px] font-bold text-brand-red uppercase tracking-wider mb-1 block hover:underline">
                    {categoryName}
                </Link>
                <Link href={`/${postSlug}`}>
                    <h3 className="font-serif font-bold text-base text-gray-900 dark:text-gray-100 leading-tight group-hover:text-brand-red transition-colors">
                        {post.title}
                    </h3>
                </Link>
            </div>
        );
    }

    if (isSidebar) {
        return (
            <div className={cn("group flex gap-3 border-b border-gray-100 dark:border-gray-800 py-3 last:border-0 bg-white dark:bg-transparent", className)}>
                <div className="flex-1 w-0">
                    <Link href={`/${postSlug}`}>
                        <h4 className="font-serif font-bold text-sm text-gray-900 dark:text-white leading-snug group-hover:text-brand-red transition-colors line-clamp-2">
                            {post.title}
                        </h4>
                    </Link>
                    <span className="text-[10px] text-gray-400 mt-1 block">{formattedDate}</span>
                </div>
                {imageUrl && (
                    <Link href={`/${postSlug}`} className="w-20 h-16 flex-shrink-0 overflow-hidden rounded-sm bg-gray-100 relative shadow-sm">
                        <Image
                            src={imageUrl}
                            alt={post.title}
                            fill
                            sizes="80px"
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                    </Link>
                )}
            </div>
        );
    }

    if (isHorizontal) {
        return (
            <div className={cn("group flex gap-4 border-b border-gray-200 dark:border-gray-800 pb-4 mb-4 items-start bg-white dark:bg-transparent", className)}>
                {imageUrl && (
                    <Link href={`/${postSlug}`} className="w-1/3 aspect-[4/3] overflow-hidden rounded-sm flex-shrink-0 bg-gray-100 relative shadow-md">
                        <Image
                            src={imageUrl}
                            alt={post.title}
                            fill
                            sizes="(max-w-768px) 30vw, 200px"
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                    </Link>
                )}
                <div className="flex-1 w-0">
                    <Link href={`/${categorySlug}`} className="text-[10px] font-bold text-brand-red uppercase tracking-wider mb-1 block">
                        {categoryName}
                    </Link>
                    <Link href={`/${postSlug}`}>
                        <h3 className="font-serif font-bold text-lg md:text-xl text-gray-900 dark:text-gray-100 leading-tight mb-2 group-hover:text-brand-red transition-colors line-clamp-2">
                            {post.title}
                        </h3>
                    </Link>
                    <div
                        className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed font-sans"
                        dangerouslySetInnerHTML={{ __html: post.excerpt }}
                    />
                    <span className="text-[10px] text-gray-400 mt-2 block font-sans">{formattedDate}</span>
                </div>
            </div>
        );
    }

    return (
        <div className={cn(
            "group flex flex-col bg-white dark:bg-transparent transition-all duration-300",
            !isCompact && "border-b border-gray-200 dark:border-gray-800 pb-4",
            className
        )}>
            {imageUrl && (
                <Link href={`/${postSlug}`} className={cn("block overflow-hidden rounded-sm mb-3 relative bg-gray-100 shadow-md", isLead ? "aspect-[16/9]" : "aspect-[3/2]")}>
                    <Image
                        src={imageUrl}
                        alt={post.title}
                        fill
                        priority={isLead}
                        sizes={isLead ? "(max-w-768px) 100vw, 800px" : "(max-w-768px) 100vw, 400px"}
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {isLead && (
                        <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black/80 to-transparent w-full p-4 pt-12">
                            <span className="bg-brand-red text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-wide inline-block mb-2">
                                {categoryName}
                            </span>
                        </div>
                    )}
                </Link>
            )}

            <div className="flex flex-col flex-grow">
                {!isLead && (
                    <Link href={`/${categorySlug}`} className="text-[10px] font-bold text-brand-red uppercase tracking-wider mb-1 block hover:underline">
                        {categoryName}
                    </Link>
                )}

                <Link href={`/${postSlug}`}>
                    <h3 className={cn(
                        "font-serif font-bold text-gray-900 dark:text-white mb-2 leading-tight hover:text-brand-red transition-colors line-clamp-3",
                        isLead ? "text-2xl md:text-3xl" : "text-lg"
                    )}>
                        {post.title}
                    </h3>
                </Link>

                {(!isCompact || isLead) && (
                    <div
                        className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-3 leading-relaxed font-sans"
                        dangerouslySetInnerHTML={{ __html: post.excerpt }}
                    />
                )}

                <span className="text-[10px] text-gray-400 mt-auto font-sans font-bold uppercase tracking-wide">
                    {post.author.name} • {formattedDate}
                </span>
            </div>
        </div>
    );
}
