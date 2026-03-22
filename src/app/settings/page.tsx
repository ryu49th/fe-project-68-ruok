"use client"

import { useSession } from "next-auth/react";
import Navbar from "@/components/Navbar";
import AvatarCard from "@/components/settings/AvatarCard";
import ProfileForm from "@/components/settings/ProfileForm";
import PasswordForm from "@/components/settings/PasswordForm";

export default function SettingsPage() {
    const { data: session } = useSession();
    const role = (session?.user as any)?.role;
    const isAdmin = role === "admin";

    const theme = isAdmin
        ? { bg: "#fff5f5", accent: "#c0392b", border: "#f5c6c6", text: "#5a0a0a", muted: "#9b2c2c", card: "#ffffff", inputBg: "#fff5f5", banner: "linear-gradient(90deg, #5a0a0a, #c0392b, #5a0a0a)", bannerText: "🔐 Admin access — you can manage all reservations and spaces." }
        : { bg: "#f0faf4", accent: "#22863a", border: "#b7e4c7", text: "#1a4731", muted: "#3a7d54", card: "#ffffff", inputBg: "#f0faf4", banner: "linear-gradient(90deg, #1a4731, #22863a, #1a4731)", bannerText: "👋 Welcome back! Browse and reserve your preferred workspace." };

    const name  = (session?.user?.name as string) ?? "";
    const email = (session?.user?.email as string) ?? "";
    const tel   = (session?.user as any)?.tel ?? "";

    return (
        <div className="flex flex-col min-h-screen" style={{ backgroundColor: theme.bg }}>
            <Navbar />

            <div className="w-full py-2.5 text-center text-sm font-medium text-white" style={{ background: theme.banner }}>
                {theme.bannerText}
            </div>

            <main className="w-full max-w-2xl mx-auto px-4 py-10">
                <div className="mb-8">
                    <h1 className="font-serif text-3xl font-bold" style={{ color: theme.text }}>Settings</h1>
                    <p className="text-sm mt-1" style={{ color: theme.muted }}>Manage your profile and account preferences</p>
                </div>

                <AvatarCard name={name} email={email} isAdmin={isAdmin} theme={theme} />
                <ProfileForm initialName={name} initialEmail={email} initialTel={tel} theme={theme} />
                <PasswordForm theme={theme} />
            </main>
        </div>
    );
}
