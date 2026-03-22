"use client"

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import EyeIcon from "@/components/shared/EyeIcon";

export default function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/";
    const urlError = searchParams.get("error");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);
        try {
            const result = await signIn("credentials", { email, password, redirect: false, callbackUrl });
            if (result?.error) {
                setError("Invalid email or password. Please try again.");
            } else {
                router.push(callbackUrl);
                router.refresh();
            }
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {(error || urlError) && (
                <div className="mb-5 flex items-start gap-3 p-3.5 rounded-xl bg-red-50 border border-red-200">
                    <svg className="w-4 h-4 text-red-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm text-red-700 font-medium">{error || "Session expired. Please sign in again."}</p>
                </div>
            )}

            {/* Demo credentials */}
            <div className="mb-5 p-4 rounded-xl border" style={{ backgroundColor: "#f0f0ef", borderColor: "#d4d4d4" }}>
                <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Demo Credentials</p>
                <div className="space-y-1 text-sm text-zinc-600">
                    <p><span className="font-medium text-zinc-800">Member:</span> member@cowork.io / password123</p>
                    <p><span className="font-medium text-zinc-800">Admin:</span> admin@cowork.io / admin1234</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email */}
                <div>
                    <label className="block text-sm font-semibold text-zinc-700 mb-1.5" htmlFor="email">Email Address</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <input
                            id="email" type="email" required autoComplete="email"
                            value={email} onChange={(e) => setEmail(e.target.value)}
                            className="w-full h-11 pl-10 pr-4 rounded-xl border border-zinc-300 bg-white text-zinc-900 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-all"
                            placeholder="your@email.com"
                        />
                    </div>
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
                        <input
                            id="password" type={showPassword ? "text" : "password"} required autoComplete="current-password"
                            value={password} onChange={(e) => setPassword(e.target.value)}
                            className="w-full h-11 pl-10 pr-11 rounded-xl border border-zinc-300 bg-white text-zinc-900 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-all"
                            placeholder="••••••••"
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-zinc-400 hover:text-zinc-600 transition-colors">
                            <EyeIcon open={showPassword} />
                        </button>
                    </div>
                </div>

                <button type="submit" disabled={isLoading}
                    className="w-full mt-2 h-11 flex items-center justify-center gap-2 rounded-xl font-semibold text-sm text-white transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ backgroundColor: "#6b6b6b" }}>
                    {isLoading ? (
                        <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Signing in...</>
                    ) : "Sign In"}
                </button>
            </form>

            <div className="mt-6 flex flex-col items-center gap-2 text-sm text-zinc-500">
                <p>No account?{" "}<a href="/register" className="font-semibold text-zinc-800 hover:underline underline-offset-2">Create one →</a></p>
                <a href="/" className="text-zinc-400 hover:text-zinc-600 transition-colors hover:underline underline-offset-2">← Browse spaces as guest</a>
            </div>
        </>
    );
}
