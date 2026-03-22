"use client"

import { useState } from "react";
import EyeIcon from "@/components/shared/EyeIcon";

interface Theme {
    accent: string;
    border: string;
    text: string;
    muted: string;
    card: string;
    inputBg: string;
}

export default function PasswordForm({ theme }: { theme: Theme }) {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword]         = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showCurrent, setShowCurrent]         = useState(false);
    const [showNew, setShowNew]                 = useState(false);
    const [showConfirm, setShowConfirm]         = useState(false);
    const [saved, setSaved]     = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError]     = useState("");

    const passwordMismatch = confirmPassword.length > 0 && newPassword !== confirmPassword;

    const inputClass = "w-full h-11 px-4 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all";
    const inputStyle = { borderColor: theme.border, color: theme.text, backgroundColor: theme.inputBg };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        if (newPassword !== confirmPassword) { setError("New passwords do not match."); return; }
        if (newPassword.length < 6) { setError("Password must be at least 6 characters."); return; }
        setLoading(true);
        setSaved(false);
        await new Promise((r) => setTimeout(r, 800));
        setLoading(false);
        setSaved(true);
        setCurrentPassword(""); setNewPassword(""); setConfirmPassword("");
        setTimeout(() => setSaved(false), 3000);
    };

    return (
        <div className="rounded-2xl shadow-sm overflow-hidden"
            style={{ backgroundColor: theme.card, border: `1px solid ${theme.border}` }}>
            <div className="px-6 py-4 border-b" style={{ borderColor: theme.border }}>
                <h2 className="font-serif text-lg font-bold" style={{ color: theme.text }}>Change Password</h2>
                <p className="text-xs mt-0.5" style={{ color: theme.muted }}>Choose a strong password (min. 6 characters)</p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                {error && (
                    <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-red-50 border border-red-200">
                        <svg className="w-4 h-4 text-red-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-sm text-red-700 font-medium">{error}</p>
                    </div>
                )}

                {/* Current password */}
                <div>
                    <label className="block text-sm font-semibold mb-1.5" style={{ color: theme.text }}>Current Password</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none" style={{ color: theme.muted }}>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <input type={showCurrent ? "text" : "password"} required value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className={`${inputClass} pl-10 pr-11`} style={inputStyle} placeholder="••••••••" />
                        <button type="button" onClick={() => setShowCurrent(!showCurrent)}
                            className="absolute inset-y-0 right-0 pr-3.5 flex items-center transition-colors" style={{ color: theme.muted }}>
                            <EyeIcon open={showCurrent} />
                        </button>
                    </div>
                </div>

                {/* New + confirm in 2 cols */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-semibold mb-1.5" style={{ color: theme.text }}>New Password</label>
                        <div className="relative">
                            <input type={showNew ? "text" : "password"} required value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className={`${inputClass} pr-11`} style={inputStyle} placeholder="••••••••" />
                            <button type="button" onClick={() => setShowNew(!showNew)}
                                className="absolute inset-y-0 right-0 pr-3.5 flex items-center transition-colors" style={{ color: theme.muted }}>
                                <EyeIcon open={showNew} />
                            </button>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1.5" style={{ color: theme.text }}>Confirm New</label>
                        <div className="relative">
                            <input type={showConfirm ? "text" : "password"} required value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className={`${inputClass} pr-11`}
                                style={{
                                    ...inputStyle,
                                    borderColor: passwordMismatch ? "#f87171"
                                        : confirmPassword && !passwordMismatch ? "#4ade80"
                                        : theme.border,
                                }}
                                placeholder="••••••••" />
                            <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                                className="absolute inset-y-0 right-0 pr-3.5 flex items-center transition-colors" style={{ color: theme.muted }}>
                                <EyeIcon open={showConfirm} />
                            </button>
                        </div>
                        {passwordMismatch && <p className="mt-1 text-xs text-red-500">Passwords don&apos;t match</p>}
                        {confirmPassword && !passwordMismatch && <p className="mt-1 text-xs text-green-600">Passwords match ✓</p>}
                    </div>
                </div>

                <div className="flex items-center gap-4 pt-1">
                    <button type="submit" disabled={loading || passwordMismatch}
                        className="px-6 h-10 flex items-center gap-2 rounded-xl font-semibold text-sm text-white transition-all hover:opacity-90 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{ backgroundColor: theme.accent }}>
                        {loading
                            ? <><div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />Saving…</>
                            : "Update Password"}
                    </button>
                    {saved && (
                        <span className="flex items-center gap-1.5 text-sm font-medium text-green-600">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Password updated!
                        </span>
                    )}
                </div>
            </form>
        </div>
    );
}
