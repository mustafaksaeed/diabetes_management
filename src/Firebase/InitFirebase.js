// init firebase here
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBR0N3uMD1rNezzzXYfF1X9nq80fnA9La4",
  authDomain: "diabetesmanagement-d1f16.firebaseapp.com",
  projectId: "diabetesmanagement-d1f16",
  storageBucket: "diabetesmanagement-d1f16.firebasestorage.app",
  messagingSenderId: "663333132911",
  appId: "1:663333132911:web:9bbe3cc4ee3a6fa7e34b9a",
  measurementId: "G-S8443Y3BVM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
// const analytics = getAnalytics(app);

console.log("Firebase initialized successfully", app, auth, db);

export {
  app,
  auth,
  db,
  // analytics
};
