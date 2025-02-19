"use client";

export default function Services() {
  return (
    <div className="max-w-6xl text-center px-6">
      <h2 className="text-4xl font-semibold text-primary mb-6">Our Services</h2>
      <p className="text-gray-700 text-lg mb-4">
        We provide top-tier freight brokerage solutions, ensuring efficient and cost-effective logistics for your business.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white shadow-lg rounded-lg">
          <h3 className="text-xl font-semibold text-dark">Full Truckload (FTL)</h3>
          <p className="text-gray-600">Reliable and fast shipping for full loads.</p>
        </div>
        <div className="p-6 bg-white shadow-lg rounded-lg">
          <h3 className="text-xl font-semibold text-dark">Less Than Truckload (LTL)</h3>
          <p className="text-gray-600">Affordable shipping for smaller freight loads.</p>
        </div>
        <div className="p-6 bg-white shadow-lg rounded-lg">
          <h3 className="text-xl font-semibold text-dark">Expedited Shipping</h3>
          <p className="text-gray-600">Fast and reliable delivery for urgent shipments.</p>
        </div>
      </div>
    </div>
  );
}