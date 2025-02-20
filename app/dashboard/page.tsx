/* eslint-disable */
"use client";
import ProtectedRoute from "../../components/ProtectedRoute";
import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import toast, { Toaster } from "react-hot-toast"

const Dashboard = () => {
  const { user } = useAuth();
  const [shipmentStats, setShipmentStats] = useState({
    inTransit: 5,
    delivered: 12,
    pending: 3,
    canceled: 1,
  });

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

  return (
    <ProtectedRoute>
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Row 1 - Welcome & Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            className="bg-white p-6 rounded-lg shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl font-bold">Welcome, {user?.displayName || "User"}!</h2>
            <p className="text-gray-600">Your dashboard overview.</p>
          </motion.div>

          <motion.div
            className="bg-white p-6 rounded-lg shadow-md flex flex-col space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-all">
              Book Shipment
            </button>
            <button className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-all">
              Track Shipment
            </button>
            <button className="bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-900 transition-all">
              Contact Support
            </button>
          </motion.div>
        </div>

        {/* Row 2 - Shipment & Booking Data */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <motion.div
            className="bg-white p-6 rounded-lg shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="text-lg font-semibold">Active Shipments</h3>
            <p className="text-3xl font-bold">{shipmentStats.inTransit}</p>
          </motion.div>

          <motion.div
            className="bg-white p-6 rounded-lg shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-lg font-semibold">Recent Bookings</h3>
            <p className="text-3xl font-bold">7</p>
          </motion.div>
        </div>

        {/* Row 3 - Invoices & Shipment Status Chart */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <motion.div
            className="bg-white p-6 rounded-lg shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
          >
            <h3 className="text-lg font-semibold">Invoice Summary</h3>
            <p className="text-gray-600">Total Paid: <span className="text-green-600 font-bold">$12,500</span></p>
            <p className="text-gray-600">Outstanding: <span className="text-red-600 font-bold">$3,200</span></p>
          </motion.div>

          <motion.div
            className="bg-white p-6 rounded-lg shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h3 className="text-lg font-semibold">Shipment Status Breakdown</h3>
            <Pie data={shipmentChartData} />
          </motion.div>
        </div>
      </main>
    </div>
    </ProtectedRoute>
  );
};

export default Dashboard;