/* eslint-disable */
import { MongoClient, ServerApiVersion } from "mongodb";

if (!process.env.MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB || "sls-website-db"; // Ensure the correct DB name

let cachedClient: MongoClient | null = null;

export async function connectToDatabase() {
    if (cachedClient) {
        console.log("Using existing MongoDB connection.");
        return { client: cachedClient, db: cachedClient.db(MONGODB_DB) };
    }

    try {
        console.log("Creating new MongoDB connection...");
        const client = new MongoClient(MONGODB_URI!, {
            serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true },
            connectTimeoutMS: 30000, // 30 seconds timeout
            socketTimeoutMS: 45000,  // 45 seconds socket timeout
        });

        await client.connect();
        cachedClient = client;

        console.log("Successfully connected to MongoDB!");
        return { client, db: client.db(MONGODB_DB) };
    } catch (error) {
        console.error("MongoDB Connection Error:", error);
        throw new Error("Failed to connect to MongoDB");
    }
}