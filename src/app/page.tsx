/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllPosts } from "@/lib/wordpress";
import FeaturedGrid from "@/components/news/FeaturedGrid";
import CategoryBlock from "@/components/news/CategoryBlock";
import TrendingSidebar from "@/components/news/TrendingSidebar";
import NewsletterWidget from "@/components/news/NewsletterWidget";
import AdBanner from "@/components/ads/AdBanner";
import { Metadata } from "next";
import { PostData } from "@/lib/types";

export const revalidate = 600; // Revalidate every 10 minutes

export const metadata: Metadata = {
  title: "The Bharat Mirror - India's Premier Digital News Platform",
  description: "Stay updated with the latest news, breaking stories, and in-depth analysis from India and around the world on The Bharat Mirror.",
  alternates: {
    canonical: "https://thebharatmirror.com",
  },
};

export default async function HomePage() {
  // Fetch a large batch of posts to distribute across sections
  // Legacy fetched 50 posts. We'll do the same.
  const allPosts = await getAllPosts(1, 50);

  // Helper to get unique posts
  const shownIds = new Set<number>();
  const getUniquePosts = (count: number, filterFn: (p: PostData) => boolean = () => true) => {
    const filtered = allPosts.filter((p) => !shownIds.has(p.id) && filterFn(p));
    const limited = filtered.slice(0, count);
    limited.forEach((p) => shownIds.add(p.id));
    return limited;
  };

  // 1. Featured Section
  // Try to find a sticky/featured post first
  const mainFeatured = getUniquePosts(1, (p) => p.sticky === true)[0] || getUniquePosts(1)[0];
  const sideFeatured = getUniquePosts(4);

  // 2. Category Sections
  const indiaPosts = getUniquePosts(4, (p) => p.categories.some((c) => c.slug === "india"));
  const businessPosts = getUniquePosts(4, (p) => p.categories.some((c) => c.slug === "business"));
  const sportPosts = getUniquePosts(4, (p) => p.categories.some((c) => c.slug === "sport" || c.slug === "sports"));
  const worldPosts = getUniquePosts(4, (p) => p.categories.some((c) => c.slug === "world"));

  // 3. Sidebar Posts (Trending - just latest remaining for now)
  const trendingPosts = getUniquePosts(5);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://thebharatmirror.com";

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": siteUrl,
    "name": "The Bharat Mirror",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${siteUrl}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "The Bharat Mirror",
    "url": siteUrl,
    "logo": `${siteUrl}/logo.png`,
    "sameAs": [
      "https://facebook.com/thebharatmirror",
      "https://twitter.com/thebharatmirror",
      "https://instagram.com/thebharatmirror"
    ]
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <div className="mb-12">
        <AdBanner size="leaderboard" position="top-banner" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* Main Content Area */}
        <div className="lg:col-span-3">
          {/* 1. Featured Grid */}
          <FeaturedGrid mainPost={mainFeatured} sidePosts={sideFeatured} />

          <div className="my-12">
            <AdBanner size="leaderboard" position="mid-content" />
          </div>

          {/* 2. Category Blocks */}
          {indiaPosts.length > 0 && <CategoryBlock category="India" posts={indiaPosts} />}
          {businessPosts.length > 0 && <CategoryBlock category="Business" posts={businessPosts} />}
          {sportPosts.length > 0 && <CategoryBlock category="Sport" posts={sportPosts} />}
          {worldPosts.length > 0 && <CategoryBlock category="World" posts={worldPosts} />}
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-1 space-y-12">
          <TrendingSidebar posts={trendingPosts} />
          <AdBanner size="rectangle" position="sidebar" />
          <NewsletterWidget />
        </aside>
      </div>

      <div className="mt-12">
        <AdBanner size="leaderboard" position="footer-banner" />
      </div>
    </div>
  );
}
