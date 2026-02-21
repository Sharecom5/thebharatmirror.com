import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
    className?: string;
    isH1?: boolean;
}

export default function Logo({ className, isH1 = false }: LogoProps) {
    const Component = isH1 ? "h1" : "span";
    return (
        <Link href="/" className={cn("flex items-center gap-2 group", className)}>
            <Component className="text-2xl font-bold tracking-tight">
                The Bharat<span className="text-brand-red">Mirror</span>
            </Component>
        </Link>
    );
}
