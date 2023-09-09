const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Route for sending OTP
router.post("/send-otp", authController.sendOTP);

// Route for verifying OTP
router.post("/verify-otp", authController.verifyOTP);

module.exports = router;
