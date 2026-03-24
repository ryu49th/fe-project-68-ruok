export interface WorkingSpace {
    _id: string;
    name: string;
    address: string;
    district: string;
    province: string;
    postalcode: string;
    tel: string;
    openTime?: string;
    closeTime?: string;
    opentime?: string;
    closetime?: string;
    picture?: string;
    averageRating?: number;
    totalReviews?: number;
}

export default async function getWorkingSpaces(signal?: AbortSignal): Promise<WorkingSpace[]> {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.BACKEND_URL;

    if (!apiUrl) {
        throw new Error("Backend URL not configured");
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);

    // forward external abort (e.g. component unmount) into our controller
    signal?.addEventListener("abort", () => controller.abort());

    try {
        const response = await fetch(`${apiUrl}/api/v1/workingspaces`, {
            cache: "no-store",
            signal: controller.signal,
        });

        if (!response.ok) {
            throw new Error("Failed to fetch working spaces");
        }

        const data = await response.json();
        return data.data as WorkingSpace[];
    } finally {
        clearTimeout(timeout);
    }
}
