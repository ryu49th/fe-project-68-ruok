export default async function deleteReservation(token: string, reservationId: string) {
    const apiUrl = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_API_URL;

    if (!apiUrl) {
        throw new Error("Backend URL not configured");
    }

    const response = await fetch(`${apiUrl}/api/v1/reservations/${reservationId}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.message || "Failed to delete reservation");
    }

    return true;
}
