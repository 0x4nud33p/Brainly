import React, { useEffect, useState } from 'react';
import Card from '../components/ui/Card';
import { Plus } from "lucide-react";
import PopupCard from '../components/ui/PopUpCard.jsx';
import axios from 'axios';
import toast from 'react-hot-toast';


function Content() {
  const [isOpen, setIsOpen] = useState(false);
  const [sampleCards, setSampleCard] = useState([]);
  const sampleTags =  [
        { id: '1', name: '#tags-comming-soon', color: 'bg-blue-500/20 text-blue-300' },
        { id: '2', name: '#sample-tags', color: 'bg-purple-500/20 text-purple-300' }
      ];

   const handleShare = (id) => {
    const shareLink = `${import.meta.env.VITE_PRODUCTION_URL}/content/${id}`;
    navigator.clipboard.writeText(shareLink);
    toast.success('Link copied to clipboard');
  };

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const toastloading = toast.loading("Loading...");
        const userId = localStorage.getItem("userid");
        const token = localStorage.getItem("token");

        const { data: collections } = await axios.post(
          `${import.meta.env.VITE_PRODUCTION_URL}/api/v1/user/getallcollections`,
          { userId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setSampleCard(collections);
        toast.dismiss(toastloading);
      } catch (error) {
        console.error(error);
        toast.dismiss();
        toast.error("Error while retrieving your collections");
      }
    };

    fetchCollections();
  }, []);

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
          {sampleCards?.map((card) => (
            <Card
              key={card._id || card.title}
              title={card.title}
              content={card.content}
              tags={sampleTags}
              link={card.link}
              id={card._id}
              onShare={() => handleShare(card._id)}
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
