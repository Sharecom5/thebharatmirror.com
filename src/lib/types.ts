/* eslint-disable @typescript-eslint/no-explicit-any */
export interface WPPost {
    id: number;
    date: string;
    slug: string;
    status: string;
    type: string;
    link: string;
    title: {
        rendered: string;
    };
    content: {
        rendered: string;
        protected: boolean;
    };
    excerpt: {
        rendered: string;
        protected: boolean;
    };
    author: number;
    featured_media: number;
    comment_status: string;
    ping_status: string;
    sticky: boolean;
    format: string;
    meta: Record<string, unknown>[];
    categories: number[];
    tags: number[];
    _embedded?: {
        author?: Array<{
            id: number;
            name: string;
            url: string;
            description: string;
            link: string;
            slug: string;
            avatar_urls: Record<string, string>;
        }>;
        "wp:featuredmedia"?: Array<{
            id: number;
            date: string;
            slug: string;
            type: string;
            link: string;
            title: { rendered: string };
            author: number;
            caption: { rendered: string };
            alt_text: string;
            media_type: string;
            mime_type: string;
            media_details: any;
            source_url: string;
        }>;
        "wp:term"?: Array<Array<{
            id: number;
            link: string;
            name: string;
            slug: string;
            taxonomy: string;
            _links: any;
        }>>;
    };
    rank_math_title?: string;
    rank_math_description?: string;
    yoast_head?: string;
}

export interface WPCategory {
    id: number;
    name: string;
    slug: string;
    count: number;
    description?: string;
}

export interface PostData {
    id: number;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    date: string;
    author: {
        name: string;
        avatar?: string;
    };
    image: {
        url: string;
        alt: string;
        caption?: string;
    };
    categories: {
        id: number;
        name: string;
        slug: string;
    }[];
    seo: {
        title: string;
        description: string;
        fullHead?: string;
    };
    sticky?: boolean;
}
