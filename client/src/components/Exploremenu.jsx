// import React from 'react';
// import { Menu } from 'daisyui';
// import { menu_list } from '../Homeassets/assets';

// const Exploremenu = ({ category, setCategory }) => {
//   const categories = ['All', ...menu_list.map(item => item.menu_name)];

//   return (
//     <div className='p-4 border rounded-lg shadow-lg bg-white'>
//       <h1 className='text-xl md:text-2xl font-bold mb-4'>Explore Menu</h1>
//       <p className='text-gray-600 mb-6'>Find items based on the material you need.</p>

//       <div className='grid gap-4 grid-cols-4 md:grid-cols-6 lg:grid-cols-8'>
//         {categories.map((cat, index) => (
//           <div
//             key={index}
//             className={`border p-2 md:p-4 rounded-lg flex flex-col items-center hover:bg-gray-100 transition duration-300 ${
//               category === cat ? 'bg-gray-100' : ''
//             }`}
//             onClick={() => setCategory(cat)}
//           >
//             {cat === 'All' ? (
//               <div className='w-4/5 h-4/5 mt-2  flex items-center justify-center rounded-full bg-gray-200 mb-2'>
//                 <span className='text-gray-600 text-2xl font-bold md:text-3xl'>All</span>
//               </div>
//             ) : (
//               <>
//                 <img
//                   src={menu_list.find(item => item.menu_name === cat)?.menu_image}
//                   alt={cat}
//                   className='w-12 h-12 md:w-20 md:h-20 object-cover rounded-full mb-2'
//                 />
//                 <p className='text-xs md:text-sm text-center'>{cat}</p>
//               </>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Exploremenu;


// components/Exploremenu.js


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
        <div className="grid gap-10 grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 justify-items-center">
          {categories.map(cat => (
            <div
              key={cat.name}
              className={`flex flex-col  items-center p-6 cursor-pointer border rounded-lg w-44 h-42 ${category === cat.name ? 'border-primary bg-gray-50' : 'border-base-300'} transform hover:scale-105 transition-transform duration-300`}
              onClick={() => setCategory(cat.name)}
            >
              <img src={cat.image} alt={cat.name} className="w-20 h-20 mb-4 rounded-full object-cover" />
              <span className={`text-base  text-wrap text-center font-semibold ${category === cat.name ? 'text-primary' : 'text-gray-700'}`}>{cat.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
