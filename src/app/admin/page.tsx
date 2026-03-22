"use client"

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { theme, AdminReservation, FilterType } from "@/components/admin/types";
import AdminEditModal from "@/components/admin/AdminEditModal";
import StatCards from "@/components/admin/StatCards";
import FilterPills from "@/components/admin/FilterPills";
import ReservationsTable from "@/components/admin/ReservationsTable";

const initialReservations: AdminReservation[] = [
    { id: 1, user: "Alice Chen",   email: "alice@example.com",  tel: "081-234-5678", space: { emoji: "🏙️", name: "The Loft"   }, date: "2026-03-25", start: "09:00", end: "17:00", status: "confirmed" },
    { id: 2, user: "Bob Tanaka",   email: "bob@example.com",    tel: "092-345-6789", space: { emoji: "🔒", name: "The Bunker" }, date: "2026-03-28", start: "10:00", end: "14:00", status: "pending"   },
    { id: 3, user: "Carol Singh",  email: "carol@example.com",  tel: "065-456-7890", space: { emoji: "🌿", name: "The Garden" }, date: "2026-04-02", start: "13:00", end: "18:00", status: "cancelled" },
    { id: 4, user: "David Müller", email: "david@example.com",  tel: "081-567-8901", space: { emoji: "🏙️", name: "The Loft"   }, date: "2026-04-05", start: "08:00", end: "12:00", status: "confirmed" },
    { id: 5, user: "Emma Lawson",  email: "emma@example.com",   tel: "098-678-9012", space: { emoji: "🌿", name: "The Garden" }, date: "2026-04-08", start: "14:00", end: "19:00", status: "pending"   },
    { id: 6, user: "Frank Reyes",  email: "frank@example.com",  tel: "062-789-0123", space: { emoji: "🔒", name: "The Bunker" }, date: "2026-04-10", start: "09:00", end: "13:00", status: "confirmed" },
];

export default function AdminPage() {
    const [reservations, setReservations] = useState<AdminReservation[]>(initialReservations);
    const [activeFilter, setActiveFilter] = useState<FilterType>("all");
    const [editTarget, setEditTarget] = useState<AdminReservation | null>(null);

    const stats = {
        total:     reservations.length,
        confirmed: reservations.filter((r) => r.status === "confirmed").length,
        pending:   reservations.filter((r) => r.status === "pending").length,
        cancelled: reservations.filter((r) => r.status === "cancelled").length,
    };

    const filtered = activeFilter === "all"
        ? reservations
        : reservations.filter((r) => r.status === activeFilter);

    const handleDelete = (id: number) =>
        setReservations((prev) => prev.filter((r) => r.id !== id));

    const handleSave = (updated: AdminReservation) => {
        setReservations((prev) => prev.map((r) => r.id === updated.id ? updated : r));
        setEditTarget(null);
    };

    const statCards = [
        { emoji: "📊", value: stats.total,     label: "TOTAL",     bg: "#fff5f5", border: "#f5c6c6", text: theme.text },
        { emoji: "✅", value: stats.confirmed,  label: "CONFIRMED", bg: "#d1fae5", border: "#6ee7b7", text: "#065f46" },
        { emoji: "⏳", value: stats.pending,    label: "PENDING",   bg: "#fef9c3", border: "#fde68a", text: "#713f12" },
        { emoji: "❌", value: stats.cancelled,  label: "CANCELLED", bg: "#fee2e2", border: "#fca5a5", text: "#7f1d1d" },
    ];

    return (
        <div className="flex flex-col min-h-screen" style={{ backgroundColor: theme.bg }}>
            <Navbar />
            <div className="w-full py-2.5 text-center text-sm font-medium text-white"
                style={{ background: "linear-gradient(90deg, #5a0a0a, #c0392b, #5a0a0a)" }}>
                🔐 Admin access — you can manage all reservations and spaces.
            </div>

            <main className="w-full max-w-6xl mx-auto px-4 py-10">
                <div className="mb-8">
                    <h1 className="font-serif text-3xl font-bold" style={{ color: theme.text }}>Admin Panel</h1>
                    <p className="text-sm mt-1" style={{ color: theme.muted }}>Manage all reservations across all members</p>
                </div>

                <StatCards cards={statCards} />
                <FilterPills activeFilter={activeFilter} stats={stats} onChange={setActiveFilter} />
                <ReservationsTable reservations={filtered} onEdit={setEditTarget} onDelete={handleDelete} />
            </main>

            {editTarget && (
                <AdminEditModal reservation={editTarget} onSave={handleSave} onClose={() => setEditTarget(null)} />
            )}
        </div>
    );
}
