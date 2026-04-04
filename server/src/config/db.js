import mongoose from 'mongoose';
import { ENV } from './env.js';

let isConnected = false;

const connectDB = async () => {
    try {
        if (isConnected) {
            console.log("Using existing DB connection");
            return;
        }

        const conn = await mongoose.connect(ENV.mongoUri, {
            maxPoolSize: 10,
            minPoolSize: 2,
        });

        isConnected = conn.connections[0].readyState === 1;

        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (err) {
        console.error(`MongoDB connection failed: ${err.message}`);
        process.exit(1);
    }
};

export default connectDB;