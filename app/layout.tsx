import type { Metadata } from "next";
import { AuthProvider } from "./context/AuthContext";
// import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
// import Hero from './components/Hero';
import "./globals.css";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Simpatico Logistics Services LLC",
  description: "Efficient logistics solutions with cutting-edge technology.",
  keywords: "logistics, freight, trucking, shipping, freigh broker, best freight broker, " + 
                      "small freight broker, excellent freight boker, reliable, reliable freight broker"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-light text-dark font-sans pt-20">
        <Navbar />
        <main className="flex-grow container mx-auto pt-20 py-12">{children}</main>
        <Footer />
      </body>
    </html>
    </AuthProvider>
  );
}
