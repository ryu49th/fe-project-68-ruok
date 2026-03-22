import { theme, filters, FilterType, Status } from "./types";

interface Stats {
    total: number;
    confirmed: number;
    pending: number;
    cancelled: number;
}

export default function FilterPills({ activeFilter, stats, onChange }: {
    activeFilter: FilterType;
    stats: Stats;
    onChange: (f: FilterType) => void;
}) {
    return (
        <div className="flex gap-2 mb-5 flex-wrap">
            {filters.map((f) => {
                const isActive = activeFilter === f.key;
                return (
                    <button key={f.key} onClick={() => onChange(f.key)}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all"
                        style={isActive
                            ? { backgroundColor: theme.accent, color: "#ffffff" }
                            : { backgroundColor: "#fee2e2", color: theme.muted }}>
                        {f.emoji} {f.label}
                        <span className="text-xs font-bold px-1.5 py-0.5 rounded-full"
                            style={isActive
                                ? { backgroundColor: "rgba(255,255,255,0.25)", color: "#fff" }
                                : { backgroundColor: "rgba(192,57,43,0.12)", color: theme.accent }}>
                            {f.key === "all" ? stats.total : stats[f.key as Status]}
                        </span>
                    </button>
                );
            })}
        </div>
    );
}
