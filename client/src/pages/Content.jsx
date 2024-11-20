import React from 'react'
import Card from '../components/ui/Card'
import {sampleCards} from '../components/ui/Sample.js';

function Content() {
  return (
    <div className="min-h-screen bg-gradient-to-b mt-16 from-gray-900 to-gray-800 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
          Your Collection
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
  )
}

export default Content