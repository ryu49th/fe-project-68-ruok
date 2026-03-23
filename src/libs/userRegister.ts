export default async function userRegister(
    userName: string,
    userTel: string,
    userEmail: string,
    userPassword: string,
    confirmedPassword?: string
) {
    if (confirmedPassword && userPassword !== confirmedPassword) {
        throw new Error("Passwords do not match");
    }

    const apiUrl = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

    const response = await fetch(`${apiUrl}/api/v1/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: userName,
            tel: userTel,
            email: userEmail,
            password: userPassword,
            role: "user"
        }),
    });

    if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.msg || data.error || data.message || "Failed to register");
    }

    return await response.json();
}
