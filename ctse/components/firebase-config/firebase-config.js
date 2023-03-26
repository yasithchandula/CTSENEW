import { initializeApp, getApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAmPtZHoi55pAQxfMryNMkBnDRwa0RThUE",
  authDomain: "ctse-5d0d7.firebaseapp.com",
  projectId: "ctse-5d0d7",
  storageBucket: "ctse-5d0d7.appspot.com",
  messagingSenderId: "2499125066",
  appId: "1:2499125066:web:a25b2e183d70e2028c6bb3",
  measurementId: "G-BZQEN6LGZC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage=getStorage(app);


export const db = getFirestore(app);
