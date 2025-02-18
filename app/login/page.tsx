"use client";

import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

export default function Login() {
    const { signIn, signInWithGoogle } = useAuth(); 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const user = await signIn(email, password);
            if (user) { 
                router.push("/dashboard")
            };
        } catch (error) {
            console.error(error);
            alert("Invalid email or password/ Pleas try again.")
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const user = await signInWithGoogle();
            if (user) {
                router.push("/dashboard")
            };
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                <button type="submit">Login</button>
            </form>
            <button onClick={handleGoogleLogin}>Sign in with Google</button>
        </div>
    );
}