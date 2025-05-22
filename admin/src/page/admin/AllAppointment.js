import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/adminContext";
import { AppContext } from "../../context/appContext";
import cross from "../../asset/cross.png";

function AllAppointment() {
  const { aToken, appointments, getAppointment, cancelAppointment} = useContext(AdminContext);
  const { calculateAge } = useContext(AppContext);

  // Fetch appointments only when `aToken` changes
  useEffect(() => {
    if (aToken) {
      getAppointment();
    }
  }, [aToken, getAppointment]); // Only trigger if `aToken` or `getAppointment` changes

  return (
    <div className="container bg-gray-100 mx-auto p-4">
      <h1 className="text-2xl font-semibold text-center mb-6">All Appointments</h1>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        {/* Header Row */}
        <div className="flex bg-gray-200 p-4 text-sm font-bold justify-between">
          <p className="w-12 text-center">#</p>
          <p className="flex-1 text-center">Patient</p>
          <p className="w-24 text-center">Age</p>
          <p className="flex-1 text-center">Date @ Time</p>
          <p className="flex-1 text-center">Doctors</p>
          <p className="w-24 text-center">Fees</p>
          <p className="w-32 text-center">Action</p>
        </div>
        {/* Data Rows */}
        <div className="max-h-96 overflow-y-auto">
          {appointments && appointments.length > 0 ? (
            appointments.map((appointment, index) => (
              <div
                key={appointment._id}
                className="flex items-center p-4 border-b text-sm justify-between"
              >
                <p className="w-12 text-center">{index + 1}</p>
                <div className="flex items-center flex-1 justify-center space-x-2">
                  <img
                    src={appointment.userId?.image || "/placeholder.png"}
                    alt={appointment.userId?.name || "No Name"}
                    className="w-8 h-8 rounded-full"
                  />
                  <p>{appointment.userId?.name || "N/A"}</p>
                </div>
                <p className="w-24 text-center">
                  {appointment.userId?.dob ? calculateAge(appointment.userId.dob) : "N/A"}
                </p>
                <p className="flex-3 text-center">
                  {appointment.date || "N/A"} @ {appointment.slotTime || "N/A"}
                </p>
                <div className="flex items-center flex-1 justify-center space-x-2">
                  <img
                    src={appointment.docId?.image || "/placeholder.png"}
                    alt={appointment.docId?.name || "No Name"}
                    className="w-8 h-8 rounded-full"
                  />
                  <p>{appointment.docId?.name || "N/A"}</p>
                </div>
                <p className="w-24 text-center">${appointment.amount || "N/A"}</p>
                <p className="w-32 text-center">
                  {/* Cancel Button */}
                  {!appointment.cancelled && !appointment.isCompleted && (
                    <button
                      className="bg-red-200 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                      aria-label={`Cancel appointment ${appointment._id}`}
                      onClick={() => {
                        cancelAppointment(appointment._id); // Cancel the appointment
                      }}
                    >
                      <img
                        src={cross}
                        alt="Cancel"
                        className="w-5 h-5 text-white hover:text-red-500 inline"
                      />
                    </button>
                  )}
                  {/* Completed Label */}
                  {appointment.isCompleted && (
                    <span className="text-green-500 text-sm mt-2">Completed</span>
                  )}
                  {/* Canceled Label */}
                  {appointment.cancelled && !appointment.isCompleted && (
                    <span className="text-red-500 text-sm mt-2">Canceled</span>
                  )}
                </p>
              </div>
            ))
          ) : (
            <p className="text-center p-4">No appointments found</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AllAppointment;
