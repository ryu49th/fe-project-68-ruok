export default async function userLogIn(userEmail: string, userPassword: string) {
    const apiUrl = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_API_URL

    if (!apiUrl) {
        throw new Error("Backend URL not configured")
    }

    const loginController = new AbortController();
    const loginTimeout = setTimeout(() => loginController.abort(), 40000);

    let response: Response;
    try {
        response = await fetch(`${apiUrl}/api/v1/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: userEmail, password: userPassword }),
            signal: loginController.signal,
        });
    } catch (e: any) {
        if (e?.name === "AbortError") throw new Error("Login timed out — the server may be starting up, please try again");
        throw e;
    } finally {
        clearTimeout(loginTimeout);
    }

    if (!response.ok) {
        const err = await response.json().catch(() => ({}))
        throw new Error(err.msg || "Failed to log in")
    }

    const data = await response.json()
    const token = data.token

    const meResponse = await fetch(`${apiUrl}/api/v1/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
    })

    if (!meResponse.ok) {
        const err = await meResponse.json().catch(() => ({}))
        throw new Error(err.message || err.msg || "Could not load user profile")
    }

    const meData = await meResponse.json()
    const user = meData.data

    return {
        token,
        _id: user._id,
        name: user.name,
        email: user.email,
        tel: user.tel,
        role: user.role,
    }
}
