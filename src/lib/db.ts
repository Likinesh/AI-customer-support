import { connect } from "mongoose";

// Since this is NextJs and prevent new connectoin on every try we add it to cache
const url = process.env.MONGO_URI;
if (!url) {
  throw new Error("MONGO_URI is not defined in environment variables");
}

// Check if the global variable already has a connection
let cache = global.mongoose;

if (!cache) {
  cache = global.mongoose = { conn: null, promise: null };
}
const connectDB = async () => {
  if (cache.conn) {
    return cache.conn;
  }
  if (!cache.promise) {
    cache.promise = connect(url!).then((c) => c.connection);
  }
  try {
    const conn = await cache.promise;
    cache.conn = conn;
    return cache.conn;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default connectDB;