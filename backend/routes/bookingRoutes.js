const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Booking = require("../models/Booking");

// Middleware to log request details
router.use((req, res, next) => {
  console.log("Received Request:", req.method, req.url);
  console.log("Request Body:", req.body);
  next();
});

// Route to create a new booking
router.post("/create", async (req, res) => {
  try {
    const { name, adharNumber, contact, pickUpDate, dropDate, withDriver, driverDays, carId, totalAmount } = req.body;

    // Check for missing fields
    if (!name || !adharNumber || !contact || !pickUpDate || !dropDate || !carId || !totalAmount) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Convert dates to Date objects
    const formattedPickUpDate = new Date(pickUpDate);
    const formattedDropDate = new Date(dropDate);

    // Ensure carId is a valid ObjectId
    const carObjectId = new mongoose.Types.ObjectId(carId);

    // Create and save the booking
    const booking = new Booking({
      name,
      adharNumber,
      contact,
      pickUpDate: formattedPickUpDate,
      dropDate: formattedDropDate,
      withDriver,
      driverDays,
      carId: carObjectId,
      totalAmount
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
