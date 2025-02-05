const { MongoClient} = require('mongodb');

// Create a MongoClient with a MongoClientOptions object to set the Stable API version

async function run() {
    const uri = process.env.MONGODB_URI;

    const client = new MongoClient(uri)

    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const dbName  = "";
    const collectionName = "";

     // Create references to the database and collection in order to run operations on them.
    const database = client.db(dbName);
    const collection = database.collection(collectionName);

    const result  = "";
    try {
        const insertResult = await collection.insert(result);
        console.log(`${insertResult.insertedCount} documents successfully inserted.\n`);
      } catch (err) {
        console.error(`Something went wrong trying to insert the new documents: ${err}\n`);
      }
    // Ensures that the client will close when you finish/error
        await client.close();
    }

export default run ;