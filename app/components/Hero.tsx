"use client"

import React from "react";

const Hero = () => {
    return (
        <section className="relative flex flex-col justify-center items-center min-h-screen bg-light"
            style={{ backgroundImage: "url('/path-to-your-background-image.jpg')" }}>
      <div className="container mx-auto text-center px-6 pb-20">
        <h1 className="text-5xl md:text-5xl font-light text-primary leading-tight tracking-wide">
          Welcome to Simpatico Logistics Services
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto pt-10">
          Delivering seamless and efficient freight solutions.
        </p>
        <div className="mt-8 pb-48">
          <button className="px-8 py-4 bg-green-600 text-white rounded-full shadow-lg transform transition hover:scale-105">
          <a href="/services">
            Explore Our Services
          </a>
          </button>
        </div>
      </div>
        </section>
    );
};

export default Hero;