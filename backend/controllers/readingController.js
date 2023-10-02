const admin = require("firebase-admin");
const db = admin.firestore();

module.exports = {
  createReading: async (req, res) => {
    try {
      const {
        actionsTaken,
        diastolicPressure,
        patientId,
        symptoms,
        systolicPressure,
        pulse,
        timestamp,
      } = req.body;

      const newReadingData = {
        actionsTaken,
        diastolicPressure,
        patientId,
        symptoms,
        systolicPressure,
        pulse,
        timestamp,
      };

      const newReadingRef = await db.collection("readings").add(newReadingData);
      const newReading = { id: newReadingRef.id, ...newReadingData };

      res.json(newReading);
    } catch (error) {
      console.error("Error creating reading:", error);
      res.status(500).json({ error: "Error creating reading" });
    }
  },

  updateReading: async (req, res) => {
    try {
      const id = req.params.id;
      const {
        actionsTaken,
        diastolicPressure,
        patientId,
        symptoms,
        systolicPressure,
        pulse,
        timestamp,
      } = req.body;

      const updatedReadingData = {
        actionsTaken,
        diastolicPressure,
        patientId,
        symptoms,
        pulse,
        systolicPressure,
        timestamp,
      };

      const readingRef = db.collection("readings").doc(id);
      await readingRef.update(updatedReadingData);

      const updatedReadingSnapshot = await readingRef.get();
      const updatedReading = {
        id: readingRef.id,
        ...updatedReadingSnapshot.data(),
      };

      res.json(updatedReading);
    } catch (error) {
      console.error("Error updating reading:", error);
      res.status(500).json({ error: "Error updating reading" });
    }
  },

  deleteReading: async (req, res) => {
    try {
      const id = req.params.id;

      const readingRef = db.collection("readings").doc(id);
      const deletedReadingSnapshot = await readingRef.get();
      const deletedReading = {
        id: readingRef.id,
        ...deletedReadingSnapshot.data(),
      };

      await readingRef.delete();

      res.json(deletedReading);
    } catch (error) {
      console.error("Error deleting reading:", error);
      res.status(500).json({ error: "Error deleting reading" });
    }
  },

  getReadingById: async (req, res) => {
    try {
      const id = req.params.id;

      const readingRef = db.collection("readings").doc(id);
      const readingSnapshot = await readingRef.get();

      if (!readingSnapshot.exists) {
        return res.status(404).json({ error: "Reading not found" });
      }

      const readingData = readingSnapshot.data();
      const reading = { id: readingRef.id, ...readingData };

      res.json(reading);
    } catch (error) {
      console.error("Error getting reading by ID:", error);
      res.status(500).json({ error: "Error getting reading by ID" });
    }
  },

  getAllReadings: async (req, res) => {
    try {
      const readingsSnapshot = await db.collection("readings").get();
      const readings = [];

      readingsSnapshot.forEach((doc) => {
        const readingData = doc.data();
        const reading = { id: doc.id, ...readingData };
        readings.push(reading);
      });

      res.json(readings);
    } catch (error) {
      console.error("Error getting readings:", error);
      res.status(500).json({ error: "Error getting readings" });
    }
  },

  getReadingsByPatientID: async (req, res) => {
    try {
      console.log("req.body:", req.body);
      const { patientId } = req.body;
      console.log(patientId);
      const readingsSnapshot = await db
        .collection("readings")
        .where("patientId", "==", patientId)
        .get();
      const readings = [];

      readingsSnapshot.forEach((doc) => {
        const readingData = doc.data();
        const reading = { id: doc.id, ...readingData };
        readings.push(reading);
      });

      res.json(readings);
    } catch (error) {
      console.error("Error getting readings:", error);
      res.status(500).json({ error: "Error getting readings" });
    }
  },
};
