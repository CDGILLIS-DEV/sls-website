/* eslint-disable */
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../components/Sidebar";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { db, addShipment } from "lib/firebase";
import { collection, query, where, onSnapshot, doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
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
  const auth = getAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [balances, setBalances] = useState({ paid: 0, owed: 0 });
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [weight, setWeight] = useState("");
  const [bookingLoading, setBookingLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [hasProfile, setHasProfile] = useState(false);

  // Check authentication, email verification, and profile completion
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        router.push("/login");
      } else if (!currentUser.emailVerified) {
        router.push("/verify-email");
      } else {
        setIsVerified(true);
        const profileRef = doc(db, "companies", currentUser.uid);
        const profileSnap = await getDoc(profileRef);
        if (profileSnap.exists()) {
          setHasProfile(true);
        } else {
          router.push("/create-profile");
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth, router]);

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

  if (loading || !isVerified || !hasProfile) return <p>Loading...</p>;

  return (
    <div className="flex bg-gradient-to-r from-gray-100 via-white to-gray-100 animate-gradient min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6">
        <Toaster position="top-right" />

        {/* Row 1: Welcome & Financial Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div 
            className="bg-white p-6 rounded-lg shadow-md"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
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

        {/* Row 2: Shipment Status & Pie Chart */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <motion.div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Shipment Status Overview</h3>
            <p className="text-3xl font-bold text-yellow-500">{shipmentStats.pending} Pending</p>
            <p className="text-3xl font-bold text-blue-600">{shipmentStats.inTransit} In Transit</p>
            <p className="text-3xl font-bold text-green-600">{shipmentStats.completed} Completed</p>
            <p className="text-3xl font-bold text-red-600">{shipmentStats.canceled} Canceled</p>
          </motion.div>

          <motion.div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Shipment Status Breakdown</h3>
            {loading ? <p>Loading chart...</p> : <Pie data={shipmentChartData} />}
          </motion.div>
        </div>

        {/* Row 3: Active Shipments */}
        <motion.div className="bg-white p-6 rounded-lg shadow-md mt-6">
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