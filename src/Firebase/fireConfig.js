
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA_K-FK4HNoFnfDDK4993WPTkryV0qO3Uk",
  authDomain: "react-firebase-commerce-26144.firebaseapp.com",
  projectId: "react-firebase-commerce-26144",
  storageBucket: "react-firebase-commerce-26144.appspot.com",
  messagingSenderId: "341195996646",
  appId: "1:341195996646:web:52dd0a0385843d410f6a27",
  measurementId: "G-T0NYQTRXM4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const fireDb=getFirestore(app);

export default fireDb;