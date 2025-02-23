/* eslint-disable */
"use client";
import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { db, addShipment } from "lib/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
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

  // Shipment Status Data
  const shipmentStats = {
    pending: shipments.filter((s) => s.status === "Pending").length,
    inTransit: shipments.filter((s) => s.status === "In Transit").length,
    completed: shipments.filter((s) => s.status === "Delivered").length,
    canceled: shipments.filter((s) => s.status === "Canceled").length,
  };

  // Pie Chart Data
  const shipmentChartData = {
    labels: ["Pending", "In Transit", "Completed", "Canceled"],
    datasets: [
      {
        data: Object.values(shipmentStats),
        backgroundColor: ["#FBBF24", "#4F46E5", "#10B981", "#EF4444"],
        hoverOffset: 6,
      },
    ],
  };

  // Handle Shipment Booking
  const handleBooking = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      toast.error("You must be logged in to book a shipment.");
      return;
    }

    const shipmentData = {
      trackingNumber: `SLS-${Date.now()}`,
      status: "Pending",
      origin,
      destination,
      weight,
    };

    try {
      await addShipment(shipmentData, user.uid);
      toast.success("Shipment booked successfully!");
      setOrigin("");
      setDestination("");
      setWeight("");
    } catch (error) {
      toast.error("Error booking shipment.");
    }
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6">
        <Toaster position="top-right" />

        {/* Row 1: Welcome & Financial Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div 
            className="bg-white p-6 rounded-lg shadow-md"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-xl font-bold">Welcome, {user?.displayName || "User"}!</h2>
            <p className="text-gray-600">Your dashboard overview.</p>
          </motion.div>

          <motion.div 
            className="bg-white p-6 rounded-lg shadow-md"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold">Financial Summary</h3>
            <p className="text-gray-600">
              Total Paid: <span className="text-green-600 font-bold">${balances.paid.toFixed(2)}</span>
            </p>
            <p className="text-gray-600">
              Total Owed: <span className="text-red-600 font-bold">${balances.owed.toFixed(2)}</span>
            </p>
          </motion.div>
        </div>

        {/* Row 2: Shipment Booking */}
        <motion.div 
          className="bg-white p-6 rounded-lg shadow-md my-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.02 }}
        >
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
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all">
              Book Shipment
            </button>
          </form>
        </motion.div>

        {/* Row 3: Shipment Status & Pie Chart */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <motion.div 
            className="bg-white p-6 rounded-lg shadow-md"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-lg font-semibold mb-4">Shipment Status Overview</h3>
            <p className="text-3xl font-bold text-yellow-500">{shipmentStats.pending} <span className="text-lg">Pending</span></p>
            <p className="text-3xl font-bold text-blue-600">{shipmentStats.inTransit} <span className="text-lg">In Transit</span></p>
            <p className="text-3xl font-bold text-green-600">{shipmentStats.completed} <span className="text-lg">Completed</span></p>
            <p className="text-3xl font-bold text-red-600">{shipmentStats.canceled} <span className="text-lg">Canceled</span></p>
          </motion.div>

          <motion.div 
            className="bg-white p-6 rounded-lg shadow-md"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold mb-4">Shipment Status Breakdown</h3>
            {loading ? <p>Loading chart...</p> : <Pie data={shipmentChartData} />}
          </motion.div>
        </div>

        {/* Row 4: Active Shipments */}
        <motion.div 
          className="bg-white p-6 rounded-lg shadow-md mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-lg font-semibold mb-4">Active Shipments</h3>
          {loading ? (
            <p>Loading shipments...</p>
          ) : shipments.length === 0 ? (
            <p>No active shipments found.</p>
          ) : (
            <ul className="space-y-4">
              {shipments.map((shipment) => (
                <motion.li 
                  key={shipment.id} 
                  className="p-4 border rounded-lg shadow-sm"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <p className="text-md font-semibold text-blue-600">Tracking: {shipment.trackingNumber}</p>
                  <p className="text-md">Status: <span className="font-semibold">{shipment.status}</span></p>
                  <p className="text-md">Origin: <span className="font-semibold">{shipment.origin}</span></p>
                  <p className="text-md">Destination: <span className="font-semibold">{shipment.destination}</span></p>
                </motion.li>
              ))}
            </ul>
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;