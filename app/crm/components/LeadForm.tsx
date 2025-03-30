"use client";

import { useState } from "react";
import { db } from "lib/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { motion } from "framer-motion";

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
        <motion.form 
        onSubmit={handleSubmit} 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-4"
        >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <input
                    type="text"
                    name="companyName"
                    placeholder="Company Name"
                    className="w-full p-2 border rounded"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                    />
                </div>

                <div> 
                    <input
                    type="text"
                    name="contactName"
                    placeholder="Contact Name"
                    className="w-full p-2 border rounded"
                    value={formData.contactName}
                    onChange={handleChange}
                    />
                </div>

                <div>
                    <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full p-2 border rounded"
                    value={formData.email}
                    onChange={handleChange}
                    />
                </div>                

                <div>
                    <input
                    type="text"
                    name="productType"
                    placeholder="Product Type"
                    className="w-full p-2 border rounded"
                    value={formData.productType}
                    onChange={handleChange}
                    />
                </div>
              </div>

              <div>
                <textarea
                name="notes"
                placeholder="Notes"
                className="w-full p-2 border rounded"
                value={formData.notes}
                onChange={handleChange}
                />
              </div>
            <button
             type="submit"
             disabled={loading}
             className={`w-full sm:w-auto px-6 py-2 text-sm font-medium rounded-x1 transition
            ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
            >
               {loading ? "Submitting..." : "Submit Lead"}
            </button>

            {submitted && (
                <motion.p 
                  className="text-green-600 text-sm mt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  Lead submitted successfully!
                </motion.p>
            )}
        </motion.form>
    );
}