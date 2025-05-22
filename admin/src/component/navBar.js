import React, { useContext } from 'react';
import { AdminContext } from '../context/adminContext';
import alogo from '../asset/alogo.png';
import { useNavigate } from 'react-router-dom';
import { DoctorContext } from '../context/doctorContext';

function NavBar() {
  const { aToken, setAToken } = useContext(AdminContext);
const {dToken,setDToken}=useContext(DoctorContext)
  const navigate = useNavigate();


  const logout = () => {
    if (aToken) {
      setAToken('');
      localStorage.removeItem('aToken');
    }
    if (dToken) {
      setDToken('');
      localStorage.removeItem('dToken');
    }
        navigate('/login');
  };
  

  return (
    <div className="max-w-7xl mx-auto flex items-center justify-between border-b-2 border-gray-300 p-4 ">

      <div className="flex items-center text-xs gap-4">
        <img
          className="w-6 h-6 sm:w-8 sm:h-8 cursor-pointer"
          src={alogo}
          alt="Admin Logo"
        />
        <p className="rounded-lg">{aToken ? 'Admin' : 'Doctor'}</p>
      </div>
      <button
        onClick={logout}
        className="text-white bg-blue-600 text-sm px-2 py-1 rounded hover:bg-blue-700 transition duration-300"
      >
        Logout
      </button>
    </div>
  );
}

export default NavBar;
