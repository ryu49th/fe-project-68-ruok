interface Space {
    emoji: string;
    name: string;
    floor: string;
    address: string;
    opentime?: string;
    closetime?: string;
    accentGradient?: string;
}

export default function SpaceSummaryCard({ space }: { space: Space }) {
    const gradient = space.accentGradient ?? "linear-gradient(135deg, #1a4731 0%, #22863a 100%)";
    return (
        <div className="rounded-2xl overflow-hidden mb-6 flex items-center gap-6 p-6"
            style={{ background: gradient }}>
            <div className="flex-shrink-0 w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center text-5xl">
                {space.emoji}
            </div>
            <div className="flex-1 min-w-0">
                <h2 className="font-serif text-2xl font-bold text-white mb-1">{space.name}</h2>
                <p className="text-white/70 text-sm">{space.floor}</p>
                <p className="text-white/70 text-sm">📍 {space.address}</p>
                {(space.opentime || space.closetime) && (
                    <p className="text-white/70 text-sm">🕐 {space.opentime ?? "—"} – {space.closetime ?? "—"}</p>
                )}
            </div>
        </div>
    );
}
