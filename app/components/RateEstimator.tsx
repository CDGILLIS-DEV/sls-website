"use client";

import { useState } from "react";

const RateEstimator = () => {
    const [formData, setFormData] = useState({
        pickup: "",
        dropoff: "",
        distance: "",
        weight: "",
    });

const [rate, setRate] = useState<number | null>(null);

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
};

const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Rate Calculation
    const baseRate = 50; // Flat fee
    const costPerMile = 1.2; // $1.20 per mile
    const costPerPound = 0.05; // $0.05 per pound

    const distance = parseFloat(formData.distance);
    const weight = parseFloat(formData.weight);

    const estimaedRate = baseRate + costPerMile + distance + costPerPound * weight;

    setRate(estimaedRate);
};

return (
    <div className="max-w-lg mx-auto bg-white shadow-lg p-8 rounded-md mt-10">
        <h2 className="text-2xl font-semibold text-center text-primary">Rate Estimator</h2>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <input
                type="text"
                name="pickup"
                placeholder="Pickup Location"
                value={formData.pickup}
                onChange={handleChange}
                required
                className="w-full border border-x-gray-300 rounded-md p-3"
            />

            <input
                type="text"
                name="dropoff"
                placeholder="Drop-off Location"
                value={formData.dropoff}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md p-3"
            />
            
            <input
                type="number"
                name="distance"
                placeholder="Distance (in miles)"
                value={formData.distance}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md p-3"  
            />

            <input
                type="number"
                name="weight"
                placeholder="Weight (in pounds)"
                value={formData.weight}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md p-3"
            />

            <button
                type="submit"
                className="w-full bg-primary text-white py-2 rounded-md hover:bg-green-700 transition"
            >
              Estimate Rate
            </button>
        </form>

        {rate !== null && (
            <div className="mt-4 text-center bg-gray-100 p-4 rounded-md">
                <p className="text-x1 font-bold">Estimated Rate:</p>
                <p className="text-2xl text-primary">${rate.toFixed(2)}</p>
            </div>
        )}
    </div>
  );
};