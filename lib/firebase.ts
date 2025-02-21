/* eslint-disable */
"use client";
// Import the necessary Firebase SDKs
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  createUserWithEmailAndPassword 
} from "firebase/auth";
import { 
  getFirestore, 
  doc, 
  setDoc, 
  collection, 
  getDocs, 
  addDoc, 
  DocumentData
} from "firebase/firestore";

// Firebase configuration (Loaded from environment variables)
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // Initialize Firestore instance
const googleProvider = new GoogleAuthProvider();

interface Shipment {
  id?: string; // Firstone will auto-generate an ID if not provided
  trackingNumber: string;
  status: string;
  origin: string;
  destination: string;
  updatedAt: string;
}

// Function to Sign in with Google & Store User in Firestore
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    // Store user data in Firestore
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || "",
      photoURL: user.photoURL || "",
      createdAt: new Date(),
      role: "customer", // Default role
    });

    return user;
  } catch (error) {
    console.error("Google Sign-in Error:", error);
  }
};

// Function to Fetch Shipments from Firestore (Used in Dashboard)
export const getShipments = async () => {
  try {
    const shipmentCollection = collection(db, "shipments");
    const snapshot = await getDocs(shipmentCollection);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching shipments:", error);
    return [];
  }
};

// Function to Add a Shipment Manually (For Testing Manual Updates)
export const addShipment = async (shipmentData: Shipment) => {
  try {
    const shipmentCollection = collection(db, "shipments");
    await addDoc(shipmentCollection, shipmentData);
    console.log("Shipment added successfully!");
  } catch (error) {
    console.error("Error adding shipment:", error);
  }
};

// Export Firebase Instances
export { auth, googleProvider, db };