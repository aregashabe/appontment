import React, { useContext } from 'react';
import { AdminContext } from '../context/adminContext';
import { NavLink } from 'react-router-dom';
import add from '../asset/add.png';
import home from '../asset/home.png';
import appointment from '../asset/appointment.png';
import people from '../asset/people.png';
import { DoctorContext } from '../context/doctorContext';

function SideBar() {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  return (
<div className="h-screen w-72 bg-white shadow-md">
  {aToken && (
        <ul className="space-y-6 p-6">
          <NavLink
            to="/admin-dashboard"
            className={({ isActive }) =>
              `flex items-center gap-4 p-4 rounded-lg text-lg ${
                isActive
                  ? 'bg-gray-200 border-r-4 border-blue-500 font-semibold'
                  : 'text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            <img src={home} alt="Dashboard Icon" className="w-8 h-8" />
            <p className='hidden md:block'> Dashboard</p>
          </NavLink>
          <NavLink
            to="/all-appointment"
            className={({ isActive }) =>
              `flex items-center gap-4 p-4 rounded-lg text-lg ${
                isActive
                  ? 'bg-gray-200 border-r-4 border-blue-500 font-semibold'
                  : 'text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            <img src={appointment} alt="Appointments Icon" className="w-8 h-8" />
            <p>Appointments</p>
          </NavLink>
          <NavLink
            to="/add-doctors"
            className={({ isActive }) =>
              `flex items-center gap-4 p-4 rounded-lg text-lg ${
                isActive
                  ? 'bg-gray-200 border-r-4 border-blue-500 font-semibold'
                  : 'text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            <img src={add} alt="Add Doctor Icon" className="w-8 h-8" />
            <p  className='hidden md:block'>Add Doctor</p>
          </NavLink>
          <NavLink
            to="/doctor-list"
            className={({ isActive }) =>
              `flex items-center gap-4 p-4 rounded-lg text-lg ${
                isActive
                  ? 'bg-gray-200 border-r-4 border-blue-500 font-semibold'
                  : 'text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            <img src={people} alt="Doctor List Icon" className="w-8 h-8" />
            <p  className='hidden md:block'>Doctor List</p>
          </NavLink>
        </ul>
      )}
      {/* doctor sidebar */}
      {dToken && (
        <ul className="space-y-6 p-6">
          <NavLink
            to="/doctor-dashboard"
            className={({ isActive }) =>
              `flex items-center gap-4 p-4 rounded-lg text-lg ${
                isActive
                  ? 'bg-gray-200 border-r-4 border-blue-500 font-semibold'
                  : 'text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            <img src={home} alt="Dashboard Icon" className="w-8 h-8" />
            <p className='hidden md:block'>Dashboard</p>
          </NavLink>
          <NavLink
            to="/doctor-appointment"
            className={({ isActive }) =>
              `flex items-center gap-4 p-4 rounded-lg text-lg ${
                isActive
                  ? 'bg-gray-200 border-r-4 border-blue-500 font-semibold'
                  : 'text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            <img src={appointment} alt="Appointments Icon" className="w-8 h-8" />
            <p  className='hidden md:block'>Appointments</p>
          </NavLink>
          
          <NavLink
            to="/doctor-profile"
            className={({ isActive }) =>
              `flex items-center gap-4 p-4 rounded-lg text-lg ${
                isActive
                  ? 'bg-gray-200 border-r-4 border-blue-500 font-semibold'
                  : 'text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            <img src={people} alt="Doctor List Icon" className="w-8 h-8" />
            <p  className='hidden md:block'>Profile</p>
          </NavLink>
        </ul>
      )}
    </div>
    
  );
}

export default SideBar;
