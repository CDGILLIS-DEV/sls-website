import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = process.env.MONGODB_URI!;

if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable.');
}

  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
    tls: true,
    tlsAllowInvalidCertificates: true,    
  });

  let cachedClient: MongoClient | null = null;

  async function connectToDatabase() {
    if (cachedClient) {
      return cachedClient;
    }
  
   try { 
    await client.connect();
    console.log("Successfully connected to MongoDB!");
    cachedClient = client;
    return client;
   } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
   }
}

export default connectToDatabase;