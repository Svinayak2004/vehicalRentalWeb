import React, { useState, useEffect, useContext } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import cart_icon from '../Assets/cart_icon.png';
import user_icon from '../Assets/user_icon.png'; // Import user icon
import { StoreContext } from '../../Context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ setShowLogin, scrollToExplore, isLoggedIn, userName, handleLogout }) => {
  const navigate = useNavigate();
  const { CartItems } = useContext(StoreContext);
  const [menu, setMenu] = useState("Home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const hasCartItems = Object.values(CartItems).some((count) => count > 0);

  const handleBookClick = () => {
    setMenu("Cars");
    setIsMobileMenuOpen(false);

    if (window.location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        scrollToExplore();
      }, 300);
    } else {
      scrollToExplore();
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Show success popup for 2 seconds after login
  useEffect(() => {
    if (isLoggedIn) {
      setShowSuccessPopup(true);
      setTimeout(() => {
        setShowSuccessPopup(false);
      }, 2000);
    }
  }, [isLoggedIn]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".user-dropdown")) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar">
      {showSuccessPopup && (
        <div className="success-popup">Successfully Logged In!</div>
      )}

      <div className="logo">
        <span className="orange-text">VARS</span> {!isMobile && " Vehicle Rentals"}
      </div>

      <div className="hamburger" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <ul className={`nav-links ${isMobileMenuOpen ? "active" : ""}`}>
        <Link to="/" onClick={() => { setMenu("Home"); setIsMobileMenuOpen(false); }} className={menu === "Home" ? "active" : ""}>
          Home
        </Link>

        <li onClick={handleBookClick} className={menu === "Cars" ? "active" : ""}>
          <a>Book</a>
        </li>

        <li onClick={() => { setMenu("About"); setIsMobileMenuOpen(false); }} className={menu === "About" ? "active" : ""}>
          <a href="#footer">About Us</a>
        </li>

        <li onClick={() => { setMenu("Contact"); setIsMobileMenuOpen(false); }} className={menu === "Contact" ? "active" : ""}>
          <a href="#footer">Contact</a>
        </li>
      </ul>

      <div className="right">
        <Link to="/Cart">
          <div className="cart">
            <img className="cart_icon" src={cart_icon} alt="Cart" />
            {hasCartItems && <span className="cart-badge"></span>}
          </div>
        </Link>

        {isLoggedIn ? (
          <div className="user-dropdown" onClick={() => setShowDropdown(!showDropdown)}>
            <img className="user-icon" src={user_icon} alt="User" />
            
            {showDropdown && (
              <div className="dropdown-menu" onClick={(e) => e.stopPropagation()}>
                <p onClick={handleLogout}>Logout</p>
              </div>
            )}
          </div>
        ) : (
          <button onClick={() => setShowLogin(true)}>Login</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
