"use client"

import { useState } from "react";
import { formatTel } from "@/libs/formatTel";

const theme = {
    bg: "#f0faf4", accent: "#22863a",
    card: "#ffffff", border: "#b7e4c7", text: "#1a4731", muted: "#3a7d54",
};

const inputClass = "w-full h-11 px-4 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all";
const inputStyle = { borderColor: "#b7e4c7", color: "#1a4731", backgroundColor: "#f0faf4" };

export interface Reservation {
    id: number;
    space: { emoji: string; name: string; floor: string };
    date: string;
    start: string;
    end: string;
    tel: string;
    notes: string;
    status: "confirmed" | "pending" | "cancelled";
}

export default function EditModal({ reservation, onSave, onClose }: {
    reservation: Reservation;
    onSave: (updated: Reservation) => void;
    onClose: () => void;
}) {
    const [date, setDate]   = useState(reservation.date);
    const [start, setStart] = useState(reservation.start);
    const [end, setEnd]     = useState(reservation.end);
    const [tel, setTel]     = useState(reservation.tel);
    const [notes, setNotes] = useState(reservation.notes);
    const [isLoading, setIsLoading] = useState(false);

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        await new Promise((r) => setTimeout(r, 700));
        onSave({ ...reservation, date, start, end, tel, notes });
        setIsLoading(false);
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
            <div className="w-full max-w-md rounded-2xl shadow-2xl overflow-hidden"
                style={{ backgroundColor: theme.card, border: `1px solid ${theme.border}` }}>

                {/* Header */}
                <div className="px-6 py-5 flex items-center justify-between border-b" style={{ borderColor: theme.border }}>
                    <div>
                        <h2 className="font-serif text-xl font-bold" style={{ color: theme.text }}>Edit Reservation</h2>
                        <p className="text-sm mt-0.5" style={{ color: theme.muted }}>{reservation.space.emoji} {reservation.space.name}</p>
                    </div>
                    <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-green-50 transition-colors" style={{ color: theme.muted }}>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSave} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-semibold mb-1.5" style={{ color: theme.text }}>Date</label>
                        <input type="date" required value={date} onChange={(e) => setDate(e.target.value)} className={inputClass} style={inputStyle} />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-sm font-semibold mb-1.5" style={{ color: theme.text }}>Start Time</label>
                            <input type="time" required value={start} onChange={(e) => setStart(e.target.value)} className={inputClass} style={inputStyle} />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-1.5" style={{ color: theme.text }}>End Time</label>
                            <input type="time" required value={end} onChange={(e) => setEnd(e.target.value)} className={inputClass} style={inputStyle} />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-1.5" style={{ color: theme.text }}>Contact Phone</label>
                        <input type="tel" required value={tel} onChange={(e) => setTel(formatTel(e.target.value))}
                            className={inputClass} style={inputStyle} placeholder="0xx-xxx-xxxx" />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-1.5" style={{ color: theme.text }}>Notes</label>
                        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={2}
                            className="w-full px-4 py-3 rounded-xl border text-sm resize-none focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                            style={inputStyle} placeholder="Add any notes…" />
                    </div>

                    <div className="flex gap-3 pt-1">
                        <button type="submit" disabled={isLoading}
                            className="flex-1 h-11 flex items-center justify-center gap-2 rounded-xl font-semibold text-sm text-white transition-all hover:opacity-90 active:scale-95 disabled:opacity-50"
                            style={{ backgroundColor: theme.accent }}>
                            {isLoading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : "Save Changes"}
                        </button>
                        <button type="button" onClick={onClose}
                            className="flex-1 h-11 rounded-xl font-semibold text-sm transition-all hover:bg-green-50 active:scale-95 border"
                            style={{ borderColor: theme.border, color: theme.text }}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
