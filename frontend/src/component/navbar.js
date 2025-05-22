import React, { useContext, useState } from 'react';
import logo from '../asset/logo.png';
import dropdown_icon from '../asset/dropdown_icon.png';
import { NavLink, useNavigate } from 'react-router-dom';
import menu from '../asset/menu.png';
import cross from '../asset/cross.png';
import { AppContext } from './context';

function Navbar() {
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const { token, setToken, userData, setUserData } = useContext(AppContext);

    const handleLogout = () => {
        setToken(''); // Clear the token
        setUserData(null); // Clear the user data
        localStorage.removeItem('token');
        navigate('/login');
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const closeMobileMenu = () => {
        setShowMenu(false);
    };

    return (
        <div className="w-full">
            <div className="max-w-7xl mx-auto flex items-center justify-between border-b-2 border-gray-300 p-4">
                <img 
                    onClick={() => navigate('/')} 
                    src={logo} 
                    alt="Logo" 
                    className="h-10 w-auto cursor-pointer" 
                />

                {/* Desktop Menu */}
                <ul className="hidden md:flex space-x-8 mx-auto">
                    <NavLink to="/" 
                        className={({ isActive }) => isActive ? "text-gray-600 font-medium underline" : "text-gray-600 hover:text-blue-500 font-medium"}>
                        Home
                    </NavLink>
                    <NavLink to="/doctors" 
                        className={({ isActive }) => isActive ? "text-gray-600 font-medium underline" : "text-gray-600 hover:text-blue-500 font-medium"}>
                        All Doctors
                    </NavLink>
                    <NavLink to="/about" 
                        className={({ isActive }) => isActive ? "text-gray-600 font-medium underline" : "text-gray-600 hover:text-blue-500 font-medium"}>
                        About
                    </NavLink>
                    <NavLink to="/contact" 
                        className={({ isActive }) => isActive ? "text-gray-600 font-medium underline" : "text-gray-600 hover:text-blue-500 font-medium"}>
                        Contact
                    </NavLink>
                </ul>

                {/* User Profile and Dropdown */}
                <div className="relative">
                    {token && userData ? (
                        <div className="flex items-center space-x-2">
                            <img 
                                src={userData.image} 
                                alt="Profile" 
                                className="h-10 w-10 rounded-full cursor-pointer" 
                                onClick={toggleDropdown} 
                            />
                            <img 
                                src={dropdown_icon} 
                                alt="Dropdown icon" 
                                className="h-6 w-6 cursor-pointer" 
                                onClick={toggleDropdown} 
                            />

                            {/* Dropdown Menu */}
                            {dropdownOpen && (
                                <div className="absolute top-12 right-0 bg-white shadow-lg p-3 rounded-lg border border-gray-300 z-10 min-w-[150px]">
                                    <p 
                                        onClick={() => navigate('/my-profile')} 
                                        className="font-medium text-gray-800 cursor-pointer hover:text-blue-500">
                                        My Profile
                                    </p>
                                    <p 
                                        onClick={() => navigate('/my-appointment')} 
                                        className="font-medium text-gray-800 cursor-pointer hover:text-blue-500">
                                        My Appointment
                                    </p>
                                    <p 
                                        onClick={handleLogout} 
                                        className="font-medium text-gray-800 cursor-pointer hover:text-blue-500">
                                        Logout
                                    </p>
                                </div>
                            )}
                        </div>
                    ) : (
                        // Show Create Account button when the user is not logged in
                        <button 
                            onClick={() => navigate('/login')} 
                            className="bg-blue-500 text-white font-medium px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300">
                            Create Account
                        </button>
                    )}
                </div>

                {/* Mobile Menu Toggle */}
                <img 
                    onClick={() => setShowMenu(true)} 
                    src={menu} 
                    alt="Menu" 
                    className="w-6 md:hidden cursor-pointer" 
                />

                {/* Mobile Menu */}
                {showMenu && (
                    <div className="absolute top-0 left-0 w-full h-full bg-white z-20 flex flex-col p-4">
                        <div className="flex items-center justify-between w-full mb-4">
                            <img 
                                src={logo} 
                                alt="Logo" 
                                className="h-10 cursor-pointer" 
                                onClick={() => navigate('/')} 
                            />
                            <img 
                                onClick={() => setShowMenu(false)} 
                                src={cross} 
                                alt="Close menu" 
                                className="w-6 cursor-pointer" 
                            />
                        </div>

                        <ul className="flex flex-col space-y-4 mt-6 justify-center items-center">
                            <NavLink
                                to="/"
                                onClick={closeMobileMenu}
                                className={({ isActive }) =>
                                    isActive ? "bg-blue-500 text-white font-medium" : "text-gray-600 hover:text-blue-500 font-medium transition-all duration-300 ease-in-out focus:outline-none"}>
                                Home
                            </NavLink>
                            <NavLink
                                to="/doctors"
                                onClick={closeMobileMenu}
                                className={({ isActive }) =>
                                    isActive ? "bg-blue-500 text-white font-medium" : "text-gray-600 hover:text-blue-500 font-medium transition-all duration-300 ease-in-out focus:outline-none"}>
                                Doctors
                            </NavLink>
                            <NavLink
                                to="/about"
                                onClick={closeMobileMenu}
                                className={({ isActive }) =>
                                    isActive ? "bg-blue-500 text-white font-medium" : "text-gray-600 hover:text-blue-500 font-medium transition-all duration-300 ease-in-out focus:outline-none"}>
                                About
                            </NavLink>
                            <NavLink
                                to="/contact"
                                onClick={closeMobileMenu}
                                className={({ isActive }) =>
                                    isActive ? "bg-blue-500 text-white font-medium" : "text-gray-600 hover:text-blue-500 font-medium transition-all duration-300 ease-in-out focus:outline-none"}>
                                Contact
                            </NavLink>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Navbar;
