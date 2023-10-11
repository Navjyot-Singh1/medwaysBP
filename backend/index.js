const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");

const admin = require("firebase-admin");
const credentials = require("./key.json");

admin.initializeApp({
  credential: admin.credential.cert(credentials),
});

dotenv.config();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

//Routes for doctors
const doctorRoutes = require("./routes/doctorRoutes");
app.use("/api", doctorRoutes);

//Routes for patients
const patientRoutes = require("./routes/patientRoutes");
app.use("/api/patients", patientRoutes);

//Routes for readings
const readingRoutes = require("./routes/readingRoutes");
app.use("/api/readings", readingRoutes);

//Routes for auth
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

//Routes for users
const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
