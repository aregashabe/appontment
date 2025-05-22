import express from 'express'
import { bookAppointment,verifyAppointmentPayment, cancelAppointment, getProfile, myAppointment, registerUser ,updateProfile,userLogin,initiateAppointmentPayment } from '../controller/userController.js';
import authoUser from '../middleware/authUser.js';
import upload from "../middleware/multer.js"
const userRoutes=express.Router()

userRoutes.post('/register', registerUser);
userRoutes.post('/login', userLogin);
userRoutes.get('/get-profile',authoUser, getProfile);
userRoutes.put('/update-profile',upload.single('image'),authoUser, updateProfile);
userRoutes.get('/get-appointment',authoUser, myAppointment);

userRoutes.post('/book-appointment',authoUser, bookAppointment);
userRoutes.post('/cancel-appointment',authoUser, cancelAppointment);
userRoutes.post('/payment-appointment',authoUser, initiateAppointmentPayment);

userRoutes.post('/verify', authoUser, verifyAppointmentPayment);



export default userRoutes
