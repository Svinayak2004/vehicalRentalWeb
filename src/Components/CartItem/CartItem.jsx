import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext'; // Correct import
import './CartItem.css';
import remove_icon from '../Assets/delete.png';

const CartItem = () => {
  const { all, CartItems, removeFromCart } = useContext(StoreContext);
  const navigate = useNavigate();

  // Check if there are any cart items
  const hasCartItems = Object.values(CartItems).some(item => item > 0);

  return (
    <div className="cart-items">
      {!hasCartItems ? (
        <h1>No Bookings</h1>
      ) : (
        <>
          <div className="cart-format">
            <p>Ride</p>
            <p>Name</p>
            <p>Price</p>
            <p>Qty</p>
            <p>Remove</p>
            <p>Book</p>
          </div>
          {all.map((e) => {
            if (CartItems[e.id] > 0) {
              return (
                <div key={e.id}>
                  <div className="items-main">
                    <img src={e.image} alt="" className="product-icon" />
                    <p className="name">{e.name}</p>
                    <p className="price">₹{e.price}</p>
                    <p className="qty">{CartItems[e.id]}</p>  {/* This will display the updated quantity */}
                    <img
                      className="remove_icon"
                      src={remove_icon}
                      alt="#"
                      onClick={() => removeFromCart(e.id)}
                    />
                    {/* Navigate to CarViewPage */}
                    <button onClick={() => navigate(`/CarView/${e.id}`)}>
                      Rent Now
                    </button>
                  </div>
                  <hr />
                </div>
              );
            }
            return null;
          })}
        </>
      )}
    </div>
  );
};

export default CartItem;
