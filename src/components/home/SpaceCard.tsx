import Link from "next/link";

interface Space {
    emoji: string;
    name: string;
    floor: string;
    price: string;
    capacity: number;
    desc: string;
    amenities: string[];
    gradient: string;
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
                <span className="absolute bottom-3 right-3 text-xs font-bold text-white px-2.5 py-1 rounded-lg"
                    style={{ backgroundColor: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}>
                    {space.price}
                </span>
            </div>

            {/* Card body */}
            <div className="p-5 flex flex-col flex-1">
                <div className="flex items-start justify-between mb-2">
                    <h3 className="font-serif text-xl font-bold" style={{ color: theme.text }}>{space.name}</h3>
                    <span className="flex items-center gap-1 text-xs font-medium" style={{ color: theme.muted }}>
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {space.capacity}
                    </span>
                </div>

                <p className="text-xs font-medium mb-3" style={{ color: theme.muted }}>📍 {space.floor}</p>
                <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: theme.muted }}>{space.desc}</p>

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
