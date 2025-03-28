/* eslint-disable */
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/outline";
import { Link as ScrollLink } from "react-scroll"; 
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOutUser } = useAuth();
  const [isClient, setIsClient] = useState(false);
  const [setRouter] = useState<any>(null); // Temporary state for router
  const router = useRouter();
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Close menu after clicking a link
  const closeMenu = () => setIsOpen(false);

  const pathname = usePathname();

  if (!isClient) return null; // Prevents hydration mismatch errors

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo (Home Link) */}
        {pathname === "/" ? (
          <ScrollLink
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
          </ScrollLink>
        ) : (
          <Link href="/" className="cursor-pointer" onClick={closeMenu}>
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
          {pathname === "/" ? (
          <ScrollLink to="services" smooth={true} duration={800} className="cursor-pointer text-dark hover:text-primary transition-all" onClick={closeMenu}>
            SERVICES
          </ScrollLink>
        ) : (
            <button
              onClick={() => {
                router.push("/");
                  setTimeout(() => {
                    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
                  }, 500);
                  closeMenu();
                }}
                
              className="cursor-pointer text-dark hover:text-primary transition-all"
            >
              SERVICES
            </button>
          )}

{pathname === "/" ? (
          <ScrollLink to="about" smooth={true} duration={800} className="cursor-pointer text-dark hover:text-primary transition-all" onClick={closeMenu}>
            ABOUT
          </ScrollLink>
        ) : (
            <button
              onClick={() => {
                router.push("/");
                  setTimeout(() => {
                    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
                  }, 500);
                  closeMenu();
                }}
                
              className="cursor-pointer text-dark hover:text-primary transition-all"
            >
              ABOUT
            </button>
          )}

{pathname === "/" ? (
          <ScrollLink to="contact" smooth={true} duration={800} className="cursor-pointer text-dark hover:text-primary transition-all" onClick={closeMenu}>
            CONTACT US
          </ScrollLink>
        ) : (
            <button
              onClick={() => {
                router.push("/");
                  setTimeout(() => {
                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                  }, 500);
                  closeMenu();
                }}
                
              className="cursor-pointer text-dark hover:text-primary transition-all"
            >
              CONTACT US
            </button>
          )}

          <Link href="/rate-estimator" className="cursor-pointer text-dark hover:text-primary transition-all" onClick={closeMenu}>
            QUOTE
          </Link>

          <Link href="/book-load" className="cursor-pointer text-dark hover:text-primary transition-all" onClick={closeMenu}>
            BOOKING
          </Link>

          {/* Authentication Links */}
          {user ? (
            <>
              <Link href="/dashboard" className="text-dark px-4 py-2 rounded-lg transition-all cursor-pointer">
                DASHBOARD
              </Link>
              <button
                onClick={() => {
                  signOutUser();
                  router.push("/")                 
                  closeMenu();
                }}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all"
              >
                LOGOUT
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => router.push("/login")}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all"
              >
                LOGIN
              </button>
              <button
                onClick={() => router.push("/signup")}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all"
              >
                CREATE ACCOUNT
              </button>
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
        {pathname === "/" ? (
          <ScrollLink 
            to="services" 
            smooth={true} 
            duration={800} 
            className="block px-6 py-2 text-dark hover:bg-primary hover:text-white" 
            onClick={closeMenu}
          >
            SERVICES
          </ScrollLink>
        ) : (
          <button
            onClick={() => {
              setIsOpen(false); // Close mobile menu
              setTimeout(() => {
                router.push("/");
                setTimeout(() => {
                  document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
                }, 500);
              }, 100);
            }}
            className="block px-6 py-2 text-dark hover:bg-primary hover:text-white"
          >
            SERVICES
          </button>
        )}
        {pathname === "/" ? (
          <ScrollLink 
            to="about" 
            smooth={true} 
            duration={800} 
            className="block px-6 py-2 text-dark hover:bg-primary hover:text-white" 
            onClick={closeMenu}
          >
            ABOUT
          </ScrollLink>
        ) : (
          <button
            onClick={() => {
              setIsOpen(false); // Close mobile menu
              setTimeout(() => {

                router.push("/");
                setTimeout(() => {
                  document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
                }, 500);
              }, 100);
            }}
            className="block px-6 py-2 text-dark hover:bg-primary hover:text-white"
          >
            ABOUT
          </button>
        )}
        {pathname === "/" ? (
          <ScrollLink 
            to="contact" 
            smooth={true} 
            duration={800} 
            className="block px-6 py-2 text-dark hover:bg-primary hover:text-white" 
            onClick={closeMenu}
          >
            CONTACT US
          </ScrollLink>
        ) : (
          <button
            onClick={() => {
              setIsOpen(false); // Close mobile menu
              setTimeout(() => {
                router.push("/");
                setTimeout(() => {
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }, 500);
              }, 100);
            }}
            className="block px-6 py-2 text-dark hover:bg-primary hover:text-white"
          >
            CONTACT US
          </button>
        )}

          {/* Authentication Links in Mobile Menu */}
          {user ? (
            <>
              <Link href="/dashboard" className="block px-6 py-2 text-dark hover:bg-primary hover:text-white" onClick={closeMenu}>
                DASHBOARD
              </Link>
              <button
                onClick={() => {
                  signOutUser();
                  router.push("/")
                  closeMenu();
                }}
                className="w-full text-left px-6 py-2 text-red-600 hover:bg-red-100"
              >
                LOGOUT
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => router?.push("/login")}
                className="block w-full text-left px-6 py-2 text-blue-600 hover:bg-blue-100"
              >
                LOGIN
              </button>
              <button
                onClick={() => router?.push("/signup")}
                className="block w-full text-left px-6 py-2 text-green-600 hover:bg-green-100"
              >
                CREATE ACCOUNT
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;