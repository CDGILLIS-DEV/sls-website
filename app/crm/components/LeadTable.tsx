/* eslint-disable */ 
"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where, orderBy, updateDoc, doc } from "firebase/firestore";
import { auth, db } from "lib/firebase";
import { format } from "date-fns";
import LeadForm from "./LeadForm";

interface Lead {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  productType: string;
  notes: string;
  status: string;
  createdAt: string;
}

export default function LeadTable() {
  const [leads, setLeads] = useState<Lead[]>([]);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    console.log("Current user UID:", user.uid)

    const q = query(
      collection(db, "leads"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      console.log("Snapshot size:", snapshot.size);  
      const leadData = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          companyName: data.companyName || "",
          contactName: data.contactName || "",
          email: data.email || "",
          productType: data.productType || "",
          notes: data.notes || "",
          status: data.status || "New",
          createdAt: format(new Date(data.createdAt), "MMM d, yyyy"),
        };
      });
      setLeads(leadData);
    });

    return () => unsubscribe();
  }, []);

  const handleStatusChange = async (leadId: string, newStatus: string) => {
    try {
        const leadRef = doc(db, "leads", leadId);
        await updateDoc(leadRef, { status: newStatus });
    } catch (error) {
        console.error("Error updating status:", error);
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold text-green-800 mb-4">My Leads</h2>
      <div className="overflow-x-auto rounded-xl shadow-md bg-white">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 text-xs uppercase text-gray-500">
            <tr>
              <th className="px-6 py-4">Company</th>
              <th className="px-6 py-4">Contact</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Product</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Created</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id} className="border-b hover:bg-gray-50 transition">
                <td className="px-6 py-3">{lead.companyName}</td>
                <td className="px-6 py-3">{lead.contactName}</td>
                <td className="px-6 py-3">{lead.email}</td>
                <td className="px-6 py-3">{lead.productType}</td>
                <td className="px-6 py-3">
                  <span className="inline-block rounded-full bg-blue-100 text-blue-600 px-3 py-1 text-xs font-medium">
                    {lead.status}
                  </span>
                </td>
                <td className="px-6 py-3">{lead.createdAt}</td>
              </tr>
            ))}
            {leads.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center text-gray-400 py-6">
                  No leads submitted yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}