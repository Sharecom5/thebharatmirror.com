"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Linkedin, Mail, CheckCircle2, Loader2 } from "lucide-react";
import Logo from "@/components/common/Logo";

export default function Footer() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus("loading");
        try {
            // In Next.js, we can use a relative path for internal API routes
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
                setTimeout(() => setStatus("idle"), 4000);
            } else {
                setStatus("error");
                setTimeout(() => setStatus("idle"), 3000);
            }
        } catch (err) {
            console.error("Subscription error:", err);
            setStatus("error");
            setTimeout(() => setStatus("idle"), 3000);
        }
    };

    return (
        <footer className="bg-black text-white pt-16 pb-8 mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 lg:col-span-1">
                        <Logo className="mb-6 text-white" />
                        <p className="text-gray-400 text-sm leading-relaxed mb-6 font-medium">
                            The Bharat Mirror is India&apos;s premier digital news platform, delivering high-quality journalism, breaking news, and deep-dive analysis from across the nation and the world.
                        </p>
                        <div className="flex gap-4">
                            <SocialLink
                                icon={<Linkedin className="w-5 h-5" />}
                                href="https://www.linkedin.com/company/thebharatmirror"
                            />
                        </div>
                    </div>

                    <div>
                        <h3 className="font-black text-white uppercase tracking-tighter mb-6">Quick Links</h3>
                        <ul className="space-y-3">
                            <FooterLink href="/" label="Home" />
                            <FooterLink href="/about" label="About Us" />
                            <FooterLink href="/advertise" label="Advertise" />
                            <FooterLink href="/contact" label="Contact" />
                            <FooterLink href="/privacy" label="Privacy Policy" />
                            <FooterLink href="/terms" label="Terms of Service" />
                            <FooterLink href="/disclaimer" label="Disclaimer" />
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-black text-white uppercase tracking-tighter mb-6">Categories</h3>
                        <ul className="space-y-3">
                            <FooterLink href="/category/india" label="India" />
                            <FooterLink href="/category/world" label="World" />
                            <FooterLink href="/category/opinion" label="Opinion" />
                            <FooterLink href="/category/business" label="Business" />
                            <FooterLink href="/category/sport" label="Sport" />
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-black text-white uppercase tracking-tighter mb-6">Subscribe</h3>
                        {status === "success" ? (
                            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 text-center animate-in fade-in">
                                <CheckCircle2 className="w-8 h-8 text-green-400 mx-auto mb-2" />
                                <p className="text-green-400 font-bold text-sm">✅ Subscribed!</p>
                                <p className="text-gray-400 text-xs mt-1">Check your inbox</p>
                            </div>
                        ) : (
                            <>
                                <p className="text-gray-400 text-sm mb-6">
                                    Get the latest news and insights delivered to your inbox daily.
                                </p>
                                <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
                                    <div className="relative">
                                        <Mail className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                                        <input
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Enter your email"
                                            disabled={status === "loading"}
                                            className="w-full pl-10 pr-4 py-3 text-sm rounded-sm bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-brand-red outline-none transition-all disabled:opacity-50"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={status === "loading"}
                                        className={`w-full font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2 ${status === "loading"
                                            ? "bg-gray-600 cursor-not-allowed"
                                            : "bg-brand-red hover:brightness-110"
                                            }`}
                                    >
                                        {status === "loading" ? (
                                            <>
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                Subscribing...
                                            </>
                                        ) : (
                                            "Subscribe"
                                        )}
                                    </button>
                                    {status === "error" && (
                                        <p className="text-red-400 text-xs text-center animate-in fade-in">
                                            ⚠️ Failed to subscribe. Please try again.
                                        </p>
                                    )}
                                </form>
                            </>
                        )}
                    </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-500">
                        <p>&copy; {new Date().getFullYear()} The Bharat Mirror. All rights reserved. India&apos;s Premier Digital News Platform.</p>
                    </div>
                    <div className="flex gap-6 text-sm text-gray-500 dark:text-gray-500">
                        <Link href="/terms" className="hover:text-gray-900 dark:hover:text-white">
                            Terms
                        </Link>
                        <Link href="/privacy" className="hover:text-gray-900 dark:hover:text-white">
                            Privacy
                        </Link>
                        <Link href="/disclaimer" className="hover:text-gray-900 dark:hover:text-white">
                            Disclaimer
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

const SocialLink = ({ icon, href }: { icon: React.ReactNode; href: string }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="p-3 bg-white/5 rounded-sm text-gray-400 hover:bg-brand-red hover:text-white transition-all border border-white/5 hover:border-brand-red"
    >
        {icon}
    </a>
);

const FooterLink = ({ href, label }: { href: string; label: string }) => (
    <li>
        <Link
            href={href}
            className="text-gray-400 hover:text-brand-red text-sm font-medium transition-colors uppercase tracking-widest text-[11px]"
        >
            {label}
        </Link>
    </li>
);
