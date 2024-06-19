import React from 'react';
import Alllogo from '../assets/Homeassets/AllImage.png';
import terracottaImage from '../assets/Homeassets/Terracotta.jpeg'
import  bananaFiberImage from '../assets/Homeassets/Banana Fiber.jpeg'
import  macrameImage from '../assets/Homeassets/Macrame.jpeg'
import juteBagsImage from '../assets/Homeassets/Jute.jpeg'
import moonjImage from '../assets/Homeassets/Moonj.jpeg'
import othersImage from '../assets/Homeassets/others.jpeg'

export default function Exploremenu({ category, setCategory }) {
  const categories = [
    {
      name: 'All',
      image: Alllogo
    },
    {
      name: 'Terracotta Ornaments & Home Décor',
      image: terracottaImage
    },
    {
      name: 'Moonj Based Handicrafts',
      image: moonjImage
    },
    {
      name: 'Banana Fiber based ornaments & Home Décor',
      image: bananaFiberImage
    },
    {
      name: 'Jute Bags & Allied Products',
      image: juteBagsImage
    },
    {
      name: 'Macrame Based Handicraft',
      image: macrameImage
    },
    {
      name: 'Others',
      image: othersImage
    }
  ];

return (
    <div className="container mx-auto py-6 px-4">
      <div className="p-6 rounded-lg bg-white mb-8">
        <h2 className="text-3xl font-bold mb-8 text-center">Explore Products</h2>
        <div className="grid gap-36 grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 ">
          {categories.map(cat => (
            <div
              key={cat.name}
              className={`flex flex-col items-center p-6 cursor-pointer border rounded-lg w-44 h-52 transition-transform duration-300 ${category === cat.name ? 'border-primary bg-gray-100 transform scale-105' : 'border-base-300 transform hover:scale-105'}`}
              onClick={() => setCategory(cat.name)}
            >
              <img src={cat.image} alt={cat.name} className="w-20 h-20 mb-4 rounded-full object-cover" />
              <span className={`text-base text-center font-semibold ${category === cat.name ? 'text-primary' : 'text-gray-700'}`}>
                {cat.name}
              </span>
            </div>
        ))}
        </div>
      </div>
    </div>
  );
}
