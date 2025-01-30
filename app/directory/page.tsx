import Services from '../components/Services';


export default function Home() {
  return (
    <section className="relative flex flex-col justify-center items-center min-h-screen bg-light">
  <div className="container mx-auto text-center px-6">
    <h1 className="text-5xl md:text-7xl font-light text-primary leading-tight tracking-wide">
      Welcome to Simpatico Logistics Services LLC
    </h1>
    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
      Delivering seamless and efficient freight solutions.
    </p>
    <div className="mt-8">
      <a href="/services" className="px-8 py-4 bg-green-600 text-white rounded-full shadow-lg transform transition hover:scale-105">
        Explore Our Services
      </a>
    </div>
  </div>

  {/* Stylish Section Divider */}
  <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
    <svg className="relative block w-full h-24" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 1200 120">
      <path d="M0,60L120,52C240,44,480,28,720,28C960,28,1200,44,1320,52L1440,60L1440,120L0,120Z" fill="#047857"></path>
    </svg>
  </div>
</section>
  );
}