"use client";

import React, { useState } from "react";
import { Mail, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export default function NewsletterWidget() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus("loading");
        try {
            const response = await fetch("/api/subscribe", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                setStatus("success");
                setEmail("");
                setTimeout(() => setStatus("idle"), 5000);
            } else {
                setStatus("error");
                setTimeout(() => setStatus("idle"), 4000);
            }
        } catch (err) {
            setStatus("error");
            console.error("Subscription error:", err);
            setTimeout(() => setStatus("idle"), 4000);
        }
    };

    if (status === "success") {
        return (
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6 border-2 border-green-200 dark:border-green-800 text-center shadow-lg">
                <div className="flex min-w-full shrink-0 items-center justify-around gap-8 animate-marquee px-4 mb-4">
                    <CheckCircle2 className="w-8 h-8 text-green-500" strokeWidth={3} />
                </div>
                <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2">
                    ✅ Subscribed Successfully!
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                    Welcome to The Bharat Mirror community. Check your inbox!
                </p>
            </div>
        );
    }

    if (status === "error") {
        return (
            <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-2xl p-6 border-2 border-red-200 dark:border-red-800 text-center">
                <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertCircle className="w-8 h-8 text-white" strokeWidth={3} />
                </div>
                <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2">
                    Oops! Something went wrong
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium mb-4">
                    Please try again in a moment.
                </p>
                <button
                    onClick={() => setStatus("idle")}
                    className="text-red-600 dark:text-red-400 font-bold underline text-sm"
                >
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-br from-gray-50 to-red-50 dark:from-gray-800 dark:to-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-lg">
            <Mail className="w-8 h-8 text-red-600 dark:text-red-500 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Bharat Daily
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                Subscribe to our daily newsletter for the most important news across Bharat.
            </p>
            <form onSubmit={handleSubscribe}>
                <input
                    required
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 mb-3 focus:ring-2 focus:ring-red-600 transition-all outline-none"
                    disabled={status === "loading"}
                />
                <button
                    type="submit"
                    disabled={status === "loading"}
                    className={`w-full font-bold py-3 rounded-lg transition-all shadow-md flex items-center justify-center gap-2 ${status === "loading"
                            ? "bg-gray-400 cursor-not-allowed text-white"
                            : "bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white hover:shadow-red-500/20"
                        }`}
                >
                    {status === "loading" ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Subscribing...
                        </>
                    ) : (
                        "Subscribe"
                    )}
                </button>
            </form>
        </div>
    );
}
