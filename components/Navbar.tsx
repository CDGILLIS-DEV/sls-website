"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/outline";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOutUser } = useAuth();

  // Function to close the menu when clicking a link
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-primary text-2xl font-serif font-extralight">
          <Image
            src="/SLS LOGO.png"
            alt="Simpatico Logistics Services Logo"
            width={175}
            height={50}
            className="cursor-pointer"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link href="/" className="text-dark hover:text-primary transition-all">Home</Link>
          <Link href="/services" className="text-dark hover:text-primary transition-all">Services</Link>
          <Link href="/about" className="text-dark hover:text-primary transition-all">About</Link>
          <Link href="/contact" className="text-dark hover:text-primary transition-all">Contact</Link>
          <Link href="/rate-estimator" className="text-dark hover:text-primary transition-all">Rate Estimator</Link>
          <Link href="/book-load" className="text-dark hover:text-primary transition-all">Book Load</Link>

          {/* Authentication Links */}
          {user ? (
            <>
              <Link href="/dashboard" className="text-dark hover:text-primary transition-all">Dashboard</Link>
              <button
                onClick={signOutUser}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all">
                Login
              </Link>
              <Link href="/signup" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all">
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <MinusIcon className="h-6 w-6 text-dark" /> : <PlusIcon className="h-6 w-6 text-dark" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md">
          <Link href="/" className="block px-6 py-2 text-dark hover:bg-primary hover:text-white" onClick={closeMenu}>
            Home
          </Link>
          <Link href="/services" className="block px-6 py-2 text-dark hover:bg-primary hover:text-white" onClick={closeMenu}>
            Services
          </Link>
          <Link href="/about" className="block px-6 py-2 text-dark hover:bg-primary hover:text-white" onClick={closeMenu}>
            About
          </Link>
          <Link href="/contact" className="block px-6 py-2 text-dark hover:bg-primary hover:text-white" onClick={closeMenu}>
            Contact
          </Link>
          <Link href="/rate-estimator" className="block px-6 py-2 text-dark hover:bg-primary hover:text-white" onClick={closeMenu}>
            Rate Estimator
          </Link>
          <Link href="/book-load" className="block px-6 py-2 text-dark hover:bg-primary hover:text-white" onClick={closeMenu}>
            Book Load
          </Link>

          {/* Authentication Links in Mobile Menu */}
          {user ? (
            <>
              <Link href="/dashboard" className="block px-6 py-2 text-dark hover:bg-primary hover:text-white" onClick={closeMenu}>
                Dashboard
              </Link>
              <button
                onClick={() => {
                  signOutUser();
                  closeMenu();
                }}
                className="w-full text-left px-6 py-2 text-red-600 hover:bg-red-100"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="block px-6 py-2 text-dark hover:bg-primary hover:text-white" onClick={closeMenu}>
                Login
              </Link>
              <Link href="/signup" className="block px-6 py-2 text-dark hover:bg-primary hover:text-white" onClick={closeMenu}>
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;