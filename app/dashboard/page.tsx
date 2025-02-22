/* eslint-disable */
"use client";
import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { db } from "lib/firebase";
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
        backgroundColor: ["#FBBF24", "#4F46E5", "#10B981", "#EF4444"], // Matching colors
        hoverOffset: 6,
      },
    ],
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

        {/* Row 2: Shipment Booking */}
        <motion.div className="bg-white p-6 rounded-lg shadow-md my-6">
          <h3 className="text-lg font-semibold mb-4">Book a Shipment</h3>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700">Origin</label>
              <input type="text" className="w-full p-2 border rounded" required />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Destination</label>
              <input type="text" className="w-full p-2 border rounded" required />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Weight (lbs)</label>
              <input type="number" className="w-full p-2 border rounded" required />
            </div>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all">
              Book Shipment
            </button>
          </form>
        </motion.div>

        {/* Row 3: Shipment Status & Pie Chart */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Shipment Status Card */}
          <motion.div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Shipment Status Overview</h3>
            <p className="text-md flex items-center">
              <span className="text-3xl font-bold text-yellow-500">{shipmentStats.pending}</span>
              <span className="ml-2 text-gray-700">Pending</span>
            </p>
            <p className="text-md flex items-center">
              <span className="text-3xl font-bold text-blue-600">{shipmentStats.inTransit}</span>
              <span className="ml-2 text-gray-700">In Transit</span>
            </p>
            <p className="text-md flex items-center">
              <span className="text-3xl font-bold text-green-600">{shipmentStats.completed}</span>
              <span className="ml-2 text-gray-700">Completed</span>
            </p>
            <p className="text-md flex items-center">
              <span className="text-3xl font-bold text-red-600">{shipmentStats.canceled}</span>
              <span className="ml-2 text-gray-700">Canceled</span>
            </p>
          </motion.div>

          {/* Pie Chart */}
          <motion.div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Shipment Status Breakdown</h3>
            {loading ? <p>Loading chart...</p> : <Pie data={shipmentChartData} />}
          </motion.div>
        </div>

        {/* Row 4: Active Shipments */}
        <motion.div className="bg-white p-6 rounded-lg shadow-md mt-6">
          <h3 className="text-lg font-semibold mb-4">Active Shipments</h3>
          {loading ? (
            <p>Loading shipments...</p>
          ) : shipments.length === 0 ? (
            <p>No active shipments found.</p>
          ) : (
            <ul className="space-y-4">
              {shipments.map((shipment) => (
                <li key={shipment.id} className="p-4 border rounded-lg shadow-sm">
                  <p className="text-sm text-gray-500">Tracking: {shipment.trackingNumber}</p>
                  <p className="text-md font-semibold">Status: {shipment.status}</p>
                  <p className="text-md">From: {shipment.origin}</p>
                  <p className="text-md">To: {shipment.destination}</p>
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