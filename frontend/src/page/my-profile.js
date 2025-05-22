import React, { useContext, useState } from "react";
import { AppContext } from "../component/context";
import profile from "../asset/Profile.png"; // Default image
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import CSS for toast notifications

function MyProfile() {
  const { userData, setUserData, token, loadUserProfileData } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(true);
  const [image, setImage] = useState(null);

  const updateUserProfile = async () => {
    try {
      const formData = new FormData();
formData.append("name", userData.name);
formData.append("dob", userData.dob);
formData.append("phone", userData.phone);
formData.append("gender", userData.gender);
formData.append("address", JSON.stringify(userData.address));
if (image) {
  formData.append("image", image);
}



      const response = await fetch("http://localhost:5001/api/user/update-profile", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message || "Profile updated successfully!");
        loadUserProfileData(); // Refresh user data
        setIsEdit(false);
        setImage(null); // Reset image
      } else {
        toast.error(result.message || "Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("An error occurred while updating your profile.");
    }
  };

  const pClass = isEdit ? "" : "text-gray-600 italic";

  if (!userData) return <div>Loading...</div>;

  return (
    <div className="m-4 p-6 bg-white rounded shadow-lg max-w-lg mx-auto">

      {/* Profile Image */}
      <div className="text-center">
        <label htmlFor="image" className="cursor-pointer">
          <img
            src={
              image
                ? URL.createObjectURL(image)
                : userData.image || profile
            }
            alt="Profile"
            className="w-32 h-32 rounded-full mx-auto border-4 border-gray-200"
          />
        </label>
        {isEdit && (
          <input
            type="file"
            id="image"
            hidden
            onChange={(e) => setImage(e.target.files[0])}
          />
        )}
      </div>

      <div className="mt-6">
        {/* Name Section */}
        <div className="flex items-center">
          <p className={`font-semibold w-24 ${pClass}`}>Name:</p>
          {isEdit ? (
            <input
              type="text"
              value={userData.name || ""}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, name: e.target.value }))
              }
              className="border rounded px-2 py-1 flex-grow"
            />
          ) : (
            <p className={`text-lg ${pClass}`}>{userData.name || "N/A"}</p>
          )}
        </div>

        {/* Contact Information */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Contact Information</h3>
          <div className="flex mt-2">
            <p className={`w-24 ${pClass}`}>Email:</p>
            <p className={pClass}>{userData.email || "N/A"}</p>
          </div>
          <div className="flex mt-2">
            <p className={`w-24 ${pClass}`}>Phone:</p>
            {isEdit ? (
              <input
                type="text"
                value={userData.phone || ""}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, phone: e.target.value }))
                }
                className="border rounded px-2 py-1 flex-grow"
              />
            ) : (
              <p className={pClass}>{userData.phone || "N/A"}</p>
            )}
          </div>
        </div>

        {/* Address Fields */}
        <div className="mt-4">
          <div className="flex mt-2">
            <p className={`w-24 ${pClass}`}>Address 1:</p>
            {isEdit ? (
              <input
                type="text"
                value={userData.address?.address1 || ""}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, address1: e.target.value },
                  }))
                }
                className="border rounded px-2 py-1 flex-grow"
              />
            ) : (
              <p className={pClass}>{userData.address?.address1 || "N/A"}</p>
            )}
          </div>
          <div className="flex mt-2">
            <p className={`w-24 ${pClass}`}>Address 2:</p>
            {isEdit ? (
              <input
                type="text"
                value={userData.address?.address2 || ""}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, address2: e.target.value },
                  }))
                }
                className="border rounded px-2 py-1 flex-grow"
              />
            ) : (
              <p className={pClass}>{userData.address?.address2 || "N/A"}</p>
            )}
          </div>
        </div>

        {/* Gender and DOB */}
        <div className="mt-4">
          <div className="flex mt-2">
            <p className={`w-24 ${pClass}`}>Gender:</p>
            {isEdit ? (
              <select
                value={userData.gender || "Not Selected"}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, gender: e.target.value }))
                }
                className="border rounded px-2 py-1 flex-grow"
              >
                <option value="Not Selected">Not Selected</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            ) : (
              <p className={pClass}>{userData.gender || "N/A"}</p>
            )}
          </div>
          <div className="flex mt-2">
            <p className={`w-24 ${pClass}`}>Birthday:</p>
            {isEdit ? (
              <input
                type="date"
                value={userData.dob || ""}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, dob: e.target.value }))
                }
                className="border rounded px-2 py-1 flex-grow"
              />
            ) : (
              <p className={pClass}>{userData.dob || "N/A"}</p>
            )}
          </div>
        </div>

        {/* Save/Edit Button */}
        <div className="mt-6 text-center">
          {isEdit ? (
            <button
              onClick={() => updateUserProfile()}
              className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setIsEdit(true)}
              className="px-4 py-2 bg-gray-500 text-white rounded shadow hover:bg-gray-600"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
