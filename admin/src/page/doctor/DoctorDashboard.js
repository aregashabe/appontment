import React ,{useContext,useEffect}from 'react'
import { DoctorContext } from '../../context/doctorContext';
import earning from "../../asset/earning.png"; 
import appointment from "../../asset/appointment.png";
import patient from "../../asset/patient.png";
import list from "../../asset/list.png";
import cross from "../../asset/cross.png";
import tick from "../../asset/tick.png";

function DoctorDashboard() {
  const { getDashdata,dashboard,cancelAppointment, completeAppointment,dToken} = useContext(DoctorContext);

  useEffect(() => {
    if (dToken) {
      getDashdata();
       }
  }, [dToken, getDashdata]);

  return (
    dashboard && (
      <div className="bg-gray-100 min-h-screen p-6">
        {/* Overview Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Doctors Section */}
          <div
            className="bg-white p-4 rounded-lg shadow-lg flex items-center cursor-pointer hover:shadow-xl hover:bg-gray-50 active:scale-95 transition-all"
          >
            <img src={earning} alt="Doctors" className="w-16 h-16 rounded-full mr-4" />
            <div>
              <p className="text-lg font-bold">${dashboard.earning || 0}</p>
              <p className="text-sm text-gray-600">Earnings</p>
            </div>
          </div>

          {/* Appointments Section */}
          <div
            className="bg-white p-4 rounded-lg shadow-lg flex items-center cursor-pointer hover:shadow-xl hover:bg-gray-50 active:scale-95 transition-all"
          >
            <img src={appointment} alt="Appointments" className="w-16 h-16 rounded-full mr-4" />
            <div>
              <p className="text-lg font-bold">{dashboard.appointments || 0}</p>
              <p className="text-sm text-gray-600">Appointments</p>
            </div>
          </div>

          {/* Patients Section */}
          <div
            className="bg-white p-4 rounded-lg shadow-lg flex items-center cursor-pointer hover:shadow-xl hover:bg-gray-50 active:scale-95 transition-all"
          >
            <img src={patient} alt="Patients" className="w-16 h-16 rounded-full mr-4" />
            <div>
              <p className="text-lg font-bold">{dashboard.patients || 0}</p>
              <p className="text-sm text-gray-600">Patients</p>
            </div>
          </div>
        </div>

        {/* Latest Appointments Section */}
        <div className="mt-8">
          <div className="flex items-center mb-4">
            <img src={list} alt="Latest Appointments" className="w-16 h-16 rounded-full mr-4" />
            <p className="text-lg font-bold text-gray-800">Latest Appointments</p>
          </div>
          <div className="space-y-4">
            {dashboard.latestAppointment && dashboard.latestAppointment.length > 0 ? (
              dashboard.latestAppointment.map((item, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <img
                      src={item.userId.image }
                      alt={`Doctor ${index + 1}`}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <p className="text-sm text-gray-700 font-medium">
                        {item.userId.name || "Unknown Doctor"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {item.date} - {item.slotTime}
                      </p>
                    </div>
                  </div>
                  <div>
                  {
                  item.cancelled ?
                    <p className="w-24 text-center text-red-600 font-semibold">Canceled</p>
                    : item.isCompleted ?
                      <p className="w-24 text-center text-green-600 font-semibold">Completed</p>
                      : <div className="w-32 text-center">
                        <div className="flex gap-3 items-center justify-center">
                          <img
                            onClick={() => cancelAppointment(item._id)}  
                            src={cross}
                            alt="Delete"
                            className="w-5 h-5 cursor-pointer hover:scale-105 transition-transform text-red-600"
                          />
                          <img
                            onClick={() => completeAppointment(item._id)}  
                            src={tick}
                            alt="Confirm"
                            className="w-5 h-5 cursor-pointer hover:scale-105 transition-transform text-green-600"
                          />
                        </div>
                      </div>
                }
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No recent appointments found.</p>
            )}
          </div>
        </div>
      </div>
    )
  )
}

export default DoctorDashboard
