export default async function updateProfile(
    token: string,
    body: { name: string; email: string; tel: string }
) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.BACKEND_URL;

    if (!apiUrl) {
        throw new Error("Backend URL not configured");
    }

    const response = await fetch(`${apiUrl}/api/v1/auth/updatedetails`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.message || "Failed to update profile");
    }

    return response.json();
}
