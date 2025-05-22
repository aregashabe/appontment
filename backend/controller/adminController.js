import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctors.js";
import Appointment from "../models/appointment.js";
import userModel from "../models/user.js";
// API for adding a doctor
const addDoctor = async (req, res) => {
  const { name, email, password, degree, experience, speciality, fees, address1, address2, about } = req.body;
  const docImg = req.file; 

 
  if (!name || !email || !password || !docImg || !degree || !experience || !speciality || !fees || !address1 || !address2 || !about) {
    return res.status(400).json({ success: false, message: 'Missing required details' });
  }

  // Validate email
  if (!validator.isEmail(email)) {
    return res.status(400).json({ success: false, message: 'Invalid email address' });
  }

  // Validate password length
  if (password.length < 8) {
    return res.status(400).json({ success: false, message: 'Password must be at least 8 characters long' });
  }

  try {
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Upload image to Cloudinary
    const imageUpload = await cloudinary.uploader.upload(docImg.path, {
      resource_type: "image"
    });
    const imageURL = imageUpload.secure_url;
    
    const doctorData = {
      name,
      email,
      password: hashPassword,
      degree,
      experience,
      speciality,
      fees,
      address: { address1, address2 },  // Store address as an object
      about,
      image: imageURL,
      date: Date.now(),
    };

    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();

    res.status(201).json({ success: true, message: 'Doctor added successfully', doctor: newDoctor });
  } catch (error) {
    console.error("Error adding doctor:", error);
    res.status(500).json({ success: false, message: 'Failed to add doctor' });
  }
};

// Admin login API
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate admin credentials
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      
      if (!process.env.JWT_SECRET) {
        console.error("JWT_SECRET is not defined in environment variables.");
        return res.status(500).json({ success: false, message: "Internal Server Error" });
      }

      const payload = { email, role: "admin" };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });

      return res.json({ success: true, token });
    } else {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
const allDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select("-password"); // Fetch all doctors excluding the password field
    return res.status(200).json({ success: true, doctors });
  } catch (error) {
    console.error(error); 
    return res.status(500).json({ success: false, message: "Internal Server Error" }); 
  }
};
// change avaliablity
const changeAvailability = async (req, res) => {
  try {
    const { doctorId, available } = req.body;

    if (!doctorId || available === undefined) {
      return res.status(400).json({ message: 'Doctor ID and availability are required' });
    }

    // Find the doctor by ID and update the availability
    const doctor = await doctorModel.findByIdAndUpdate(
      doctorId,
      { available },
      { new: true }
    );

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    return res.status(200).json({ message: 'Doctor availability updated', doctor });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

const appintmmentAdmin = async (req, res) => {
  try {

  

    const appointments = await Appointment.find()
  .populate('userId', 'name image dob ') // Populating specific fields of the user.
  .populate('docId', 'name image  '); // Populating specific fields of the user.

    console.log("Fetched appointments:", appointments); 

    
    return res.status(200).json({ success: true, appointments });
  } catch (error) {
    console.error("Error fetching appointments:", error); 
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
const appointmentCancel = async (req, res) => {
  try {
    

    const { appointmentId } = req.body;
    if (!appointmentId) {
      return res.status(400).json({ success: false, message: "Appointment ID is required" });
    }

    // Fetch appointment data
    const appointmentData = await Appointment.findById(appointmentId);
    if (!appointmentData) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
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
const adminDashboard = async (req, res) => {
  try {

  

    const doctors = await doctorModel.find({})
  
    const users = await userModel.find({})
    const appointments = await Appointment.find({}).populate("docId","image name")
const dashData={
  doctors:doctors.length,
  patients:users.length,
  appointments :appointments.length,
  latestAppointments:appointments.reverse().slice(0,5)
}
    
    return res.status(200).json({ success: true, dashData });
  } catch (error) {
    console.error( error); 
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
;


export { addDoctor, adminLogin,allDoctors ,changeAvailability
  ,appintmmentAdmin,appointmentCancel,
  adminDashboard} ;
