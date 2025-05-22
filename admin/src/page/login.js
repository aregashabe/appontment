import React, { useContext, useState } from 'react';
import { AdminContext } from '../context/adminContext';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DoctorContext } from '../context/doctorContext';

function Login() {
  const { setAToken, Backend_url } = useContext(AdminContext);
  const { setDToken } = useContext(DoctorContext);

  const [state, setState] = useState('Admin'); // Toggle between Admin and Doctor login
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!Backend_url) {
      console.error("Backend_url is not defined!");
      toast.error("Server configuration issue. Please try later.");
      setLoading(false);
      return;
    }

    const endpoint = `${Backend_url}/api/${state.toLowerCase()}/login`; 
    const body = { email, password };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const result = await response.json();

      if (result.success) {
        if (state === 'Admin') {
          setAToken(result.token);
          localStorage.setItem('aToken', result.token);
          navigate('/admin-dashboard');
        } else {
          setDToken(result.dToken);
          localStorage.setItem('dToken', result.dToken);
          navigate('/doctor-dashboard');
        }

        toast.success(`${state} logged in successfully`);
        setEmail('');
        setPassword('');
      } else {
        toast.error(result.message || 'Login failed');
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center min-h-screen bg-gray-100"
      >
        <div className="bg-white p-6 rounded shadow-md w-96">
          <p className="text-lg font-semibold mb-4 text-center">
            <span>{state}</span> Login
          </p>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full ${
              loading ? 'bg-gray-400' : 'bg-blue-600'
            } text-white py-2 rounded ${
              !loading && 'hover:bg-blue-700'
            } transition duration-200`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
          {state === 'Admin' ? (
            <p className="text-gray-700 mt-4">
              Doctor Login?{' '}
              <span
                className="text-blue-500 hover:underline cursor-pointer"
                onClick={() => setState('Doctor')}
              >
                click here
              </span>
            </p>
          ) : (
            <p className="text-gray-700 mt-4">
              Admin Login?{' '}
              <span
                className="text-blue-500 hover:underline cursor-pointer"
                onClick={() => setState('Admin')}
              >
                click here
              </span>
            </p>
          )}
        </div>
      </form>
    </>
  );
}

export default Login;
