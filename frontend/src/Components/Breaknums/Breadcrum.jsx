import React from 'react';
import './Breadcum.css';
import arrow_icon from '../Assets/breadcrum_arrow.png';

const Breadcrum = (props) => {
  const { product } = props;

  if (!product) {
    return null; // Render nothing if product is undefined
  }

  return (
    <div className='breadcrum'>
      Home
      <img src={arrow_icon} alt="" className="arrow_icon" />
      Shop
      <img src={arrow_icon} alt="" className="arrow_icon" />
      {product.category}
      <img src={arrow_icon} alt="" className="arrow_icon" />
      {product.name}
    </div>
  );
};

export default Breadcrum;
