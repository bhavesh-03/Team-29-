import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from './cartSlice';

const SingleItem = ({ id, name, description, image }) => {
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({ id, name, description, image, count }));
  };

  const incrementCount = () => {
    setCount(prevCount => prevCount + 1);
  };

  const decrementCount = () => {
    if (count > 0) {
      setCount(prevCount => prevCount - 1);
    }
  };

  return (
    <div className="single-item flex flex-col shadow-lg rounded-lg overflow-hidden bg-white hover:shadow-md transition duration-200 ease-in-out">
      <img
        className="w-full h-full object-cover p-4 sm:p-6 md:p-8 lg:p-10" 
        src={image}
        alt={name}
      />
      <div className="px-4 py-3 flex-grow">
        <div className="font-bold text-xl mb-2">{name}</div>
        <p className="text-gray-700 text-base">{description}</p>
        <div className="justify-center  items-center gap-4 mt-4 "> 
          <div className="flex items-center mb-2 justify-center">
            <button
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-3 rounded-l flex items-center justify-center text-lg sm:px-2 md:px-3 lg:px-4" 
              onClick={decrementCount}
            >
              -
            </button>
            <input
              type="number"
              className="border outline-none w-16 h-10 bg-gray-100 text-center text-lg focus:ring-2 focus:ring-blue-500 mx-1"
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
            />
            <button
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-3 rounded-r flex items-center justify-center text-lg sm:px-2 md:px-3 lg:px-4" 
              onClick={incrementCount}
            >
              +
            </button>
          </div>
          <button
            className="mt-0 bg-blue-500 justify-center hover:bg-blue-600 w-full text-white text-center font-bold py-2 px-10 rounded inline-flex  text-lg sm:text-base md:text-lg" 
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleItem;
