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

        {/* Existing Dashboard Cards Remain Here */}

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
                  <p className="text-md font-semibold text-blue-600">Status: {shipment.status}</p>
                  <p className="text-md">From: {shipment.origin}</p>
                  <p className="text-md">To: {shipment.destination}</p>
                  <p className="text-sm text-gray-500">Weight: {shipment.weight} lbs</p>
                  <p className="text-sm text-gray-500">Booked At: {new Date(shipment.dateBooked).toLocaleString()}</p>
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