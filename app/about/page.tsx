export default function About() {
    return (
      <div className="container mx-auto pb-12 px-6">
        <h1 className="text-4xl font-bold text-primary text-center mb-6">About Us</h1>
        <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-12">
          At Simpatico Logistics, we are committed to providing top-tier logistics solutions tailored to meet your needs.
        </p>
  
        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-6 bg-light rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-dark mb-4">Our Mission</h2>
            <p className="text-gray-600">
              To revolutionize logistics by providing seamless, efficient, and cost-effective solutions for businesses worldwide.
            </p>
          </div>
  
          <div className="p-6 bg-light rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-dark mb-4">Our Values</h2>
            <ul className="list-disc pl-5 text-gray-600">
              <li>Customer Satisfaction</li>
              <li>Innovation</li>
              <li>Transparency</li>
              <li>Reliability</li>
            </ul>
          </div>
        </div>
  
        {/* <div className="mt-12 text-center">
          <img src="/about-image.jpg" alt="Company" className="mx-auto rounded-lg shadow-lg max-w-lg" />
        </div> */}
      </div>
    );
  }