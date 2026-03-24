export interface ReservationFromAPI {
    _id: string;
    date: string;
    startTime: string;
    endTime: string;
    purpose: string;
    status: "confirmed" | "pending" | "cancelled";
    workingspace: {
        _id: string;
        name: string;
        province: string;
        tel: string;
    };
    user: {
        _id: string;
        name: string;
        email: string;
        tel: string;
    };
    createdAt: string;
}

export default async function getReservations(token: string): Promise<ReservationFromAPI[]> {
    const apiUrl = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_API_URL;

    if (!apiUrl) {
        throw new Error("Backend URL not configured");
    }

    const response = await fetch(`${apiUrl}/api/v1/reservations`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch reservations");
    }

    const data = await response.json();
    return data.data as ReservationFromAPI[];
}
