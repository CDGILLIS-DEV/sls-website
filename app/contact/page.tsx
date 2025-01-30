export default function Contact() {
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
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700">Your Name</label>
              <input type="text" className="w-full p-3 border rounded-lg focus:ring focus:ring-primary" required />
            </div>
            <div>
              <label className="block text-gray-700">Your Email</label>
              <input type="email" className="w-full p-3 border rounded-lg focus:ring focus:ring-primary" required />
            </div>
            <div>
              <label className="block text-gray-700">Message</label>
              <textarea className="w-full p-3 border rounded-lg focus:ring focus:ring-primary" rows={4} required></textarea>
            </div>
            <button type="submit" className="w-full bg-primary text-white p-3 rounded-lg hover:bg-green-700">
              Send Message
            </button>
          </form>
        </div>
      </div>
    );
  }