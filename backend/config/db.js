const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      dbName: process.env.DB_NAME || "car_rental", // Default to "car_rental" if DB_NAME is not set
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(`Connected to Database: ${conn.connection.name}`);
  } catch (error) {
    console.error("MongoDB Connection Error:", error.message);
    process.exit(1); // Exit process with failure
  }
};

// Event listeners for better error handling
mongoose.connection.on("disconnected", () => {
  console.warn("MongoDB Disconnected. Attempting to reconnect...");
});

module.exports = connectDB;
