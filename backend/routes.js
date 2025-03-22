const express = require("express");
const razorpay = require("./razorpay");
const crypto = require("crypto");

const router = express.Router();

router.post("/create-order", async (req, res) => {
  try {
    const { amount, currency } = req.body;

    const options = {
      amount: amount * 100, // Razorpay works in paise (₹1 = 100 paise)
      currency,
      receipt: `receipt_${Math.random() * 1000}`,
      payment_capture: 1 // Auto capture
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).send("Error in creating Razorpay order");
  }
});

router.post("/verify-payment", (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  const secret = process.env.RAZORPAY_KEY_SECRET;

  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
  const calculatedSignature = hmac.digest("hex");

  if (calculatedSignature === razorpay_signature) {
    res.json({ success: true, message: "Payment verified successfully" });
  } else {
    res.status(400).json({ success: false, message: "Invalid payment signature" });
  }
});

module.exports = router;
