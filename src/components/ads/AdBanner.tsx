"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { adService, settingsService } from "@/lib/ads";

interface AdBannerProps {
    size?: "leaderboard" | "rectangle" | "fluid";
    position: string;
    className?: string;
}

interface AdData {
    id: string | number;
    imageUrl: string;
    targetUrl: string;
    altText?: string;
}

export default function AdBanner({ size = "rectangle", position, className = "" }: AdBannerProps) {
    const [ad, setAd] = useState<AdData | null>(null);
    const [loading, setLoading] = useState(true);
    const [adsEnabled, setAdsEnabled] = useState(true);

    useEffect(() => {
        let isMounted = true;
        const fetchData = async () => {
            try {
                const [settingsRes, adsRes] = await Promise.all([
                    settingsService.get(),
                    adService.getAll(position),
                ]);

                if (!isMounted) return;

                const enabled = settingsRes.data.adsEnabled !== false;
                setAdsEnabled(enabled);

                if (!enabled) {
                    setLoading(false);
                    return;
                }

                const ads = adsRes.data;
                if (ads.length > 0) {
                    const randomAd = ads[Math.floor(Math.random() * ads.length)];
                    setAd(randomAd);
                }
            } catch (err) {
                console.error("Failed to load ad or settings", err);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchData();

        return () => { isMounted = false; };
    }, [position]);

    const getSizeClasses = () => {
        switch (size) {
            case "leaderboard":
                return "w-full max-w-[728px] min-h-[90px]";
            case "rectangle":
                return "w-full max-w-[300px] min-h-[250px]";
            case "fluid":
                return "w-full min-h-[250px]";
            default:
                return "w-full max-w-[300px] min-h-[250px]";
        }
    };

    const getContainerStyles = () => {
        switch (position) {
            case "top-banner":
            case "category-top":
            case "article-top":
                return "w-full flex justify-center pt-2 pb-6 border-b border-gray-100 dark:border-gray-900 mb-6";
            case "article-bottom":
                return "mt-12 py-8 border-t border-b border-gray-100 dark:border-gray-800 flex justify-center";
            case "footer-banner":
                return "w-full flex justify-center py-12 border-t border-gray-100 dark:border-gray-800 mt-8";
            case "mid-content":
            case "leaderboard":
                return "w-full my-8 py-8 border-t border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-[#151515] flex justify-center";
            case "sidebar-mid":
                return "py-4 border-t border-b border-gray-100 dark:border-gray-800";
            default:
                return "";
        }
    };

    if (!adsEnabled) return null;
    if (loading) return null; // Or a placeholder/skeleton

    if (ad && adsEnabled) {
        return (
            <div className={`${getContainerStyles()} ${className} relative group`}>
                <div className="flex flex-col gap-1 items-center relative">
                    <span className="text-[8px] font-black uppercase tracking-widest text-gray-400">
                        Advertisement
                    </span>

                    <a
                        href={
                            ad.targetUrl.startsWith("http")
                                ? ad.targetUrl
                                : `https://${ad.targetUrl}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`block overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-[1.01] ${getSizeClasses()} mx-auto bg-white dark:bg-gray-800 relative`}
                    >
                        <Image
                            src={ad.imageUrl}
                            alt={ad.altText || "Advertisement"}
                            fill
                            unoptimized
                            className="w-full h-full object-cover"
                        />
                    </a>
                </div>
            </div>
        );
    }

    return null;
}
