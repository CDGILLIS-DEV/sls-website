import Hero from "../components/Hero";
import Services from "../components/Services";
import About from "../components/About";
import Contact from "../components/Contact";

export default function Home() {
  return (
    <main className="relative flex flex-col items-center bg-light">
      {/* Hero Section */}
      <section id="hero" className="relative flex flex-col justify-center items-center min-h-screen">
        <Hero />
        {/* Stylish Section Divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] pb-20">
          <svg className="relative block w-full h-24" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 1200 120">
            <path d="M0,60L120,52C240,44,480,28,720,28C960,28,1200,44,1320,52L1440,60L1440,120L0,120Z" fill="#033F02"></path>
          </svg>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="min-h-screen w-full flex flex-col items-center justify-center bg-white py-20 px-6">
        <Services />
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-100 py-20 px-6">
        <About />
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen w-full flex flex-col items-center justify-center bg-white py-20 px-6">
        <Contact />
      </section>
    </main>
  );
}