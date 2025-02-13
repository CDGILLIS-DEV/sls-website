/* eslint-disable */
import { MongoClient, ServerApiVersion } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

const MONGODB_URI: string = process.env.MONGODB_URI;
const MONDODB_DB_NAME = process.env.MONGODB_DB_NAME;

// Define a global variable type
interface GlobalMongo {
  conn: MongoClient | null;
  promise: Promise<MongoClient> | null;
}

// Ensure TypeScript understands the global variable
declare global {
  var _mongoClient: GlobalMongo | undefined;
}

// Use `const` instead of `var`
const cached: GlobalMongo = global._mongoClient ?? { conn: null, promise: null };

if (!cached.conn) {
  global._mongoClient = cached;
}

async function connectToDatabase(): Promise<MongoClient> {
  if (cached.conn) {
    console.log("Using existing MongoDB connection.");
    return cached.conn;
  }

  if (!cached.promise) {
    console.log("Creating new MongoDB connection...");
    cached.promise = new MongoClient(MONGODB_URI, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
      connectTimeoutMS: 30000, // 30 seconds timeout
      socketTimeoutMS: 45000, // 45 seconds socket timeout
    }).connect();
    console.log("*********************", cached.promise, "********************")
  }
  

  cached.conn = await cached.promise;
  console.log('Connected to MongoDB! Using database:', MONDODB_DB_NAME,  "******************",cached.conn, "********************");
  return cached.conn;
}


export default connectToDatabase;