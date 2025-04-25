export interface LinkPropsTypes {
    title: string;
    url: string;
    description: string;
    folderId: string;
    tags: TagPropsTypes[],
}

export interface TagPropsTypes {
    id: string;
    name: string;
    color: string;
    links: LinkPropsTypes[];
}

export interface FolderPropsTypes {
    id: string;
    name: string;
    description?: string;
    color: string;
    links: LinkPropsTypes[];
}

