interface Space {
    emoji: string;
    name: string;
    floor: string;
    price: string;
    capacity: number;
}

export default function SpaceSummaryCard({ space }: { space: Space }) {
    return (
        <div className="rounded-2xl overflow-hidden mb-6 flex items-center gap-6 p-6"
            style={{ background: "linear-gradient(135deg, #1a4731 0%, #22863a 100%)" }}>
            <div className="flex-shrink-0 w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center text-5xl">
                {space.emoji}
            </div>
            <div className="flex-1 min-w-0">
                <h2 className="font-serif text-2xl font-bold text-white mb-1">{space.name}</h2>
                <p className="text-white/70 text-sm mb-3">📍 {space.floor}</p>
                <div className="flex gap-4">
                    <span className="flex items-center gap-1.5 text-sm font-semibold text-white">
                        <svg className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {space.price}
                    </span>
                    <span className="flex items-center gap-1.5 text-sm font-semibold text-white">
                        <svg className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Up to {space.capacity} people
                    </span>
                </div>
            </div>
        </div>
    );
}
