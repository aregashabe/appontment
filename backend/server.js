import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import connectCloudinary from './config/cloudinary.js'; 

import adminRout from './routers/addminRout.js'; 
import dotenv from 'dotenv';
import doctorRoutes from './routers/doctorRout.js';
import userRoutes from './routers/userRout.js';
dotenv.config(); // Load environment variables

const app = express();
connectDB();
connectCloudinary()
app.use(cors());
app.use(express.json());
app.use('/api/admin', adminRout);
app.use('/api/doctor', doctorRoutes);
app.use('/api/user', userRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`); 
});
