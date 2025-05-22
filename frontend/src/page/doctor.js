import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../component/context';
function Doctor() {
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const { doctors } = useContext(AppContext)
  const navigate = useNavigate();

  useEffect(() => {
    const applyFilter = () => {
      if (speciality) {
        setFilterDoc(
          doctors.filter(doc => doc.speciality.toLowerCase() === speciality.toLowerCase())
        );
      } else {
        setFilterDoc(doctors);
      }
    };

    applyFilter();
  }, [speciality,doctors]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <p className="text-xl font-bold text-center mb-8">Browse through the doctor specialty.</p>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <button
          className="py-1 px-3 rounded text-sm transition-all lg:hidden border w-32"
          onClick={() => setShowFilter(prev => !prev)}>
          Filters
        </button>


        {/* Specialty Column */}
        {(showFilter || window.innerWidth >= 1024) && (
          <div className={`bg-white p-6 rounded-lg shadow-md ${showFilter ? "block" : "hidden"} lg:block`}>
            <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">Specialties</h2>
            <div className="flex flex-col space-y-4">
              <p
                className={`rounded-full py-2 px-4 text-center cursor-pointer 
                  ${speciality === 'General Physician' ? 'bg-blue-300 text-white' : 'bg-blue-100 text-gray-800'}`}
                onClick={() => navigate('/doctors/General Physician')}
              >
                General Physician
              </p>

              <p
                className={`rounded-full py-2 px-4 text-center cursor-pointer 
                  ${speciality === 'Gynecologist' ? 'bg-blue-300 text-white' : 'bg-blue-100 text-gray-800'}`}
                onClick={() => navigate('/doctors/Gynecologist')}
              >
                Gynecologist
              </p>

              <p
                className={`rounded-full py-2 px-4 text-center cursor-pointer 
                  ${speciality === 'Dermatologist' ? 'bg-blue-300 text-white' : 'bg-blue-100 text-gray-800'}`}
                onClick={() => navigate('/doctors/Dermatologist')}
              >
                Dermatologist
              </p>

              <p
                className={`rounded-full py-2 px-4 text-center cursor-pointer 
                  ${speciality === 'Neurologist' ? 'bg-blue-300 text-white' : 'bg-blue-100 text-gray-800'}`}
                onClick={() => navigate('/doctors/Neurologist')}
              >
                Neurologist
              </p>

              <p
                className={`rounded-full py-2 px-4 text-center cursor-pointer 
                  ${speciality === 'Pediatricians' ? 'bg-blue-300 text-white' : 'bg-blue-100 text-gray-800'}`}
                onClick={() => navigate('/doctors/Pediatricians')}
              >
                Pediatricians
              </p>

              <p
                className={`rounded-full py-2 px-4 text-center cursor-pointer 
                  ${speciality === 'Gastroenterologist' ? 'bg-blue-300 text-white' : 'bg-blue-100 text-gray-800'}`}
                onClick={() => navigate('/doctors/Gastroenterologist')}
              >
                Gastroenterologist
              </p>
            </div>
          </div>
        )}

        {/* Doctors List Column */}
        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filterDoc.map((doctor, index) => (
            <div
              onClick={() => navigate(`/appointment/${doctor._id}`)}
              key={index}
              className="bg-white shadow-lg rounded-lg p-4 cursor-pointer transform hover:-translate-y-2 transition-all duration-500"
            >
              <img src={doctor.image} alt="Doctor" className="w-full h-48 object-cover rounded-t-lg" />
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
      </div>
    </div>
  );
}

export default Doctor;
