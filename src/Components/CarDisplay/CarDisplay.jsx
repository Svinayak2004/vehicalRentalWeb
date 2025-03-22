import React, { useContext, useState } from "react";
import "./CarDisplay.css";
import { StoreContext } from "../../Context/StoreContext.jsx";
import CarItem from "../CarItem/CarItem.jsx";

const CarDisplay = ({ category }) => {
  const { all } = useContext(StoreContext);
  const [filter, setFilter] = useState("");

  // Filtered data based on category and additional filters
  const filteredItems = all.filter((item) => {
    if (category === "All") return true;
    if (category === item.category) {
      if (category === "Car" && filter) return item.seat === parseInt(filter);
      if (category === "Bike" && filter) return item.type === filter;
      return true;
    }
    return false;
  });

  return (
    <div className="car-display" id="carDisplay">
      <h1>Choose Your Ride</h1>

      {/* Filters for Cars and Bikes */}
      {category === "Car" && (
        <div className="filters">
          <button
            className={filter === "5" ? "active" : ""}
            onClick={() => setFilter("5")}
          >
            5-Seater
          </button>
          <button
            className={filter === "7" ? "active" : ""}
            onClick={() => setFilter("7")}
          >
            7-Seater
          </button>
          <button onClick={() => setFilter("")}>All</button>
        </div>
      )}
      {category === "Bike" && (
        <div className="filters">
          <button
            className={filter === "Gear" ? "active" : ""}
            onClick={() => setFilter("Gear")}
          >
            Gear
          </button>
          <button
            className={filter === "Non-Gear" ? "active" : ""}
            onClick={() => setFilter("Non-Gear")}
          >
            Non-Gear
          </button>
          <button onClick={() => setFilter("")}>All</button>
        </div>
      )}

      {/* Items Display */}
      <div className="items">
        {filteredItems.map((item) => (
          <CarItem
            key={item.id}
            id={item.id}
            name={item.name}
            price={item.price}
            category={item.category}
            image={item.image}
          />
        ))}
      </div>
      <hr />
    </div>
  );
};

export default CarDisplay;
