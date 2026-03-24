export const theme = {
    bg: "#fff5f5", accent: "#c0392b", nav: "#5a0a0a",
    card: "#ffffff", border: "#f5c6c6", text: "#5a0a0a", muted: "#9b2c2c",
};

export type Status = "confirmed" | "pending" | "cancelled";
export type FilterType = "all" | Status;

export interface AdminReservation {
    id: number;
    user: string;
    email: string;
    tel: string;
    space: { emoji: string; name: string };
    workingspaceId: string;
    date: string;
    start: string;
    end: string;
    status: Status;
}

export const statusStyles: Record<Status, { bg: string; text: string; label: string }> = {
    confirmed: { bg: "#d1fae5", text: "#065f46", label: "Confirmed" },
    pending:   { bg: "#fef9c3", text: "#713f12", label: "Pending"   },
    cancelled: { bg: "#fee2e2", text: "#7f1d1d", label: "Cancelled" },
};

export const filters: { key: FilterType; label: string; emoji: string }[] = [
    { key: "all",       label: "All",       emoji: "📊" },
    { key: "confirmed", label: "Confirmed", emoji: "✅" },
    { key: "pending",   label: "Pending",   emoji: "⏳" },
    { key: "cancelled", label: "Cancelled", emoji: "❌" },
];

export const inputClass = "w-full h-10 px-3.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all";
export const inputStyle = { borderColor: "#f5c6c6", color: "#5a0a0a", backgroundColor: "#fff5f5" };

export { formatTel } from "@/libs/formatTel";

export function formatDate(d: string) {
    return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}
