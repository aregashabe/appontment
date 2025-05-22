import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from './context.js';

const Topdoctor = () => {
    const { doctors, getDoctors } = useContext(AppContext);
    const navigate = useNavigate();

    // Fetch doctors when the component mounts
    useEffect(() => {
        getDoctors();
    }, []); // Runs only once

    console.log("Doctors Data:", doctors);

    // If `doctors` is undefined or empty, display a loading message or fallback UI
    if (!doctors || doctors.length === 0) {
        return <p className="text-center text-gray-500">Loading doctors...</p>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold text-center mb-4">Top Doctors</h1>
            <p className="text-center text-gray-600 mb-8">
                Simply browse through our extensive list of trusted doctors...
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {doctors.slice(0, 6).map((doctor) => (
                    <div
                        onClick={() => navigate(`/appointment/${doctor._id}`)}
                        key={doctor._id}
                        className="bg-white shadow-lg rounded-lg p-4 cursor-pointer hover:-translate-y-2 transition-all duration-500"
                    >
                        <img
                            src={doctor.image}
                            alt={doctor.name}
                            className="w-full h-48 object-cover rounded-t-lg"
                        />
                        <div className="p-2">
                            <p className="text-lg font-semibold text-gray-800">{doctor.name}</p>
                            <p className="text-gray-500">{doctor.speciality}</p>
                            <div className="flex items-center mt-2">
                                {doctor.available ? (
                                    <span className="text-green-600 font-medium flex items-center">
                                        <span className="mr-2">✅</span> Available
                                    </span>
                                ) : (
                                    <span className="text-red-600 font-medium flex items-center">
                                        <span className="mr-2">❌</span> Not Available
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-center">
                <button
                    onClick={() => {
                        navigate('/doctors');
                        window.scrollTo(0, 0);
                    }}
                    className="mt-6 mx-auto bg-gray-500 text-white px-4 py-2 rounded-full hover:bg-gray-700 w-24"
                >
                    More
                </button>
            </div>
        </div>
    );
};

export default Topdoctor;
