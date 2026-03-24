"use client"

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Navbar from "@/components/Navbar";
import SpaceSummaryCard from "@/components/reserve/SpaceSummaryCard";
import addReservation from "@/libs/addReservation";
import getWorkingSpaces, { WorkingSpace } from "@/libs/getWorkingSpaces";

const themes = {
    user:  { bg: "#f0faf4", accent: "#22863a", card: "#ffffff", border: "#b7e4c7", text: "#1a4731", muted: "#3a7d54", gradient: "linear-gradient(135deg, #1a4731 0%, #22863a 100%)", banner: "linear-gradient(90deg, #1a4731, #22863a, #1a4731)" },
    admin: { bg: "#fff5f5", accent: "#c0392b", card: "#ffffff", border: "#f5c6c6", text: "#5a0a0a", muted: "#9b2c2c", gradient: "linear-gradient(135deg, #5a0a0a 0%, #c0392b 100%)", banner: "linear-gradient(90deg, #5a0a0a, #c0392b, #5a0a0a)" },
};

const inputClass = "w-full h-11 px-4 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all";

// slug to display info (for UI only while loading from API)
const slugMeta: Record<string, { emoji: string; floor: string }> = {
    "the-loft":   { emoji: "🏙️", floor: "Floor 4" },
    "the-bunker": { emoji: "🔒", floor: "Floor 1" },
    "the-garden": { emoji: "🌿", floor: "Rooftop"  },
};

function nameToSlug(name: string): string {
    return name.toLowerCase().replace(/\s+/g, "-");
}

function FieldError({ msg }: { msg: string | null }) {
    if (!msg) return null;
    return <p className="mt-1 text-xs text-red-600 flex items-center gap-1">⚠ {msg}</p>;
}

