export default async function userLogIn(userEmail: string, userPassword: string) {
    const apiUrl = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

    // Step 1: login to get token
    const response = await fetch(`${apiUrl}/api/v1/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail, password: userPassword }),
    })

    if (!response.ok) {
        const err = await response.json().catch(() => ({}))
        throw new Error(err.msg || "Failed to log in")
    }

    const data = await response.json()
    const token = data.token

    // Step 2: fetch full user profile (name, email, role, tel) using the token
    const meResponse = await fetch(`${apiUrl}/api/v1/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
    })

    if (!meResponse.ok) {
        // fallback — return just token if /me fails
        return { token }
    }

    const meData = await meResponse.json()
    const user = meData.data

    return {
        token,
        _id:   user._id,
        name:  user.name,
        email: user.email,
        tel:   user.tel,
        role:  user.role,
    }
}
