import mongoose from "mongoose";

if(!process.env.DB_URL) throw new Error('Database URL is Missing');
const url = process.env.DB_URL, connection = {isConnected: false};

export default async function connectDB(){
     let db;
     if(!connection.isConnected){
          db = await mongoose.connect(url);
          connection.isConnected = db.connections[0].readyState;
          if(process.env.NODE_ENV==='development') console.info('Database is Connected');
     }
     return db;
}