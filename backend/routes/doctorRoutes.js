const express = require("express");
const router = express.Router();
const doctorController = require("../controllers/doctorController");

// Create a new doctor
router.post("/doctors", doctorController.createDoctor);

// Update an existing doctor by ID
router.put("/doctors/:id", doctorController.updateDoctor);

// Delete a doctor by ID
router.delete("/doctors/:id", doctorController.deleteDoctor);

// Get a doctor by ID
// router.get("/doctors/:id", doctorController.getById);

// Get all doctors
router.get("/doctors", doctorController.getAllDoctors);

// Search for doctors by name or mobile number
router.post("/doctors/search", doctorController.searchDoctors);

module.exports = router;
