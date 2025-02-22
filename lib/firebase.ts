/* eslint-disable */
"use client";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, doc, setDoc, collection, addDoc } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// Function to Add a Shipment
export const addShipment = async (shipmentData: any, userId: string) => {
  try {
    await addDoc(collection(db, "shipments"), {
      ...shipmentData,
      userId, // Ensures only this user can see their shipments
      dateBooked: new Date().toISOString(),
    });

    console.log("Shipment added successfully!");
  } catch (error) {
    console.error("Error adding shipment:", error);
  }
};

// Export Firebase Instances
export { auth, googleProvider, db };