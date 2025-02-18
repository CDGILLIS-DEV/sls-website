/* eslint-disable */
"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { FirebaseError } from "firebase/app";

export default function SignUpForm() {
  const { signUp, signInWithGoogle } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null; // Prevents hydration errors in Next.js

  // Handle Email/Password Signup + Send Verification Email
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const user = await signUp(email, password);
      if (user) {
        setMessage("A verification email has been sent. Please verify your email before logging in.");
        setTimeout(() => router.push("/login"), 5000); // Redirect to login after 5 sec
      }
    } catch (err: any) {
      if (err instanceof FirebaseError) {
        // Handle specific Firebase authentication errors
        switch (err.code) {
          case "auth/email-already-in-use":
            setError("This email is already in use. Try signing in instead.");
            break;
          case "auth/invalid-email":
            setError("Invalid email address. Please enter a valid email.");
            break;
          case "auth/weak-password":
            setError("Password should be at least 6 characters long.");
            break;
          default:
            setError("Signup failed. Please try again.");
        }
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
      console.error(err);
    }
  };

  // Handle Google Signup
  const handleGoogleSignUp = async () => {
    setError("");

    try {
      const user = await signInWithGoogle();
      if (user) {
        router.push("/dashboard");
      }
    } catch (err: any) {
      console.error(err);
      setError("Google signup failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-4">Sign Up</h2>

        {message && <p className="text-green-500 text-sm text-center">{message}</p>}
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <form onSubmit={handleSignUp} className="space-y-4">
          <div>
            <label className="block text-gray-600 text-sm mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 text-sm mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">Or sign up with</p>
          <button
            onClick={handleGoogleSignUp}
            className="mt-2 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-300"
          >
            Sign Up with Google
          </button>
        </div>
      </div>
    </div>
  );
}