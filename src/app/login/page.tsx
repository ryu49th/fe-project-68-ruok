"use client"

import { Suspense } from "react";
import AuthCardShell from "@/components/auth/AuthCardShell";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
    return (
        <AuthCardShell title="Welcome Back" subtitle="Sign in to access your co-working spaces">
            <Suspense fallback={<div className="py-8 text-center text-zinc-400 text-sm">Loading...</div>}>
                <LoginForm />
            </Suspense>
        </AuthCardShell>
    );
}
