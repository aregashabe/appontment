import React from 'react';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Contact from './page/contact';
import About from './page/about';
import Home from './page/home';
import Myappointment from './page/my-appointment';
import Doctor from './page/doctor';
import Myprofile from './page/my-profile';
import Appointment from './page/appointment';
import Navbar from './component/navbar';
import Login from './page/login';
import Footer from './component/footer';
import { ToastContainer } from 'react-toastify';
function App() {
  return (
    <div>
          <ToastContainer/>

      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* Define dynamic route correctly */}
          <Route path='/doctors/:speciality' element={<Doctor />} /> 
          <Route path='/doctors' element={<Doctor />} />

          <Route path='/' element={<Home />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/about' element={<About />} />
          <Route path='/my-appointment' element={<Myappointment />} />
          <Route path='/my-profile' element={<Myprofile />} />
          <Route path="/appointment/:_Id" element={<Appointment/>} />

          <Route path='/login' element={<Login />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
