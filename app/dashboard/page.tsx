/* eslint-disable */
"use client";

import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import toast, { Toaster } from "react-hot-toast"; // Toast Notifications

const Dashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [shipmentStats, setShipmentStats] = useState({
    inTransit: 5,
    delivered: 12,
    pending: 3,
    canceled: 1,
  });

  // Simulate data loading
  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

  // Shipment Status Chart Data
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

  // Handle actions (e.g., booking shipment)
  const handleAction = (message: string) => {
    toast.success(message);
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <main className="flex-1 p-6">
        <Toaster position="top-right" />

        {/* Row 1 - Welcome & Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Welcome Card */}
          <motion.div
            className="bg-white p-6 rounded-lg shadow-md transition-all hover:shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl font-bold">
              Welcome, {user?.displayName || "User"}!
            </h2>
            <p className="text-gray-600">Your dashboard overview.</p>
          </motion.div>

          {/* Quick Actions Card */}
          <motion.div
            className="bg-white p-6 rounded-lg shadow-md flex flex-col space-y-4 transition-all hover:shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <button
              onClick={() => handleAction("Shipment booked successfully!")}
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-all"
            >
              Book Shipment
            </button>
            <button
              onClick={() => handleAction("Tracking shipment...")}
              className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-all"
            >
              Track Shipment
            </button>
            <button
              onClick={() => handleAction("Support team contacted!")}
              className="bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-900 transition-all"
            >
              Contact Support
            </button>
          </motion.div>
        </div>

        {/* Row 2 - Shipment & Booking Data */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Active Shipments */}
          <motion.div
            className="bg-white p-6 rounded-lg shadow-md transition-all hover:shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="text-lg font-semibold">Active Shipments</h3>
            {loading ? (
              <div className="animate-pulse bg-gray-300 h-8 w-20 rounded"></div>
            ) : (
              <p className="text-3xl font-bold">{shipmentStats.inTransit}</p>
            )}
          </motion.div>

          {/* Recent Bookings */}
          <motion.div
            className="bg-white p-6 rounded-lg shadow-md transition-all hover:shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-lg font-semibold">Recent Bookings</h3>
            {loading ? (
              <div className="animate-pulse bg-gray-300 h-8 w-20 rounded"></div>
            ) : (
              <p className="text-3xl font-bold">7</p>
            )}
          </motion.div>
        </div>

        {/* Row 3 - Invoice Summary & Shipment Status Chart */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Invoice Summary */}
          <motion.div
            className="bg-white p-6 rounded-lg shadow-md transition-all hover:shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
          >
            <h3 className="text-lg font-semibold">Invoice Summary</h3>
            {loading ? (
              <div className="animate-pulse bg-gray-300 h-8 w-40 rounded"></div>
            ) : (
              <>
                <p className="text-gray-600">
                  Total Paid:{" "}
                  <span className="text-green-600 font-bold">$12,500</span>
                </p>
                <p className="text-gray-600">
                  Outstanding:{" "}
                  <span className="text-red-600 font-bold">$3,200</span>
                </p>
              </>
            )}
          </motion.div>

          {/* Shipment Status Breakdown Chart */}
          <motion.div
            className="bg-white p-6 rounded-lg shadow-md transition-all hover:shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h3 className="text-lg font-semibold">Shipment Status Breakdown</h3>
            {loading ? (
              <div className="animate-pulse bg-gray-300 h-32 w-full rounded"></div>
            ) : (
              <Pie data={shipmentChartData} />
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;