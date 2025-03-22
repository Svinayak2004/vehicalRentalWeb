import React from 'react';
import './CarItem.css';
import { Link } from 'react-router-dom';

const CarItem = ({ id, name, price, category, image }) => {
  return (
    <>
      <Link to={`/CarView/${id}`}>
        <div className="car-item">
          <div className="item-container">
            <img className="item-image" src={image} alt={name} />
            <div className="item-info">
              <p>{name}</p>
              <div className="price">₹{price}/day</div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default CarItem;
