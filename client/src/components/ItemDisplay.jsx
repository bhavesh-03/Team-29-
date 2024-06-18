import React from 'react';
import './ItemDisplay.css'; // If you have custom CSS
import { ornament_list } from '../Homeassets/assets';
import SingleItem from './SingleItem';

const ItemDisplay = ({ category }) => {
  return (
    <div className="py-8 px-4"> {/* Adds padding on the y-axis (top and bottom) and some horizontal padding */}
      <div className="grid gap-8 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"> {/* Grid container with responsive columns */}
        {ornament_list.map((item, index) => {
          if (category === "All" || category === item.category) {
            return (
              <SingleItem
                key={index}
                id={item._id}
                name={item.name}
                description={item.description}
                image={item.image}
              />
            );
          }
          return null; // Ensure to have a return statement for map function
        })}
      </div>
    </div>
  );
};

export default ItemDisplay;
