import React, { useState, useCallback, createContext } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
  const [dToken, setDToken] = useState(localStorage.getItem('dToken') || '');
  const [appointments, setAppointments] = useState([]);
  const [dashboard, setDashboard] = useState([]);
  const [docData, setDocData] = useState([]);

  const [loading, setLoading] = useState(false); // Add loading state
  const Backend_url = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001';

  // Fetch appointments
  const getAppointment = useCallback(async () => {
    if (!dToken) return;
    setLoading(true); // Start loading state
    try {
      const response = await axios.get(`${Backend_url}/api/doctor/doctor-appointment`, {
        headers: { Authorization: `Bearer ${dToken}` },
      });

      if (response.status === 200 && response.data.appointments) {
        setAppointments(response.data.appointments);
      } else {
        toast.error(response.data.message || 'No appointments found');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch appointments');
    } finally {
      setLoading(false); // End loading state
    }
  }, [dToken, Backend_url]);

  // Cancel appointment
  const cancelAppointment = useCallback(async (appointmentId) => {
    setLoading(true); // Start loading state
    try {
      const response = await axios.post(
        `${Backend_url}/api/doctor/cancelled-appointment`,
        { appointmentId },
        {
          headers: { Authorization: `Bearer ${dToken}` },
        }
      );

      if (response.status === 200) {
        getAppointment(); // Refresh the appointment list
        toast.success('Appointment cancelled successfully');
      } else {
        toast.error(response.data.message || 'Failed to cancel appointment');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to cancel appointment');
    } finally {
      setLoading(false); // End loading state
    }
  }, [dToken, Backend_url, getAppointment]);

  // Complete appointment
  const completeAppointment = useCallback(async (appointmentId) => {
    setLoading(true); // Start loading state
    try {
      const response = await axios.post(
        `${Backend_url}/api/doctor/appointment-completed`,
        { appointmentId },
        {
          headers: { Authorization: `Bearer ${dToken}` },
        }
      );

      if (response.status === 200) {
        getAppointment(); // Refresh the appointment list
        toast.success('Appointment completed successfully');
      } else {
        toast.error(response.data.message || 'Failed to complete appointment');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to complete appointment');
    } finally {
      setLoading(false); // End loading state
    }
  }, [dToken, Backend_url, getAppointment]);
  const getDashdata= useCallback(async () => {
    if (!dToken) return;
    setLoading(true); // Start loading state
    try {
      const response = await axios.get(`${Backend_url}/api/doctor/doctor-dashboard`, {
        headers: { Authorization: `Bearer ${dToken}` },
      });

      if (response.status === 200 && response.data.dashData) {
        setDashboard(response.data.dashData);
      } else {
        toast.error(response.data.message );
      }
    } catch (error) {
      toast.error(error.response?.data?.message );
    } finally {
      setLoading(false); // End loading state
    }
  }, [dToken, Backend_url]);
//  get doctor profile
const loadDoctorProfileData = useCallback(async () => {
  try {
    const { data } = await axios.get(`${Backend_url}/api/doctor/profile`, {
      headers: { Authorization: `Bearer ${dToken}` },
    });
    if (data.success) {
      console.log("Doctor Profile:", data.doctorData);
      setDocData(data.doctorData);
    } else {
      toast.error(data.message || "Failed to fetch doctor profile");
    }
  } catch (error) {
    console.error("Error fetching profile:", error);
    toast.error(error.response?.data?.message || "Failed to fetch doctor profile");
  }
}, [dToken, Backend_url, setDocData]);

  const value = {
    dToken,
    setDToken,
    getAppointment,
    appointments,
    cancelAppointment,
    completeAppointment,
    loading,
    getDashdata,
    dashboard,
    setDashboard,
    loadDoctorProfileData,
    docData,
    Backend_url 
  };

  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
