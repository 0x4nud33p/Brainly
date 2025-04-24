"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { PlusCircle, FolderPlus, Inbox, TagIcon } from "lucide-react";
import { add, set } from "date-fns";
import AddFolderModal from "./addnewfoldermodal";

export default function FolderSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentFolderId = searchParams.get("folder");
  const currentTag = searchParams.get("tag");

  const [folders, setFolders] = useState([]);
  const [tags, setTags] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openAddFolderModal, setOpenAddFolderModal] = useState(false);

  useEffect(() => {
    // Fetch folders
    const fetchFolders = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/folders");
        if (response.ok) {
          const data = await response.json();
          setFolders(data);
        }
      } catch (error) {
        console.error("Error fetching folders:", error);
      } finally {
        setIsLoading(false);
      }
    };

    // Fetch tags
    const fetchTags = async () => {
      try {
        const response = await fetch("/api/tags");
        if (response.ok) {
          const data = await response.json();
          setTags(data);
        }
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };

    fetchFolders();
    fetchTags();
  }, []);

  // Handle folder selection
  const selectFolder = (folderId) => {
    if (folderId) {
      router.push(`/dashboard?folder=${folderId}`);
    } else {
      router.push("/dashboard");
    }
    setIsMobileOpen(false);
  };

  // Handle tag selection
  const selectTag = (tagName) => {
    router.push(`/dashboard?tag=${encodeURIComponent(tagName)}`);
    setIsMobileOpen(false);
  };

  // Check if item is selected
  const isSelected = (type, id) => {
    if (type === "folder") {
      return id === currentFolderId;
    } else if (type === "tag") {
      return id === currentTag;
    } else if (type === "all") {
      return !currentFolderId && !currentTag;
    }
    return false;
  };

  return (
    <aside
      className={`
      fixed inset-y-0 left-0 z-20 w-full border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 
      md:sticky md:top-16 md:block md:w-full md:h-[calc(100vh-4rem)] md:overflow-auto md:border-0
      ${isMobileOpen ? "block" : "hidden"}
    `}
    >
      <div className="flex flex-col gap-2 p-4 h-full">
        {openAddFolderModal && (
          <AddFolderModal
            isOpen={openAddFolderModal}
            onClose={() => setOpenAddFolderModal(false)}
            onSubmit={() => {
              console.log("Folder added");
            }}
          />
        )}
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Collections
          </h2>
          <button
            onClick={() =>
              window.dispatchEvent(new CustomEvent("openAddFolderModal"))
            }
            className="p-1 rounded-md text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
          >
            <FolderPlus className="h-5 w-5" />
          </button>
        </div>

        {/* All links */}
        <button
          onClick={() => selectFolder(null)}
          className={`
            flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium
            ${
              isSelected("all", null)
                ? "bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white"
                : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            }
          `}
        >
          <Inbox className="h-4 w-4" />
          All Links
        </button>

        {/* Folders list */}
        <div className="space-y-1">
          {isLoading ? (
            <div className="animate-pulse space-y-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-9 rounded-md bg-slate-100 dark:bg-slate-800"
                ></div>
              ))}
            </div>
          ) : (
            folders.map((folder) => (
              <button
                key={folder.id}
                onClick={() => selectFolder(folder.id)}
                className={`
                  w-full flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium
                  ${
                    isSelected("folder", folder.id)
                      ? "bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white"
                      : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                  }
                `}
              >
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: folder.color || "#6366F1" }}
                ></div>
                <span className="truncate">{folder.name}</span>
                {folder.linkCount > 0 && (
                  <span className="ml-auto text-xs text-slate-500 dark:text-slate-400">
                    {folder.linkCount}
                  </span>
                )}
              </button>
            ))
          )}
        </div>

        {/* Add folder button */}
        <button
          onClick={() => setOpenAddFolderModal(true)}
          className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          <PlusCircle className="h-4 w-4" />
          Add New Folder
        </button>

        {/* Tags section */}
        {tags.length > 0 && (
          <div className="mt-6">
            <h3 className="mb-2 px-2 text-sm font-semibold text-slate-900 dark:text-white">
              Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button
                  key={tag.id}
                  onClick={() => selectTag(tag.name)}
                  className={`
                    flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium
                    ${
                      isSelected("tag", tag.name)
                        ? "bg-slate-200 text-slate-900 dark:bg-slate-700 dark:text-white"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                    }
                  `}
                >
                  <TagIcon className="h-3 w-3" />
                  {tag.name}
                  {tag.count > 0 && (
                    <span className="ml-1 text-xs text-slate-500 dark:text-slate-400">
                      {tag.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
