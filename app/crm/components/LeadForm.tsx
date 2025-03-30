"use client";
import { useState } from "react";
import { db } from "lib/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

export default function LeadForm() {
    const[formData, setFormData] = useState({
        companyName: "",
        contactName: "",
        email: "",
        productType: "",
        notes: "",
    });

    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
          await addDoc(collection(db, "leads"), {
            ...formData,
            status: "New",
            createdAt: Timestamp.now(),
          });

          setFormData({
            companyName: "",
            contactName: "",
            email: "",
            productType: "",
            notes: "",
          });

          setSubmitted(true);
          setTimeout(() => setSubmitted(false), 3000);
        } catch (error) {
            console.error("Error adding lead:", error);
        }

        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-x1 shadow-md space-y-4">
            <h2 className="text-x1 font-semibold">Add Manufactuer Lead</h2>

            <input
            type="text"
            name="companyName"
            placeholder="Company Name"
            className="w-full p-2 border rounded"
            value={formData.companyName}
            onChange={handleChange}
            required
            />

            <input
            type="text"
            name="contactName"
            placeholder="Contact Name"
            className="w-full p-2 border rounded"
            value={formData.contactName}
            onChange={handleChange}
            />

            <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-2 border rounded"
            value={formData.email}
            onChange={handleChange}
            />

            <input
            type="text"
            name="productType"
            placeholder="Product Type"
            className="w-full p-2 border rounded"
            value={formData.productType}
            onChange={handleChange}
            />

            <textarea
            name="notes"
            placeholder="Notes"
            className="w-full p-2 border rounded"
            value={formData.notes}
            onChange={handleChange}
            />
            
            <button
             type="submit"
             className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
             disabled={loading}
            >
               {loading ? "Submitting..." : "Submit Lead"}
            </button>

            {submitted && (
                <p className="text-green-600">Lead submitted successfully!</p>
            )}
        </form>
    );
}