import { useState } from "react";
import {
  ExternalLink,
  MoreHorizontal,
  Pencil,
  Trash2,
  Tag,
} from "lucide-react";

export default function LinkCard({ link, onEdit, onDelete }: { link: any; onEdit: () => void; onDelete: () => void; }) {
  const [menuOpen, setMenuOpen] = useState(false);

  // Extract domain from URL
  const getDomain = (url:string) => {
    try {
      return new URL(url).hostname.replace("www.", "");
    } catch {
      return "";
    }
  };

  // Format date to be more readable
  const formatDate = (dateString:string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-md transition-shadow">
      {/* Link preview/thumbnail if available */}
      {link.thumbnail && (
        <div className="aspect-video w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
          <img
            src={link.thumbnail}
            alt={`Thumbnail for ${link.title}`}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Hide the image on error
              e.target.style.display = "none";
            }}
          />
        </div>
      )}

      <div className="p-4">
        {/* Title and domain */}
        <div className="mb-2 flex justify-between items-start">
          <div>
            <h3 className="font-medium text-slate-900 dark:text-white mb-1 line-clamp-2">
              {link.title || "Untitled Link"}
            </h3>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {getDomain(link.url)}
            </span>
          </div>
          <div>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Open link
            </a>
          </div>
        </div>

        {/* Description if available */}
        {link.description && (
          <p className="text-sm text-slate-600 dark:text-slate-300 mb-3 line-clamp-2">
            {link.description}
          </p>
        )}

        {/* Tags */}
        {link.tags && link.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {link.tags.map((tag) => (
              <a
                key={tag.id}
                href={`/dashboard?tag=${encodeURIComponent(tag.name)}`}
                className="inline-flex items-center rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300"
              >
                <Tag className="mr-1 h-3 w-3" />
                {tag.name}
              </a>
            ))}
          </div>
        )}

        {/* Bottom actions */}
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 dark:border-slate-800">
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {formatDate(link.createdAt)}
          </span>

          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <MoreHorizontal className="h-4 w-4 text-slate-500 dark:text-slate-400" />
            </button>

            {menuOpen && (
              <div
                className="absolute right-0 bottom-8 z-10 bg-white dark:bg-slate-900 rounded-md shadow-lg border border-slate-200 dark:border-slate-800 py-1 min-w-32"
                onBlur={() => setMenuOpen(false)}
              >
                <button
                  onClick={() => {
                    onEdit();
                    setMenuOpen(false);
                  }}
                  className="w-full flex items-center px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit
                </button>
                <button
                  onClick={() => {
                    onDelete();
                    setMenuOpen(false);
                  }}
                  className="w-full flex items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
