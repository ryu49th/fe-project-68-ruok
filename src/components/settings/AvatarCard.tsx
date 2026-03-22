interface Theme {
    card: string;
    border: string;
    accent: string;
    text: string;
    muted: string;
}

export default function AvatarCard({ name, email, isAdmin, theme }: {
    name: string;
    email: string;
    isAdmin: boolean;
    theme: Theme;
}) {
    const initials = (name || "U").slice(0, 2).toUpperCase();

    return (
        <div className="rounded-2xl p-6 mb-6 flex items-center gap-5 shadow-sm"
            style={{ backgroundColor: theme.card, border: `1px solid ${theme.border}` }}>
            <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white flex-shrink-0"
                style={{ backgroundColor: theme.accent }}>
                {initials}
            </div>
            <div>
                <p className="font-serif text-xl font-bold" style={{ color: theme.text }}>{name || "Your Name"}</p>
                <p className="text-sm mt-0.5" style={{ color: theme.muted }}>{email}</p>
                <span className="inline-block mt-2 text-xs font-bold px-2.5 py-0.5 rounded-full tracking-widest"
                    style={{ backgroundColor: theme.border, color: theme.text }}>
                    {isAdmin ? "ADMIN" : "MEMBER"}
                </span>
            </div>
        </div>
    );
}
