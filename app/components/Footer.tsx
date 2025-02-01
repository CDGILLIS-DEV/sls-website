"use client"

import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#047857] text-white text-center py-6 mt-auto">
      <div className="container mx-auto">
        <div className="flex justify-center space-x-4">
          <a href="mailto:carldgillis1@gmail.com.com" className="flex items-center space-x-2">
            <EnvelopeIcon className="h-5 w-5" />
            <span>carldgillis1@gmail.com</span>
          </a>
          <a href="tel:+13146293352" className="flex items-center space-x-2">
            <PhoneIcon className="h-5 w-5" />
            <span>+1 314 629 3352</span>
          </a>
        </div>
        <p className="mt-4">&copy; {new Date().getFullYear()} Simpatico Logistics Services LLC. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-2">
          <Link href="/privacy-policy" className="hover:text-primary transition-all">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-primary transition-all">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;