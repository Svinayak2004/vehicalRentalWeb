const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            dbName: process.env.DB_NAME || undefined, // Use DB_NAME only if provided separately
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);
        console.log(`Connected to Database: ${conn.connection.name}`);
    } catch (err) {
        console.error("MongoDB Connection Error:", err);
        process.exit(1); // Exit the process if the connection fails
    }
};

// Event listeners for better error handling
mongoose.connection.on("error", (err) => {
    console.error("MongoDB Error:", err);
});

mongoose.connection.on("disconnected", () => {
    console.warn("MongoDB Disconnected. Attempting to reconnect...");
});

module.exports = connectDB;
