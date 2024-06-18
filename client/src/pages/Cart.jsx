// Cart.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { addToCart, removeFromCart } from '../components/cartSlice';
import './Cast.css'

const Cart = () => {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleIncrement = (item) => {
    dispatch(addToCart({ ...item, count: item.count + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.count > 1) {
      dispatch(addToCart({ ...item, count: item.count - 1 }));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeFromCart(item.id));
  };

  const handleSendQuery = () => {
    // Logic to send the cart query (e.g., API call)
    alert('Query sent!');
  };

  return (
    <div className="cart-page">
      <h1>Cart Page</h1>
      {cartItems.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.name} />
            <div className="cart-item-info">
              <h4>{item.name}</h4>
              <p>{item.description}</p>
            </div>
            <div className="cart-item-actions">
              <button onClick={() => handleIncrement(item)}>+</button>
              <input type="number" value={item.count} readOnly />
              <button onClick={() => handleDecrement(item)}>-</button>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>🗑️</button>
            </div>
          </div>
        ))
      )}
      {cartItems.length > 0 && (
        <button className="cart-send-query" onClick={handleSendQuery}>
          SEND QUERY
        </button>
      )}
    </div>
  );
};

export default Cart;
