"use client"

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useSession, signOut } from "next-auth/react";

const themes = {
    guest: { nav: "#2a2a2a", accent: "#6b6b6b", badge: "GUEST", badgeText: "#fff", dropdownHover: "#f5f5f5" },
    user:  { nav: "#1a4731", accent: "#22863a", badge: "MEMBER", badgeText: "#fff", dropdownHover: "#f0faf4" },
    admin: { nav: "#5a0a0a", accent: "#c0392b", badge: "ADMIN",  badgeText: "#fff", dropdownHover: "#fff5f5" },
};

export default function Navbar() {
    const { data: session } = useSession();
    const role = (session?.user as any)?.role;
    const theme = role === "admin" ? themes.admin : session?.user ? themes.user : themes.guest;
    const isLoggedIn = !!session?.user;
    const isAdmin = role === "admin";
    const userName = session?.user?.name || session?.user?.email || "User";
    const initials = userName.slice(0, 2).toUpperCase();

    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    return (
        <nav className="sticky top-0 z-50 w-full" style={{ backgroundColor: theme.nav, height: "64px" }}>
            <div className="mx-auto h-full max-w-7xl px-6 flex items-center justify-between">

                {/* Left: logo + badge */}
                <div className="flex items-center gap-3">
                    <Link href="/" className="flex items-center gap-2.5 hover:opacity-90 transition-opacity">
                        <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-white/20">
                            <Image src="/logo.png" alt="CowOrk logo" width={36} height={36} className="object-cover w-full h-full" />
                        </div>
                        <span className="font-serif text-xl font-bold text-white tracking-wide">CowOrk</span>
                    </Link>
                    <span
                        className="text-xs font-bold px-2.5 py-0.5 rounded-full tracking-widest"
                        style={{ backgroundColor: theme.accent, color: theme.badgeText }}
                    >
                        {theme.badge}
                    </span>
                </div>

                {/* Right */}
                <div className="flex items-center gap-1 sm:gap-2">
                    {/* Spaces link — always visible */}
                    <Link
                        href="/#spaces"
                        className="hidden sm:block px-3 py-1.5 text-sm text-white/80 hover:text-white transition-colors rounded-lg hover:bg-white/10"
                    >
                        Spaces
                    </Link>

                    {/* Guest: Sign In button */}
                    {!isLoggedIn && (
                        <Link
                            href="/login"
                            className="ml-2 px-4 py-2 text-sm font-semibold rounded-lg border border-white/30 text-white hover:bg-white hover:text-zinc-900 transition-all"
                        >
                            Sign In
                        </Link>
                    )}

                    {/* Logged in: user dropdown */}
                    {isLoggedIn && (
                        <div ref={dropdownRef} className="relative ml-2">
                            {/* Trigger button */}
                            <button
                                onClick={() => setOpen((v) => !v)}
                                className="flex items-center gap-2 px-2 py-1.5 rounded-xl border border-white/20 hover:bg-white/10 transition-all"
                            >
                                {/* Avatar circle */}
                                <div
                                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                                    style={{ backgroundColor: theme.accent, color: "#fff" }}
                                >
                                    {initials}
                                </div>
                                <span className="hidden sm:block text-sm text-white font-medium truncate max-w-[100px]">
                                    {userName}
                                </span>
                                <svg
                                    className={`w-4 h-4 text-white/60 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {/* Dropdown panel */}
                            {open && (
                                <div
                                    className="absolute right-0 top-full mt-2 w-52 rounded-2xl shadow-xl overflow-hidden z-50"
                                    style={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb" }}
                                >
                                    {/* User info header */}
                                    <div className="px-4 py-3 border-b border-zinc-100">
                                        <p className="text-xs font-bold text-zinc-800 truncate">{userName}</p>
                                        <p className="text-xs text-zinc-400 mt-0.5">{isAdmin ? "Administrator" : "Member"}</p>
                                    </div>

                                    <div className="py-1.5">
                                        {/* My Reservations — users only */}
                                        {!isAdmin && (
                                            <Link
                                                href="/reservations"
                                                onClick={() => setOpen(false)}
                                                className="flex items-center gap-3 px-4 py-2.5 text-sm text-zinc-700 hover:bg-zinc-50 transition-colors"
                                            >
                                                <svg className="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                My Reservations
                                            </Link>
                                        )}

                                        {/* Admin Dashboard — admins only */}
                                        {isAdmin && (
                                            <Link
                                                href="/admin"
                                                onClick={() => setOpen(false)}
                                                className="flex items-center gap-3 px-4 py-2.5 text-sm text-zinc-700 hover:bg-zinc-50 transition-colors"
                                            >
                                                <svg className="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                                                </svg>
                                                Admin Dashboard
                                            </Link>
                                        )}

                                        {/* Settings */}
                                        <Link
                                            href="/settings"
                                            onClick={() => setOpen(false)}
                                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-zinc-700 hover:bg-zinc-50 transition-colors"
                                        >
                                            <svg className="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            Settings
                                        </Link>

                                        {/* Divider */}
                                        <div className="my-1.5 border-t border-zinc-100" />

                                        {/* Sign Out */}
                                        <button
                                            onClick={() => { setOpen(false); signOut({ callbackUrl: "/" }); }}
                                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                            </svg>
                                            Sign Out
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
