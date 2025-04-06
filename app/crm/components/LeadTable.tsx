/* eslint-disable */ 
"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where, orderBy, updateDoc, doc } from "firebase/firestore";
import { auth, db } from "lib/firebase";
import { format } from "date-fns";
import LeadForm from "./LeadForm";
import toast from "react-hot-toast";
import { motion, AnimatePresence} from "framer-motion";

interface Lead {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  productType: string;
  notes: string;
  status: string;
  createdAt: string;
}


export default function LeadTable() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedLeadIds, setSelectedLeadIds] = useState<string[]>([]);
  const [batchStatus, setBatchStatus] = useState("");
  const [allSelected, setAllSelected] = useState(false);
   

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
          phone: data.phone || "",
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
       toast.success("Lead status updated!");
      } catch (error) {
        console.error("Error updating lead status:", error);
        toast.error("Failed to update lead status.");
      }
    };

    const handleCheckboxChange = (leadId: string) => {
      setSelectedLeadIds(prev => 
        prev.includes(leadId)
        ? prev.filter(id => id !== leadId)
        : [...prev, leadId]
      );
    };

    const handleBatchUpdate = async () => {
      try {
         const updates = selectedLeadIds.map(async (leadId) => {
            const leadRef = doc(db, "leads", leadId);
            return updateDoc(leadRef, { status: batchStatus });
          });
         
        await Promise.all(updates);  
        toast.success("Status updated successfully!");
        setSelectedLeadIds([]);
        setBatchStatus("");
        setAllSelected(false);
      } catch (error) {
        toast.error("Failed to update statuses.");
        console.error("Batch update error:", error);
      }
    };

    const handleSelectAll = () => {
        if (!allSelected) {
            const AllIds = leads.map((lead) => lead.id);
            setSelectedLeadIds(AllIds);
        } else {
            setSelectedLeadIds([]);
        }
        setAllSelected(!allSelected);

    };

    const toggleLeadSelection = (id: string) => {
      setSelectedLeadIds((prev) => 
        prev.includes(id) ? prev.filter((leadId) => leadId !== id) : [...prev, id]
     );
    };
    
    const clearSelection = () => {
        setSelectedLeadIds([]);
        setAllSelected(false)
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case "New":
                return "bg-gray-200 text-gray-800";
            case "In Progress":
                return "bg-blue-200 text-blue-800";
            case "Closed":
                return "bg-green-200 text-green-800";
            case "Lost":
                return "bg-red-200 text-red-800";
            case "Follow Up":
                return "bg-yellow-200 text-yellow-800";
            default:
                return "bg-gray-100 text-gray-700"       
        }
      };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold text-green-800 mb-6">My Leads</h2>
      <div className="mb-4">
        <input
          id="selectAll"
          type="checkbox"
          checked={allSelected}
          onChange={handleSelectAll}
        /> 
        <label className="text-sm font-medium px-2" htmlFor="selectAll">
        Select All 
        </label>
    </div> 
      <div className="overflow-x-auto rounded-xl shadow-md bg-white">
        <table className="min-w-full text-sm text-left text-gray-700" >
          <thead className="bg-gray-100 text-xs uppercase text-gray-500">
            <tr>
              <th className="px-2 py-4"></th>
              <th className="px-2 py-4">Company</th>
              <th className="px-2 py-4">Contact</th>
              <th className="px-2 py-4">Email</th>
              <th className="px-2 py-4">Phone</th>
              <th className="px-2 py-4">Product</th>
              <th className="px-2 py-4">Status</th>
              <th className="px-2 py-4">Created</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id} className="border-b hover:bg-gray-50 transition">
                <td>
                  <input
                      type="checkbox"
                      checked={selectedLeadIds.includes(lead.id)}
                      onChange={() => toggleLeadSelection(lead.id)}
                      className="mr-6"
                  />
                </td>
                <td className="px-2 py-4">{lead.companyName}</td>
                <td className="px-2 py-4">{lead.contactName}</td>
                <td className="px-2 py-4">{lead.email}</td>
                <td className="px-2 py-4">{lead.phone}</td>
                <td className="px-2 py-4">{lead.productType}</td>
                <td className="px-2 py-4">
                  <select
                    value={lead.status}
                    onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                    className={`border px-2 py-1 rounded ${getStatusColor(lead.status)}`}
                    >
                      <option value="New">New</option>
                      <option value="In Progress">In Progress</option>   
                      <option value="Closed">Closed-won</option>  
                      <option value="Lost">Closed-lost</option> 
                      <option value="Follow Up">Follow Up</option>   
                  </select>
                </td>
                <td className="px-6 py-4">{lead.createdAt}</td>
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
      <div></div>
      <div>
      </div>
            <div className="flex items-center gap-2 mt-8 mb-2">
                <select 
                    value={batchStatus} 
                    onChange={(e) => setBatchStatus(e.target.value)}
                >
                    <option value="">Select Status</option>
                    <option value="New">New</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Closed">Closed-won</option>
                    <option value="Lost">Closed-lost</option>
                    <option value="Follow Up">Follow Up</option>
                </select>
            </div>
            <div className="flex items-center gap-2 mt-2 mb-4">
                <button
                    onClick={handleBatchUpdate}
                    disabled={selectedLeadIds.length === 0 || batchStatus ===""}
                    className="bg-blue-600 text-white px-4 py-1 mt-2 rounded disabled:opacity-50"
                >
                    Update Selected
                </button>

                <AnimatePresence>
                    {selectedLeadIds.length > 0 && (
                        <motion.button
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 10 }}
                        exit={{ opacity:0, x: 10 }} 
                        transition={{ duration: 0.2 }} 
                        className="text-sm text-red-600 underline hover:text-gray-800 transition mt-4"
                        onClick={clearSelection}
                        >
                        Clear Selected  
                        </motion.button>
                    )}
                </AnimatePresence>               
            </div>
    </div>
  );
}