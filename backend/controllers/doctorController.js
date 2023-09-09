const admin = require("firebase-admin");
const db = admin.firestore();
const { v4: uuidv4 } = require("uuid");

module.exports = {
  getById: async (req, res) => {
    try {
      const id = req.params.id;

      const doctorRef = db.collection("doctors").doc(id);
      const doctorSnapshot = await doctorRef.get();

      if (!doctorSnapshot.exists) {
        return res.status(404).json({ error: "Doctor not found Testing" });
      }

      const doctorData = doctorSnapshot.data();
      const doctor = { id: doctorRef.id, ...doctorData };

      res.json(doctor);
    } catch (error) {
      console.error("Error getting doctor by ID:", error);
      res.status(500).json({ error: "Error getting doctor by ID" });
    }
  },

  getAllDoctors: async (req, res) => {
    try {
      const doctorsSnapshot = await db.collection("doctors").get();
      const doctors = [];

      doctorsSnapshot.forEach((doc) => {
        const doctorData = doc.data();
        const doctor = { id: doc.id, ...doctorData };
        doctors.push(doctor);
      });

      res.json(doctors);
    } catch (error) {
      console.error("Error getting doctors:", error);
      res.status(500).json({ error: "Error getting doctors" });
    }
  },

  searchDoctors: async (req, res) => {
    try {
      const searchQuery = req.body.query;
      const type = req.body.type;

      if (!searchQuery) {
        return res.status(400).json({ error: "Search query is required" });
      }

      const doctorsSnapshot =
        type === "Name"
          ? await db
              .collection("doctors")
              .orderBy("Name")
              .startAt(searchQuery)
              .endAt(searchQuery + "\uf8ff")
              .get()
          : await db
              .collection("doctors")
              .where("MobileNo", "==", searchQuery)
              .get();

      const doctors = [];
      doctorsSnapshot.forEach((doc) => {
        const doctorData = doc.data();
        doctors.push({
          id: doc.id,
          Name: doctorData.Name,
          ClinicAddress: doctorData.ClinicAddress,
          mobileNo: doctorData.mobileNo,
          Qualifications: doctorData.Qualifications,
        });
      });
      if (doctors.length === 0) {
        return res
          .status(404)
          .json({ error: "No doctors found with the search query" });
      } else {
        res.status(200).json(doctors);
      }
    } catch (error) {
      console.error("Error searching for doctors:", error);
      res.status(500).json({ error: "Error searching for doctors" });
    }
  },

  createDoctor: async (req, res) => {
    try {
      console.log("req.body", req.body);
      const { Name, ClinicAddress, MobileNo, Qualifications, Email, DoctorID } =
        req.body;

      const newDoctorData = {
        Name,
        Email,
        ClinicAddress,
        MobileNo,
        Qualifications,
        DoctorID,
      };

      console.log("newDoctorData", newDoctorData);

      const randomId = uuidv4();

      const newDoctorRef = await db
        .collection("doctors")
        .doc(randomId)
        .set({
          ...newDoctorData,
        });
      const newDoctor = { id: randomId, ...newDoctorData };

      const userRef = db.collection("users").doc(randomId);
      await userRef.set({
        doctorId: randomId,
        email: Email,
        name: Name,
        type: "doctor",
        mobileNo: MobileNo,
      });

      res.status(200).json(newDoctor);
    } catch (error) {
      console.error("Error creating doctor:", error);
      res.status(500).json({ error: "Error creating doctor" });
    }
  },

  updateDoctor: async (req, res) => {
    try {
      const id = req.params.id;
      const { Name, ClinicAddress, MobileNo, Qualifications } = req.body;

      const updatedDoctorData = {
        Name,
        Email,
        ClinicAddress,
        MobileNo,
        Qualifications,
      };

      const doctorRef = db.collection("doctors").doc(id);
      await doctorRef.update(updatedDoctorData);

      const updatedDoctorSnapshot = await doctorRef.get();
      const updatedDoctor = {
        id: doctorRef.id,
        ...updatedDoctorSnapshot.data(),
      };

      res.json(updatedDoctor);
    } catch (error) {
      console.error("Error updating doctor:", error);
      res.status(500).json({ error: "Error updating doctor" });
    }
  },

  deleteDoctor: async (req, res) => {
    try {
      const id = req.params.id;

      const doctorRef = db.collection("doctors").doc(id);
      const deletedDoctorSnapshot = await doctorRef.get();
      const deletedDoctor = {
        id: doctorRef.id,
        ...deletedDoctorSnapshot.data(),
      };

      await doctorRef.delete();

      res.json(deletedDoctor);
    } catch (error) {
      console.error("Error deleting doctor:", error);
      res.status(500).json({ error: "Error deleting doctor" });
    }
  },
};
