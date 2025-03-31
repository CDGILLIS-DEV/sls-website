/* eslint-disable */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "lib/firebase";
import LeadForm from "./components/LeadForm";
import type { User } from "firebase/auth"; 
import LeadTable from "./components/LeadTable";

export default function CRMPage() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (!firebaseUser) {
        router.push("/login"); // Redirect if not logged in
      } else {
        setUser(firebaseUser);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <h1 className="text-3xl font-semibold text-gray-800">Simpatico CRM</h1>
        <p className="text-gray-500 text-sm">
          Track manufacturers you generate and manage shipment opportunities.
        </p>

        <div className="bg-white shadow-xl rounded-2xl p-6 transition hover:shadow-2xl">
          <LeadForm />
        </div>

        <div className="bg-white shadow-xl rounded-2xl p-6 transition hover:shadow-2xl">
          <LeadTable />
        </div>

      </div>
    </div>
  );
}