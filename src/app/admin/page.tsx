"use client"

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Navbar from "@/components/Navbar";
import { theme, AdminReservation, FilterType } from "@/components/admin/types";
import AdminEditModal from "@/components/admin/AdminEditModal";
import StatCards from "@/components/admin/StatCards";
import FilterPills from "@/components/admin/FilterPills";
import ReservationsTable from "@/components/admin/ReservationsTable";
import getReservations, { ReservationFromAPI } from "@/libs/getReservations";
import updateReservation from "@/libs/updateReservation";
import deleteReservation from "@/libs/deleteReservation";

function mapAPIToAdminReservation(r: ReservationFromAPI): AdminReservation {
    return {
        id: r._id as any,
        user: r.user?.name ?? "Unknown",
        email: r.user?.email ?? "",
        tel: r.user?.tel ?? "",
        space: {
            emoji: "🏢",
            name: r.workingspace?.name ?? "Unknown Space",
        },
        workingspaceId: r.workingspace?._id ?? "",
        date: r.date?.split("T")[0] ?? "",
        start: r.startTime ?? "",
        end: r.endTime ?? "",
        status: r.status,
    };
}

export default function AdminPage() {
    const { data: session } = useSession();
    const token = (session?.user as any)?.token as string | undefined;

    const [reservations, setReservations] = useState<AdminReservation[]>([]);
    const [activeFilter, setActiveFilter] = useState<FilterType>("all");
    const [editTarget, setEditTarget] = useState<AdminReservation | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!token) return;
        getReservations(token)
            .then((data) => setReservations(data.map(mapAPIToAdminReservation)))
            .catch((e) => setError(e.message))
            .finally(() => setLoading(false));
    }, [token]);

    const stats = {
        total:     reservations.length,
        confirmed: reservations.filter((r) => r.status === "confirmed").length,
        pending:   reservations.filter((r) => r.status === "pending").length,
        cancelled: reservations.filter((r) => r.status === "cancelled").length,
    };

    const filtered = activeFilter === "all"
        ? reservations
        : reservations.filter((r) => r.status === activeFilter);

    const handleDelete = async (id: number) => {
        if (!token) return;
        try {
            await deleteReservation(token, String(id));
            setReservations((prev) => prev.filter((r) => r.id !== id));
        } catch (e: any) {
            alert(e.message);
        }
    };

    const handleSave = async (updated: AdminReservation) => {
        if (!token) return;
        try {
            await updateReservation(token, String(updated.id), {
                date: updated.date,
                startTime: updated.start,
                endTime: updated.end,
                status: updated.status,
                workingspace: updated.workingspaceId,
            });
            setReservations((prev) => prev.map((r) => r.id === updated.id ? updated : r));
            setEditTarget(null);
        } catch (e: any) {
            alert(e.message);
        }
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
                    <p className="text-sm mt-1" style={{ color: theme.muted }}>
                        {loading ? "Loading reservations…" : "Manage all reservations across all members"}
                    </p>
                </div>

                {error && (
                    <div className="rounded-2xl p-4 mb-6 bg-red-50 border border-red-200 text-red-700 text-sm">
                        ❌ {error}
                    </div>
                )}

                {loading ? (
                    <div className="text-center py-20" style={{ color: theme.muted }}>
                        <div className="w-8 h-8 border-2 border-red-200 border-t-red-500 rounded-full animate-spin mx-auto mb-3" />
                        Loading all reservations…
                    </div>
                ) : (
                    <>
                        <StatCards cards={statCards} />
                        <FilterPills activeFilter={activeFilter} stats={stats} onChange={setActiveFilter} />
                        <ReservationsTable reservations={filtered} onEdit={setEditTarget} onDelete={handleDelete} />
                    </>
                )}
            </main>

            {editTarget && (
                <AdminEditModal reservation={editTarget} onSave={handleSave} onClose={() => setEditTarget(null)} />
            )}
        </div>
    );
}
