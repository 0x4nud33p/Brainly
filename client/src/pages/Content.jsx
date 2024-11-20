import React, { useState } from 'react';
import Card from '../components/ui/Card';
import { sampleCards } from '../components/ui/Sample.js';
import { Plus } from "lucide-react";
import PopupCard from '../components/ui/PopUpCard.jsx';

function Content() {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b mt-16 from-gray-900 to-gray-800 text-white p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-0 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
            Your Collection
          </h1>
          <button
            onClick={togglePopup}
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-sm text-white font-medium transform transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            <Plus size={16} />
            Add Collection
          </button>
        </div>
        <PopupCard isOpen={isOpen} onClose={togglePopup} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {sampleCards.map((card) => (
            <Card
              key={card.id}
              title={card.title}
              content={card.content}
              tags={card.tags}
              onShare={() => console.log('Share:', card.title)}
              onCopy={() => console.log('Copied:', card.title)}
              onEdit={() => console.log('Edit:', card.title)}
              onDelete={() => console.log('Delete:', card.title)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Content;
