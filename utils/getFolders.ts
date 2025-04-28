export const getFolders = async () => {
    try {
    const response = await fetch("/api/folders", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
    throw new Error("Failed to fetch folders");
    }
    const data = await response.json();
    return data;
    } catch (error) {
        console.error("Error fetching folders:", error);
        return null;
    }
}