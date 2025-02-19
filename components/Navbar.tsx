"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/outline";
import { Link as ScrollLink } from "react-scroll"; // Import react-scroll
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOutUser } = useAuth();

  // Function to close menu after clicking a link
  const closeMenu = () => setIsOpen(false);

  const pathname = usePathname();

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo (Home link) */}
        {pathname ==="/"?( <ScrollLink
            to="hero"
            smooth={true}
            duration={800}
            className="cursor-pointer"
            onClick={closeMenu}
          >
            <Image
              src="/SLS LOGO.png"
              alt="Simpatico Logistics Services Logo"
              width={175}
              height={50}
            />
          </ScrollLink>):(
            <Link href="/" 
            className="cursor-pointer"
            onClick={closeMenu}
            >
            <Image
              src="/SLS LOGO.png"
              alt="Simpatico Logistics Services Logo"
              width={175}
              height={50}
            />  
            </Link>
          )}

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6 items-center">
<ScrollLink to="services" smooth={true} duration={800} className="cursor-pointer text-dark hover:text-primary transition-all" onClick={closeMenu}>
            Services
          </ScrollLink>

          <ScrollLink to="about" smooth={true} duration={800} className="cursor-pointer text-dark hover:text-primary transition-all" onClick={closeMenu}>
            About
          </ScrollLink>

          <ScrollLink to="contact" smooth={true} duration={800} className="cursor-pointer text-dark hover:text-primary transition-all"onClick={closeMenu}>
            Contact
          </ScrollLink>


          {/* Authentication Links */}
          {user ? (
            <>
              <Link href="/dashboard"  className=" text-dark px-4 py-2 rounded-lg  transition-all cursor-grab">
                Dashboard
              </Link>
              <button
                onClick={signOutUser}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login"  className=" text-dark  px-4 py-2 rounded-lg  transition-all cursor-pointer">
                Login
              </Link>
              <Link href="/signup"  className=" text-dark px-4 py-2 rounded-lg  transition-all cursor-pointer">
                Join
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
          <ScrollLink to="services" smooth={true} duration={800} className="block px-6 py-2 text-dark hover:bg-primary hover:text-white" onClick={closeMenu}>
            Services
          </ScrollLink>
          <ScrollLink to="about" smooth={true} duration={800} className="block px-6 py-2 text-dark hover:bg-primary hover:text-white" onClick={closeMenu}>
            About
          </ScrollLink>
          <ScrollLink to="contact" smooth={true} duration={800} className="block px-6 py-2 text-dark hover:bg-primary hover:text-white" onClick={closeMenu}>
            Contact
          </ScrollLink>

          {/* Authentication Links in Mobile Menu */}
          {user ? (
            <>
              <ScrollLink to="dashboard" smooth={true} duration={800} className="block px-6 py-2 text-dark hover:bg-primary hover:text-white" onClick={closeMenu}>
                Dashboard
              </ScrollLink>
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
              <Link href="/login"  className=" text-dark px-4 py-2 rounded-lg  transition-all cursor-pointer">
                Login
              </Link>
              <Link href="/signup"  className=" text-dark px-4 py-2 rounded-lg  transition-all cursor-pointer">
                Join
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;