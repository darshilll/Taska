/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: "taskmanager-7007f.firebaseapp.com",
  projectId: "taskmanager-7007f",
  storageBucket: "taskmanager-7007f.appspot.com",
  messagingSenderId: "988537864157",
  appId: "1:988537864157:web:b822c8f17316e71052c034",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
