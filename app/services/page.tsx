export default function Services() {
  return (
    <div className="container mx-auto pb-12">
      <h1 className="text-4xl font-bold text-primary text-center mb-6">
        Our Services
      </h1>
      <p className="text-lg text-gray-600 text-center mb-12">
        We offer a range of logistics services to meet your transportation needs.
      </p>
      
      <div className="grid md:grid-cols-3 gap-8">
        <div className="p-6 bg-light rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-dark mb-4">Freight Brokerage</h2>
          <p className="text-gray-600">
            Our expert team connects shippers with carriers to ensure timely and cost-effective deliveries.
          </p>
        </div>
        
        <div className="p-6 bg-light rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-dark mb-4">Warehousing</h2>
          <p className="text-gray-600">
            Secure and scalable storage solutions tailored to your business needs.
          </p>
        </div>

        <div className="p-6 bg-light rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-dark mb-4">Real-Time Tracking</h2>
          <p className="text-gray-600">
            Stay informed with live updates on your shipments, anytime, anywhere.
          </p>
        </div>
      </div>
    </div>
  );
}