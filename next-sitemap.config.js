/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://thebharatmirror.com',
    generateRobotsTxt: true,
    exclude: ['/news-sitemap.xml', '/admin/*'], // Exclude dynamic sitemap and admin
    robotsTxtOptions: {
        additionalSitemaps: [
            'https://thebharatmirror.com/news-sitemap.xml',
        ],
    },
}
