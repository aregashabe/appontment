import React from 'react';
import { specialtyData } from '../asset/asset'; 
import { Link } from 'react-router-dom';

const Speciality = () => {
  return (
    <div id="specialty" className="p-8 bg-gray-50 text-center">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Find by Speciality</h1>

      <p className="text-sm text-gray-600 mb-6">
        Simply browse through our extensive list of trusted doctors,
        <br /> schedule your appointment.
      </p>

      <div className="flex justify-center space-x-6 overflow-x-auto">
        {specialtyData.map((item, index) => (
          <Link
            key={index}
            to={`/doctors/${item.speciality}`}
            className="flex flex-col items-center p-4 bg-white shadow-md rounded-lg hover:bg-blue-50 transition-colors min-w-[150px]"
            onClick={() => window.scrollTo(0, 0)}
          >
            {item.image && ( 
              <img
                src={item.image}
                alt={`${item.speciality} icon`}
                className="w-24 h-24 object-cover rounded-full mb-4"
              />
            )}
            <p className="text-lg font-medium text-gray-700">{item.speciality}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Speciality;
