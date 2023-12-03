import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDyX7AD5UtACiTZB0H6qp-P-0tTHkDIiYg",
  authDomain: "mymap-4fe12.firebaseapp.com",
  projectId: "mymap-4fe12",
  storageBucket: "mymap-4fe12.appspot.com",
  messagingSenderId: "563903834949",
  appId: "1:563903834949:web:dc8850b8d14713caee6c2c",
  measurementId: "G-SEC0YHLDZS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
