import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../component/context';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [state, setState] = useState('Sign Up');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { token, setToken } = useContext(AppContext);
  const navigate = useNavigate();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let response;
      if (state === "Sign Up") {
        response = await axios.post("http://localhost:5001/api/user/register", { name, email, password });
      } else {
        response = await axios.post("http://localhost:5001/api/user/login", { email, password });
      }

      if (response.status === 200 && response.data.success) {
        localStorage.setItem("token", response.data.token); // Store token in localStorage
        setToken(response.data.token); // Set token in context
        toast.success(response.data.message || 'Login successful!');
      } else {
        const errorMessage = response.data?.message || response.statusText || "An error occurred";
        toast.error(errorMessage);
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast.error(error.message || "An unexpected error occurred");
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/'); // Redirect to homepage after login
    }
  }, [token, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form 
        onSubmit={onSubmitHandler} 
        className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg"
      >
        <div className="text-center mb-6">
          <p className="text-2xl font-bold text-blue-600">{state === "Sign Up" ? "Create Account" : "Login"}</p>
          <p className="text-gray-600">
            Please {state === "Sign Up" ? "Create an Account" : "Login"} to book an appointment
          </p>
        </div>

        {state === "Sign Up" && (
          <div className="mb-4">
            <label className="block text-gray-700">Full Name</label>
            <input 
              type="text" 
              onChange={(e) => setName(e.target.value)} 
              value={name} 
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
              placeholder="Enter your full name" 
            />
          </div>
        )}

        {/* Email Input */}
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input 
            type="email" 
            onChange={(e) => setEmail(e.target.value)} 
            value={email} 
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
            placeholder="Enter your email" 
          />
        </div>

        {/* Password Input */}
        <div className="mb-6">
          <label className="block text-gray-700">Password</label>
          <input 
            type="password" 
            onChange={(e) => setPassword(e.target.value)} 
            value={password} 
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
            placeholder="Enter your password" 
          />
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
        >
          {state === "Sign Up" ? "Create Account" : "Login"}
        </button>

        {/* Toggle Login/Sign Up */}
        <p className="mt-4 text-center text-gray-600">
          {state === "Sign Up" ? "Already have an account?" : "Don't have an account?"} 
          <span 
            className="text-blue-600 cursor-pointer ml-1 hover:underline" 
            onClick={() => setState(state === "Sign Up" ? "Login" : "Sign Up")}
          >
            {state === "Sign Up" ? "Login" : "Sign Up"}
          </span>
        </p>
      </form>
    </div>
  );
}

export default Login;
