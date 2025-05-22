import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String, required: true },
  speciality: { type: String, required: true },
  address: { type: Object, required: true }, // Keeping address as an object
  degree: { type: String, required: true },
  experience: { type: String, required: true },
  about: { type: String, required: true },
  available: { type: Boolean, default: true },
  fees: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  slot_booked: { type: Object, default: {} },
}, { minimize: false });

const doctorModel = mongoose.models.Doctor || mongoose.model('Doctor', doctorSchema);

export default doctorModel;
