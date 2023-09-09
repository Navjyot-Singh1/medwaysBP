const express = require("express");
const router = express.Router();
const patientController = require("../controllers/patientController");

router.post("/", patientController.createPatient);
router.put("/:id", patientController.updatePatient);
router.delete("/:id", patientController.deletePatient);
router.get("/:id", patientController.getPatientById);
router.get("/", patientController.getAllPatients);

module.exports = router;
