// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB6NtB4dSvcGpRHc_3iLmY0Yogpv8vPExY",
  authDomain: "aitrip-71892.firebaseapp.com",
  projectId: "aitrip-71892",
  storageBucket: "aitrip-71892.firebasestorage.app",
  messagingSenderId: "90422702103",
  appId: "1:90422702103:web:15649eba053c07ac93ac52",
  measurementId: "G-8QL06BZ0LJ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
// const analytics = getAnalytics(app);