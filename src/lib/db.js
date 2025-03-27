import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';
import { MONGODB_URI } from '$env/static/private';

dotenv.config();

const uri = MONGODB_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
});

let db;

export async function connectToDB() {
  if (!db) {
    await client.connect();
    db = client.db('ai_journal');
  }
  return db;
}
