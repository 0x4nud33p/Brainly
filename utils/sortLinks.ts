import { LinkListItemProps } from "@/components/link-list-item";

const sortLinks = (linksToSort: LinkListItemProps["link"][], sortBy: string) => {
switch (sortBy) {
    case "oldest":
    return [...linksToSort].sort(
        (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
    case "alphabetical":
    return [...linksToSort].sort((a, b) =>
        (a.title || "").localeCompare(b.title || "")
    );
    case "newest":
    default:
    return [...linksToSort].sort(
        (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
}
};

export default sortLinks;