import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/adminContext";
import profile from "../../asset/Profile.png";
import appointment from "../../asset/appointment.png";
import patient from "../../asset/patient.png";
import list from "../../asset/list.png";
import cross from "../../asset/cross.png";

function Dashboard() {
  const { getDashBoard, dashData, aToken, getAppointment, cancelAppointment } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getDashBoard();
      getAppointment();
    }
  }, [aToken, getDashBoard, getAppointment]);

  return (
    dashData && (
      <div className="bg-gray-100 min-h-screen p-6">
        {/* Overview Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Doctors Section */}
          <div className="bg-white p-4 rounded-lg shadow-lg flex items-center cursor-pointer hover:shadow-xl hover:bg-gray-50 active:scale-95 transition-all">
            <img src={profile} alt="Doctors" className="w-16 h-16 rounded-full mr-4" />
            <div>
              <p className="text-lg font-bold">{dashData.doctors || 0}</p>
              <p className="text-sm text-gray-600">Doctors</p>
            </div>
          </div>

          {/* Appointments Section */}
          <div className="bg-white p-4 rounded-lg shadow-lg flex items-center cursor-pointer hover:shadow-xl hover:bg-gray-50 active:scale-95 transition-all">
            <img src={appointment} alt="Appointments" className="w-16 h-16 rounded-full mr-4" />
            <div>
              <p className="text-lg font-bold">{dashData.appointments || 0}</p>
              <p className="text-sm text-gray-600">Appointments</p>
            </div>
          </div>

          {/* Patients Section */}
          <div className="bg-white p-4 rounded-lg shadow-lg flex items-center cursor-pointer hover:shadow-xl hover:bg-gray-50 active:scale-95 transition-all">
            <img src={patient} alt="Patients" className="w-16 h-16 rounded-full mr-4" />
            <div>
              <p className="text-lg font-bold">{dashData.patients || 0}</p>
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
            {dashData.latestAppointments && dashData.latestAppointments.length > 0 ? (
              dashData.latestAppointments.map((item, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
                  <div className="flex items-center">
                    <img
                      src={item.docId?.image || profile}
                      alt={`Doctor ${index + 1}`}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <p className="text-sm text-gray-700 font-medium">
                        {item.docId?.name || "Unknown Doctor"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {item.date} - {item.slotTime}
                      </p>
                    </div>
                  </div>
                  <div>
                    {/* Cancel Button */}
                    {!item.cancelled && !item.isCompleted && (
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                        aria-label={`Cancel appointment ${item._id}`}
                        onClick={() => cancelAppointment(item._id)}
                      >
                        <img
                          src={cross}
                          alt="Cancel"
                          className="w-5 h-5 inline"
                        />
                      </button>
                    )}
                    {/* Completed Label */}
                    {item.isCompleted && (
                      <span className="text-green-500 text-sm mt-2">Completed</span>
                    )}
                    {/* Canceled Label */}
                    {item.cancelled && !item.isCompleted && (
                      <span className="text-red-500 text-sm mt-2">Canceled</span>
                    )}
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
  );
}

export default Dashboard;
