import { initializeApp, getApps, getApp } from "firebase/app";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCE1F7p_6tcJ8U7pYaVbbR7xC2-rNKnqPs",
  authDomain: "nexus-a317c.firebaseapp.com",
  projectId: "nexus-a317c",
  storageBucket: "nexus-a317c.firebasestorage.app",
  messagingSenderId: "127427301669",
  appId: "1:127427301669:web:1c28c82f832a933fdd0acc",
  measurementId: "G-NZ2C6LGR1Y"
};


export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
