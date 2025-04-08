import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable")
}

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

// Named export required by the codebase
export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    }

    cached.promise = mongoose
      .connect(MONGODB_URI!, opts)
      .then((mongoose) => {
        console.log("Connected to MongoDB")
        return mongoose
      })
      .catch((error) => {
        console.error("Error connecting to MongoDB:", error)
        throw error
      })
  }

  try {
    cached.conn = await cached.promise
    return cached.conn
  } catch (error) {
    console.error("Error establishing database connection:", error)
    throw error
  }
}

// Keep dbConnect for backward compatibility if it's used elsewhere
export async function dbConnect() {
  return connectToDatabase()
}

export default dbConnect
