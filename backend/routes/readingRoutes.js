const express = require("express");
const router = express.Router();
const readingController = require("../controllers/readingController");

router.post("/", readingController.createReading);
router.put("/:id", readingController.updateReading);
router.delete("/:id", readingController.deleteReading);
router.get("/:id", readingController.getReadingById);
router.get("/", readingController.getAllReadings);

module.exports = router;
