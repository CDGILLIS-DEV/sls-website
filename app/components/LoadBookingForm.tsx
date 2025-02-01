"use client";
import { useState } from "react";

const LoadBookingForm = () => {
    const [formData, setFormData] = useState({
        companyName: "",
        contactName: "",
        email: "",
        phone: "",
        pickupLocation: "",
        dropoffLocation: "",
        pickupDate: "",
        deliveryDate: "",
        loadDescription: "",
    });

const [successMessage, setSuccessMessage] = useState("");

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
};

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/book-load", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.success) {
        setSuccessMessage("Load booking submitted successfully!");
        setFormData({
            companyName: "",
            contactName: "",
            email: "",
            phone: "",
            pickupLocation: "",
            dropoffLocation: "",
            pickupDate: "",
            deliveryDate: "",
            loadDescription: "",
        });
    } else {
        setSuccessMessage("Error submitting the booking. Please try again.");
    }
 };

 return (
    <div className="max-w-lg mx-auto bg-white shadow-lg p-8 rounded-md mt-10">
      <h2 className="text-2xl font-semibold text-center text-primary">Book a Load Shipment</h2>

      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <input
          type="text"
          name="companyName"
          placeholder="Company Name"
          value={formData.companyName}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-md p-3"
        />

        <input
          type="text"
          name="contactName"
          placeholder="Contact Person"
          value={formData.contactName}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-md p-3"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-md p-3"
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-md p-3"
        />

        <input
          type="text"
          name="pickupLocation"
          placeholder="Pickup Location"
          value={formData.pickupLocation}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-md p-3"
        />

        <input
          type="text"
          name="dropoffLocation"
          placeholder="Drop-off Location"
          value={formData.dropoffLocation}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-md p-3"
        />

        <input
          type="date"
          name="pickupDate"
          value={formData.pickupDate}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-md p-3"
        />

        <input
          type="date"
          name="deliveryDate"
          value={formData.deliveryDate}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-md p-3"
        />

        <textarea
          name="loadDescription"
          placeholder="Load Description"
          value={formData.loadDescription}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-md p-3"
        ></textarea>

        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded-md hover:bg-green-700 transition"
        >
          Submit Booking
        </button>
      </form>

      {successMessage && (
        <p className="mt-4 text-center text-green-600">{successMessage}</p>
      )}
    </div>
  );
};

export default LoadBookingForm;