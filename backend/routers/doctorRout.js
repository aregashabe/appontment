import express from 'express'
import {
    appointmentCancelled, appointmentCompleted, doctorAppintmment,
    doctorDashboard, doctorList, doctorLogin, getProfile, updateProfile
} from '../controller/doctorController.js';
import authDoctor from '../middleware/authDoctor.js';
const doctorRoutes = express.Router()

doctorRoutes.get('/list', doctorList);
doctorRoutes.post('/login', doctorLogin);
doctorRoutes.get('/doctor-appointment', authDoctor, doctorAppintmment);
doctorRoutes.post('/appointment-completed', authDoctor, appointmentCompleted);
doctorRoutes.post('/cancelled-appointment', authDoctor, appointmentCancelled);
doctorRoutes.post('/cancelled-appointment', authDoctor, appointmentCancelled);
doctorRoutes.get('/doctor-dashboard', authDoctor, doctorDashboard);
doctorRoutes.get('/profile', authDoctor, getProfile);
doctorRoutes.post('/update-profile', authDoctor, updateProfile);

export default doctorRoutes
