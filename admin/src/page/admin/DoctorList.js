import React, { useContext } from 'react';
import { AdminContext } from '../../context/adminContext';

function DoctorList() {
  const { doctors, changeAvailability } = useContext(AdminContext);

  return (
    <div className="p-6 min-h-screen overflow-y-auto bg-gray-100 scrollbar-hide">
      <h1 className="text-2xl font-bold text-gray-700 mb-4">All Doctors</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {doctors.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200"
          >
            <img
              src={item.image}
              alt={`${item.name}'s Profile`} 
              className="w-full h-48 object-cover bg-indigo-50 group-hover:bg-blue-600 transition-all duration-75"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
              <p className="text-gray-600 mb-2">{item.speciality}</p>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={item.available}
                  onChange={() => changeAvailability(item._id)} 
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded cursor-pointer"
                />
                <p className="text-sm text-gray-500">{item.available ? 'Available' : 'Not Available'}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DoctorList;

