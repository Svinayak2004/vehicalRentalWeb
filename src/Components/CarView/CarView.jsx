import React, { useContext, useEffect, useState, useRef } from "react";
import "./CarView.css";
import { useParams } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext.jsx";

const CarView = () => {
  const { id } = useParams();
  const { all, addToCart } = useContext(StoreContext);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    adharNumber: "",
    contact: "",
    pickUpDate: "",
    pickUpTime: "",
    dropDate: "",
    dropTime: "",
    withDriver: false,
    driverDays: 0,
  });

  const [totalAmount, setTotalAmount] = useState(0);
  const [carRent, setCarRent] = useState(0);
  const [driverRent, setDriverRent] = useState(0);
  const formRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const item = all.find((item) => item.id === parseInt(id));

  useEffect(() => {
    if (item && formData.pickUpDate && formData.dropDate) {
      const pickUp = new Date(formData.pickUpDate);
      const drop = new Date(formData.dropDate);
      const days = Math.max(1, Math.ceil((drop - pickUp) / (1000 * 60 * 60 * 24)));

      let carCost = days * item.price;
      if (days >= 30) carCost = days * (item.price * 0.8);
      else if (days >= 7) carCost = days * (item.price * 0.9);

      let driverCost = formData.withDriver ? formData.driverDays * 1000 : 0;

      setCarRent(carCost);
      setDriverRent(driverCost);
      setTotalAmount(carCost + driverCost);
    }
  }, [formData.pickUpDate, formData.dropDate, formData.withDriver, formData.driverDays, item]);

  if (!item) {
    return <div className="car-view">Item not found!</div>;
  }

  const pricePerWeek = Math.round(item.price * 7 * 0.9);
  const pricePerMonth = Math.round(item.price * 30 * 0.8);

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "name" && !/^[A-Za-z\s]+$/.test(value)) {
      alert("Name should only contain letters and spaces.");
      return;
    }
    if (name === "adharNumber" && !/^\d{0,12}$/.test(value)) {
      alert("Enter a valid Aadhar Number");
      return;
    }
    if (name === "contact" && !/^\d{0,10}$/.test(value)) {
      alert("Enter a valid mobile number.");
      return;
    }

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleRentNowClick = () => {
    setShowForm(true);
    setTimeout(() => {
      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const bookingData = {
      name: formData.name,
      adharNumber: formData.adharNumber,
      contact: formData.contact,
      pickUpDate: new Date(formData.pickUpDate).toISOString(), // Ensure correct format
      dropDate: new Date(formData.dropDate).toISOString(), // Ensure correct format
      withDriver: formData.withDriver,
      driverDays: formData.withDriver ? formData.driverDays : 0, // Prevent invalid values
      totalAmount,
      carId: item.id, // Ensure carId is correctly assigned
    };
  
    try {
      const response = await fetch("http://localhost:5000/api/bookings/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });
  
      const responseData = await response.json(); // Read response
  
      if (response.ok) {
        alert("Booking confirmed!");
      } else {
        console.error("Booking error:", responseData); // Log server response
        alert(`Failed to book. Error: ${responseData.message || "Try again."}`);
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Error submitting booking. Check your connection.");
    }
  };
  
  

  return (
    <div className={`car-view ${showForm ? "expanded" : ""}`}>
      <div className="car-container">
        <div className="car-left">
          <img src={item.image} alt={item.name} />
          <h2>{item.name}</h2>
        </div>

        <div className="car-right">
          <h3>Details:</h3>
          <div className="details-row">
            {item.category === "Car" && <p>Seats: {item.seat}</p>}
            {item.category === "Bike" && <p>Type: {item.type}</p>}
          </div>

          <div className="price-labels">
            <div className="price-label-container">
              <div className="price-row">
                <div className="price-label1">
                  <span className="price-text">₹{item.price}</span>
                  <span className="duration-text">/day</span>
                </div>
                <div className="price-label2">
                  <span className="price-text">₹{pricePerWeek}</span>
                  <span className="duration-text">/week</span>
                </div>
              </div>
              <div className="price-label3">
                <span className="price-text">₹{pricePerMonth}</span>
                <span className="duration-text">/month</span>
              </div>
            </div>
          </div>

          <div className="action-buttons">
            <button className="rent-now" onClick={handleRentNowClick}>
              Rent Now
            </button>
            <button onClick={() => addToCart(item.id)} className="add-to-cart">
              Add to Booking
            </button>
          </div>
        </div>
      </div>

      {showForm && (
        <div className="booking-details" ref={formRef}>
          <h2>Book Your Ride Here</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <label>Customer Name: <input type="text" name="name" value={formData.name} onChange={handleFormChange} required /></label>
              <label>Aadhar Number: <input type="text" name="adharNumber" value={formData.adharNumber} onChange={handleFormChange} required /></label>
              <label>Contact Number: <input type="text" name="contact" value={formData.contact} onChange={handleFormChange} required /></label>
            </div>
            <div className="form-row">
              <label>Pick-Up Date: <input type="date" name="pickUpDate" value={formData.pickUpDate} onChange={handleFormChange} required /></label>
              <label>Drop Date: <input type="date" name="dropDate" value={formData.dropDate} onChange={handleFormChange} required /></label>
            </div>
            <div className="form-row">
            <div className="checkbox-container">
              <input type="checkbox" name="withDriver" checked={formData.withDriver} onChange={handleFormChange} className="checkbox" />
              <label className="checkbox-label">With Driver (₹1000/day)</label>
            </div>

              {formData.withDriver && (
                <div className="driver-days">
                  <label>Driver Days:</label>
                  <input type="number" name="driverDays" value={formData.driverDays} onChange={handleFormChange} min="1" required />
                </div>
              )}
            </div>


            <div className="price-breakdown">
              <p>Car Rent: ₹{carRent}</p>
              <p>Driver Rent: ₹{driverRent}</p>
              <h3>Total: ₹{totalAmount}</h3>
            </div>

            <button type="submit">Book Now</button>
          </form>
          <p className="advertisement">Get 10% discount on weekly and 20% discount on monthly rentals!</p>
        </div>
      )}
    </div>
  );
};

export default CarView;