import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Card = ({ imageLink, category, productId, onDelete }) => {
  const [shape, setShape] = useState('');
  const [color, setColor] = useState('');
  const [type, setType] = useState('');
  const [size, setSize] = useState('');
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    // if (productId) {
      const fetchProductDetails = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/api/products/get-subadmin-product`);
          const product = response.data;
          setShape(product.shape);
          setColor(product.colour);
          setType(product.type);
          setSize(product.size);
          setDescription(product.description);
          setName(product.name);
        } catch (error) {
          toast.error('Error fetching product details');
          console.error(error);
        }
      };
      fetchProductDetails();
    }
  // }
  , [productId]);

  const handleFormSubmit = async (event, action) => {
    event.preventDefault();

    const productDetails = {
      shape,
      colour: color,
      type,
      description,
      name,
      category,
      size,
      imageUrl: imageLink,
    };

    try {
      if (action === 'accept') {
        const response = await axios.put(`http://localhost:3000/api/products/${productId}/accept`, productDetails);
        toast.success('Product accepted and submitted successfully!');
        console.log(response.data);
      } else if (action === 'reject') {
        const response = await axios.delete(`http://localhost:3000/api/products/${productId}/delete`);
        toast.success('Product rejected and deleted successfully');
        console.log(response.data);
        onDelete(); // Trigger onDelete callback to remove the card from UI
      } else if (action === 'update') {
        const response = await axios.put(`http://localhost:3000/api/products/${productId}/update-details`, productDetails);
        toast.success('Product updated successfully!');
        console.log(response.data);
      }
    } catch (error) {
      toast.error('Error processing product');
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/products/${productId}/delete`);
      toast.success('Product deleted successfully');
      console.log(response.data);
      onDelete(); // Trigger onDelete callback to remove the card from UI
    } catch (error) {
      toast.error('Error deleting product');
      console.error(error);
    }
  };

  const containerStyle = {
    maxWidth: '600px',
    margin: '50px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    backgroundColor: '#f9f9f9',
    textAlign: 'center',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  };

  const imageStyle = {
    maxWidth: '100%',
    borderRadius: '5px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px',
  };

  const formGroupStyle = {
    marginBottom: '15px',
  };

  const labelStyle = {
    display: 'block',
    textAlign: 'left',
    marginBottom: '5px',
    fontWeight: 'bold',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
  };

  const selectStyle = {
    ...inputStyle,
  };

  const buttonStyle = {
    display: 'inline-block',
    width: '30%',
    padding: '10px 0',
    marginTop: '20px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#007bff',
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    marginRight: '2%',
  };

  const buttonRejectStyle = {
    ...buttonStyle,
    backgroundColor: '#ff0000',
    marginRight: '0',
  };

  const buttonUpdateStyle = {
    ...buttonStyle,
    backgroundColor: '#28a745',
    marginRight: '2%',
  };

  const buttonHoverStyle = {
    ...buttonStyle,
    backgroundColor: '#0056b3',
  };

  const buttonRejectHoverStyle = {
    ...buttonRejectStyle,
    backgroundColor: '#cc0000',
  };

  const buttonUpdateHoverStyle = {
    ...buttonUpdateStyle,
    backgroundColor: '#218838',
  };

  return (
    <div style={containerStyle}>
      <ToastContainer />
      <h2>Image Details</h2>
      <img src={imageLink} alt="Uploaded" style={imageStyle} />
      {/* <p>Product id : {productId}</p> */}
      <h3>Category: {category}</h3>
      <form>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Shape</label>
          <select value={shape} onChange={(e) => setShape(e.target.value)} style={selectStyle}>
            <option value="">Select a shape</option>
            <option value="Square">Square</option>
            <option value="Rectangle">Rectangle</option>
            <option value="Circle">Circle</option>
            <option value="Triangle">Triangle</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Colour</label>
          <select value={color} onChange={(e) => setColor(e.target.value)} style={selectStyle}>
            <option value="">Select a colour</option>
            <option value="Red">Red</option>
            <option value="Blue">Blue</option>
            <option value="Green">Green</option>
            <option value="Yellow">Yellow</option>
            <option value="Black">Black</option>
            <option value="White">White</option>
            <option value="Purple">Purple</option>
            <option value="Orange">Orange</option>
            <option value="Pink">Pink</option>
            <option value="Brown">Brown</option>
          </select>
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Type</label>
          <select value={type} onChange={(e) => setType(e.target.value)} style={selectStyle}>
            <option value="">Select a type</option>
            <option value="necklace">Necklace</option>
            <option value="earring">Ear-ring</option>
          </select>
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Size</label>
          <select value={size} onChange={(e) => setSize(e.target.value)} style={selectStyle}>
            <option value="">Select a size</option>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={inputStyle}
          />
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
          />
        </div>
        <button
          type="button"
          style={buttonStyle}
          onMouseOver={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
          onClick={(e) => handleFormSubmit(e, 'accept')}
        >
          Accept
        </button>
        <button
          type="button"
          style={buttonRejectStyle}
          onMouseOver={(e) => (e.target.style.backgroundColor = buttonRejectHoverStyle.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = buttonRejectStyle.backgroundColor)}
          onClick={handleDelete}
        >
          Delete
        </button>
        <button
          type="button"
          style={buttonUpdateStyle}
          onMouseOver={(e) => (e.target.style.backgroundColor = buttonUpdateHoverStyle.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = buttonUpdateStyle.backgroundColor)}
          onClick={(e) => handleFormSubmit(e, 'update')}
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default Card;
