import React from 'react';
import group from '../asset/group.png';
import headers from '../asset/headers.png';
import arrow from '../asset/arrow.png'
const Header = () => {
  return (
    <div className="bg-gradient-to-r  from-blue-500 to-teal-400 m-4 text-white py-16 px-4 sm:px-8 lg:h-[505px] flex flex-wrap items-center justify-between">
      {/* Left side */}
      <div className="max-w-md space-y-4 m-2">
        <p className="text-3xl font-bold leading-snug">
          Book Appointment<br /> With Trusted Doctors
        </p>
        <div className="flex items-center space-x-4">
          <img src={group} alt="" className="w-12 h-12" />
          <p className="text-sm text-gray-200">
            Simply browse through our extensive list of trusted doctors,
            <br /> schedule your appointment
          </p>
        </div>
        <a href="#specialty" class="flex items-center justify-center 
        space-x-2 px-4 py-2 w-fit bg-white text-black text-sm rounded-full 
        transition-colors duration-200 ease-in-out hover:bg-blue-600 hover:text-white">
    <span>Book Appointment</span>
    <img src={arrow} alt="arrow" class="w-4 h-4"/>
</a>

      </div>
      {/* Right side */}
      <div className=" w-full md:w-1/2 items-center relative">
        <img src={headers} alt="Header Illustration" className="w-full bottom-2 h-auto  rounded-lg shadow-lg" />
      </div>
    </div>
  );
}

export default Header;
