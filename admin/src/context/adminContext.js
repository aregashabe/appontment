import React, { createContext, useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
  const [aToken, setAToken] = useState(localStorage.getItem('aToken') || '');
  const Backend_url = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001';
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [dashData, setDashData] = useState([]);

  // Fetch doctors
  const fetchDoctors = useCallback(async () => {
    if (!aToken) return;

    try {
      const response = await axios.get(`${Backend_url}/api/admin/all-doctor`, {
        headers: { Authorization: `Bearer ${aToken}` },
      });

      if (response.status === 200 && response.data.doctors) {
        setDoctors(response.data.doctors);
      } else {
        toast.error(response.data.message || 'No doctors found');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch doctors');
    }
  }, [aToken, Backend_url]);

  useEffect(() => {
    fetchDoctors();
  }, [fetchDoctors]);

  // Fetch appointments
  const getAppointment = useCallback(async () => {
    if (!aToken) return;

    try {
      const response = await axios.get(`${Backend_url}/api/admin/get-appointment`, {
        headers: { Authorization: `Bearer ${aToken}` },
      });

      if (response.status === 200 && response.data.appointments) {
        setAppointments(response.data.appointments);
      } else {
        toast.error(response.data.message || 'No appointments found');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch appointments');
    }
  }, [aToken, Backend_url]);

  // Cancel appointment
  const cancelAppointment = async (appointmentId) => {
    try {
      const response = await axios.post(
        `${Backend_url}/api/admin/appointment-cancel`,
        { appointmentId },
        {
          headers: { Authorization: `Bearer ${aToken}` },
        }
      );

      if (response.status === 200) {
        getAppointment(); // Refresh the appointment list
      } else {
        toast.error(response.data.message || 'Failed to cancel appointment');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to cancel appointment');
    }
  };

  // Fetch dashboard data
  const getDashBoard = useCallback(async () => {
    if (!aToken) return;

    try {
      const response = await axios.get(`${Backend_url}/api/admin/dashboard`, {
        headers: { Authorization: `Bearer ${aToken}` },
      });

      if (response.data.success) {
        setDashData(response.data.dashData);
      } else {
        toast.error(response.data.message || 'Failed to fetch dashboard data');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'An unexpected error occurred');
    }
  }, [aToken, Backend_url]);

  // Change doctor's availability
  const changeAvailability = async (doctorId) => {
    const doctorToUpdate = doctors.find((doctor) => doctor._id === doctorId);
    if (!doctorToUpdate) return;

    const newAvailability = !doctorToUpdate.available; // Toggle availability

    try {
      const response = await axios.post(
        `${Backend_url}/api/admin//change-available`,
        { doctorId, available: newAvailability },
        {
          headers: { Authorization: `Bearer ${aToken}` },
        }
      );
      if (response.status === 200) {
        // Update doctors state with the new availability
        const updatedDoctors = doctors.map((doctor) =>
          doctor._id === doctorId ? { ...doctor, available: newAvailability } : doctor );
        setDoctors(updatedDoctors);
        toast.success('Availability updated successfully');
      } else {
        toast.error('Failed to update availability');
      }
    } catch (error) {
      toast.error('Error updating availability');
    }
  };

  // Context value
  const value = {
    aToken,
    setAToken,
    Backend_url,
    doctors,
    appointments,
    getAppointment,
    cancelAppointment,
    getDashBoard,
    dashData,
    changeAvailability, 
  };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};

export default AdminContextProvider;
