import React, { useState } from 'react';
import Card from './SubAdminCard';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SubAdminComplete = () => {
  // Static product data
  const initialProducts = [
    {
      _id: '1',
      imageUrl: 'base64encodedImageString1', // replace with your base64 image string
      category: 'Electronics',
    },
    {
      _id: '2',
      imageUrl: 'base64encodedImageString2', // replace with your base64 image string
      category: 'Clothing',
    },
    {
      _id: '3',
      imageUrl: 'base64encodedImageString3', // replace with your base64 image string
      category: 'Books',
    },
  ];

  const [products, setProducts] = useState(initialProducts);

  const handleDelete = (productId) => {
    toast.success('Product deleted successfully');
    setProducts((prevProducts) => prevProducts.filter((product) => product._id !== productId));
  };

  const handleAccept = (productId) => {
    toast.success('Product accepted successfully');
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id === productId ? { ...product, sku_id: 'new_sku_id' } : product
      )
    );
  };

  const handleUpdate = (productId, updatedProductData) => {
    toast.success('Product updated successfully');
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id === productId ? { ...product, ...updatedProductData } : product
      )
    );
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
      {products.map((product) => (
        <Card
          key={product._id}
          imageLink={`data:image/jpeg;base64,${product.imageUrl}`} // assuming the image is stored as base64
          category={product.category}
          productId={product._id}
          onDelete={() => handleDelete(product._id)}
          onAccept={() => handleAccept(product._id)}
          onUpdate={(updatedProductData) => handleUpdate(product._id, updatedProductData)}
        />
      ))}
      <ToastContainer />
    </div>
  );
};

export default SubAdminComplete;
