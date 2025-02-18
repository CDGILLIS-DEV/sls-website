"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  sendEmailVerification,
  signOut, 
  onAuthStateChanged, 
  User 
} from "firebase/auth";
import { auth, googleProvider, db } from "../../lib/firebase";
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

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<string | null>(null);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // Fetch the user's role from Firestore
        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setRole(userSnap.data().role);
        }
        setUser(currentUser);
      } else {
        setUser(null);
        setRole(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Sign Up with Email & Password + Send Verification Email
  const signUp = async (email: string, password: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Send email verification
    if (userCredential.user) {
      await sendEmailVerification(userCredential.user);
      
      // Store user details in Firestore
      const userRef = doc(db, "users", userCredential.user.uid);
      await setDoc(userRef, {
        email: email,
        role: "customer",
        verified: false,
      });
    }

    return userCredential.user;
  };

  // Sign In with Email & Password (Only allow verified users)
  const signIn = async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    if (!userCredential.user.emailVerified) {
      throw new Error("Please verify your email before logging in.");
    }

    return userCredential.user;
  };

  // Sign In with Google & Store in Firestore if New User
  const signInWithGoogle = async () => {
    const userCredential = await signInWithPopup(auth, googleProvider);
    const googleUser = userCredential.user;

    // Check if the user already exists in Firestore
    const userRef = doc(db, "users", googleUser.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      // If the user is new, save them in Firestore
      await setDoc(userRef, {
        email: googleUser.email,
        role: "customer",
        verified: true,
      });
      setRole("customer"); // Set role for state
    }

    return googleUser;
  };

  // Sign Out
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

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};