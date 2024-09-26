import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../Components/Context/ShopContext';
import Breadcrum from '../Components/Breaknums/Breadcrum';
import ProductDisplay from '../Components/ProductDisplay.jsx/ProductDisplay';
import Descriptionbox from '../Components/Descriptionbox/Descriptionbox';
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts';

const Product = () => {
  const { all_product } = useContext(ShopContext);
  const { productId } = useParams();

  const product = all_product?.find((e) => e.id === Number(productId));

  if (!product) {
    return <div>Product not found</div>; // Handle case where product is not found
  }

  return (
    <div>
      <Breadcrum product={product} />
      {/* Render other product details here */}
      <ProductDisplay product={product}/>
      <Descriptionbox/>
      <RelatedProducts/>
    </div>
  );
};

export default Product;
