const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

// Route to save booking details
router.post("/create", async (req, res) => {
  try {
    const { name, adharNumber, contact, pickUpDate, dropDate, withDriver, driverDays, carId, totalAmount } = req.body;

    // Ensure required fields are present
    if (!name || !adharNumber || !contact || !pickUpDate || !dropDate || !carId || !totalAmount) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const booking = new Booking({
      name,
      adharNumber,
      contact,
      pickUpDate,
      dropDate,
      withDriver,
      driverDays,
      carId,
      totalAmount, // Ensure totalAmount is stored
    });

    await booking.save();
    res.status(201).json({ message: "Booking created successfully!", booking });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Route to fetch all bookings
router.get("/all", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
