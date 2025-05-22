import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    userId: {    type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    docId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
    slotTime: { type: String, required: true },
    slotDate: { type: String, required: true },
    docDate: { type: Object, required: true },
    userDate: { type: Object, required: true },
    amount: { type: Number, required: true },
    cancelled: { type: Boolean, default: false },
    payment: { type: Boolean, default: false },
    isCompleted: { type: Boolean, default: false }
}); 

const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;
