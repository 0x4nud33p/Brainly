"use client";

import { useState, useEffect } from "react";
import { X, Loader2, Plus } from "lucide-react";
import type { LinkListItemProps } from "../link-list-item";
import { getFolders } from "@/utils/getFolders";

type Folder = {
  id: string;
  name: string;
};

type EditLinkModalProps = {
  link: LinkListItemProps["link"] | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>;
};

export default function EditLinkModal({
  link,
  isOpen,
  onClose,
  onSubmit,
}: EditLinkModalProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    url: "",
    description: "",
    folderId: "",
    tags: [] as string[],
  });
  const [tagInput, setTagInput] = useState("");
  const [folders, setFolders] = useState<Folder[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (link && isOpen) {
      setFormData({
        title: link.title || "",
        url: link.url,
        description: link.description || "",
        folderId: link.folderId || "",
        tags: link.tags?.map((t) => t.name) || [],
      });
      setIsLoading(false);
    }
  }, [link, isOpen]);

  // Fetch folders (dummy example)
  useEffect(() => {
    const fetchFolders = async () => {
      setIsLoading(true);
      const data = await getFolders();
      setFolders(data);
    };

    fetchFolders();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddTag = () => {
    const newTag = tagInput.trim();
    if (newTag && !formData.tags.includes(newTag)) {
      setFormData((prev) => ({ ...prev, tags: [...prev.tags, newTag] }));
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError("");

    try {
      await onSubmit(formData);
      onClose();
    } catch (err) {
      setError("Failed to save changes.");
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
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
                  required
                  value={formData.url}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-md shadow-sm dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500"
                />
              </div>

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
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-md shadow-sm dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-md shadow-sm dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500"
                  placeholder="Add a description"
                />
              </div>

              <div>
                <label
                  htmlFor="folderId"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                >
                  Folder
                </label>
                <select
                  id="folderId"
                  name="folderId"
                  value={formData.folderId}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-md shadow-sm dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">No folder</option>
                  {folders.map((folder) => (
                    <option key={folder.id} value={folder.id}>
                      {folder.name}
                    </option>
                  ))}
                </select>
              </div>

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
                    className="flex-1 px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-l-md dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500"
                    placeholder="Add tag and hit Enter"
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="px-3 py-2 bg-indigo-600 text-white rounded-r-md hover:bg-indigo-500"
                  >
                    <Plus className="h-5 w-5" />
                  </button>
                </div>

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
              </div>
            </div>

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
                className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-500 flex items-center focus:ring-2 focus:ring-indigo-500"
              >
                {isSaving && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                Save changes
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
