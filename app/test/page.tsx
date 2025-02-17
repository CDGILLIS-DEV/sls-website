"use client";

import { auth } from "@/lib/firbase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const TestAuth = () => {
    const handleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            console.log("User:", result.user)
        } catch (error){
            console.log("Login Error:", error);
        }
    };

    return (
        <div className="text-center p-10">
            <h1 className="text-2x1 font-bold">Firebase Auth Test</h1>
            <button onClick={handleLogin} className="bg-green-700 text-white px-4 py-2 mt-4">Login with Google</button>
        </div>
    );          
};

export default TestAuth;