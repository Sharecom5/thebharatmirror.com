import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { email } = await request.json();

        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }

        const wpApiUrl = process.env.WORDPRESS_API_URL;
        if (!wpApiUrl) {
            return NextResponse.json({ error: "Configuration Error" }, { status: 500 });
        }

        // Forward request to WordPress Backend
        // Endpoint: /bm/v1/subscribe
        const response = await fetch(`${wpApiUrl}/bm/v1/subscribe`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        });

        if (response.ok) {
            const data = await response.json().catch(() => ({ success: true }));
            return NextResponse.json(data);
        } else {
            // If WP fails (e.g. 400 Bad Request if already subscribed), return error
            const errorData = await response.json().catch(() => ({}));
            return NextResponse.json(errorData, { status: response.status });
        }

    } catch (error) {
        console.error("Subscription Proxy Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
