import Link from "next/link";

interface Space {
    emoji: string;
    name: string;
    floor: string;
    address: string;
    price: string;
    capacity: number;
    desc: string;
    amenities: string[];
    gradient: string;
    opentime?: string;
    closetime?: string;
}

interface Theme {
    card: string;
    border: string;
    text: string;
    muted: string;
    accent: string;
}

export default function SpaceCard({ space, theme, isLoggedIn }: {
    space: Space;
    theme: Theme;
    isLoggedIn: boolean;
}) {
    return (
        <div className="rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
            style={{ backgroundColor: theme.card, border: `1px solid ${theme.border}` }}>

            {/* Image area */}
            <div className={`relative h-36 bg-gradient-to-br ${space.gradient} flex items-center justify-center`}>
                <span className="text-6xl">{space.emoji}</span>
            </div>

            {/* Card body */}
            <div className="p-5 flex flex-col flex-1">
                <div className="flex items-start justify-between mb-2">
                    <h3 className="font-serif text-xl font-bold" style={{ color: theme.text }}>{space.name}</h3>
                </div>

                <p className="text-xs font-medium mb-1" style={{ color: theme.muted }}>📍 {space.address}</p>
                {(space.opentime || space.closetime) && (
                    <p className="text-xs font-medium mb-3" style={{ color: theme.muted }}>
                        🕐 {space.opentime ?? "—"} – {space.closetime ?? "—"}
                    </p>
                )}
                <div className="flex-1" />

                <div className="flex flex-wrap gap-1.5 mb-5">
                    {space.amenities.map((a) => (
                        <span key={a} className="text-xs px-2.5 py-1 rounded-full font-medium"
                            style={{ backgroundColor: theme.border, color: theme.text }}>
                            {a}
                        </span>
                    ))}
                </div>

                <Link href={isLoggedIn ? `/reserve/${space.name.toLowerCase().replace(/\s+/g, "-")}` : "/login"}
                    className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-95"
                    style={{ backgroundColor: theme.accent }}>
                    Reserve This Space
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                </Link>
            </div>
        </div>
    );
}
