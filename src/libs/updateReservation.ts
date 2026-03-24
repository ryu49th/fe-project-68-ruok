export default async function updateReservation(
    token: string,
    reservationId: string,
    body: {
        date?: string;
        startTime?: string;
        endTime?: string;
        purpose?: string;
        status?: string;
    }
) {
    const apiUrl = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_API_URL;

    if (!apiUrl) {
        throw new Error("Backend URL not configured");
    }

    const response = await fetch(`${apiUrl}/api/v1/reservations/${reservationId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.message || "Failed to update reservation");
    }

    const data = await response.json();
    return data.data;
}
