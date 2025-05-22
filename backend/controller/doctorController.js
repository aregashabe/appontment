import doctorModel from "../models/doctors.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Appointment from "../models/appointment.js";
const changeAvlablity = async (req, res) => {
    try {
        const docId = req.body.docId; 
        const docData = await doctorModel.findById(docId);
        if (!docData) {
          return res.status(404).json({ success: false, message: "Doctor not found" });
        }
        await doctorModel.findByIdAndUpdate(docId, { available: !docData.available });
        res.json({ success: true, message: "Availability changed" });
    } catch (error) {
        console.error("Error changing availability:", error); 
        res.status(500).json({ success: false, message: error.message });
    }
};
const doctorList = async (req, res) => {
    try {
        const doctors = await doctorModel.find(); 
        res.status(200).json({
            success: true,
            doctors,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch doctors",
        });
    }
};
const doctorLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
    
        const doctor = await doctorModel.findOne({ email });
        if (!doctor) {
          return res.status(404).json({ success: false, message: "Doctor does not exist" });
        }
    
        // Compare passwords
        const isMatch = await bcrypt.compare(password, doctor.password);
        if (!isMatch) {
          return res.status(401).json({ success: false, message: "Invalid credentials" });
        }
    
        // Generate a JWT token
        const dToken = jwt.sign({ id: doctor._id }, process.env.JWT_SECRETS, { expiresIn: "1d" });
    
        return res.status(200).json({
          success: true,
          message: "Login successful",
          dToken,
        });
      } catch (error) {
        console.error("Error during doctor login:", error);
        return res.status(500).json({ success: false, message: "Login failed" });
      }
  };
  const doctorAppintmment = async (req, res) => {
    try {
  
    const docId=req.docId
  

    const appointments = await Appointment.find({docId})
  .populate('userId', 'name image dob ') 
    
      console.log("Fetched appointments:", appointments); 
  
      
      return res.status(200).json({ success: true, appointments });
    } catch (error) {
      console.error("Error fetching appointments:", error);
      return res.status(500).json({ success: false, message: "Internal Server Error" });
    }}
    const appointmentCompleted = async (req, res) => {
      try {
        const docId = req.docId;
        const { appointmentId } = req.body;  
        
        const appointmentData = await Appointment.findById(appointmentId );
    
        if (appointmentData && appointmentData.docId.toString() === docId) {
          // Update the appointment to mark it as completed
          await Appointment.findByIdAndUpdate(appointmentId, { isCompleted: true });
          return res.status(200).json({ success: true, message: "Appointment Completed" });
        } else {
          return res.json({ success: false, message: "Mark Failed" });
        }
      } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
      }
    };
    
    const appointmentCancelled = async (req, res) => {
      try {
        const docId = req.docId;
        const { appointmentId } = req.body;  
        
        const appointmentData = await Appointment.findById(appointmentId );
    
        if (appointmentData && appointmentData.docId.toString() === docId) {
          // Update the appointment to mark it as cancelled
          await Appointment.findByIdAndUpdate(appointmentId, { cancelled: true });
          return res.status(200).json({ success: true, message: "Appointment Cancelled" });
        } else {
          return res.json({ success: false, message: "Cancel Failed" });
        }
      } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
      }
    };
    const doctorDashboard = async (req, res) => {
      try {
        const docId = req.docId;
    
        // Fetch all appointments for the doctor
        const appointments = await Appointment.find({ docId }).populate('userId', 'name image  '); // Populating specific fields of the user.

    
        let earning = 0;
        let patients = [];
    
        // Calculate earnings and unique patients
        appointments.map((item) => {
          if (item.isCompleted || item.payment) {
            earning += item.amount; // Assuming `amount` is a field in each appointment
          }
          if (!patients.includes(item.userId.toString())) {
            patients.push(item.userId.toString()); // Ensure unique patient IDs
          }
        });
    
        // Prepare dashboard data
        const dashData = {
          earning,
          appointments: appointments.length,
          patients: patients.length, // Use the length of unique patient array
          latestAppointment: appointments.reverse().slice(0, 5), // Get the latest 5 appointments
        };
    
        return res.status(200).json({ success: true, dashData });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
      }
    };
    //  get doctor profile


    const getProfile = async (req, res) => {
      try {
        const docId = req.docId;
    
        if (!docId) {
          return res.status(400).json({ success: false, message: "Doctor ID not provided" });
        }
    
        const doctor = await doctorModel.findById(docId).select("-password");
    
        if (!doctor) {
          return res.status(404).json({ success: false, message: "Doctor not found" });
        }
    
        return res.status(200).json({ success: true, doctorData: doctor });
      } catch (error) {
        console.error("Error in getProfile:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
      }
    };
    
    
// Update user profile

const updateProfile = async (req, res) => {
  try {
    const docId = req.docId;

    const { address, fees, available } = req.body;

    if (!docId) {
      return res.status(400).json({ success: false, message: "Doctor ID not provided" });
    }

    // if (!fees || !available || !address) {
    //   return res.status(400).json({ success: false, message: "Missing required details" });
    // }

    const doctor = await doctorModel.findById(docId);
    if (!doctor) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }

    await doctorModel.findByIdAndUpdate(docId, { fees, address, available });

    return res.status(200).json({ success: true, message: "Doctor profile updated" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

    
export{changeAvlablity,doctorList,doctorLogin
   ,doctorAppintmment,appointmentCompleted,
   appointmentCancelled,doctorDashboard,
  updateProfile,getProfile}