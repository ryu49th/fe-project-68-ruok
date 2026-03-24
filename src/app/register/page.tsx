"use client"

import { useState } from "react";
import Link from "next/link";
import userRegister from "@/libs/userRegister";
import { formatTel } from "@/libs/formatTel";
import AuthCardShell from "@/components/auth/AuthCardShell";
import EyeIcon from "@/components/shared/EyeIcon";
import PasswordStrength from "@/components/auth/PasswordStrength";
import RegisterSuccessCard from "@/components/auth/RegisterSuccessCard";

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [tel, setTel] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const passwordMismatch = confirmedPassword.length > 0 && password !== confirmedPassword;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (passwordMismatch) return;

        // Validate tel format: 0xx-xxx-xxxx (exactly 10 digits + 2 dashes = 12 chars)
        const telRegex = /^0[0-9]{2}-[0-9]{3}-[0-9]{4}$/;
        if (!telRegex.test(tel)) {
            setError("Phone number must be in format 0xx-xxx-xxxx (e.g. 086-123-4567)");
            return;
        }

        setError("");
        try {
            setIsLoading(true);
            await userRegister(name, tel, email, password, confirmedPassword);
            setSuccess(true);
        } catch (err: any) {
            setError(err.message || "Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    if (success) return <RegisterSuccessCard />;

    return (
        <AuthCardShell title="Create Account" subtitle="Join CowOrk and book your workspace">
            {error && (
                <div className="mb-5 flex items-start gap-3 p-3.5 rounded-xl bg-red-50 border border-red-200">
                    <svg className="w-4 h-4 text-red-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm text-red-700 font-medium">{error}</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name */}
                <div>
                    <label className="block text-sm font-semibold text-zinc-700 mb-1.5" htmlFor="name">Full Name</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                        <input id="name" type="text" required value={name} onChange={(e) => setName(e.target.value)}
                            className="w-full h-11 pl-10 pr-4 rounded-xl border border-zinc-300 bg-white text-zinc-900 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-all"
                            placeholder="John Doe" />
                    </div>
                </div>

                {/* Email */}
                <div>
                    <label className="block text-sm font-semibold text-zinc-700 mb-1.5" htmlFor="email">Email Address</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                            className="w-full h-11 pl-10 pr-4 rounded-xl border border-zinc-300 bg-white text-zinc-900 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-all"
                            placeholder="your@email.com" />
                    </div>
                </div>

                {/* Phone */}
                <div>
                    <label className="block text-sm font-semibold text-zinc-700 mb-1.5" htmlFor="tel">Phone Number</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                        </div>
                        <input id="tel" type="tel" required value={tel} onChange={(e) => setTel(formatTel(e.target.value))}
                            className="w-full h-11 pl-10 pr-4 rounded-xl border border-zinc-300 bg-white text-zinc-900 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-all"
                            placeholder="0xx-xxx-xxxx" />
                    </div>
                    <p className="mt-1 text-xs text-zinc-400">Format: 0xx-xxx-xxxx</p>
                </div>

                {/* Password */}
                <div>
                    <label className="block text-sm font-semibold text-zinc-700 mb-1.5" htmlFor="password">Password</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <input id="password" type={showPassword ? "text" : "password"} required value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full h-11 pl-10 pr-11 rounded-xl border border-zinc-300 bg-white text-zinc-900 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-all"
                            placeholder="Min. 6 characters" />
                        <button type="button" onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-zinc-400 hover:text-zinc-600 transition-colors">
                            <EyeIcon open={showPassword} />
                        </button>
                    </div>
                    <PasswordStrength password={password} />
                </div>

                {/* Confirm Password */}
                <div>
                    <label className="block text-sm font-semibold text-zinc-700 mb-1.5" htmlFor="confirmedPassword">Confirm Password</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                        <input id="confirmedPassword" type={showConfirm ? "text" : "password"} required
                            value={confirmedPassword} onChange={(e) => setConfirmedPassword(e.target.value)}
                            className={`w-full h-11 pl-10 pr-11 rounded-xl border text-zinc-900 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all bg-white ${
                                passwordMismatch ? "border-red-400 focus:ring-red-400"
                                    : confirmedPassword && !passwordMismatch ? "border-green-400 focus:ring-green-500"
                                    : "border-zinc-300 focus:ring-zinc-900"
                            }`}
                            placeholder="Re-enter your password" />
                        <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-zinc-400 hover:text-zinc-600 transition-colors">
                            <EyeIcon open={showConfirm} />
                        </button>
                    </div>
                    {passwordMismatch && (
                        <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            Passwords do not match
                        </p>
                    )}
                    {confirmedPassword && !passwordMismatch && (
                        <p className="mt-1.5 text-xs text-green-600 flex items-center gap-1">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Passwords match
                        </p>
                    )}
                </div>

                <button type="submit" disabled={isLoading || passwordMismatch}
                    className="w-full mt-2 h-11 flex items-center justify-center gap-2 rounded-xl font-semibold text-sm text-white transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ backgroundColor: "#6b6b6b" }}>
                    {isLoading ? (
                        <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Creating account...</>
                    ) : "Create Account"}
                </button>
            </form>

            <div className="mt-6 text-center text-sm text-zinc-500">
                Already a member?{" "}
                <Link href="/login" className="font-semibold text-zinc-800 hover:underline underline-offset-2">Sign in →</Link>
            </div>
        </AuthCardShell>
    );
}
