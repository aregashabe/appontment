import React, { useContext, useState, useEffect, useCallback } from 'react';
import { AppContext } from '../component/context.js';
import { toast } from 'react-toastify';
import axios from 'axios';

function MyAppointment() {
  const { token, getDoctors } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);

  // Fetch appointments
  const getMyAppointment = useCallback(async () => {
    if (!token) {
      toast.error('Token is missing. Cannot fetch appointments.');
      return;
    }

    try {
      const { data } = await axios.get(
        'http://localhost:5001/api/user/get-appointment',
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data?.success && Array.isArray(data?.appointments)) {
        setAppointments(data.appointments);
      } else {
        toast.error(data?.message || 'Failed to fetch appointments');
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
      toast.error(error?.response?.data?.message || "");
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      getMyAppointment();
    }
  }, [token, getMyAppointment]);

  // Cancel appointment
  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        'http://localhost:5001/api/user/cancel-appointment',
        { appointmentId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success(data.message);
        getMyAppointment();
        getDoctors();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error cancelling appointment:', error);
      toast.error(error.response?.data?.message);
    }
  };


  // Handle payment
  const handlePayment = async (appointmentId) => {
    const txRef = `tx-${Date.now()}`; // Generate a unique transaction reference
  
    localStorage.setItem('txRef', txRef);
    localStorage.setItem('appointmentId', appointmentId);
  
    // Prevent the function from being triggered again while the payment is being processed
    if (localStorage.getItem('paymentInProgress') === 'true') {
      toast.warning('Payment is already in progress...');
      return;
    }
  
    localStorage.setItem('paymentInProgress', 'true'); // Mark that payment is in progress
  
    const paymentData = {
      currency: 'ETB',
      phone: '0923547840', // Replace with actual phone number
      txRef: txRef, // Unique transaction reference
      callbackUrl: 'http://localhost:5001/api/user/verify-payment', // Backend callback URL for verification
    };
  
    try {
      const { data } = await axios.post(
        'http://localhost:5001/api/user/payment-appointment', 
        { appointmentId, ...paymentData }, 
        { headers: { Authorization: `Bearer ${token}` } } 
      );
  
      // If payment is successfully initiated, redirect to the Chapa payment page
      if (data?.status === 'success') {
        toast.success('Redirecting to payment gateway...');
        window.location.href = data.checkoutUrl; // Redirect to Chapa's checkout page
      } else {
        toast.error(data?.message || 'Failed to initiate payment');
      }
    } catch (error) {
      console.error('Error initiating payment:', error);
      toast.error(error?.response?.data?.message || 'An error occurred while initiating payment');
    } finally {
      // Reset the payment progress state after the operation
      localStorage.setItem('paymentInProgress', 'false');
    }
  };
  // verifyPayment
  useEffect(() => {
    const txRef = localStorage.getItem('txRef');
    const appointmentId = localStorage.getItem('appointmentId');

    if (!txRef || !appointmentId) {
      toast.error('Transaction reference or appointment ID not found.');
      return;
    }

    // Check if payment verification has already been done for this txRef
    const isVerified = localStorage.getItem(`paymentVerified_${txRef}`);
    if (isVerified) {
      return;  // If already verified, don't proceed further
    }

    // payment verification
    const verifyPayment = async () => {
      try {
        const { data } = await axios.post(
          'http://localhost:5001/api/user/verify',
          { txRef, appointmentId },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (data?.status === 'success') {
          toast.success('Payment verified successfully!');
          localStorage.setItem(`paymentVerified_${txRef}`, 'true');
          getMyAppointment() // Mark the transaction as verified
        } else {
          toast.error(data?.message || 'Payment verification failed.');
        }
      } catch (error) {
        console.error('Payment verification error:', error);
        toast.error('An error occurred during payment verification.');
      }
    };

    verifyPayment();
  }, [token]); 

  return (
    <div className="container mx-auto p-4">
      <p className="text-2xl font-bold text-center mb-4">My Appointments</p>

      <div className="flex flex-col gap-6">
        {appointments.length === 0 ? (
          <p>No appointments found.</p>
        ) : (
          appointments.map((item, index) => {
            const doc = item?.docId || {}; // Fallback to an empty object

            return (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg p-4 flex flex-col sm:flex-row items-start"
              >
                {/* Doctor Details */}
                <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-4 w-full sm:w-48">
                  <img
                    src={doc.image || '/path/to/default-image.jpg'}
                    alt={doc.name || 'Doctor Image'}
                    className="w-full h-auto object-cover bg-slate-600 rounded-lg"
                  />
                </div>
                <div className="flex-grow">
                  <p className="text-lg font-semibold text-gray-800">{doc.name || 'No Name'}</p>
                  <p className="text-gray-500">{doc.speciality || 'No Specialty'}</p>
                  <p className="text-gray-600 font-medium mt-2">
                    Date & Time: {new Date(item.date).toLocaleString()}
                  </p>
                  <p className="text-gray-600 font-medium mt-2">
                    Slot Time: {item.slotTime || 'N/A'}
                  </p>
                </div>

                {/* Action Buttons */}
<div className="flex flex-col items-center gap-4">
  {!item.cancelled && item.payment && !item.isCompleted && (
    <button disabled className="bg-green-500 text-white px-4 py-2 rounded-lg">
      Paid
    </button>
  )}

  {item.isCompleted && (
    <span className="text-green-500 px-4 py-2 rounded-lg">
      Completed
    </span>
  )}

  {!item.cancelled && !item.payment && !item.isCompleted && (
    <>
      <button
        onClick={() => handlePayment(item._id)} // Payment functionality
        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
      >
        Pay Online
      </button>
      <button
        onClick={() => cancelAppointment(item._id)}
        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
      >
        Cancel
      </button>
    </>
  )}
  
  {item.cancelled && (
    <button disabled className="border border-red-500 text-red-500 px-4 py-2 rounded-lg">
      Appointment Canceled
    </button>
  )}
</div>

              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default MyAppointment;
