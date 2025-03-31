/* eslint-disable */
"use client";
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  createUserWithEmailAndPassword, 
  sendEmailVerification, 
  User
} from "firebase/auth";
import { 
  getFirestore, 
  doc, 
  setDoc, 
  collection, 
  addDoc, 
  getDoc 
} from "firebase/firestore";

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

// Function to Sign Up a User and Send Verification Email
export const signUpUser = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Send email verification
    await sendEmailVerification(user);

    return { success: true, message: "Verification email sent. Please check your inbox." };
  } catch (error) {
    console.error("Signup error:", error);
    return { success: false, message: (error as Error).message };
  }
};

// Save user to Firestore ONLY after email verification
export const saveUserToFirestore = async (user: User) => {
  try {
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    // Avoid overwriting if user already exists
    if (!userSnap.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || "",
        createdAt: new Date(),
        role: "customer", // Default role
      });
    }
  } catch (error) {
    console.error("Error saving user to Firestore:", error);
  }
};

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

// Function to Add a Lead
export const addLead = async (leadData: any, userId: string) => {
try {
  const newLead = {
    ...leadData,
    userId: userId,
    createdAt: new Date().toISOString(),
  };
  const docRef = await addDoc(collection(db, "leads"), newLead);
  console.log("Lead with ID added successfully!:", docRef.id);
  return docRef.id;
  } catch (error) {
    console.error("Error adding lead:", error);
  }
}

// Export Firebase Instances
export { auth, googleProvider, db };