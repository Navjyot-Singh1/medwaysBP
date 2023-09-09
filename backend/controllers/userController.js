const admin = require("firebase-admin");
const db = admin.firestore();

module.exports = {
  registerUser: async (req, res) => {
    try {
      // Extract user data from the request body
      const { doctorId, patientId, email, type, mobileNo, uid } = req.body;

      // Create a new document in the "users" collection
      const userRef = db.collection("users").doc(uid);
      await userRef.set({
        doctorId,
        patientId,
        email,
        type,
        mobileNo,
      });

      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
  getUserById: async (req, res) => {
    try {
      const id = req.params.id;

      const userRef = db.collection("users").doc(id);
      const userSnapshot = await userRef.get();

      if (!userSnapshot.exists) {
        return res.status(404).json({ error: "User not found" });
      }

      const userData = userSnapshot.data();
      const user = { id: userRef.id, ...userData };

      res.json(user);
    } catch (error) {
      console.error("Error getting user by ID:", error);
      res.status(500).json({ error: "Error getting user by ID" });
    }
  },
};
