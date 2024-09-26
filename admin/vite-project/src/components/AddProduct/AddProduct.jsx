import React, { useState } from 'react';
import './AddProduct.css';

const Addproduct = () => {
  const [product, setProduct] = useState({
    id: '',
    name: '',
    category: '',
    image: null,
    new_price: '',
    old_price: ''
  });
  const [loading, setLoading] = useState(false); // For handling loading state

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      image: e.target.files[0] // Handling image upload
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Step 1: Upload Image
      const formData = new FormData();
      formData.append('product', product.image);

      const uploadResponse = await fetch('http://localhost:4000/upload', {
        method: 'POST',
        body: formData
      });
      
      const uploadResult = await uploadResponse.json();
      
      if (uploadResult.success === 1) {
        // Step 2: Add Product with Uploaded Image URL
        const productData = {
          id: product.id,
          name: product.name,
          category: product.category,
          image: uploadResult.image_url, // Use the uploaded image URL
          new_price: product.new_price,
          old_price: product.old_price
        };

        const response = await fetch('http://localhost:4000/addproduct', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(productData),
        });

        const result = await response.json();
        if (result.success) {
          console.log("Product added:", result);
          alert(`Product ${productData.name} added successfully!`);
        } else {
          console.error("Failed to add product");
        }
      } else {
        console.error("Failed to upload image");
      }
    } catch (error) {
      console.error("Error while submitting product:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="addproduct-container">
      <h2>Add New Product</h2>
      <form className="addproduct-form" onSubmit={handleSubmit}>
        <div className="addproduct-field">
          <label>ID</label>
          <input
            type="number"
            name="id"
            value={product.id}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="addproduct-field">
          <label>Product Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="addproduct-field">
          <label>Category</label>
          <select
            name="category"
            value={product.category}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Category</option>
            <option value="women">Women</option>
            <option value="men">Men</option>
            <option value="kids">Kids</option>
          </select>
        </div>

        <div className="addproduct-field">
          <label>Product Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </div>

        <div className="addproduct-field">
          <label>New Price</label>
          <input
            type="number"
            name="new_price"
            value={product.new_price}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="addproduct-field">
          <label>Old Price</label>
          <input
            type="number"
            name="old_price"
            value={product.old_price}
            onChange={handleInputChange}
          />
        </div>

        <button type="submit" className="addproduct-btn" disabled={loading}>
          {loading ? 'Adding Product...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
};

export default Addproduct;
