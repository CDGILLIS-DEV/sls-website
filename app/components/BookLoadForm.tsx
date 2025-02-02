"use client";
import { useState } from "react";

const BookLoadForm = () => {
  const [formData, setFormData] = useState({
    shipperName: "",
    contactEmail: "",
    pickupLocation: "",
    deliveryLocation: "",
    freightDetails: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/book-load", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      alert(result.message);
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="text" name="shipperName" placeholder="Shipper Name" value={formData.shipperName} onChange={handleChange} required />
      <input type="email" name="contactEmail" placeholder="Contact Email" value={formData.contactEmail} onChange={handleChange} required />
      <input type="text" name="pickupLocation" placeholder="Pickup Location" value={formData.pickupLocation} onChange={handleChange} required />
      <input type="text" name="deliveryLocation" placeholder="Delivery Location" value={formData.deliveryLocation} onChange={handleChange} required />
      <textarea name="freightDetails" placeholder="Freight Details" value={formData.freightDetails} onChange={handleChange} required />
      <button type="submit" className="bg-primary text-white px-4 py-2 rounded">Submit Booking</button>
    </form>
  );
};

export default BookLoadForm;