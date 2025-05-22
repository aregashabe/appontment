import React, { useContext, useEffect, useState } from 'react';
import { DoctorContext } from '../../context/doctorContext';

function DoctorProfile() {
  const { dToken, loadDoctorProfileData, docData ,Backend_url } = useContext(DoctorContext);
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (dToken) {
      loadDoctorProfileData();
    }
  }, [dToken,loadDoctorProfileData]);

  useEffect(() => {
    if (docData) {
      setFormData({
        fees: docData.fees,
        address1: docData.address?.address1 || '',
        address2: docData.address?.address2 || '',
        available: docData.available,
      });
    }
  }, [docData]);

  const handleSave = async () => {
    try {
      const updatedData = {
        fees: formData.fees,
        address: {
          address1: formData.address1,
          address2: formData.address2,
        },
        available: formData.available,
      };

      const response = await fetch(`${Backend_url}/api/doctor/update-profile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${dToken}`,
        },
        body: JSON.stringify(updatedData),
      });

      const data = await response.json();

      if (response.ok) {
        // Successfully updated, stop editing mode
        setIsEdit(false);
        // Optionally reload the doctor profile data if needed
        loadDoctorProfileData();
      } else {
        console.error('Failed to update doctor profile:', data.message);
      }
    } catch (error) {
      console.error('Error while saving doctor profile:', error);
    }
  };

  if (!docData) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  return (
    <div className="max-w-8xl mx-auto p-4 bg-white shadow-md rounded-lg">
      <div className="flex flex-col items-center">
        <img
          src={docData.image}
          alt={docData.name || 'Doctor'}
          className="w-32 h-32 rounded-full object-cover"
        />
        <p className="mt-4 text-xl font-semibold text-gray-800">{docData.name}</p>
        <p className="text-gray-600">{`${docData.degree} - ${docData.speciality}`}</p>
        <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          {docData.experience} years of experience
        </button>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-semibold text-gray-800">About</h2>
        {/* About section remains static */}
        <p className="text-gray-600">{docData.about}</p>
      </div>

      <div className="mt-4">
        <h2 className="text-lg font-semibold text-gray-800">Appointment Fee</h2>
        {isEdit ? (
          <input
            type="number"
            name="fees"
            value={formData.fees}
            onChange={(e) =>
              setFormData({
                ...formData,
                fees: e.target.value,
              })
            }
            className="border-4 border-gray-300 rounded p-3 w-72"
          />
        ) : (
          <p className="text-gray-600">${docData.fees}</p>
        )}
      </div>

      <div className="mt-4">
        <h2 className="text-lg font-semibold text-gray-800">Address</h2>
        {isEdit ? (
          <div className="space-y-2">
            <input
              type="text"
              name="address1"
              value={formData.address1}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  address1: e.target.value,
                })
              }
              placeholder="Address1"
              className="w-96 border border-gray-300 rounded p-2"
            />
            <br />
            <input
              type="text"
              name="address2"
              value={formData.address2}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  address2: e.target.value,
                })
              }
              placeholder="Address2"
              className="w-96 border border-gray-300 rounded p-2"
            />
          </div>
        ) : (
          <div className="text-gray-600">
            {docData.address?.address1 && (
              <p>
                <strong>Address1: </strong>
                <span>{docData.address.address1}</span>
              </p>
            )}
            {docData.address?.address2 && (
              <p>
                <strong>Address2: </strong>
                <span>{docData.address.address2}</span>
              </p>
            )}
          </div>
        )}
      </div>

      <div className="mt-4">
        <label className="flex items-center text-gray-600">
          <input
            type="checkbox"
            name="available"
            checked={formData.available}
            onChange={(e) =>
              setFormData({
                ...formData,
                available: e.target.checked,
              })
            }
            disabled={!isEdit}
            className="mr-2"
          />
          Available
        </label>
      </div>

      <div className="mt-4">
        {isEdit ? (
          <>
            <button
              onClick={handleSave} // Save the changes
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Save
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEdit(true)} // Enable editing mode
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
}

export default DoctorProfile;
