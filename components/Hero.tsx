"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Link as ScrollLink } from "react-scroll";

const Hero = () => {
  const { scrollY } = useScroll(); // Track scroll position
  const yPos = useTransform(scrollY, [0, 300], [0, -50]); // Move background slightly on scroll

  return (
    <section className="relative w-full h-screen overflow-hidden flex flex-col justify-center items-center text-center">
      {/* Parallax Background */}
      <motion.div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{ backgroundImage: 'url("/truck_on_rainday.jpeg")', y: yPos }} 
      />

      {/* Overlay to ensure text visibility */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center">
        <motion.h1 
          className="text-white text-5xl md:text-6xl font-bold leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Welcome to Simpatico Logistics
        </motion.h1>
        <motion.p 
          className="text-gray-200 text-lg md:text-xl mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Efficient logistics solutions with cutting-edge technology.
        </motion.p>

        {/* Call to Action Buttons */}
        <div className="mt-6 flex space-x-4">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ScrollLink 
            to="services" 
            smooth={true} 
            duration={800} 
            className="bg-primary text-white px-6 py-3 rounded-lg shadow-md transition-all hover:bg-green-700 cursor-pointer"
          >
            View Services
          </ScrollLink>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ScrollLink 
            to="contact" 
            smooth={true} 
            duration={800} 
            className="bg-white text-primary px-6 py-3 rounded-lg shadow-md border border-primary hover:bg-gray-200 transition-all cursor-pointer"
          >
            Get in Touch
          </ScrollLink>
        </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;