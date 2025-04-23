"use client";

import { useState, useEffect } from "react";
import { Inbox, Loader2, Grid, List, Filter, X } from "lucide-react";
import LinkCard from "./link-card";
import LinkListItem from "./link-list-item";
import EditLinkModal from "./edit-link-modal";
import DeleteConfirmModal from "./delete-confirm-modal";

type LinkGridProps = {
  selectedFolder?: string;
  searchQuery?: string;
  selectedTag?: string;
};

export default function LinkGrid({
  selectedFolder,
  searchQuery,
  selectedTag,
}: LinkGridProps) {
  const [links, setLinks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
  const [editLinkId, setEditLinkId] = useState(null);
  const [deleteLinkId, setDeleteLinkId] = useState(null);
  const [currentFolder, setCurrentFolder] = useState(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    domain: "",
    sortBy: "newest", // 'newest', 'oldest', 'alphabetical'
  });

  // Fetch links whenever params change
  useEffect(() => {
    const fetchLinks = async () => {
      try {
        setIsLoading(true);

        let url = "/api/links?";
        if (selectedFolder) url += `folderId=${selectedFolder}&`;
        if (searchQuery) url += `query=${encodeURIComponent(searchQuery)}&`;
        if (selectedTag) url += `tag=${encodeURIComponent(selectedTag)}&`;
        if (filters.domain)
          url += `domain=${encodeURIComponent(filters.domain)}&`;

        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();

          // Apply sorting
          const sortedData = sortLinks(data, filters.sortBy);
          setLinks(sortedData);
        }
      } catch (error) {
        console.error("Error fetching links:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLinks();

    // Fetch folder information if selectedFolder is provided
    if (selectedFolder) {
      fetch(`/api/folders/${selectedFolder}`)
        .then((res) => res.json())
        .then((data) => {
          setCurrentFolder(data);
        })
        .catch((error) => {
          console.error("Error fetching folder:", error);
        });
    } else {
      setCurrentFolder(null);
    }
  }, [selectedFolder, searchQuery, selectedTag, filters]);

  // Sort links based on selected criteria
  const sortLinks = (linksToSort, sortBy) => {
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

  // Get all unique domains from links
  const getDomains = () => {
    const domains = links
      .map((link) => {
        try {
          return new URL(link.url).hostname.replace("www.", "");
        } catch {
          return "";
        }
      })
      .filter(Boolean);

    return [...new Set(domains)];
  };

  // Handle link deletion
  const handleDeleteLink = async (id) => {
    try {
      const response = await fetch(`/api/links/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Remove the deleted link from state
        setLinks(links.filter((link) => link.id !== id));
        setDeleteLinkId(null);
      }
    } catch (error) {
      console.error("Error deleting link:", error);
    }
  };

  // Handle link update
  const handleUpdateLink = async (id, data) => {
    try {
      const response = await fetch(`/api/links/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const updatedLink = await response.json();
        // Update the link in state
        setLinks(links.map((link) => (link.id === id ? updatedLink : link)));
        setEditLinkId(null);
      }
    } catch (error) {
      console.error("Error updating link:", error);
    }
  };

  // Generate title based on current view
  const getTitle = () => {
    if (selectedTag) {
      return `Links tagged with "${selectedTag}"`;
    } else if (searchQuery) {
      return `Search results for "${searchQuery}"`;
    } else if (currentFolder) {
      return currentFolder.name;
    } else {
      return "All Links";
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      domain: "",
      sortBy: "newest",
    });
  };

  return (
    <div className="w-full">
      {/* Header with title and view options */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            {getTitle()}
          </h1>
          {(searchQuery || selectedTag || filters.domain) && (
            <div className="flex flex-wrap items-center gap-2 mt-2">
              {searchQuery && (
                <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-800 dark:bg-slate-800 dark:text-slate-300">
                  Search: {searchQuery}
                  <button
                    onClick={() =>
                      (window.location.href = selectedFolder
                        ? `/dashboard?folder=${selectedFolder}`
                        : "/dashboard")
                    }
                  >
                    <X className="ml-1 h-3 w-3" />
                  </button>
                </span>
              )}

              {selectedTag && (
                <span className="inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300">
                  Tag: {selectedTag}
                  <button
                    onClick={() =>
                      (window.location.href = selectedFolder
                        ? `/dashboard?folder=${selectedFolder}`
                        : "/dashboard")
                    }
                  >
                    <X className="ml-1 h-3 w-3" />
                  </button>
                </span>
              )}

              {filters.domain && (
                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-300">
                  Domain: {filters.domain}
                  <button
                    onClick={() => setFilters({ ...filters, domain: "" })}
                  >
                    <X className="ml-1 h-3 w-3" />
                  </button>
                </span>
              )}

              {(searchQuery || selectedTag || filters.domain) && (
                <button
                  onClick={clearFilters}
                  className="text-xs underline text-slate-500 dark:text-slate-400"
                >
                  Clear all filters
                </button>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Filter button */}
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
          >
            <Filter className="h-4 w-4 mr-1" />
            Filter
          </button>

          {/* View mode toggle */}
          <div className="flex items-center border border-slate-200 dark:border-slate-800 rounded-md overflow-hidden">
            <button
              onClick={() => setViewMode("grid")}
              className={`inline-flex items-center justify-center w-9 h-9 ${
                viewMode === "grid"
                  ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white"
                  : "bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400"
              }`}
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`inline-flex items-center justify-center w-9 h-9 ${
                viewMode === "list"
                  ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white"
                  : "bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400"
              }`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Filter dropdown */}
      {filterOpen && (
        <div className="mb-6 p-4 border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-900">
          <h3 className="text-sm font-medium text-slate-900 dark:text-white mb-3">
            Filters
          </h3>

          <div className="grid sm:grid-cols-2 gap-4">
            {/* Domain filter */}
            <div>
              <label
                htmlFor="domain-filter"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
              >
                Website
              </label>
              <select
                id="domain-filter"
                value={filters.domain}
                onChange={(e) =>
                  setFilters({ ...filters, domain: e.target.value })
                }
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-slate-800 dark:text-white"
              >
                <option value="">All websites</option>
                {getDomains().map((domain) => (
                  <option key={domain} value={domain}>
                    {domain}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort by filter */}
            <div>
              <label
                htmlFor="sort-filter"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
              >
                Sort by
              </label>
              <select
                id="sort-filter"
                value={filters.sortBy}
                onChange={(e) =>
                  setFilters({ ...filters, sortBy: e.target.value })
                }
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-slate-800 dark:text-white"
              >
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
                <option value="alphabetical">Alphabetical</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Loading state */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
        </div>
      ) : links.length === 0 ? (
        // Empty state
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="rounded-full bg-slate-100 dark:bg-slate-800 p-3 mb-4">
            <Inbox className="h-6 w-6 text-slate-500 dark:text-slate-400" />
          </div>
          <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-1">
            No links found
          </h3>
          <p className="text-slate-500 dark:text-slate-400 max-w-md">
            {searchQuery || selectedTag || filters.domain
              ? "Try changing your search or filters to find what you're looking for."
              : "Get started by adding your first link."}
          </p>
          <button
            onClick={() =>
              window.dispatchEvent(new CustomEvent("openAddLinkModal"))
            }
            className="mt-4 inline-flex items-center px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
          >
            Add your first link
          </button>
        </div>
      ) : (
        // Links display (grid or list)
        <>
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {links.map((link) => (
                <LinkCard
                  key={link.id}
                  link={link}
                  onEdit={() => setEditLinkId(link.id)}
                  onDelete={() => setDeleteLinkId(link.id)}
                />
              ))}
            </div>
          ) : (
            <div className="divide-y divide-slate-200 dark:divide-slate-800 -mx-4">
              {links.map((link) => (
                <LinkListItem
                  key={link.id}
                  link={link}
                  onEdit={() => setEditLinkId(link.id)}
                  onDelete={() => setDeleteLinkId(link.id)}
                />
              ))}
            </div>
          )}
        </>
      )}

      {/* Edit Modal */}
      {editLinkId && (
        <EditLinkModal
          linkId={editLinkId}
          isOpen={!!editLinkId}
          onClose={() => setEditLinkId(null)}
          onSubmit={(data) => handleUpdateLink(editLinkId, data)}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteLinkId && (
        <DeleteConfirmModal
          isOpen={!!deleteLinkId}
          onClose={() => setDeleteLinkId(null)}
          onConfirm={() => handleDeleteLink(deleteLinkId)}
          title="Delete Link"
          message="Are you sure you want to delete this link? This action cannot be undone."
        />
      )}
    </div>
  );
}
