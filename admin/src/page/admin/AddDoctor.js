import React, { useContext, useState } from 'react';
import upload from '../../asset/upload.png';
import { AdminContext } from '../../context/adminContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function AddDoctor() {
  const [docImg, setDocImg] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [degree, setDegree] = useState('');
  const [experience, setExperience] = useState('1 year');
  const [speciality, setSpeciality] = useState('General Physician');
  const [fees, setFees] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [about, setAbout] = useState('');
  const { Backend_url, aToken } = useContext(AdminContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const scrollY = window.scrollY; // Save current scroll position

    try {
      if (!docImg) {
        toast.error('The image is not selected');
        window.scrollTo(0, scrollY); // Restore scroll position
        return;
      }

      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('degree', degree);
      formData.append('experience', experience);
      formData.append('speciality', speciality);
      formData.append('fees', fees);
      formData.append('address1', address1);
      formData.append('address2', address2);
      formData.append('about', about);
      formData.append('docImg', docImg);

      const response = await axios.post(
        `${Backend_url}/api/admin/add-doctor`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${aToken}`,
          },
        }
      );

      if (response.data.success) {
        toast.success('Doctor added successfully');
        // Reset form
        setDocImg(null);
        setName('');
        setEmail('');
        setPassword('');
        setDegree('');
        setExperience('1 year');
        setSpeciality('General Physician');
        setFees('');
        setAddress1('');
        setAddress2('');
        setAbout('');
      } else {
        toast.error(response.data.message || 'Something went wrong');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add doctor');
      window.scrollTo(0, scrollY); // Restore scroll position
    }
  };

  return (
<div className="form-container max-h-[80vh] overflow-y-auto scrollbar-hide p-4 bg-gray-100">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        // hideProgressBar
        // newestOnTop
        // closeOnClick
        // pauseOnFocusLoss
        // draggable
        // pauseOnHover
      />
      <form
        onSubmit={onSubmitHandler}
        className="p-6 max-w-3xl mx-auto bg-white shadow-md rounded-md"
      >
        <p className="text-xl font-bold mb-4">Add Doctor</p>
        <div className="space-y-6">
          {/* Image Upload */}
          <div className="flex gap-4 items-center">
            <label htmlFor="doc_img" className="cursor-pointer">
              <img
                src={docImg ? URL.createObjectURL(docImg) : upload}
                alt="Upload"
                className={`w-20 cursor-pointer border rounded-full ${
                  docImg ? '' : 'bg-gray-200'
                }`}
              />
            </label>
            <input
              onChange={(e) => setDocImg(e.target.files[0])}
              type="file"
              hidden
              id="doc_img"
            />
            <p className="text-gray-600 mt-2 text-sm text-center">
              Upload Doctor <br /> Picture
            </p>
          </div>

          {/* Doctor Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">Doctor Name</label>
              <input
                onChange={(e) => setName(e.target.value)}
                type="text"
                value={name}
                required
                placeholder="Name"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Doctor Email</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                value={email}
                required
                placeholder="Email"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Doctor Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                value={password}
                required
                placeholder="Password"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Experience</label>
              <select
                onChange={(e) => setExperience(e.target.value)}
                value={experience}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              >
                <option value="1 year">1 year</option>
                <option value="2 year">2 year</option>
                <option value="3 year">3 year</option>
                <option value="4 year">4 year</option>
                <option value="5 year">5 year</option>
                <option value="6 year">6 year</option>
                <option value="7 year">7 year</option>
                <option value="8 year">8 year</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Fees</label>
              <input
                onChange={(e) => setFees(e.target.value)}
                value={fees}
                type="number"
                required
                placeholder="Fee"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">Education</label>
              <input
                onChange={(e) => setDegree(e.target.value)}
                value={degree}
                type="text"
                required
                placeholder="Education"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Speciality</label>
              <select
                onChange={(e) => setSpeciality(e.target.value)}
                value={speciality}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              >
                <option value="General Physician">General Physician</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Pediatricians">Pediatricians</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Address</label>
              <input
                onChange={(e) => setAddress1(e.target.value)}
                value={address1}
                type="text"
                required
                placeholder="Address 1"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200 mb-2"
              />
              <input
                onChange={(e) => setAddress2(e.target.value)}
                value={address2}
                type="text"
                required
                placeholder="Address 2"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">About Doctor</label>
            <textarea
              onChange={(e) => setAbout(e.target.value)}
              value={about}
              required
              rows={5}
              placeholder="About"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
            >
              Add Doctor
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddDoctor;
