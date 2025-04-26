import { useState, useEffect } from "react";
import { colorOptions } from "@/lib/data/data";
import { X, Loader2, Folder, Check } from "lucide-react";

export default function AddFolderModal({ isOpen, onClose } : { isOpen: boolean, onClose: () => void }) {
  const [isLoading, setIsLoading] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [folderColor, setFolderColor] = useState("blue");
  const [error, setError] = useState("");

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setFolderName("");
      setFolderColor("blue");
      setError("");
    }
  }, [isOpen]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!folderName.trim()) {
      setError("Folder name is required");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/folders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: folderName.trim(),
          color: folderColor,
        }),
      });
      console.log("Response from adding folders", response);
      const res = await fetch("/api/folders", {
        body: JSON.stringify({
          name: folderName.trim(),
          color: folderColor,
        }),
      });
      console.log("Response from fetching folders", res);
      if (!res.ok) {
        throw new Error("Failed to create folder");
      }
      const data = await res.json();
      if (!data) {
        throw new Error("Failed to create folder");
      }
      setFolderName("");
      setFolderColor("blue");
      onClose();
    } catch (error) {
      console.error("Error adding folder:", error);
      if (error instanceof Error) {
        setError(error.message || "Failed to create folder.");
      } else {
        setError("Failed to create folder.");
      }
    } finally {
      setIsLoading(false);
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

  // Set up listener for the "openAddFolderModal" event
  useEffect(() => {
    const handleOpenAddFolderModal = () => {
      // This component already receives isOpen as a prop, but you might want
      // to set up a method in parent component to set isOpen to true when this event is fired
    };

    window.addEventListener("openAddFolderModal", handleOpenAddFolderModal);
    return () =>
      window.removeEventListener(
        "openAddFolderModal",
        handleOpenAddFolderModal
      );
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-slate-900 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800">
          <h2 className="text-lg font-medium text-slate-900 dark:text-white flex items-center">
            <Folder className="h-5 w-5 mr-2 text-indigo-500" />
            New Folder
          </h2>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4">
            {error && (
              <div className="p-3 bg-red-100 border border-red-200 text-red-700 rounded-md text-sm">
                {error}
              </div>
            )}

            <div>
              <label
                htmlFor="folder-name"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
              >
                Folder Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="folder-name"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-slate-800 dark:text-white"
                placeholder="Enter folder name"
                autoFocus
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Folder Color
              </label>
              <div className="flex flex-wrap gap-3">
                {colorOptions.map((color) => (
                  <button
                    key={color.name}
                    type="button"
                    onClick={() => setFolderColor(color.name)}
                    className={`w-8 h-8 rounded-full ${color.value} flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                    aria-label={`Select ${color.name} color`}
                  >
                    {folderColor === color.name && (
                      <Check className="h-4 w-4 text-white" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 flex items-center">
              <div
                className={`w-10 h-10 rounded-lg bg-${folderColor}-500 flex items-center justify-center`}
              >
                <Folder className="h-6 w-6 text-white" />
              </div>
              <div className="ml-3">
                <p className="font-medium text-slate-900 dark:text-white">
                  {folderName || "New Folder"}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  0 links
                </p>
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
              disabled={isLoading}
              className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 flex items-center"
            >
              {isLoading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
              Create Folder
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
