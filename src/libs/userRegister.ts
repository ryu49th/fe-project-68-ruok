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

    const response = await fetch("http://localhost:5000/api/v1/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: userName,
            tel: userTel,
            email: userEmail,
            password: userPassword,
            role: "user" // Default role, modify if the form needs to specify role
        }),
    });

    if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || data.message || "Failed to register");
    }

    return await response.json();
}
