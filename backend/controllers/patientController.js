const admin = require("firebase-admin");
const db = admin.firestore();
const { v4: uuidv4 } = require("uuid");

module.exports = {
  createPatient: async (req, res) => {
    try {
      const {
        age,
        name,
        sex,
        email,
        howLongPatient,
        isBPPatient,
        doctor,
        medications,
      } = req.body;
      console.log("req.body:", req.body);
      const newPatientData = {
        age,
        name,
        sex,
        email,
        isBPPatient,
        howLongPatient,
        doctor,
        medications,
      };

      const randomId = uuidv4();

      const newPatientRef = await db
        .collection("patients")
        .doc(randomId.toString())
        .set(newPatientData);
      const newPatient = {
        id: randomId.toString(),
        ...newPatientData,
      };

      const userRef = db.collection("users").doc(randomId);
      await userRef.set({
        patientId: randomId,
        email: email,
        name: name,
        type: "patient",
        mobileNo: "",
      });

      res.status(200).json(newPatient);
    } catch (error) {
      console.error("Error creating patient:", error);
      res.status(500).json({ error: "Error creating patient" });
    }
  },

  updatePatient: async (req, res) => {
    try {
      const id = req.params.id;
      const { Age, Name, Sex, emailId, howLongPatient, doctorId, medications } =
        req.body;

      const updatedPatientData = {
        Age,
        Name,
        Sex,
        emailId,
        howLongPatient,
        doctorId,
        medications,
      };

      const patientRef = db.collection("patients").doc(id);
      await patientRef.update(updatedPatientData);

      const updatedPatientSnapshot = await patientRef.get();
      const updatedPatient = {
        id: patientRef.id,
        ...updatedPatientSnapshot.data(),
      };

      res.json(updatedPatient);
    } catch (error) {
      console.error("Error updating patient:", error);
      res.status(500).json({ error: "Error updating patient" });
    }
  },

  deletePatient: async (req, res) => {
    try {
      const id = req.params.id;

      const patientRef = db.collection("patients").doc(id);
      const deletedPatientSnapshot = await patientRef.get();
      const deletedPatient = {
        id: patientRef.id,
        ...deletedPatientSnapshot.data(),
      };

      await patientRef.delete();

      res.json(deletedPatient);
    } catch (error) {
      console.error("Error deleting patient:", error);
      res.status(500).json({ error: "Error deleting patient" });
    }
  },

  deleteAllPatients: async (req, res) => {
    try {
      const patientsSnapshot = await db.collection("patients").get();
      const patients = [];

      patientsSnapshot.forEach((doc) => {
        patients.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      await Promise.all(
        patients.map((patient) =>
          db.collection("patients").doc(patient.id).delete()
        )
      );

      res.json(patients);
    } catch (error) {
      console.error("Error deleting all patients:", error);
      res.status(500).json({ error: "Error deleting all patients" });
    }
  },

  getPatientById: async (req, res) => {
    try {
      const id = req.params.id;

      const patientRef = db.collection("patients").doc(id);
      const patientSnapshot = await patientRef.get();

      if (!patientSnapshot.exists) {
        return res.status(404).json({ error: "Patient not found" });
      }

      const patientData = patientSnapshot.data();
      const patient = { id: patientRef.id, ...patientData };

      res.json(patient);
    } catch (error) {
      console.error("Error getting patient by ID:", error);
      res.status(500).json({ error: "Error getting patient by ID" });
    }
  },

  getAllPatients: async (req, res) => {
    try {
      const patientsSnapshot = await db.collection("patients").get();
      const patients = [];

      patientsSnapshot.forEach((doc) => {
        const patientData = doc.data();
        const patient = { id: doc.id, ...patientData };
        patients.push(patient);
      });

      res.json(patients);
    } catch (error) {
      console.error("Error getting patients:", error);
      res.status(500).json({ error: "Error getting patients" });
    }
  },

  // Other methods if needed
};
