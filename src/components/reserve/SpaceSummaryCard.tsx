interface Space {
    emoji: string;
    name: string;
    floor: string;
    address: string;
    capacity: number;
}

export default function SpaceSummaryCard({ space, gradient }: { space: Space; gradient?: string }) {
    return (
        <div className="rounded-2xl overflow-hidden mb-6 flex items-center gap-6 p-6"
            style={{ background: gradient ?? "linear-gradient(135deg, #1a4731 0%, #22863a 100%)" }}>
            <div className="flex-shrink-0 w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center text-5xl">
                {space.emoji}
            </div>
            <div className="flex-1 min-w-0">
                <h2 className="font-serif text-2xl font-bold text-white mb-1">{space.name}</h2>
                {space.floor && (
                    <p className="text-white/70 text-sm mb-0.5">📍 {space.floor}</p>
                )}
                {space.address && (
                    <p className="text-white/60 text-xs mb-3 leading-relaxed">{space.address}</p>
                )}
            </div>
        </div>
    );
}
