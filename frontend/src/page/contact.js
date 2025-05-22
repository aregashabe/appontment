import React from 'react'
import contact from '../asset/contact.png'

function Contact() {
  return (
    <div className="container mx-auto p-8">
      {/* Title Section */}
      <div className="text-center mb-8">
        <p className="text-3xl font-bold text-blue-600">CONTACT <span className="text-gray-800">US</span></p>
      </div>

      {/* Main Content Section */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        {/* Image Section */}
        <img src={contact} alt="Contact" className="w-full md:w-1/2 rounded-lg shadow-lg" />

        {/* Contact Info Section */}
        <div className="md:w-1/2 space-y-6"> {/* Increased gap using space-y-6 */}
          <p className="text-2xl font-semibold text-gray-800">Our OFFICE</p>
          <p className="text-lg text-gray-600">Ethiopia</p>
          <p className="text-lg text-gray-600">
            Tel: +(251) 953235933<br/>
            aregashabebe34@gmail.com
          </p>
          <p className="text-xl font-semibold text-blue-600">Careers at PRESCRIPTO</p>
          <p className="text-lg text-gray-700">Learn about our team and job openings.</p>
          <button className="px-6 py-3 focus:outline-none bg-blue-400 text-white rounded-md hover:bg-blue-700 transition duration-300">
            Explore Jobs
          </button>
        </div>
      </div>
    </div>
  )
}

export default Contact
