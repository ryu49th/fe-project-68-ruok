import { theme, statusStyles, formatDate, AdminReservation } from "./types";

export default function ReservationsTable({ reservations, onEdit, onDelete }: {
    reservations: AdminReservation[];
    onEdit: (r: AdminReservation) => void;
    onDelete: (id: number) => void;
}) {
    return (
        <div className="rounded-2xl overflow-hidden shadow-sm" style={{ border: `1px solid ${theme.border}` }}>
            {/* Header */}
            <div className="grid text-xs font-bold uppercase tracking-wider px-5 py-3"
                style={{
                    backgroundColor: "#fee2e2", color: theme.muted,
                    gridTemplateColumns: "2.2fr 1.4fr 1.5fr 1fr 1fr",
                }}>
                <span>User</span>
                <span>Space</span>
                <span>Date</span>
                <span>Status</span>
                <span className="text-right">Actions</span>
            </div>

            {reservations.length === 0 ? (
                <div className="px-5 py-10 text-center text-sm" style={{ backgroundColor: theme.card, color: theme.muted }}>
                    No reservations found.
                </div>
            ) : (
                reservations.map((r, i) => {
                    const s = statusStyles[r.status] || statusStyles.pending;
                    return (
                        <div key={r.id}
                            className="grid items-center px-5 py-4 border-t text-sm transition-colors"
                            style={{
                                gridTemplateColumns: "2.2fr 1.4fr 1.5fr 1fr 1fr",
                                backgroundColor: i % 2 === 0 ? theme.card : "#fff8f8",
                                borderColor: theme.border,
                            }}>
                            {/* User */}
                            <div className="min-w-0">
                                <p className="font-semibold truncate" style={{ color: theme.text }}>{r.user}</p>
                                <p className="text-xs truncate" style={{ color: theme.muted }}>{r.email}</p>
                                <p className="text-xs flex items-center gap-1 mt-0.5" style={{ color: theme.muted }}>
                                    <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    {r.tel}
                                </p>
                            </div>

                            {/* Space */}
                            <div className="flex items-center gap-3 min-w-0">
                                <span className="text-xl flex-shrink-0">{r.space.emoji}</span>
                                <span className="font-serif font-bold truncate" style={{ color: theme.text }}>{r.space.name}</span>
                            </div>

                            {/* Date */}
                            <div style={{ color: theme.muted }}>
                                <p>{formatDate(r.date)}</p>
                                <p className="text-xs">{r.start} – {r.end}</p>
                            </div>

                            {/* Status */}
                            <div>
                                <span className="text-xs font-bold px-2.5 py-1 rounded-full"
                                    style={{ backgroundColor: s.bg, color: s.text }}>
                                    {s.label}
                                </span>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center justify-end gap-2">
                                <button onClick={() => onEdit(r)}
                                    className="text-xs font-semibold px-2.5 py-1.5 rounded-lg border transition-all hover:bg-red-50 active:scale-95"
                                    style={{ borderColor: theme.border, color: theme.text, backgroundColor: theme.bg }}>
                                    Edit
                                </button>
                                <button onClick={() => onDelete(r.id)}
                                    className="text-xs font-semibold px-2.5 py-1.5 rounded-lg border transition-all hover:bg-red-100 active:scale-95"
                                    style={{ borderColor: "#fca5a5", color: "#b91c1c", backgroundColor: "#fee2e2" }}>
                                    Del
                                </button>
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
}
