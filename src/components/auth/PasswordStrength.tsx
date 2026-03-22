export default function PasswordStrength({ password }: { password: string }) {
    const score = [
        password.length >= 6,
        /[A-Z]/.test(password),
        /[0-9]/.test(password),
        /[^A-Za-z0-9]/.test(password),
    ].filter(Boolean).length;

    if (!password) return null;
    const labels = ["", "Weak", "Fair", "Good", "Strong"];
    const colors = ["", "#ef4444", "#f59e0b", "#3b82f6", "#22c55e"];

    return (
        <div className="mt-2">
            <div className="flex gap-1 mb-1">
                {[1, 2, 3, 4].map((i) => (
                    <div
                        key={i}
                        className="h-1 flex-1 rounded-full transition-all duration-300"
                        style={{ backgroundColor: i <= score ? colors[score] : "#e5e7eb" }}
                    />
                ))}
            </div>
            <p className="text-xs font-medium" style={{ color: colors[score] }}>{labels[score]}</p>
        </div>
    );
}
