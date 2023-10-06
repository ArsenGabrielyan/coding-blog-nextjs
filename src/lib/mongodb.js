import { MongoClient } from "mongodb";

if(!process.env.DB_URL) throw new Error('Database URL is Missing');

const url = process.env.DB_URL, options = {};
let client, clientPromise;

if(process.env.NODE_ENV==='development'){
     if(!global._mongoClient){
          client = new MongoClient(url,options);
          global._mongoClient = client.connect();
     }
     clientPromise = global._mongoClient
} else{
     client = new MongoClient(url,options);
     clientPromise = client.connect();
}
export default clientPromise;