interface StatCard {
    emoji: string;
    value: number;
    label: string;
    bg: string;
    border: string;
    text: string;
}

export default function StatCards({ cards }: { cards: StatCard[] }) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {cards.map((s) => (
                <div key={s.label} className="rounded-2xl p-5 flex flex-col items-center text-center shadow-sm"
                    style={{ backgroundColor: s.bg, border: `1px solid ${s.border}` }}>
                    <span className="text-3xl mb-2">{s.emoji}</span>
                    <span className="font-serif text-4xl font-bold leading-none" style={{ color: s.text }}>{s.value}</span>
                    <span className="text-xs font-bold tracking-widest uppercase mt-2" style={{ color: s.text, opacity: 0.7 }}>{s.label}</span>
                </div>
            ))}
        </div>
    );
}
