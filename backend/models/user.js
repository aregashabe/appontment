import mongoose from 'mongoose';

// Define the schema for a user
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    image: { type: String, default: "" },
    dob: { type: String, default: "Not Selected" },
    phone: { type: String, default: "0000000000" },
    gender: { type: String, default: "Not Selected", enum: ["Male", "Female", "Not Selected"] },
    address: {
      type: Object,
      default: { line1: "", line2: "" },
    },
  },
  { minimize: false, timestamps: true } // Keeps empty objects and adds createdAt, updatedAt timestamps
);

const userModel = mongoose.model('User', userSchema);

export default userModel;
