import React, { useEffect, useState } from 'react';
import './ListProduct.css';

const ListProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:4000/allproducts');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Remove product by id
  const removeProduct = async (id) => {
    try {
      const response = await fetch('http://localhost:4000/removeproduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error('Failed to remove product');
      }

      const result = await response.json();
      if (result.success) {
        // Update the product list after removal
        setProducts(products.filter(product => product.id !== id));
        console.log(`Product with ID ${id} removed successfully`);
      } else {
        console.log('Failed to remove product');
      }
    } catch (err) {
      console.error('Error:', err.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="listproduct-container">
      <h2>Product List</h2>
      <table className="listproduct-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Image</th>
            <th>New Price</th>
            <th>Old Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                />
              </td>
              <td>${product.new_price}</td>
              <td>${product.old_price}</td>
              <td>
                <button 
                  className="remove-btn"
                  onClick={() => removeProduct(product.id)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListProduct;
