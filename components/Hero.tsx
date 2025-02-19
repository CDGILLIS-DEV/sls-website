"use client";

import { motion } from "framer-motion";
import React from "react";

const Hero = () => {
  return (
    <section 
      className="relative flex flex-col justify-center items-center min-h-screen bg-light bg-cover bg-center bg-no-repeat h-screen"
      style={{ backgroundImage: "url(/truck_on_rainday.jpeg)" }}
    >
      {/* Dark Overlay for better contrast */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content Container */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative container mx-auto text-center px-6 pb-20"
      >
        {/* Heading Animation */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-5xl md:text-5xl font-light text-[#64e687] leading-tight tracking-wide"
        >
          Welcome to Simpatico Logistics Services
        </motion.h1>

        {/* Subheading Animation */}
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-4 text-lg text-white max-w-2xl mx-auto pt-10"
        >
          Delivering seamless and efficient freight solutions.
        </motion.p>

        {/* CTA Button Animation */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-8 pb-48"
        >
          <a href="/services">
            <button className="px-8 py-4 bg-green-600 text-white rounded-full shadow-lg transform transition hover:scale-110">
              Explore Our Services
            </button>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;