import { getRecentPostsForSitemap } from "@/lib/wordpress";

export const dynamic = "force-dynamic";

export async function GET() {
  const posts = await getRecentPostsForSitemap();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://thebharatmirror.com";

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
  ${posts
      .map((post) => {
        const title = post.title
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&apos;");

        // Ensure date is in ISO 8601 format
        const pubDate = new Date(post.date).toISOString();

        return `
  <url>
    <loc>${siteUrl}/${post.slug}</loc>
    <news:news>
      <news:publication>
        <news:name>The Bharat Mirror</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${pubDate}</news:publication_date>
      <news:title>${title}</news:title>
    </news:news>
  </url>`;
      })
      .join("")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, s-maxage=600, stale-while-revalidate=1200",
    },
  });
}
