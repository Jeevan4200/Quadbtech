import React, { useState } from 'react';
import './Descriptionbox.css';

const Descriptionbox = () => {
  const [activeTab, setActiveTab] = useState('description');

  return (
    <div className='descriptionbox'>
        {/* Navigator Section */}
        <div className='descriptionbox-navigator'>
            <div 
              className={`descriptionbox-nav-box ${activeTab === 'description' ? 'active' : ''}`} 
              onClick={() => setActiveTab('description')}
            >
              Description
            </div>
            <div 
              className={`descriptionbox-nav-box fade ${activeTab === 'reviews' ? 'active' : ''}`} 
              onClick={() => setActiveTab('reviews')}
            >
              Reviews (122)
            </div>
        </div>
        
        {/* Content Section */}
        <div className='descriptionbox-description'>
          {activeTab === 'description' ? (
            <p>
              Welcome to ShopEase – Your One-Stop Online Shopping Destination! Discover a world of convenience and variety at ShopEase, where we bring you an extensive collection of products across categories...
            </p>
          ) : (
            <p>
              Customer Reviews: Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod augue vitae erat vehicula fermentum. 
            </p>
          )}
        </div>
    </div>
  );
}

export default Descriptionbox;
