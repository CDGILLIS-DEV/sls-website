"use client";
import { useState } from "react";


export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    
      const [status, setStatus] = useState({ success: false, message: "" });
    
      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus({ success: false, message: "Sending..." });
    
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
    
        const data = await res.json();
        setStatus({ success: data.success, message: data.message });
    
        if (data.success) setFormData({ name: "", email: "", subject: "", message: "" });
      };
    return (  
      <div className="container mx-auto pt-20 pb-12 px-6">
        <h1 className="text-4xl font-bold text-primary text-center mb-6">Contact Us</h1>
        <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-12">
          We'd love to hear from you! Reach out with any questions or inquiries.
        </p>
  
        {/* Contact Information */}
        <div className="grid md:grid-cols-3 gap-8 text-center mb-12">
          <div>
            <h3 className="text-xl font-semibold">📧 Email</h3>
            <p className="text-gray-600">info@simpatico.com</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">📞 Phone</h3>
            <p className="text-gray-600">+1 314 629 3352</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">📍 Address</h3>
            <p className="text-gray-600">123 Simpatico Blvd, St. Louis, MO</p>
          </div>
        </div>
  
        {/* Contact Form */}
        <div className="max-w-2xl mx-auto bg-white shadow-md p-6 rounded-lg">
        <form onSubmit={handleSubmit} className="mt-6 max-w-lg mx-auto bg-white p-6 shadow-lg rounded-lg">
            <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
            />
            </div>

            <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
            />
            </div>

            <div className="mb-4">
            <label className="block text-gray-700">Subject</label>
            <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            </div>

            <div className="mb-4">
            <label className="block text-gray-700">Message</label>
            <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
            ></textarea>
            </div>

            <button type="submit" className="w-full bg-primary text-white py-2 rounded-lg hover:bg-green-700 transition">
            Send Message
            </button>

            {status.message && (
            <p className={`text-center mt-3 ${status.success ? "text-green-600" : "text-red-600"}`}>
                {status.message}
            </p>
            )}
        </form>
        </div>
        <div className="mt-12">
        <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.661192947496!2d-83.7165!3d33.9343!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88f5fcf539dbe5ed%3A0x55c0b8f2c6a96a0e!2sBethlehem%2C%20GA!5e0!3m2!1sen!2sus!4v1706315648350"
            className="w-full h-96 border-0 rounded-lg"
            allowFullScreen
            loading="lazy"
        ></iframe>
        </div>
      </div>
    );
  }