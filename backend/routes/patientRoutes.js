const express = require("express");
const router = express.Router();
const patientController = require("../controllers/patientController");

router.post("/", patientController.createPatient);
router.put("/:id", patientController.updatePatient);
router.delete("/:id", patientController.deletePatient);
// router.delete("/", patientController.deleteAllPatients);
router.get("/:id", patientController.getPatientById);
router.get("/", patientController.getAllPatients);
router.get("/doctors/:doctorId", patientController.getPatientsByDoctorId);

module.exports = router;
