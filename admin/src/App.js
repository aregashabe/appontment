import React, { useContext } from 'react';
import './App.css'; // Make sure to use the correct styles for the admin interface
import { Route, Routes } from 'react-router-dom';
import { AdminContext } from './context/adminContext';

import NavBar from './component/navBar';
import SideBar from './component/sideBar';
import AddDoctor from './page/admin/AddDoctor';
import Dasboard from './page/admin/Dasboard';
import AllAppointment from './page/admin/AllAppointment';
import DoctorList from './page/admin/DoctorList';
import Login from './page/login';
import { ToastContainer } from 'react-toastify';
import DoctorAppointment from './page/doctor/DoctorAppointment';
import DoctorProfile from './page/doctor/doctorProfile';
import DoctorDashboard from './page/doctor/DoctorDashboard';
import { DoctorContext } from './context/doctorContext';
function App() {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  // If admin token exists, show the admin interface
  return aToken||dToken ? (
    <div>
      <ToastContainer />

      <NavBar />
      <div className="flex items-start">
        <SideBar />
        <Routes>
          {/* admin route */}        
          <Route path="/" element={<></>} />

          <Route path="/admin-dashboard" element={<Dasboard />} />
          <Route path="/add-doctors" element={<AddDoctor />} />
          <Route path="/all-appointment" element={<AllAppointment />} />
          <Route path="/doctor-list" element={<DoctorList />} />
          {/* doctor route */}
          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
          <Route path="/doctor-profile" element={<DoctorProfile />} />
          <Route path="/doctor-appointment" element={<DoctorAppointment />}/>
        </Routes>
      </div>
    </div>
  ) : (
    <div>
      <Login />    </div>
  );
}

export default App;
