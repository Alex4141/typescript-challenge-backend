import dotenv from "dotenv"
import { MongoClient, Db } from "mongodb";

dotenv.config();

async function createDBConnection() : Promise<Db> {
  const dbString : string = process.env.MONGO_URL;
  const client : MongoClient = new MongoClient(dbString, { useUnifiedTopology : true });
  const connection : MongoClient = await client.connect();
  return connection.db("sample_airbnb");
}

const mongoClient : Promise<Db> = createDBConnection();

export default mongoClient;