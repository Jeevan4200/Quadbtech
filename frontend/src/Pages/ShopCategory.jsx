import React, { useContext } from 'react';
import './CSS/ShopCategory.css';
import { ShopContext } from '../Components/Context/ShopContext';
import dropdown_icon from '../Components/Assets/dropdown_icon.png';
import Item from '../Components/Items/Item';

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);

  // Provide a fallback to an empty array if all_product is undefined
  const products = all_product || [];

  return (
    <div className='shop-category'>
      <img className='shopcategory-banner' src={props.banner} alt="" />
      <div className="shopcategory-indexSort">
        <p>
          <span>showing 1-12</span> out of 36 products
        </p>
        <div className="shopcategory-sort">
          sort by <img src={dropdown_icon} alt="" />
        </div>
      </div>
      <div className='shopcategory-product'>
        {products.map((item, index) => {
          if (props.category === item.category) {
            return (
              <Item
                key={index}
                id={item.id}
                name={item.name}
                image={item.image}
                new_price={item.new_price}
                old_price={item.old_price}
              />
            );
          } else {
            return null; // Explicitly return null if the category doesn't match
          }
        })}
      </div>
      <div className="shopcategory-loadmore">
        Explore more
      </div>
    </div>
  );
};

export default ShopCategory;
