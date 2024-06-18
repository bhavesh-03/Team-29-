import React from 'react';
import { Menu } from 'daisyui';
import { menu_list } from '../Homeassets/assets';

const Exploremenu = ({ category, setCategory }) => {
  const categories = ['All', ...menu_list.map(item => item.menu_name)];

  return (
    <div className='p-4 border rounded-lg shadow-lg bg-white'>
      <h1 className='text-xl md:text-2xl font-bold mb-4'>Explore Menu</h1>
      <p className='text-gray-600 mb-6'>Find items based on the material you need.</p>

      <div className='grid gap-4 grid-cols-4 md:grid-cols-6 lg:grid-cols-8'>
        {categories.map((cat, index) => (
          <div
            key={index}
            className={`border p-2 md:p-4 rounded-lg flex flex-col items-center hover:bg-gray-100 transition duration-300 ${
              category === cat ? 'bg-gray-100' : ''
            }`}
            onClick={() => setCategory(cat)}
          >
            {cat === 'All' ? (
              <div className='w-4/5 h-4/5 mt-2  flex items-center justify-center rounded-full bg-gray-200 mb-2'>
                <span className='text-gray-600 text-2xl font-bold md:text-3xl'>All</span>
              </div>
            ) : (
              <>
                <img
                  src={menu_list.find(item => item.menu_name === cat)?.menu_image}
                  alt={cat}
                  className='w-12 h-12 md:w-20 md:h-20 object-cover rounded-full mb-2'
                />
                <p className='text-xs md:text-sm text-center'>{cat}</p>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Exploremenu;