export default function ReservePage() {
    const { slug } = useParams<{ slug: string }>();
    const router = useRouter();
    const { data: session } = useSession();
    const token = (session?.user as any)?.token as string | undefined;
    const role = (session?.user as any)?.role;
    const theme = role === "admin" ? themes.admin : themes.user;

    const [workingspace, setWorkingspace] = useState<WorkingSpace | null>(null);
    const [notFound, setNotFound] = useState(false);

    const [date, setDate] = useState("");
    const [startTime, setStartTime] = useState("09:00");
    const [endTime, setEndTime] = useState("17:00");
    const [notes, setNotes] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    // touched flags — show errors only after user interacts with each field
    const [endTimeTouched, setEndTimeTouched] = useState(false);
    const [purposeTouched, setPurposeTouched] = useState(false);

    // real-time validation
    const opentime = workingspace?.openTime ?? "";
    const closetime = workingspace?.closeTime ?? "";

    const startTimeError = endTimeTouched && opentime && startTime && startTime < opentime
        ? `Start time cannot be before opening time (${opentime})`
        : null;

    const timeError = endTimeTouched && endTime && startTime && endTime <= startTime
        ? "End time must be after start time"
        : endTimeTouched && closetime && endTime && endTime > closetime
        ? `End time cannot be after closing time (${closetime})`
        : null;

    const purposeError = purposeTouched && !notes.trim()
        ? "Purpose is required"
        : null;

    const hasErrors = !!startTimeError || !!timeError || !!purposeError;

    function loadSpace() {
        getWorkingSpaces().then((spaces) => {
            const match = spaces.find((s) => nameToSlug(s.name) === slug) ?? spaces[0];
            if (!match) setNotFound(true);
            else setWorkingspace(match);
        }).catch(() => setNotFound(true));
    }

    useEffect(() => {
        loadSpace();
        // fix bfcache: refresh when user navigates back with browser arrow
        const onPageShow = (e: PageTransitionEvent) => { if (e.persisted) loadSpace(); };
        window.addEventListener("pageshow", onPageShow);
        return () => window.removeEventListener("pageshow", onPageShow);
    }, [slug]);

    const fieldStyle = (error: string | null) => ({
        borderColor: error ? "#fca5a5" : theme.border,
        color: theme.text,
        backgroundColor: theme.bg,
    });

    const meta = slugMeta[slug] ?? { emoji: "🏢", floor: "" };
    const spaceForCard = workingspace
        ? { emoji: meta.emoji, name: workingspace.name, floor: meta.floor, address: workingspace.address, opentime: workingspace.openTime, closetime: workingspace.closeTime, accentGradient: theme.gradient }
        : { emoji: meta.emoji, name: "Loading…", floor: meta.floor, address: "", accentGradient: theme.gradient };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // touch all fields to reveal any hidden errors
        setEndTimeTouched(true);
        setPurposeTouched(true);

        if (hasErrors) return;
        if (!token) { setErrorMsg("Please log in first"); return; }
        if (!workingspace) { setErrorMsg("Space not found"); return; }

        setIsLoading(true);
        setErrorMsg(null);
        try {
            await addReservation(token, workingspace._id, {
                date,
                startTime,
                endTime,
                purpose: notes,
            });
            setSuccess(true);
            setTimeout(() => router.push(role === "admin" ? "/admin" : "/reservations"), 1500);
        } catch (err: any) {
            setErrorMsg(err.message ?? "Failed to create reservation");
        } finally {
            setIsLoading(false);
        }
    };

    if (notFound) {
        return (
            <div className="flex flex-col min-h-screen items-center justify-center" style={{ backgroundColor: theme.bg }}>
                <Navbar />
                <p style={{ color: theme.muted }}>Space not found.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen" style={{ backgroundColor: theme.bg }}>
            <Navbar />
            <div className="w-full py-2.5 text-center text-sm font-medium text-white"
                style={{ background: theme.banner }}>
                {role === "admin" ? "🔐 Admin access — you can manage all reservations and spaces." : "👋 Welcome back! Browse and reserve your preferred workspace."}
            </div>

            <main className="w-full max-w-2xl mx-auto px-4 py-10">
                <Link href="/" className="inline-flex items-center gap-1.5 text-sm font-medium mb-8 transition-opacity hover:opacity-70" style={{ color: theme.muted }}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Spaces
                </Link>

                <SpaceSummaryCard space={spaceForCard} />

                <div className="rounded-2xl shadow-sm p-8" style={{ backgroundColor: theme.card, border: `1px solid ${theme.border}` }}>
                    <h1 className="font-serif text-2xl font-bold mb-6" style={{ color: theme.text }}>Reserve This Space</h1>

                    {success && (
                        <div className="mb-6 flex items-center gap-3 p-4 rounded-xl bg-green-50 border border-green-200">
                            <svg className="w-5 h-5 text-green-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <p className="text-sm font-medium text-green-800">Reservation confirmed! Redirecting…</p>
                        </div>
                    )}

                    {errorMsg && (
                        <div className="mb-6 flex items-center gap-3 p-4 rounded-xl bg-red-50 border border-red-200">
                            <svg className="w-5 h-5 text-red-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            <p className="text-sm font-medium text-red-800">{errorMsg}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-semibold mb-1.5" style={{ color: theme.text }}>Date</label>
                            <input type="date" required value={date} onChange={(e) => setDate(e.target.value)}
                                min={new Date().toISOString().split("T")[0]} className={inputClass} style={fieldStyle(null)} />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold mb-1.5" style={{ color: theme.text }}>Start Time</label>
                                <input
                                    type="time" required value={startTime}
                                    min={opentime || undefined}
                                    max={closetime || undefined}
                                    onChange={(e) => { setStartTime(e.target.value); setEndTimeTouched(true); }}
                                    className={inputClass} style={fieldStyle(startTimeError)} />
                                <FieldError msg={startTimeError} />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-1.5" style={{ color: theme.text }}>End Time</label>
                                <input
                                    type="time" required value={endTime}
                                    min={opentime || undefined}
                                    max={closetime || undefined}
                                    onChange={(e) => { setEndTime(e.target.value); setEndTimeTouched(true); }}
                                    className={inputClass} style={fieldStyle(timeError)} />
                                <FieldError msg={timeError} />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold mb-1.5" style={{ color: theme.text }}>Purpose</label>
                            <textarea
                                required value={notes}
                                onChange={(e) => { setNotes(e.target.value); setPurposeTouched(true); }}
                                rows={3}
                                className="w-full px-4 py-3 rounded-xl border text-sm resize-none focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                                style={fieldStyle(purposeError)}
                                placeholder="e.g. Team strategy session, need projector setup…" />
                            <FieldError msg={purposeError} />
                        </div>

                        <button type="submit" disabled={isLoading || success || !workingspace}
                            className="w-full h-12 flex items-center justify-center gap-2 rounded-xl font-semibold text-sm text-white transition-all hover:opacity-90 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                            style={{ backgroundColor: theme.accent }}>
                            {isLoading ? (
                                <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Confirming…</>
                            ) : (
                                <>Confirm Reservation <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg></>
                            )}
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
}
