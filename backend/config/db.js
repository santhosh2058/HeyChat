import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDB = async () => {
    try {
        const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
        await mongoose.connect(process.env.MONGO_URI, clientOptions);
        console.log("MongoDB connection SUCCESS");
    } catch (error) {
        console.error(`MongoDB connection FAIL: ${error}`);
        process.exit(1);
    }
};

export const disconnectDB = async () => {
  await mongoose.connection.close();
};