"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { TrendingUp, TrendingDown } from "lucide-react";

interface MarketItem {
    name: string;
    price: number;
    change: number;
    percent: number;
}

export default function MarketTicker() {
    const router = useRouter();
    const [marketData, setMarketData] = useState<MarketItem[]>([
        { name: "Nifty 50", price: 22450.0, change: 120.5, percent: 0.54 },
        { name: "Sensex", price: 74200.0, change: 350.2, percent: 0.47 },
        { name: "Bank Nifty", price: 47800.0, change: -150.0, percent: -0.31 },
        { name: "USD/INR", price: 83.45, change: 0.05, percent: 0.06 },
        { name: "Gold (10g)", price: 72500.0, change: 250.0, percent: 0.35 },
        { name: "Silver (1kg)", price: 88900.0, change: -400.0, percent: -0.45 },
    ]);

    useEffect(() => {
        const interval = setInterval(() => {
            setMarketData((prevData) =>
                prevData.map((item) => {
                    const fluctuation = (Math.random() - 0.5) * 5;
                    const newPrice = item.price + fluctuation;
                    const newChange = item.change + fluctuation;
                    const newPercent = (newChange / (newPrice - newChange)) * 100;
                    return {
                        ...item,
                        price: parseFloat(newPrice.toFixed(2)),
                        change: parseFloat(newChange.toFixed(2)),
                        percent: parseFloat(newPercent.toFixed(2)),
                    };
                })
            );
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div
            onClick={() => router.push("/markets")}
            className="w-full bg-gray-100 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 overflow-hidden cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
            <div className="flex select-none">
                <div className="flex min-w-full shrink-0 items-center justify-around gap-8 animate-marquee px-4">
                    {marketData.map((item, index) => (
                        <div key={index} className="flex items-center gap-2 text-xs font-bold font-sans text-nowrap">
                            <span className="text-gray-700 dark:text-gray-300 uppercase">{item.name}</span>
                            <span
                                className={`flex items-center ${item.percent >= 0 ? "text-green-600" : "text-red-600"
                                    }`}
                            >
                                {item.price.toLocaleString("en-IN")}
                                {item.percent >= 0 ? (
                                    <TrendingUp className="w-3 h-3 ml-1" />
                                ) : (
                                    <TrendingDown className="w-3 h-3 ml-1" />
                                )}
                                <span className="ml-1">
                                    ({item.percent > 0 ? "+" : ""}
                                    {item.percent}%)
                                </span>
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
