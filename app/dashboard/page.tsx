/* eslint-disable */
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../components/Sidebar";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { db, saveUserToFirestore } from "lib/firebase";
import { collection, query, where, onSnapshot, doc, getDoc, addDoc } from "firebase/firestore";
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
        return;
      }

      if (!currentUser.emailVerified) {
        router.push("/verify-email");
        return;
      }

      setIsVerified(true);

      // Check if profile exists
      const profileRef = doc(db, "companies", currentUser.uid);
      const profileSnap = await getDoc(profileRef);
      if (profileSnap.exists()) {
        setHasProfile(true);
      } else {
        router.push("/create-profile");
      }

      // Save user to Firestore after verification
      await saveUserToFirestore(currentUser);
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

  // Handle Shipment Booking
  const handleBooking = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      toast.error("You must be logged in to book a shipment.");
      return;
    }

    setBookingLoading(true);

    const shipmentData = {
      trackingNumber: `SLS-${Date.now()}`,
      status: "Pending",
      origin,
      destination,
      weight,
      userId: user.uid,
      dateBooked: new Date().toISOString(),
    };

    try {
      await addDoc(collection(db, "shipments"), shipmentData);
      toast.success("Shipment booked successfully!");
      setOrigin("");
      setDestination("");
      setWeight("");
    } catch (error) {
      toast.error("Error booking shipment.");
    }

    setBookingLoading(false);
  };

  if (loading || !isVerified || !hasProfile)

  return (
    <div className="flex bg-gradient-to-r from-gray-100 via-white to-gray-100 animate-gradient min-h-screen">
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
            <p className="text-gray-600">Total Paid: <span className="text-green-600 font-bold">${balances.paid.toFixed(2)}</span></p>
            <p className="text-gray-600">Total Owed: <span className="text-red-600 font-bold">${balances.owed.toFixed(2)}</span></p>
          </motion.div>
        </div>

        {/* Row 2: Shipment Status Overview & Pie Chart */}
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

        {/* Row 3: Book Shipment Form */}
        <motion.div className="bg-white p-6 rounded-lg shadow-md my-6">
          <h3 className="text-lg font-semibold mb-4">Book a Shipment</h3>
          <form onSubmit={handleBooking} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-semibold">Origin</label>
              <input
                type="text"
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold">Destination</label>
              <input
                type="text"
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold">Weight (lbs)</label>
              <input
                type="number"
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all font-semibold"
            >
              {bookingLoading ? "Booking..." : "Book Shipment"}
            </button>
          </form>
        </motion.div>

        {/* Row 3: Active Shipments */}
        <motion.div className="bg-white p-6 rounded-lg shadow-md mt-6">
          <h3 className="text-lg font-semibold mb-4">Active Shipments</h3>
          {shipments.length === 0 ? <p>No active shipments found.</p> : (
            <ul className="space-y-4">{shipments.map((shipment) => (
              <li key={shipment.id} className="p-4 border rounded-lg shadow-sm">
                <p className="text-md font-semibold text-blue-600">Tracking: {shipment.trackingNumber}</p>
                <p>Status: {shipment.status}</p>
                <p>Origin: {shipment.origin}</p>
                <p>Destination: {shipment.destination}</p>
              </li>
            ))}</ul>
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;