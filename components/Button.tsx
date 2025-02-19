"use client";

import { motion } from "framer-motion";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const Button = ({ children, onClick, className }: ButtonProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`px-6 py-3 text-white font-semibold rounded-lg shadow-md transition-all bg-gradient-to-r from-primary to-green-600 hover:from-green-600 hover:to-primary ${className}`}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
};

export default Button;