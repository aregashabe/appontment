import React, { createContext, useEffect,useCallback, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const AppContext = createContext();

const ContextProvider = (props) => {
  const [doctors, setDoctors] = useState([]);
  const [userData, setUserData] = useState(null);  
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  // Fetch doctors
  const getDoctors = async () => {
    try {
      const { data } = await axios.get('http://localhost:5001/api/doctor/list');
      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message || 'Failed to fetch doctors');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message);
    }
  };

  // Fetch user profile data
  const loadUserProfileData = useCallback(async () => {
    try {
      const { data } = await axios.get('http://localhost:5001/api/user/get-profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message || 'Failed to fetch user profile');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Failed to fetch user profile');
    }
  }, [token]);  // Adding token as a dependency to rerun if token changes

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      loadUserProfileData(); // Call the memoized function here
    } else {
      setUserData(null);
    }
  }, [token, loadUserProfileData]); // Effect depends on token and loadUserProfileData

  const value = {
    doctors,
    getDoctors,
    token,
    setToken,
    userData,
    setUserData,
    loadUserProfileData,
  };

  return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
};

export default ContextProvider;
