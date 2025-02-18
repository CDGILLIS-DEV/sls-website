<<<<<<< HEAD:app/components/ProtectedRoute.tsx
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
=======
"use client";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
>>>>>>> d5c309e (Corrected the directory/file structure and wrapped page elements of the /app/layout.tsx file in the <AuthProvider> component for correct Firebase client side rendering of app pages):components/ProtectedRoute.tsx
import { ReactNode, useEffect } from "react";

interface ProtectedRouteProps {
    children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        }
<<<<<<< HEAD:app/components/ProtectedRoute.tsx
    }, [user, loading]
  );
=======
    }, [loading, user, router]);
>>>>>>> d5c309e (Corrected the directory/file structure and wrapped page elements of the /app/layout.tsx file in the <AuthProvider> component for correct Firebase client side rendering of app pages):components/ProtectedRoute.tsx

    return user ? children : null;
}