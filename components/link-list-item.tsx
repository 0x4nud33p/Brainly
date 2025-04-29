import { Trash2, Edit, ExternalLink, Tag } from "lucide-react";
import { format } from "date-fns";

export type LinkListItemProps = {
  link: {
    id: string;
    url: string;
    title?: string;
    description?: string;
    image?: string;
    favicon?: string;
    createdAt: Date;
    tags?: { id: string; name: string; color?: string }[];
  };
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function LinkListItem({
  link,
  onEdit,
  onDelete,
}: LinkListItemProps) {
  const getDomain = (url: string) => {
    try {
      const domain = new URL(url).hostname;
      return domain.replace("www.", "");
    } catch (error) {
      return url;
    }
  };

  const domain = getDomain(link.url);

  return (
    <div className="flex items-center py-4 px-4 hover:bg-slate-50 dark:hover:bg-slate-900/60 transition-colors">
      {/* Favicon */}
      <div className="flex-shrink-0 mr-4">
        {link.favicon ? (
          <img src={link.favicon} alt="" className="w-6 h-6 object-contain" />
        ) : (
          <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-300">
              {domain.substring(0, 1).toUpperCase()}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-grow min-w-0">
        <h3 className="font-medium text-slate-900 dark:text-white truncate">
          {link.title || "Untitled Link"}
        </h3>
        <div className="flex items-center text-xs text-slate-500 dark:text-slate-400 mt-1 truncate">
          <span className="truncate">{domain}</span>
          <span className="mx-1.5">•</span>
          <span>{format(new Date(link.createdAt), "MMM d, yyyy")}</span>
        </div>

        {(link?.tags ?? []).length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {link?.tags.slice(0, 3).map((tagItem) => (
              <span
                key={tagItem.tag.id}
                className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full px-2 py-0.5 text-xs flex items-center gap-1"
              >
                <Tag size={10} />
                {tagItem.tag.name}
              </span>
            ))}
            {link.tags.length > 3 && (
              <span className="text-xs text-slate-500 dark:text-slate-400">
                +{link.tags.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-1 ml-4">
        <button
          onClick={() => window.open(link.url, "_blank")}
          className="p-1.5 rounded-md text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
        >
          <ExternalLink size={16} />
        </button>
        <button
          onClick={() => onEdit(link.id)}
          className="p-1.5 rounded-md text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
        >
          <Edit size={16} />
        </button>
        <button
          onClick={() => onDelete(link.id)}
          className="p-1.5 rounded-md text-red-500 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}
