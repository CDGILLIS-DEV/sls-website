/* eslint-disable */
"use client";
import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { db } from "lib/firebase";
import { collection, query, where, onSnapshot, addDoc } from "firebase/firestore";
import toast, { Toaster } from "react-hot-toast";

// Register required chart elements
ChartJS.register(ArcElement, Tooltip, Legend);

interface Shipment {
  id: string;
  trackingNumber: string;
  status: string;
  origin: string;
  destination: string;
  weight: string;
  dateBooked: string;
}

const Dashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [balances, setBalances] = useState({ paid: 0, owed: 0 });
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [weight, setWeight] = useState("");
  const [bookingLoading, setBookingLoading] = useState(false);

  // Fetch user's shipments from Firestore
  useEffect(() => {
    if (!user) {
      setShipments([]);
      return;
    }

    const q = query(collection(db, "shipments"), where("userId", "==", user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const shipmentData = snapshot.docs.map((doc) => ({
        id: doc.id,
        trackingNumber: doc.data().trackingNumber || "N/A",
        status: doc.data().status || "Pending",
        origin: doc.data().origin || "Unknown",
        destination: doc.data().destination || "Unknown",
        weight: doc.data().weight || "0 lbs",
        dateBooked: doc.data().dateBooked || new Date().toISOString(),
      }));

      setShipments(shipmentData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  // Shipment Status Chart Data
  const shipmentStats = {
    inTransit: shipments.filter((s) => s.status === "In Transit").length,
    delivered: shipments.filter((s) => s.status === "Delivered").length,
    pending: shipments.filter((s) => s.status === "Pending").length,
    canceled: shipments.filter((s) => s.status === "Canceled").length,
  };

  const shipmentChartData = {
    labels: ["In Transit", "Delivered", "Pending", "Canceled"],
    datasets: [
      {
        data: Object.values(shipmentStats),
        backgroundColor: ["#4F46E5", "#10B981", "#FBBF24", "#EF4444"],
        hoverOffset: 6,
      },
    ],
  };

  // Handle Shipment Booking
  const handleBooking = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBookingLoading(true);

    try {
      await addDoc(collection(db, "shipments"), {
        userId: user?.uid,
        trackingNumber: `SLS-${Date.now()}`,
        status: "Pending",
        origin,
        destination,
        weight,
        dateBooked: new Date().toISOString(),
      });

      setBookingLoading(false);
      toast.success("Shipment booked successfully!");
      setOrigin("");
      setDestination("");
      setWeight("");
    } catch (error) {
      console.error("Error booking shipment:", error);
      setBookingLoading(false);
    }
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6">
        <Toaster position="top-right" />

        {/* Row 1: Welcome & Financial Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold">Welcome, {user?.displayName || "User"}!</h2>
            <p className="text-gray-600">Your dashboard overview.</p>
          </motion.div>

          <motion.div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">Financial Summary</h3>
            <p className="text-gray-600">
              Total Paid: <span className="text-green-600 font-bold">${balances.paid.toFixed(2)}</span>
            </p>
            <p className="text-gray-600">
              Total Owed: <span className="text-red-600 font-bold">${balances.owed.toFixed(2)}</span>
            </p>
          </motion.div>
        </div>

        {/* Row 2: Booking Form */}
        <motion.div className="bg-white p-6 rounded-lg shadow-md my-6">
          <h3 className="text-lg font-semibold mb-4">Book a Shipment</h3>
          <form onSubmit={handleBooking}>
            <div className="mb-4">
              <label className="block text-gray-700">Origin</label>
              <input type="text" className="w-full p-2 border rounded" value={origin} onChange={(e) => setOrigin(e.target.value)} required />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Destination</label>
              <input type="text" className="w-full p-2 border rounded" value={destination} onChange={(e) => setDestination(e.target.value)} required />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Weight (lbs)</label>
              <input type="number" className="w-full p-2 border rounded" value={weight} onChange={(e) => setWeight(e.target.value)} required />
            </div>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all" disabled={bookingLoading}>
              {bookingLoading ? "Booking..." : "Book Shipment"}
            </button>
          </form>
        </motion.div>

        {/* Row 3: Active Shipments */}
        <motion.div className="bg-white p-6 rounded-lg shadow-md my-6">
          <h3 className="text-lg font-semibold mb-4">Booking Details</h3>
          {loading ? (
            <p>Loading bookings...</p>
          ) : shipments.length === 0 ? (
            <p>No shipments booked yet.</p>
          ) : (
            <ul className="space-y-4">
              {shipments.map((shipment) => (
                <li key={shipment.id} className="p-4 border rounded-lg shadow-sm">
                  <p className="text-sm text-gray-500">Tracking: {shipment.trackingNumber}</p>
                  <p className="text-md font-semibold">Status: {shipment.status}</p>
                  <p className="text-md">From: {shipment.origin}</p>
                  <p className="text-md">To: {shipment.destination}</p>
                  <p className="text-sm text-gray-500">Weight: {shipment.weight} lbs</p>
                </li>
              ))}
            </ul>
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;