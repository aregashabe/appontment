import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/user.js";
import mongoose from "mongoose";
import { v2 } from "cloudinary";
import doctorModel from "../models/doctors.js";
import Appointment from "../models/appointment.js";
import axios from 'axios';
// Register a new user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  // Validate input
  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: "Missing required details" });
  }

  // Validate email
  if (!validator.isEmail(email)) {
    return res.status(400).json({ success: false, message: "Invalid email address" });
  }

  // Validate password length
  if (password.length < 8) {
    return res.status(400).json({ success: false, message: "Password must be at least 8 characters long" });
  }

  try {
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashPassword,
    };

    // Save user to the database
    const newUser = new userModel(userData);
    const user = await newUser.save();

    // Generate a JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
    });
  } catch (error) {
    console.error("Error during user registration:", error);
    return res.status(500).json({ success: false, message: "Failed to register user" });
  }
};

// User login
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User does not exist" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error("Error during user login:", error);
    return res.status(500).json({ success: false, message: "Login failed" });
  }
};

// Get user profile

const getProfile = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      console.log(userId)
      return res.status(400).json({ success: false, message: "User ID not provided" });
    }

    const user = await userModel.findById(userId).select("-password");
    if (!user) {
      console.log(user)
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({ success: true, userData: user });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};



// Update user profile

