import mongoose from 'mongoose';
import {ENV} from './env.js';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(ENV.mongoUri);
        console.log(`MongoDb connected: ${conn.connection.host}`);
    } catch(err) {
        console.error(`MongoDB connection failed: ${err.message}`);
        process.exit(1);
    }
};

export default connectDB;

