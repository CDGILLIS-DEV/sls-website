"use client"

import { useState } from "react";
import Link from "next/link";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/outline";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-primary text-2xl font-serif font-extralight">
          Simpatico Logistics Services
        </Link>
        <div className="hidden md:flex space-x-6">
          <Link href="/" className="text-dark hover:text-primary transition-all">
            Home
          </Link>
          <Link href="/services" className="text-dark hover:text-primary transition-all">
            Services
          </Link>
          <Link href="/about" className="text-dark hover:text-primary transition-colors">
            About
          </Link>
          <Link href="/contact" className="text-dark hover:text-primary transition-all">
            Contact
          </Link>
          <Link href="/rate-estimator" className="text-dark hover:text-primary transition-all">
            Rate Estimator
          </Link>
          <Link href="/book-load" className="text-dark hover:text-primary transition-all">
            Book Load
          </Link>
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <MinusIcon className="h-6 w-6 text-dark" /> : <PlusIcon className="h-6 w-6 text-dark" />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-white shadow-md">
          <Link href="/" className="block px-6 py-2 text-dark hover:bg-primary hover:text-white">
            Home
          </Link>
          <Link href="/services" className="block px-6 py-2 text-dark hover:bg-primary hover:text-white">
            Services
          </Link>
          <Link href="/about" className="block px-6 py-2 text-dark hover:bg-primary hover:text-white">
            About
          </Link>
          <Link href="/contact" className="block px-6 py-2 text-dark hover:bg-primary hover:text-white">
            Contact
          </Link>
          <Link href="/rate-estimator" className="block px-6 py-2 text-dark hover:bg-primary hover:text-white">
            Rate Estimator
          </Link>
          <Link href="/book-load" className="block px-6 py-2 text-dark hover:bg-primary hover:text-white">
            Book Load
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;