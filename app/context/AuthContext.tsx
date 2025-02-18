"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { auth, googleProvider, db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

// Define the context type
interface AuthContextProps {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<User | null>;
  signIn: (email: string, password: string) => Promise<User | null>;
  signInWithGoogle: () => Promise<User | null>;
  signOutUser: () => Promise<void>;
  role: string | null;
}

// Create context
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Custom hook for using auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Auth Provider component
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [role, setRole] = useState<string | null>(null);

  // Handle user state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      if (currentUser) {
        // Fetch user role from Firestore (if using role-based access)
        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setRole(userSnap.data().role);
        } else {
          setRole("customer"); // Default role
          await setDoc(userRef, { role: "customer" }); // Save role to Firestore
        }
      } else {
        setRole(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // Sign up function
  const signUp = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const newUser = userCredential.user;
      
      // Store user in Firestore with a default role
      await setDoc(doc(db, "users", newUser.uid), { email, role: "customer" });

      return newUser;
    } catch (error) {
      console.error("Signup Error:", error);
      throw error;
    }
  };

  // Sign in function
  const signIn = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      console.error("Signin Error:", error);
      throw error;
    }
  };

  // Sign in with Google
  const signInWithGoogle = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const googleUser = userCredential.user;

      // Check if user exists in Firestore
      const userRef = doc(db, "users", googleUser.uid);
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) {
        await setDoc(userRef, { email: googleUser.email, role: "customer" });
      }

      return googleUser;
    } catch (error) {
      console.error("Google Signin Error:", error);
      throw error;
    }
  };

  // Sign out function
  const signOutUser = async () => {
    await signOut(auth);
    setUser(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signInWithGoogle, signOutUser, role }}>
      {children}
    </AuthContext.Provider>
  );
};

