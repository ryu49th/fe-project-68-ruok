import Image from "next/image";

export default function AuthCardShell({ title, subtitle, children }: {
    title: string;
    subtitle: string;
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12" style={{ backgroundColor: "#f0f0ef" }}>
            {/* Mini logo nav */}
            <div className="w-full max-w-[420px] mb-6 flex items-center gap-2">
                <a href="/" className="flex items-center gap-2 group hover:opacity-80 transition-opacity">
                    <div className="w-8 h-8 rounded-full overflow-hidden ring-1 ring-zinc-300 flex-shrink-0">
                        <Image src="/logo.png" alt="CowOrk" width={32} height={32} className="object-cover w-full h-full" />
                    </div>
                    <span className="font-serif font-bold text-lg tracking-wide" style={{ color: "#2a2a2a" }}>CowOrk</span>
                </a>
            </div>

            {/* Card */}
            <div className="w-full max-w-[420px] rounded-2xl shadow-sm overflow-hidden" style={{ backgroundColor: "#ffffff", border: "1px solid #d4d4d4" }}>
                {/* Card header */}
                <div className="px-8 pt-8 pb-6 text-center border-b" style={{ borderColor: "#d4d4d4" }}>
                    <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-4 ring-2 ring-zinc-200">
                        <Image src="/logo.png" alt="CowOrk" width={64} height={64} className="object-cover w-full h-full" />
                    </div>
                    <h1 className="font-serif text-2xl font-bold text-zinc-900 mb-1">{title}</h1>
                    <p className="text-sm text-zinc-500">{subtitle}</p>
                </div>

                {/* Card body */}
                <div className="px-8 py-6">{children}</div>
            </div>
        </div>
    );
}
