import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Plus } from "lucide-react";
import {
  deleteCollection,
  getCollections,
} from "../store/features/collection/CollectionSlice";
import Card from "../components/ui/Card";
import PopupCard from "../components/ui/PopupCard";
import EditCard from "../components/ui/EditCard";

function Content() {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const { collections, loading } = useSelector((state) => state.collection);
  const dispatch = useDispatch();

  useEffect(() => {
    const userId = localStorage.getItem("userid");
    const token = localStorage.getItem("token");
    dispatch(getCollections({ userId, token }));
  }, [dispatch]);

  const togglePopup = () => setIsOpen((prev) => !prev);
  const toggleEditPopup = () => setIsEditOpen((prev) => !prev);

  const handleEdit = (card) => {
    setEditData(card);
    toggleEditPopup();
  };

  const handleDelete = (id) => {
    const token = localStorage.getItem("token");
    dispatch(deleteCollection({ id, token }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">
            Your Collection
          </h1>
          <button
            onClick={togglePopup}
            className="flex items-center gap-2 px-4 py-2 rounded bg-purple-600 text-white"
          >
            <Plus size={16} />
            Add Collection
          </button>
        </div>
        <PopupCard isOpen={isOpen} onClose={togglePopup} />
        <EditCard isOpen={isEditOpen} onClose={toggleEditPopup} editData={editData} />
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {collections?.map((card) => (
              <Card
                key={card._id}
                title={card.title}
                content={card.content}
                link={card.link}
                onDelete={() => handleDelete(card._id)}
                onEdit={() => handleEdit(card)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Content;
