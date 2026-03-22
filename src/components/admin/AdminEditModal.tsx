"use client"

import { useState } from "react";
import { theme, statusStyles, inputClass, inputStyle, formatTel, AdminReservation, Status } from "./types";

const statusOpts: { value: Status; label: string }[] = [
    { value: "confirmed", label: "Confirmed" },
    { value: "pending",   label: "Pending"   },
    { value: "cancelled", label: "Cancelled" },
];

export default function AdminEditModal({ reservation, onSave, onClose }: {
    reservation: AdminReservation;
    onSave: (updated: AdminReservation) => void;
    onClose: () => void;
}) {
    const [user, setUser]     = useState(reservation.user);
    const [email, setEmail]   = useState(reservation.email);
    const [tel, setTel]       = useState(reservation.tel);
    const [date, setDate]     = useState(reservation.date);
    const [start, setStart]   = useState(reservation.start);
    const [end, setEnd]       = useState(reservation.end);
    const [status, setStatus] = useState<Status>(reservation.status);
    const [isLoading, setIsLoading] = useState(false);

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        await new Promise((r) => setTimeout(r, 700));
        onSave({ ...reservation, user, email, tel, date, start, end, status });
        setIsLoading(false);
    };

    const ss = statusStyles[status];

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(5px)" }}
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
            <div className="w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden"
                style={{ backgroundColor: theme.card, border: `1px solid ${theme.border}` }}>

                {/* Header */}
                <div
                    className="px-6 py-5 flex items-center justify-between"
                    style={{ background: "linear-gradient(135deg, #5a0a0a 0%, #c0392b 100%)" }}
                >
                    <div>
                        <h2 className="font-serif text-xl font-bold text-white">Edit Reservation</h2>
                        <p className="text-sm text-white/70 mt-0.5">{reservation.space.emoji} {reservation.space.name} · #{reservation.id}</p>
                    </div>
                    <button onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSave} className="p-6 space-y-4">
                    {/* Member Info */}
                    <div>
                        <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: theme.muted }}>Member Info</p>
                        <div className="grid grid-cols-1 gap-3">
                            <div>
                                <label className="block text-xs font-semibold mb-1" style={{ color: theme.text }}>Full Name</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" style={{ color: theme.muted }}>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <input type="text" required value={user} onChange={(e) => setUser(e.target.value)}
                                        className={`${inputClass} pl-9`} style={inputStyle} placeholder="Full name" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-semibold mb-1" style={{ color: theme.text }}>Email</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" style={{ color: theme.muted }}>
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                                            className={`${inputClass} pl-9`} style={inputStyle} placeholder="email@example.com" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold mb-1" style={{ color: theme.text }}>Phone</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" style={{ color: theme.muted }}>
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                        </div>
                                        <input type="tel" required value={tel} onChange={(e) => setTel(formatTel(e.target.value))}
                                            className={`${inputClass} pl-9`} style={inputStyle} placeholder="0xx-xxx-xxxx" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{ borderTop: `1px solid ${theme.border}` }} />

                    {/* Booking Details */}
                    <div>
                        <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: theme.muted }}>Booking Details</p>
                        <div className="space-y-3">
                            <div>
                                <label className="block text-xs font-semibold mb-1" style={{ color: theme.text }}>Date</label>
                                <input type="date" required value={date} onChange={(e) => setDate(e.target.value)}
                                    className={inputClass} style={inputStyle} />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-semibold mb-1" style={{ color: theme.text }}>Start Time</label>
                                    <input type="time" required value={start} onChange={(e) => setStart(e.target.value)}
                                        className={inputClass} style={inputStyle} />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold mb-1" style={{ color: theme.text }}>End Time</label>
                                    <input type="time" required value={end} onChange={(e) => setEnd(e.target.value)}
                                        className={inputClass} style={inputStyle} />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold mb-1" style={{ color: theme.text }}>Status</label>
                                <div className="flex gap-2">
                                    {statusOpts.map((opt) => {
                                        const s = statusStyles[opt.value];
                                        const isActive = status === opt.value;
                                        return (
                                            <button key={opt.value} type="button"
                                                onClick={() => setStatus(opt.value)}
                                                className="flex-1 py-2 rounded-xl text-xs font-bold transition-all border"
                                                style={isActive
                                                    ? { backgroundColor: s.bg, color: s.text, borderColor: s.text }
                                                    : { backgroundColor: theme.bg, color: theme.muted, borderColor: theme.border }
                                                }>
                                                {opt.label}
                                            </button>
                                        );
                                    })}
                                </div>
                                <div className="mt-2 flex items-center gap-2 px-3 py-2 rounded-xl" style={{ backgroundColor: ss.bg }}>
                                    <span className="text-xs font-bold" style={{ color: ss.text }}>
                                        Status will be set to: {ss.label}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-1">
                        <button type="submit" disabled={isLoading}
                            className="flex-1 h-11 flex items-center justify-center gap-2 rounded-xl font-semibold text-sm text-white transition-all hover:opacity-90 active:scale-95 disabled:opacity-50"
                            style={{ backgroundColor: theme.accent }}>
                            {isLoading
                                ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                : "Save Changes"}
                        </button>
                        <button type="button" onClick={onClose}
                            className="flex-1 h-11 rounded-xl font-semibold text-sm transition-all hover:bg-red-50 active:scale-95 border"
                            style={{ borderColor: theme.border, color: theme.text }}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
