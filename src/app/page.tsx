"use client"

import { useSession } from "next-auth/react";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import SpaceCard from "@/components/home/SpaceCard";
import getWorkingSpaces, { WorkingSpace } from "@/libs/getWorkingSpaces";

const themes = {
    guest: { bg: "#f0f0ef", accent: "#6b6b6b", card: "#ffffff", border: "#d4d4d4", text: "#2a2a2a", muted: "#6b6b6b" },
    user:  { bg: "#f0faf4", accent: "#22863a", card: "#ffffff", border: "#b7e4c7", text: "#1a4731", muted: "#3a7d54" },
    admin: { bg: "#fff5f5", accent: "#c0392b", card: "#ffffff", border: "#f5c6c6", text: "#5a0a0a", muted: "#9b2c2c" },
};

// UI metadata keyed by name slug
const spaceMeta: Record<string, { emoji: string; floor: string; price: string; capacity: number; desc: string; amenities: string[]; gradient: string }> = {
    "the-loft":   { emoji: "🏙️", floor: "Floor 4",  price: "฿800/day",   capacity: 12, desc: "Panoramic city views with floor-to-ceiling windows. Ideal for teams that need inspiration.", amenities: ["WiFi 1Gbps", "Standing Desks", "City View", "Coffee Bar"], gradient: "from-slate-700 to-slate-900" },
    "the-bunker": { emoji: "🔒", floor: "Floor 1",  price: "฿500/day",   capacity: 6,  desc: "Ultra-quiet, acoustically isolated space designed for deep focused work.", amenities: ["Soundproof", "Private Entry", "WiFi 1Gbps", "Standing Desks"], gradient: "from-zinc-700 to-zinc-900" },
    "the-garden": { emoji: "🌿", floor: "Rooftop",  price: "฿1,200/day", capacity: 20, desc: "Open-air rooftop garden surrounded by lush greenery. Perfect for large creative sessions.", amenities: ["Open Air", "Garden View", "Breakout Zones", "Catering"], gradient: "from-emerald-700 to-emerald-900" },
};

function nameToSlug(name: string): string {
    return "the-" + name.toLowerCase().replace(/\s+/g, "-");
}

function buildSpaceForCard(ws: WorkingSpace) {
    const slug = nameToSlug(ws.name);
    const meta = spaceMeta[slug] ?? {
        emoji: "🏢", floor: ws.district ?? "", price: "—", capacity: 0,
        desc: ws.address ?? "", amenities: [`Tel: ${ws.tel}`], gradient: "from-gray-700 to-gray-900",
    };
    return { ...meta, name: ws.name };
}

export default function HomePage() {
    const { data: session } = useSession();
    const router = useRouter();
    const role = (session?.user as any)?.role;
    const theme = role === "admin" ? themes.admin : session?.user ? themes.user : themes.guest;
    const isLoggedIn = !!session?.user;
    const isAdmin = role === "admin";

    const [spaces, setSpaces] = useState<ReturnType<typeof buildSpaceForCard>[]>([]);
    const [loadingSpaces, setLoadingSpaces] = useState(true);

    const fetchSpaces = useCallback(() => {
        setLoadingSpaces(true);
        getWorkingSpaces()
            .then((data) => setSpaces(data.map(buildSpaceForCard)))
            .catch(() => {
                setSpaces(Object.values(spaceMeta).map((m, i) => ({ ...m, name: ["The Loft", "The Bunker", "The Garden"][i] })));
            })
            .finally(() => setLoadingSpaces(false));
    }, []);

    useEffect(() => {
        fetchSpaces();

        // Re-fetch when browser restores page from bfcache (back/forward navigation)
        const handlePageShow = (e: PageTransitionEvent) => {
            if (e.persisted) {
                router.refresh();
                fetchSpaces();
            }
        };
        window.addEventListener("pageshow", handlePageShow);
        return () => window.removeEventListener("pageshow", handlePageShow);
    }, [fetchSpaces, router]);

    return (
        <div className="flex flex-col min-h-screen" style={{ backgroundColor: theme.bg }}>
            <Navbar />

            {isLoggedIn && (
                <div className="w-full py-2.5 text-center text-sm font-medium text-white"
                    style={{ background: isAdmin ? "linear-gradient(90deg, #5a0a0a, #c0392b, #5a0a0a)" : "linear-gradient(90deg, #1a4731, #22863a, #1a4731)" }}>
                    {isAdmin ? "🔐 Admin access — you can manage all reservations and spaces." : "👋 Welcome back! Browse and reserve your preferred workspace."}
                </div>
            )}

            {/* Hero */}
            <section className="w-full py-28 px-6 text-center"
                style={{ background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #111 100%)" }}>
                <p className="text-xs font-bold tracking-[0.3em] uppercase text-white/50 mb-4">Bangkok&apos;s Premier</p>
                <h1 className="font-serif text-5xl sm:text-6xl font-bold text-white leading-tight max-w-2xl mx-auto mb-6">
                    Co-Working Spaces Built for Focus
                </h1>
                <p className="text-white/60 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
                    Choose from our curated collection of premium workspaces — each designed to elevate your productivity.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="#spaces" className="px-8 py-3.5 rounded-xl bg-white text-zinc-900 font-semibold text-sm hover:bg-zinc-100 transition-all active:scale-95">
                        Browse Spaces ↓
                    </Link>
                    {isLoggedIn && (
                        <Link href="/reservations" className="px-8 py-3.5 rounded-xl border border-white/30 text-white font-semibold text-sm hover:bg-white/10 transition-all active:scale-95">
                            My Reservations →
                        </Link>
                    )}
                </div>
            </section>

            {/* Available Spaces */}
            <section id="spaces" className="w-full max-w-7xl mx-auto px-6 py-16">
                <div className="flex items-center justify-between mb-10">
                    <h2 className="font-serif text-3xl font-bold" style={{ color: theme.text }}>Available Spaces</h2>
                    <span className="text-xs font-bold px-3 py-1.5 rounded-full tracking-wider"
                        style={{ backgroundColor: theme.border, color: theme.text }}>
                        {loadingSpaces ? "…" : `${spaces.length} Location${spaces.length !== 1 ? "s" : ""}`}
                    </span>
                </div>

                {loadingSpaces ? (
                    <div className="text-center py-20" style={{ color: theme.muted }}>
                        <div className="w-8 h-8 border-2 border-current border-t-transparent rounded-full animate-spin mx-auto mb-3 opacity-40" />
                        Loading spaces…
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {spaces.map((space) => (
                            <SpaceCard key={space.name} space={space} theme={theme} isLoggedIn={isLoggedIn} />
                        ))}
                    </div>
                )}
            </section>

            <footer className="mt-auto py-8 text-center text-xs"
                style={{ borderTop: `1px solid ${theme.border}`, color: theme.muted }}>
                © 2026 CowOrk — Bangkok&apos;s Premier Co-Working Spaces
            </footer>
        </div>
    );
}
