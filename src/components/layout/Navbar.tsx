"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import ThemeToggle from "@/components/common/ThemeToggle";
import MarketTicker from "@/components/common/MarketTicker";

const NAV_ITEMS = [
    { label: "Home", path: "/" },
    { label: "India", path: "/india" },
    { label: "World", path: "/world" },
    { label: "Opinion", path: "/opinion" },
    { label: "Business", path: "/business" },
    { label: "Sport", path: "/sport" },
    { label: "Entertainment", path: "/entertainment" },
    { label: "Sci-Tech", path: "/sci-tech" },
    { label: "Life & Style", path: "/life-and-style" },
];

export default function Navbar() {
    const pathname = usePathname();
    const router = useRouter();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentDate, setCurrentDate] = useState("");

    useEffect(() => {
        const date = new Date();
        const options: Intl.DateTimeFormatOptions = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        };
        setCurrentDate(date.toLocaleDateString("en-US", options).toUpperCase());
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 200);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleSearch = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
            setIsMobileMenuOpen(false);
            setSearchQuery("");
        }
    };

    return (
        <header className="flex flex-col bg-white dark:bg-black font-sans transition-colors duration-300">
            {/* 1. Top Bar */}
            <div className="bg-[#f4f4f4] dark:bg-[#111] text-[10px] uppercase font-bold tracking-widest py-1 px-4 border-b border-gray-200 dark:border-gray-800 hidden md:flex justify-between items-center text-gray-600 dark:text-gray-400">
                <div className="flex gap-4">
                    <span>{currentDate}</span>
                    <span className="text-brand-red">New Delhi</span>
                </div>
                <div className="flex gap-6">
                    <Link href="/newsletters" className="hover:text-brand-red transition-colors">
                        Newsletters
                    </Link>
                </div>
            </div>

            {/* 2. Main Logo Area */}
            <div
                className={cn(
                    "border-b border-gray-100 dark:border-gray-800 flex items-center justify-between px-4 max-w-7xl mx-auto w-full transition-all duration-500 ease-in-out overflow-hidden",
                    isScrolled
                        ? "max-h-0 opacity-0 py-0 border-none"
                        : "max-h-[200px] py-6 opacity-100"
                )}
            >
                <div className="md:hidden">
                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        {isMobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>

                <div className="flex-1 flex justify-center">
                    <Link href="/">
                        <div className="text-center">
                            <h1 className="font-serif text-4xl md:text-6xl font-black tracking-tight text-black dark:text-white">
                                The Bharat Mirror
                            </h1>
                            <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500 mt-1 font-sans font-bold">
                                India&apos;s Premier Digital News Platform
                            </p>
                        </div>
                    </Link>
                </div>

                <div className="md:hidden w-6" />

                <div className="hidden md:flex items-center gap-4 absolute right-8 top-12">
                    <ThemeToggle />
                </div>
            </div>

            <MarketTicker />

            {/* 3. Sticky Navigation Bar */}
            <div
                className={cn(
                    "sticky top-0 z-50 bg-white dark:bg-black border-b-[3px] border-black dark:border-gray-800 shadow-sm transition-all duration-300",
                    isScrolled ? "py-2" : "py-0"
                )}
            >
                <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-12">
                    {isScrolled && (
                        <Link href="/" className="font-serif font-black text-xl mr-6 whitespace-nowrap">
                            The Bharat Mirror
                        </Link>
                    )}

                    <nav className="hidden md:flex items-center gap-1 overflow-x-auto no-scrollbar flex-1 pl-2">
                        <Link
                            href="/"
                            className={cn(
                                "text-[11px] font-bold uppercase tracking-wide px-3 py-4 border-b-2 border-transparent hover:text-brand-red whitespace-nowrap",
                                pathname === "/"
                                    ? "border-brand-red text-brand-red"
                                    : "text-gray-800 dark:text-gray-200"
                            )}
                        >
                            Home
                        </Link>
                        {NAV_ITEMS.filter((i) => i.path !== "/").map((item) => (
                            <Link
                                key={item.path}
                                href={item.path}
                                className={cn(
                                    "text-[11px] font-bold uppercase tracking-wide px-3 py-4 border-b-2 border-transparent hover:text-brand-red whitespace-nowrap transition-colors",
                                    pathname === item.path
                                        ? "border-brand-red text-brand-red"
                                        : "text-gray-800 dark:text-gray-200"
                                )}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="flex items-center gap-3 pl-4 border-l border-gray-200 dark:border-gray-700 h-8 my-auto">
                        <div className="relative group">
                            <input
                                type="text"
                                placeholder="Search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={handleSearch}
                                className={cn(
                                    "bg-gray-100 dark:bg-gray-800 text-xs rounded-sm px-2 py-1 focus:outline-none focus:ring-1 focus:ring-brand-red transition-all duration-300 w-24 focus:w-48"
                                )}
                            />
                            <button
                                onClick={() =>
                                    searchQuery.trim() &&
                                    router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
                                }
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-brand-red transition-colors"
                                aria-label="Search"
                            >
                                <Search className="w-3 h-3" />
                            </button>
                        </div>
                        {isScrolled && <ThemeToggle />}
                    </div>
                </div>
            </div>

            {isMobileMenuOpen && (
                <div className="md:hidden fixed inset-0 z-50 bg-white dark:bg-gray-900 overflow-y-auto">
                    <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
                        <span className="font-serif font-bold text-lg">Menu</span>
                        <button onClick={() => setIsMobileMenuOpen(false)}>
                            <X />
                        </button>
                    </div>
                    <div className="p-4">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full bg-gray-100 dark:bg-gray-800 p-3 rounded-none border-b-2 border-transparent focus:border-brand-red outline-none mb-6"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={handleSearch}
                        />
                        <nav className="flex flex-col gap-4">
                            {NAV_ITEMS.map((item) => (
                                <Link
                                    key={item.path}
                                    href={item.path}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={cn(
                                        "text-xl font-serif font-bold border-b border-gray-100 dark:border-gray-800 pb-2",
                                        pathname === item.path
                                            ? "text-brand-red"
                                            : "text-gray-900 dark:text-white"
                                    )}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </nav>
                        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 grid grid-cols-2 gap-4 text-xs font-bold uppercase tracking-widest text-gray-500">
                            <Link href="/newsletters">Newsletters</Link>
                            <Link href="/about">About Us</Link>
                            <Link href="/contact">Contact</Link>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
