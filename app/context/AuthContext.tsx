/* eslint-disable */
"use client"

import { Children, createContext, useContext, useEffect, useState } from "react";
import { auth, googleProvider } from "@/lib/firbase";
import { 
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    User
 } from "firebase/auth";
import { unsubscribe } from "diagnostics_channel";

import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firbase";

const fetchUserRole = async (uid: string) => {
   const userRef = doc(db, "users", uid);
   const userSnap = await getDoc(userRef);
   return userSnap.exists() ? userSnap.data().role : "customers";
};

 interface AuthContextProps {
    user: User | null;
    loading: boolean;
    signUp: (email: string, password: string) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    googleLogin: () => Promise<void>;
    logout: () => Promise<void>;
 }

 const AuthContext = createContext<AuthContextProps | undefined>(undefined);

 export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });
        return () => unsubscribe();
     }, []);

     const signUp = async (email: string, password: string) => {
        await createUserWithEmailAndPassword(auth, email, password);
     };

     const login = async (email: string, password: string) => {
        signInWithEmailAndPassword(auth, email, password)
     };

     const googleLogin = async () => {
        await signInWithPopup(auth, googleProvider)
     };

     const logout = async () => {
        await signOut(auth);
     };

     return (
        <AuthContext.Provider value={{ user, loading, signUp, login, googleLogin, logout }}>
            {children}
        </AuthContext.Provider>
     );
 };

 export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context;
 };
