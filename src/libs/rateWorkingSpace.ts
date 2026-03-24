export interface WorkingSpaceRatingResponse {
    _id: string;
    averageRating: number;
    totalReviews: number;
}

export default async function rateWorkingSpace(
    token: string,
    workingspaceId: string,
    rating: number
): Promise<WorkingSpaceRatingResponse> {
    const apiUrl = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_API_URL;

    if (!apiUrl) {
        throw new Error("Backend URL not configured");
    }

    const response = await fetch(`${apiUrl}/api/v1/workingspaces/${workingspaceId}/rating`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ rating }),
    });

    if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.message || err.msg || "Failed to submit rating");
    }

    const data = await response.json();
    return data.data as WorkingSpaceRatingResponse;
}
