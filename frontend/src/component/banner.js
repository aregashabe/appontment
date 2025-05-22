import React from 'react';
import Selam from '../asset/Selam.png';
import { useNavigate } from 'react-router-dom';
function Banner() {
  const navigate=useNavigate()
  return (
    <div className="m-6 flex items-center justify-between p-6 bg-blue-400 rounded-lg shadow-md">
      {/* Left Side */}
      <div className="flex flex-col items-center"> 
        <p className="text-2xl font-bold text-white text-center">Book Appointment</p>
        <p className="text-lg font-bold text-white text-center">with 100+ Trusted Doctors</p>
        <button onClick ={()=>{navigate('/login');window.scrollTo(0,0)}}className="mt-4 bg-white text-black px-6 py-3 rounded-full hover:bg-blue-700 hover:text-white transition duration-300">
          Create Account
        </button>
      </div>
      {/* Right Side */}
      <div className="hidden md:block md:w-1/2 lg:w-[370px]"> 
        <img src={Selam} alt="Doctor" className="w-full h-auto max-w-md" />
      </div>
    </div>
  );
}

export default Banner;
