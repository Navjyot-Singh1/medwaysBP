// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const { getAnalytics } = require("firebase/analytics");
const firebase = require("firebase");

const firebaseConfig = {
  apiKey: "AIzaSyBa1D7bIRM78hzLdO6ysRioTF96RHfiRqM",
  authDomain: "medways-bp-tracker-4c1fe.firebaseapp.com",
  projectId: "medways-bp-tracker-4c1fe",
  storageBucket: "medways-bp-tracker-4c1fe.appspot.com",
  messagingSenderId: "555071872161",
  appId: "1:555071872161:web:eea9076dd25cea2570e4e0",
  measurementId: "G-6QVV4DNDYJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = firebase.firestore();

//Collection references
const users = db.collection("users");
const readings = db.collection("readings");
const doctors = db.collection("doctors");
const patients = db.collection("patients");

module.exports = {
  firebase,
  db,
  users,
  readings,
  doctors,
  patients,
};
