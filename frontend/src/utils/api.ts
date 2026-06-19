export async function fetchJson<T>(path: string, init?: RequestInit): Promise<T> {
    const baseUrl = import.meta.env.VITE_API_BASE ?? "http://localhost:5000";
    const response = await fetch(`${baseUrl}${path}`, init);
    const payload = await response.json();

    if (!response.ok) {
        throw new Error(payload?.message ?? `HTTP error ${response.status}`);
    }

    if (payload && typeof payload === "object" && "success" in payload) {
        if (!payload.success) {
            throw new Error(payload.message ?? "API request failed");
        }
        return payload.data as T;
    }

    return payload as T;
}
