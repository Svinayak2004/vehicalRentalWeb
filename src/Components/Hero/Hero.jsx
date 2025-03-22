import React from 'react';
import './Hero.css';

const Hero = ({ scrollToExplore }) => {
  return (
    <div className='hero'>
      <div className="slider"></div>  {/* Auto-changing background */}
      <div className="overlay"></div>
      <div className="content">
        <h1>Your Perfect Ride Awaits</h1>
        <p>
          Discover top-notch vehicles tailored for your needs. Whether it's a family trip, a business journey, or an adventure, we have it all.
        </p>
        <div className="buttons">
          <button className="explore-btn1" onClick={scrollToExplore}>Explore Now</button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
