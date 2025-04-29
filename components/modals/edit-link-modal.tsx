"use client";

import { useState, useEffect } from "react";
import { X, Loader2, Plus } from "lucide-react";

export default function EditLinkModal({
linkId,
isOpen,
onClose,
onSubmit,
}) {
const [link, setLink] = useState(null);
const [isLoading, setIsLoading] = useState(true);
const [isSaving, setIsSaving] = useState(false);
const [formData, setFormData] = useState({
title: "",
url: "",
description: "",
folderId: "",
tags: [],
});
const [tagInput, setTagInput] = useState("");
const [folders, setFolders] = useState([]);
const [error, setError] = useState("");

// Fetch link data and folders when modal opens
useEffect(() => {
if (isOpen && linkId) {
  const fetchData = async () => {
    setIsLoading(true);
    try {
      // Fetch link data
      const linkResponse = await fetch(`/api/links/${linkId}`);
      if (linkResponse.ok) {
        const linkData = await linkResponse.json();
        setLink(linkData);
        setFormData({
          title: linkData.title || "",
          url: linkData.url || "",
          description: linkData.description || "",
          folderId: linkData.folderId || "",
          tags: linkData.tags || [],
        });
      }

      // Fetch folders
      const foldersResponse = await fetch("/api/folders");
      if (foldersResponse.ok) {
        const foldersData = await foldersResponse.json();
        setFolders(foldersData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to load link data.");
    } finally {
      setIsLoading(false);
    }
  };

  fetchData();
}
}, [isOpen, linkId]);

const handleChange = (e) => {
const { name, value } = e.target;
setFormData((prev) => ({ ...prev, [name]: value }));
};

const handleAddTag = () => {
if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
  setFormData((prev) => ({
    ...prev,
    tags: [...prev.tags, tagInput.trim()],
  }));
  setTagInput("");
}
};

const handleRemoveTag = (tagToRemove) => {
setFormData((prev) => ({
  ...prev,
  tags: prev.tags.filter((tag) => tag !== tagToRemove),
}));
};

const handleSubmit = async (e) => {
e.preventDefault();
setIsSaving(true);
setError("");

try {
  await onSubmit(formData);
} catch (error) {
  console.error("Error saving link:", error);
  setError("Failed to save changes.");
} finally {
  setIsSaving(false);
}
};

// Close modal on Escape key
useEffect(() => {
const handleEsc = (e) => {
  if (e.key === "Escape") onClose();
};

window.addEventListener("keydown", handleEsc);
return () => window.removeEventListener("keydown", handleEsc);
}, [onClose]);

// Prevent background scrolling when modal is open
useEffect(() => {
if (isOpen) {
  document.body.style.overflow = "hidden";
} else {
  document.body.style.overflow = "auto";
}
return () => {
  document.body.style.overflow = "auto";
};
}, [isOpen]);

if (!isOpen) return null;

return (
<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
  <div className="bg-white dark:bg-slate-900 rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
    <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800">
      <h2 className="text-lg font-medium text-slate-900 dark:text-white">
        Edit Link
      </h2>
      <button
        onClick={onClose}
        className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
      >
        <X className="h-5 w-5" />
      </button>
    </div>

    {isLoading ? (
      <div className="p-6 flex justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
      </div>
    ) : (
      <form onSubmit={handleSubmit}>
        <div className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-red-100 border border-red-200 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}

          {/* URL Field */}
          <div>
            <label
              htmlFor="url"
              className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
            >
              URL
            </label>
            <input
              type="url"
              id="url"
              name="url"
              value={formData.url}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-slate-800 dark:text-white"
              placeholder="https://example.com"
            />
          </div>

          {/* Title Field */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-slate-800 dark:text-white"
              placeholder="Title of the link"
            />
          </div>

          {/* Description Field */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
            >
              Description (optional)
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-slate-800 dark:text-white"
              placeholder="Add a description"
            />
          </div>

          {/* Folder Selection */}
          <div>
            <label
              htmlFor="folder"
              className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
            >
              Folder
            </label>
            <select
              id="folder"
              name="folderId"
              value={formData.folderId}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-slate-800 dark:text-white"
            >
              <option value="">No folder</option>
              {folders?.map((folder) => (
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              ))}
            </select>
          </div>

          {/* Tags */}
          <div>
            <label
              htmlFor="tags"
              className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
            >
              Tags
            </label>
            <div className="flex">
              <input
                type="text"
                id="tags"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
                className="flex-1 px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-l-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-slate-800 dark:text-white"
                placeholder="Add tags"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="px-3 py-2 bg-indigo-600 text-white rounded-r-md hover:bg-indigo-500"
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>

            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center bg-indigo-100 text-indigo-800 text-xs rounded-full px-2.5 py-0.5 dark:bg-indigo-900/30 dark:text-indigo-300"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-1 text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-md text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 flex items-center"
          >
            {isSaving && (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            )}
            Save changes
          </button>
        </div>
      </form>
    )}
  </div>
</div>
);
}