const updateProfile = async (req, res) => {
  try {
    const { name, dob, phone, gender, address } = req.body;

    const image = req.file;
    const userId = req.userId
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, message: "Invalid or missing userId" });
    }

    // Validate other required fields
    if (!name || !dob || !phone || !gender || !address) {
      return res.status(400).json({ success: false, message: "Missing required details" });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Handle image upload if provided
    let imageUrl = user.image; // Keep old image if not updating
    if (image) {
      const imageUpload = await v2.uploader.upload(image.path, { resource_type: "image" });
      imageUrl = imageUpload.secure_url; // Get new image URL
    }

    // Parse address if it's a string
    const parsedAddress = typeof address === "string" ? JSON.parse(address) : address;

    const updatedData = {
      name,
      dob,
      phone,
      gender,
      address: parsedAddress,
      image: imageUrl,
    };

    // Update user's profile
    const updatedUser = await userModel.findByIdAndUpdate(userId, updatedData, { new: true });

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      userData: updatedUser,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
// book appintmment
const bookAppointment = async (req, res) => {
  try {
    const { docId, docDate, slotDate, date, userDate, slotTime } = req.body;
    const userId = req.userId;

    // Get doctor data
    const docData = await doctorModel.findById(docId).select('-password');
    if (!docData) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }

    if (!docData.available) {
      return res.json({ success: false, message: "Doctor is not available" });
    }

    // Check if the slot is available
    let slot_booked = docData.slot_booked;
    if (slot_booked[slotDate]) {
      if (slot_booked[slotDate].includes(slotTime)) {
        return res.json({ success: false, message: "Slot is not available" });
      } else {
        slot_booked[slotDate].push(slotTime);
      }
    } else {
      slot_booked[slotDate] = [slotTime];
    }

    // Get user data
    const userData = await userModel.findById(userId).select('-password');
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const appointmentData = {
      userId,
      docId,
      userDate,
      date,
      docDate,
      userName: userData.name, // Optional: Store specific fields for user
      docName: docData.name,   // Optional: Store specific fields for doctor
      amount: docData.fees,
      slotDate,
      slotTime,        // Selected time slot
      Date: new Date() // Current date
    };

    const newAppointment = new Appointment(appointmentData);
    await newAppointment.save();

    // Update the doctor's booked slots
    await doctorModel.findByIdAndUpdate(docId, { slot_booked });

    // Return success message
    return res.json({ success: true, message: "Appointment booked successfully" });

  } catch (error) {
    console.error("Error updating profile:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


const myAppointment = async (req, res) => {
  try {
    const userId = req.userId;
    // Correct query to find appointments by userId and populate  doctor data
    const appointments = await Appointment.find({ userId })
      .populate('docId', 'name image speciality address date')

    if (!appointments || appointments.length === 0) {
      return res.status(404).json({ success: false, message: "No appointments found" });
    }

    return res.json({ success: true, appointments });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
const cancelAppointment = async (req, res) => {
  try {
    const userId = req.userId; // Assuming this is set by middleware
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized access" });
    }

    // Correct destructuring and validation
    const { appointmentId } = req.body;
    if (!appointmentId) {
      return res.status(400).json({ success: false, message: "Appointment ID is required" });
    }

    // Fetch appointment data
    const appointmentData = await Appointment.findById(appointmentId);
    if (!appointmentData) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }

    // Convert userId and appointmentData.userId to ObjectId for proper comparison
    if (!appointmentData.userId.equals(userId)) {
      return res.status(403).json({ success: false, message: "Unauthorized action" });
    }

    // Update appointment to canceled
    await Appointment.findByIdAndUpdate(appointmentId, { cancelled: true });

    // Extract necessary data
    const { slotDate, slotTime, docId } = appointmentData;

    // Update doctor's slot data
    const docData = await doctorModel.findById(docId);
    if (!docData) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }

    const slotBooked = docData.slot_booked || {};
    if (slotBooked[slotDate]) {
      slotBooked[slotDate] = slotBooked[slotDate].filter((time) => time !== slotTime);
    }

    await doctorModel.findByIdAndUpdate(docId, { slot_booked: slotBooked });

    // Respond with success
    res.json({ success: true, message: "Appointment canceled" });
  } catch (error) {
    console.error("Error in cancelAppointment:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const CHAPA_API_URL = 'https://api.chapa.co/v1/transaction/initialize';
const CHAPA_SECRET_KEY = "CHASECK_TEST-Zx9WYTlcvbOsbvqOMLbDclIchCwINaHP";

const initiateAppointmentPayment = async (req, res) => {
  const { phone, currency, txRef, callbackUrl, appointmentId } = req.body;

  // Ensure all required fields are present
  if (!phone || !txRef || !callbackUrl) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing required fields: phone, txRef, or callbackUrl',
    });
  }

  // Find appointment by ID
  const appointment = await Appointment.findById(appointmentId);

  if (!appointment) {
    return res.status(404).json({ success: false, message: 'Appointment not found' });
  }

  const appointmentDate = appointment.date ? new Date(appointment.date).toISOString() : 'N/A';

  const title = 'Doctor Apt'; // Title must be ≤ 16 characters
  let description = `Payment for appointment on ${appointment.date}`;

  description = description.replace(/[^a-zA-Z0-9-_ .]/g, ''); // Only allow letters, numbers, hyphens, underscores, spaces, and dots
  description = description.slice(0, 50); // Ensure description is ≤ 50 characters

  // Construct the payment data
  const paymentData = {
    amount: appointment.amount * 100, // Amount should be in cents
    currency: currency || 'ETB', 
    phone: phone,
    tx_ref: txRef,
     return_url: 'http://localhost:3000/my-appointment',
    callback_url: callbackUrl,
    appointmentId,
    appointmentDate,
    customization: {
      title: title,
      description: description,
    },
  };

  console.log('Payment Data:', paymentData); 

  try {
    // Send request to Chapa API
    const response = await axios.post(CHAPA_API_URL, paymentData, {
      headers: {
        Authorization: `Bearer ${CHAPA_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('Chapa API Response:', response.data);

    if (response.data.status === 'success') {
      res.status(200).json({
        status: 'success',
        checkoutUrl: response.data.data.checkout_url, // Chapa's checkout URL
        appointmentId, // Include appointmentId
        tx_ref:txRef,         // Include txRef
      });
    }
    
      
     else {
      res.status(400).json({
        status: 'fail',
        message: response.data.message || 'Failed to initialize payment.',
      });
    }
  } catch (error) {
    console.error('Error initiating payment:', error.response ? error.response.data : error.message); // Log error response from Chapa
    res.status(500).json({
      status: 'error',
      message: 'Payment initiation failed',
      error: error.message,
    });
  }
};



const verifyAppointmentPayment = async (req, res) => {
  const { txRef, appointmentId } = req.body;  

  if (!txRef) {
    return res.status(400).json({ message: 'Transaction reference is required' });
  }

  if (!appointmentId) {
    return res.status(400).json({ message: 'Appointment ID is required' });
  }

  try {
    // Make a request to Chapa API to verify the transaction
    const response = await axios.get(`https://api.chapa.co/v1/transaction/verify/${txRef}`, {
      headers: {
        Authorization: `Bearer ${CHAPA_SECRET_KEY}`,  
      },
    });

    if (response.data.status === 'success') {
      const appointment = await Appointment.findById(appointmentId);

      if (!appointment) {
        return res.status(404).json({ message: 'Appointment not found' });
      }

      // Update the payment status
      appointment.payment = true;  // Assuming 'payment' field indicates if the payment is successful
      await appointment.save();

      return res.status(200).json({
        status: 'success',
        message: 'Payment verified successfully',
        data: response.data,
      });
    } else {
      return res.status(400).json({
        status: 'fail',
        message: 'Payment verification failed',
      });
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Error verifying payment',
      error: error.message,
    });
  }
};





export { registerUser, userLogin, getProfile, updateProfile, bookAppointment, myAppointment, cancelAppointment ,initiateAppointmentPayment, verifyAppointmentPayment};
