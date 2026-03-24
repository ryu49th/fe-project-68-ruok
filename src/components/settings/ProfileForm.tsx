"use client"

import { useState } from "react";
import { useSession } from "next-auth/react";
import { formatTel } from "@/libs/formatTel";
import updateProfile from "@/libs/updateProfile";

interface Theme {
    accent: string;
    border: string;
    text: string;
    muted: string;
    card: string;
    inputBg: string;
}

function fieldStyle(error: string | null, border: string, text: string, inputBg: string) {
    return {
        borderColor: error ? "#fca5a5" : border,
        color: text,
        backgroundColor: inputBg,
    };
}

function FieldError({ msg }: { msg: string | null }) {
    if (!msg) return null;
    return <p className="mt-1 text-xs text-red-600 flex items-center gap-1">⚠ {msg}</p>;
}

export default function ProfileForm({ initialName, initialEmail, initialTel, token, theme }: {
    initialName: string;
    initialEmail: string;
    initialTel: string;
    token: string;
    theme: Theme;
}) {
    const { update } = useSession();

    const [name, setName]   = useState(initialName);
    const [email, setEmail] = useState(initialEmail);
    const [tel, setTel]     = useState(initialTel);
    const [saved, setSaved]     = useState(false);
    const [loading, setLoading] = useState(false);

    const [nameTouched, setNameTouched] = useState(false);
    const [telTouched, setTelTouched]   = useState(false);

    const nameError = nameTouched && !name.trim() ? "Name is required" : null;

    const digits = tel.replace(/\D/g, "");
    const telError = telTouched && (digits.length !== 10 || !digits.startsWith("0"))
        ? "Phone must be 10 digits starting with 0 (e.g. 081-234-5678)"
        : null;

    const hasErrors = !!nameError || !!telError;

    const inputClass = "w-full h-11 px-4 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all";

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setNameTouched(true);
        setTelTouched(true);
        if (hasErrors) return;

        setLoading(true);
        setSaved(false);
        try {
            await updateProfile(token, { name, email, tel });
            await update({ name, email, tel });
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        } catch (err: any) {
            alert(err.message ?? "Failed to update profile");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="rounded-2xl shadow-sm mb-6 overflow-hidden"
            style={{ backgroundColor: theme.card, border: `1px solid ${theme.border}` }}>
            <div className="px-6 py-4 border-b" style={{ borderColor: theme.border }}>
                <h2 className="font-serif text-lg font-bold" style={{ color: theme.text }}>Profile Information</h2>
                <p className="text-xs mt-0.5" style={{ color: theme.muted }}>Update your name, email, and phone number</p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                {/* Full Name */}
                <div>
                    <label className="block text-sm font-semibold mb-1.5" style={{ color: theme.text }}>Full Name</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none"
                            style={{ color: nameError ? "#ef4444" : theme.muted }}>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                        <input type="text" required value={name}
                            onChange={(e) => { setName(e.target.value); setNameTouched(true); }}
                            className={`${inputClass} pl-10`}
                            style={fieldStyle(nameError, theme.border, theme.text, theme.inputBg)}
                            placeholder="Your full name" />
                    </div>
                    <FieldError msg={nameError} />
                </div>

                {/* Email */}
                <div>
                    <label className="block text-sm font-semibold mb-1.5" style={{ color: theme.text }}>Email Address</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none" style={{ color: theme.muted }}>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                            className={`${inputClass} pl-10`}
                            style={fieldStyle(null, theme.border, theme.text, theme.inputBg)}
                            placeholder="your@email.com" />
                    </div>
                </div>

                {/* Phone */}
                <div>
                    <label className="block text-sm font-semibold mb-1.5" style={{ color: theme.text }}>Phone Number</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none"
                            style={{ color: telError ? "#ef4444" : theme.muted }}>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                        </div>
                        <input type="tel" value={tel}
                            onChange={(e) => setTel(formatTel(e.target.value))}
                            onBlur={() => setTelTouched(true)}
                            className={`${inputClass} pl-10`}
                            style={fieldStyle(telError, theme.border, theme.text, theme.inputBg)}
                            placeholder="0xx-xxx-xxxx" />
                    </div>
                    {telError
                        ? <FieldError msg={telError} />
                        : <p className="mt-1 text-xs" style={{ color: theme.muted }}>Format: 0xx-xxx-xxxx</p>
                    }
                </div>

                <div className="flex items-center gap-4 pt-1">
                    <button type="submit" disabled={loading}
                        className="px-6 h-10 flex items-center gap-2 rounded-xl font-semibold text-sm text-white transition-all hover:opacity-90 active:scale-95 disabled:opacity-50"
                        style={{ backgroundColor: theme.accent }}>
                        {loading
                            ? <><div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />Saving…</>
                            : "Save Changes"}
                    </button>
                    {saved && (
                        <span className="flex items-center gap-1.5 text-sm font-medium text-green-600">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Profile updated!
                        </span>
                    )}
                </div>
            </form>
        </div>
    );
}
