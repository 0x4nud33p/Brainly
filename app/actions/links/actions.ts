
export const addLink = async (link: string) => {
  "use server";
    const res = await fetch("/api/links", {
        method: "POST",
        body: JSON.stringify({ link }),
        headers: {
        "Content-Type": "application/json",
        },
    });
    if (!res.ok) {
        throw new Error("Failed to add link");
    }
    return res.json();
}