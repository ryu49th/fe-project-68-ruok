"use client"

import Link from "next/link";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import EditModal, { Reservation } from "@/components/reservations/EditModal";

const theme = {
    bg: "#f0faf4", accent: "#22863a",
    card: "#ffffff", border: "#b7e4c7", text: "#1a4731", muted: "#3a7d54",
};

type Status = "confirmed" | "pending" | "cancelled";

const initialReservations: Reservation[] = [
    { id: 1, space: { emoji: "🏙️", name: "The Loft",   floor: "Floor 4" }, date: "2026-03-25", start: "09:00", end: "17:00", tel: "081-234-5678", notes: "Team strategy session — need projector set up", status: "confirmed" },
    { id: 2, space: { emoji: "🔒", name: "The Bunker", floor: "Floor 1" }, date: "2026-03-28", start: "10:00", end: "14:00", tel: "092-345-6789", notes: "Deep work sprint, no disturbances",              status: "pending"   },
    { id: 3, space: { emoji: "🌿", name: "The Garden", floor: "Rooftop" }, date: "2026-04-02", start: "13:00", end: "18:00", tel: "065-456-7890", notes: "Client presentation + catering required",        status: "cancelled" },
];

const statusStyles: Record<Status, { bg: string; text: string; label: string }> = {
    confirmed: { bg: "#d1fae5", text: "#065f46", label: "Confirmed" },
    pending:   { bg: "#fef9c3", text: "#713f12", label: "Pending"   },
    cancelled: { bg: "#fee2e2", text: "#7f1d1d", label: "Cancelled" },
};

function formatDate(d: string) {
    return new Date(d).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
}

export default function ReservationsPage() {
    const [reservations, setReservations] = useState<Reservation[]>(initialReservations);
    const [editTarget, setEditTarget] = useState<Reservation | null>(null);

    const handleCancel = (id: number) =>
        setReservations((prev) => prev.map((r) => r.id === id ? { ...r, status: "cancelled" as Status } : r));

    const handleSave = (updated: Reservation) => {
        setReservations((prev) => prev.map((r) => r.id === updated.id ? updated : r));
        setEditTarget(null);
    };

    return (
        <div className="flex flex-col min-h-screen" style={{ backgroundColor: theme.bg }}>
            <Navbar />
            <div className="w-full py-2.5 text-center text-sm font-medium text-white"
                style={{ background: "linear-gradient(90deg, #1a4731, #22863a, #1a4731)" }}>
                👋 Welcome back! Browse and reserve your preferred workspace.
            </div>

            <main className="w-full max-w-3xl mx-auto px-4 py-10">
                <div className="flex items-start justify-between mb-8">
                    <div>
                        <h1 className="font-serif text-3xl font-bold" style={{ color: theme.text }}>My Reservations</h1>
                        <p className="text-sm mt-1" style={{ color: theme.muted }}>
                            {reservations.length} booking{reservations.length !== 1 ? "s" : ""} total
                        </p>
                    </div>
                    <Link href="/#spaces"
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl border font-semibold text-sm transition-all hover:bg-green-50 active:scale-95"
                        style={{ borderColor: theme.accent, color: theme.accent }}>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        New Reservation
                    </Link>
                </div>

                <div className="space-y-4">
                    {reservations.map((r) => {
                        const s = statusStyles[r.status];
                        return (
                            <div key={r.id} className="rounded-2xl p-5 flex gap-4 items-start shadow-sm"
                                style={{ backgroundColor: theme.card, border: `1px solid ${theme.border}` }}>
                                <div className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center text-3xl" style={{ backgroundColor: theme.bg }}>
                                    {r.space.emoji}
                                </div>

                                <div className="flex-1 min-w-0">
                                    <h3 className="font-serif text-lg font-bold leading-tight" style={{ color: theme.text }}>{r.space.name}</h3>
                                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1.5 text-xs" style={{ color: theme.muted }}>
                                        <span className="flex items-center gap-1">
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            {formatDate(r.date)}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            {r.start} – {r.end}
                                        </span>
                                        <span className="flex items-center gap-1">📍 {r.space.floor}</span>
                                        <span className="flex items-center gap-1">
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                            {r.tel}
                                        </span>
                                    </div>
                                    {r.notes && <p className="text-xs mt-2 leading-relaxed line-clamp-2" style={{ color: theme.muted }}>{r.notes}</p>}
                                </div>

                                <div className="flex-shrink-0 flex flex-col items-end gap-3">
                                    <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ backgroundColor: s.bg, color: s.text }}>{s.label}</span>
                                    <div className="flex gap-2">
                                        <button onClick={() => setEditTarget(r)} disabled={r.status === "cancelled"}
                                            className="px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all hover:bg-green-50 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                                            style={{ borderColor: theme.border, color: theme.text }}>
                                            Edit
                                        </button>
                                        <button onClick={() => handleCancel(r.id)} disabled={r.status === "cancelled"}
                                            className="px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all hover:bg-red-50 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                                            style={{ borderColor: "#fca5a5", color: "#b91c1c" }}>
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {reservations.length === 0 && (
                        <div className="rounded-2xl p-12 text-center" style={{ backgroundColor: theme.card, border: `1px solid ${theme.border}` }}>
                            <p className="text-4xl mb-3">📅</p>
                            <p className="font-serif text-lg font-bold mb-1" style={{ color: theme.text }}>No reservations yet</p>
                            <p className="text-sm" style={{ color: theme.muted }}>Browse spaces and make your first booking.</p>
                        </div>
                    )}
                </div>
            </main>

            {editTarget && (
                <EditModal reservation={editTarget} onSave={handleSave} onClose={() => setEditTarget(null)} />
            )}
        </div>
    );
}
