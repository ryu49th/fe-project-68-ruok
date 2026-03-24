export interface WorkingSpace {
    _id: string;
    name: string;
    address: string;
    district: string;
    province: string;
    postalcode: string;
    tel: string;
    opentime: string;
    closetime: string;
    picture?: string;
}

export default async function getWorkingSpaces(): Promise<WorkingSpace[]> {
    const apiUrl = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_API_URL;

    if (!apiUrl) {
        throw new Error("Backend URL not configured");
    }

    const response = await fetch(`${apiUrl}/api/v1/workingspaces`, {
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch working spaces");
    }

    const data = await response.json();
    return data.data as WorkingSpace[];
}
