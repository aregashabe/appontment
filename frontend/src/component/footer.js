import React from 'react';
import logo from '../asset/logo.png';

function Footer() {
  return (
    <div className="text-black py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start px-4">
        {/* Left Side */}
        <div className="mb-6 md:mb-0">
          <img src={logo} alt="Logo" className="h-10 w-auto mb-2" />
          <p className="text-black">Book your doctor appointment today!</p>
          <p className="text-black mt-2">
            Our mission is to provide accessible healthcare <br /> services to everyone. 
            We believe that timely medical <br /> attention can make a significant <br /> difference 
            in your health.
          </p>
        </div>

        {/* Center */}
        <div className="mb-6 md:mb-0">
          <p className="font-bold text-lg">COMPANY</p>
          <ul className="list-none mt-2 space-y-1">
            <li><a href="#" className="text-black hover:text-gray-700 ">Home</a></li>
            <li><a href="#" className="text-black hover:text-gray-700 ">About Us</a></li>
            <li><a href="#" className="text-black hover:text-gray-700 ">Services</a></li>
            <li><a href="#" className="text-black hover:text-gray-700 ">Contact Us</a></li>
            <li><a href="#" className="text-black hover:text-gray-700 ">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Right Side */}
        <div>
          <p className="font-bold text-lg">GET IN TOUCH</p>
          <ul className="list-none mt-2 space-y-1">
            <li className="text-black">Phone: +251 953235933</li>
            <li className="text-black">Email: aregashabebeb34@gmail.com</li>
            <li className="text-black">Address: 123 Health St., Addis Ababa, Ethiopia</li>
          </ul>
        </div>
      </div>

      {/* Additional Information Section */}
      <div className="mt-6 border-t border-gray-700 pt-4 text-center m-5">
        <p className="text-black">
          Follow us on social media for updates and health tips!
        </p>
        <div className="flex justify-center mt-2 space-x-4">
          <a href="#" className="text-black hover:text-gray-500">Facebook</a>
          <a href="#" className="text-black hover:text-gray-500">Twitter</a>
          <a href="#" className="text-black hover:text-gray-500">Instagram</a>
        </div>
      </div>

      {/* Copyright text */}
      <div className="mt-6 border-t border-gray-700 pt-4 text-center m-5" >
        <p className="text-black">Copyright 2024 @ prescripto - All Rights Reserved.</p>
      </div>
    </div>
  );
}

export default Footer;
