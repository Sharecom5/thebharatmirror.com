export const settingsService = {
    get: async () => {
        // Determine the API base URL for client-side use
        const apiBase = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;
        if (!apiBase) return { data: { adsEnabled: true } };

        try {
            // Try fetching settings from WP if an endpoint exists, or return default
            // Legacy used /bm/v1/settings? or similar. Assuming default true for now.
            return { data: { adsEnabled: true } };
        } catch {
            return { data: { adsEnabled: true } };
        }
    },
};

export const adService = {
    getAll: async (position: string) => {
        // In a real scenario, fetch from WP endpoint: /bm/v1/ads?position=...
        // For now, we return mock ads or try to fetch if the endpoint is known.
        // Legacy endpoint: /bm/v1/ads

        // We can simulate some ads for now to ensure UI works
        return {
            data: [
                {
                    id: 1,
                    imageUrl: "https://placehold.co/728x90/black/white?text=Ad+Space+Available",
                    targetUrl: "https://thebharatmirror.com/advertise",
                    altText: "Advertise with us",
                    position: "leaderboard"
                },
                {
                    id: 2,
                    imageUrl: "https://placehold.co/300x250/black/white?text=Ad+Space",
                    targetUrl: "https://thebharatmirror.com/advertise",
                    altText: "Advertise with us",
                    position: "sidebar"
                }
            ].filter(ad => {
                if (position === "leaderboard" || position === "top-banner" || position === "mid-content" || position === "footer-banner" || position === "category-top" || position === "article-top" || position === "article-bottom") {
                    return ad.position === "leaderboard";
                }
                return ad.position === "sidebar"; // Default to rectangle
            })
        };
    },
};
