import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Card from '../components/ui/Card';
import toast from 'react-hot-toast';

function PublicCollection() {
  const { id } = useParams();
  const [collection, setCollection] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        const toastLoading = toast.loading('Loading content...');
        const { data } = await axios.get(
          `${import.meta.env.VITE_PRODUCTION_URL}/api/v1/user/content/${id}`
        );
        setCollection(data);
        console.log(data);
        console.log(collection);
        setLoading(false);
        toast.dismiss(toastLoading);
      } catch (error) {
        console.error('Error fetching collection:', error);
        toast.dismiss();
        toast.error('Error loading content');
        setLoading(false);
      }
    };

    fetchCollection();
  }, [id]);

  if (loading) {
    return <p className="text-center text-gray-400">Loading content...</p>;
  }

  if (!collection || collection.length === 0) {
    return <p className="text-center text-gray-400">No content available for this collection.</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b mt-16 from-gray-900 to-gray-800 text-white p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-0 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
            You are Viewing Someone's Collection
          </h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <Card
              key={collection._id}
              title={collection.title}
              content={collection.content}
              tags={collection.tags}
              link={collection.link}
              id={collection._id}
            />
        </div>
      </div>
    </div>
  );
}

export default PublicCollection;
