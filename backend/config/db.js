import mongoose  from 'mongoose';
import dotenv  from 'dotenv';

dotenv.config();

const connectDB = async () => {
    try {
        console.log(process.env.MONGODB_URI); 
        await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("MongoDB connected");
    } catch (error) {
        console.error("Database connection error:", error.message);
        process.exit(1);
    }
};

export default  connectDB;
