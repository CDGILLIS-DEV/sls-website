"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Hero from "../components/Hero";
import Services from "../components/Services";
import About from "../components/About";
import Contact from "../components/Contact";

// Helper function for fade-in scroll animations
const FadeInSection = ({ children }: { children: React.ReactNode }) => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Animates once when the section enters view
    threshold: 0.2, // Triggers when 20% is visible
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 50 }}
      transition={{ duration: 2.0, ease: "easeOut" }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
};

export default function HomePage() {
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
      <FadeInSection>
        <section id="services" className="min-h-screen w-full flex flex-col items-center justify-center bg-white py-20 px-6">
          <Services />
        </section>
      </FadeInSection>

      {/* About Section */}
      <FadeInSection>
        <section id="about" className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-100 py-20 px-6">
          <About />
        </section>
      </FadeInSection>

      {/* Contact Section */}
      <FadeInSection>
        <section id="contact" className="min-h-screen w-full flex flex-col items-center justify-center bg-white py-20 px-6">
          <Contact />
        </section>
      </FadeInSection>
    </main>
  );
}