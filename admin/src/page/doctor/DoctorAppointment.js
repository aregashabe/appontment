import React, { useContext, useEffect } from 'react';
import { DoctorContext } from '../../context/doctorContext';
import { AppContext } from '../../context/appContext';
import cross from "../../asset/cross.png";
import tick from "../../asset/tick.png";

function DoctorAppointment() {
  const { dToken, appointments, getAppointment } = useContext(DoctorContext);
  const { cancelAppointment, completeAppointment } = useContext(DoctorContext);
  const { calculateAge } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getAppointment();
    }
  }, [dToken, getAppointment]);

  return (
    <div className="container bg-gray-100 mx-auto p-4">
      <h1 className="text-2xl font-semibold text-center mb-6 text-gray-700">All Appointments</h1>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        {/* Header Row */}
        <div className="flex bg-gray-200 p-4 text-sm font-bold">
          <p className="w-12 text-center text-gray-600">#</p>
          <p className="flex-1 text-center text-gray-600">Patient</p>
          <p className="w-24 text-center text-gray-600">Age</p>
          <p className="flex-1 text-center text-gray-600">Date @ Time</p>
          <p className="w-24 text-center text-gray-600">Payment</p>
          <p className="w-24 text-center text-gray-600">Fees</p>
          <p className="w-32 text-center text-gray-600">Action</p>
        </div>
        {/* Data Rows */}
        <div className="max-h-96 overflow-y-auto">
          {appointments && appointments.length > 0 ? (
            appointments.reverse().map((item, index) => (
              <div
                key={item._id}
                className="flex items-center p-4 border-b text-sm text-gray-700"
              >
                <p className="w-12 text-center">{index + 1}</p>
                <div className="flex items-center flex-1 justify-center space-x-2">
                  <img
                    src={item.userId?.image || "/placeholder.png"}
                    alt={item.userId?.name || "No Name"}
                    className="w-8 h-8 rounded-full"
                  />
                  <p>{item.userId?.name || "N/A"}</p>
                </div>
                <p className="w-24 text-center">
                  {item.userId?.dob ? calculateAge(item.userId.dob) : "N/A"}
                </p>
                <p className="flex-1 text-center">
                  {item.date ? `${item.date} @ ${item.slotTime || "N/A"}` : "N/A"}
                </p>
                <p className="w-24 text-center">{item.payment ? "Online" : "Cash"}</p>
                <p className="w-24 text-center">${item.amount || "N/A"}</p>
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
            ))
          ) : (
            <p className="text-center p-4 text-gray-500">No appointments found</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default DoctorAppointment;
