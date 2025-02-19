"use client";

export default function Contact() {
  return (
    <div className="max-w-6xl text-center px-6">
      <h2 className="text-4xl font-semibold text-primary mb-6">Contact Us</h2>
      <p className="text-gray-700 text-lg mb-6">
        Have questions or need a quote? Reach out to us.
      </p>

      <form className="flex flex-col gap-4 max-w-md mx-auto">
        <input type="text" placeholder="Your Name" className="p-3 border border-gray-300 rounded-lg" />
        <input type="email" placeholder="Your Email" className="p-3 border border-gray-300 rounded-lg" />
        <textarea placeholder="Your Message" className="p-3 border border-gray-300 rounded-lg h-32"></textarea>
        <button type="submit" className="bg-primary text-white p-3 rounded-lg hover:bg-primary-dark">
          Send Message
        </button>
      </form>
    </div>
  );
}