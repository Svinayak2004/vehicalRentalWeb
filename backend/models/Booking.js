const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  adharNumber: { type: String, required: true },
  contact: { type: String, required: true },
  pickUpDate: { type: Date, required: true },  // Changed from String to Date
  dropDate: { type: Date, required: true },    // Changed from String to Date
  withDriver: { type: Boolean, default: false },
  driverDays: { type: Number, default: 0 },
  carId: { type: mongoose.Schema.Types.ObjectId, ref: "Car", required: true }, // Changed from Number to ObjectId
  totalAmount: { type: Number, required: true }
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
