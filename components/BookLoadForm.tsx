'use client';
import { useState } from 'react';

const BookLoadForm = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    pickupLocation: '',
    dropoffLocation: '',
    freightDetails: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage("")

    try {
      const response = await fetch('/api/book-load', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        setMessage("Booking submitted successfully!");
        setFormData({
          companyName: "",
          email: "",
          pickupLocation: "",
          dropoffLocation: "",
          freightDetails: "",
        });
      } else {
        setMessage(result.message);
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
      console.log(error)
    } finally {
      setLoading(false)
    }
  }; 

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-white hover:shadow-2xl rounded-md">
      <h2 className="text-xl font-semibold text-center mb-4">Book a Load</h2>

      <input
        type="text"
        name="companyName"
        value={formData.companyName}
        onChange={handleChange}
        placeholder="Company Name"
        required
        className="w-full p-2 border border-gray-300 rounded mb-2"
      />

      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
        className="w-full p-2 border border-gray-300 rounded mb-2"
      />

      <input
        type="text"
        name="pickupLocation"
        value={formData.pickupLocation}
        onChange={handleChange}
        placeholder="Pickup Location"
        required
        className="w-full p-2 border border-gray-300 rounded mb-2"
      />

      <input
        type="text"
        name="dropoffLocation"
        value={formData.dropoffLocation}
        onChange={handleChange}
        placeholder="Dropoff Location"
        required
        className="w-full p-2 border border-gray-300 rounded mb-2"
      />

      <textarea
        name="freightDetails"
        value={formData.freightDetails}
        onChange={handleChange}
        placeholder="Freight Details"
        required
        className="w-full p-2 border border-gray-300 rounded mb-2"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
      >
        {loading ? "Submitting..." : "Submit Booking"}
      </button>

      {message && <p className="text-center mt-2 text-sm text-gray-600">{message}</p>}
    </form>
  );
};

export default BookLoadForm;