// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {getStorage} from 'firebase/storage'
const firebaseConfig = {
  apiKey: "AIzaSyAL4LE02I_LI8ySB3eaxjsHHeWfy81uPKI",
  authDomain: "undertheradar-378514.firebaseapp.com",
  projectId: "undertheradar-378514",
  storageBucket: "undertheradar-378514.appspot.com",
  messagingSenderId: "825876385694",
  appId: "1:825876385694:web:ab1ad9d6a53694d5f5908f",
  measurementId: "G-HVK8M8KWWJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage=getStorage(app);