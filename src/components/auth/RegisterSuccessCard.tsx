export default function RegisterSuccessCard() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center px-4" style={{ backgroundColor: "#f0f0ef" }}>
            <div className="w-full max-w-[420px] rounded-2xl shadow-sm p-10 text-center"
                style={{ backgroundColor: "#ffffff", border: "1px solid #d4d4d4" }}>
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 bg-green-100">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h2 className="font-serif text-2xl font-bold text-zinc-900 mb-2">Account Created!</h2>
                <p className="text-sm text-zinc-500 mb-8">Welcome to CowOrk. Sign in to start booking your workspace.</p>
                <a href="/login"
                    className="flex w-full items-center justify-center gap-2 h-11 rounded-xl font-semibold text-sm text-white transition-all active:scale-95"
                    style={{ backgroundColor: "#6b6b6b" }}>
                    Continue to Sign In →
                </a>
            </div>
        </div>
    );
}
