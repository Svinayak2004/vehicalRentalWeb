import React from 'react';
import './Benefits.css';
import limit from '../Assets/limit.webp';
import well from '../Assets/well-maintained.webp';
import secure from '../Assets/secure-payment.webp';
import bullshit from '../Assets/24-hours.webp';
import verify from '../Assets/person.webp';
import cash from '../Assets/cash.webp';


const Benefits = () => {
  return (
    <div className='benefits'>
      <div className="container">
        <h1>Benefits of Choosing Self Drive Cars in Mumbai</h1>
        <div className="points">
            <div className="point">
                <img className="special-img" src={limit} alt="No Riding Limits"
                style={{ width: '80px', height: '80px' }}/>                
                
                <p>No Riding Limits</p>
                <p>Odometer Won't Scare You Anymore.</p>
            </div>
            <div className="point">
                <img src={well} alt="" />
                <p>Well Maintained</p>
                <p>Regular service and maintenance.</p>
            </div>
            <div className="point"> 
                <img className="special-img" src={secure} alt="No Riding Limits"
                style={{ width: '80px', height: '80px' }}/>                
                
                <p>Secure Payments</p>
                <p>Our Payment Partners are Industry Leaders.
                </p>
            </div>
            <div className="point">
                <img src={bullshit} alt="" />
                <p>No Bullshit</p>
                <p>A Day Rent is simply for 24 hrs, We mean it.
                </p>
            </div>
            <div className="point">
                <img src={verify} alt="" />
                <p>Verified Dealers</p>
                <p>Every Single Dealer is Committed to Quality Service.</p>
            </div>
            <div className="point">
                <img src={cash} alt="" />
                <p>100% Moneyback</p>
                <p>Not Happy With Service, Take Your Money Back.</p>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Benefits
