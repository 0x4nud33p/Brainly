import React, { useState } from 'react';
import { Share2, Copy, Edit2, Trash2, Tag, MoreVertical } from 'lucide-react';

export default function Card({
  title,
  content,
  tags = [],
  link,
  id,
  onShare,
  onEdit,
  onDelete,
}) {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div className="group relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity" />
      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl font-semibold text-white truncate pr-4">{title}</h3>
          <div className="relative">
            <button
              onClick={() => setShowOptions(!showOptions)}
              className="p-1.5 hover:bg-gray-700/50 rounded-lg transition-colors"
            >
              <MoreVertical className="w-5 h-5 text-gray-400" />
            </button>
            {showOptions && (onShare || onEdit || onDelete) && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-10">
                <div className="py-1">
                  {onShare && (
                    <button
                      onClick={onShare}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-700/50"
                    >
                      <Share2 className="w-4 h-4 mr-3" />
                      Share
                    </button>
                  )}
                  {onEdit && (
                    <button
                      onClick={onEdit}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-700/50"
                    >
                      <Edit2 className="w-4 h-4 mr-3" />
                      Edit
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={onDelete}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-400 hover:bg-gray-700/50"
                    >
                      <Trash2 className="w-4 h-4 mr-3" />
                      Delete
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        <p className="text-gray-300 mb-4 line-clamp-3">
          {typeof content === 'string' ? content : 'Invalid Content'}
        </p>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple-400 hover:text-blue-500 transition-colors cursor-pointer duration-300"
        >
          Visit Your Link
        </a>
        <div className="flex flex-wrap gap-2 mt-4">
          {tags && tags.length > 0 ? (
            tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-500"
              >
                <Tag className="w-3 h-3 mr-1" />
                {tag?.title || 'Untitled'}
              </span>
            ))
          ) : (
            <span className="text-sm text-gray-500">No tags available</span>
          )}
        </div>
      </div>
    </div>
  );
}
