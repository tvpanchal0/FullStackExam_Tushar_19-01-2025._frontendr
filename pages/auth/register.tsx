import React, { useState } from 'react';
import Link from 'next/link'; // Import Link component
import { register } from '../../utils/api';
import { useRouter } from 'next/router';

const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRegister = async () => {
    if (!name.trim()) {
      setError('Username is required');
      return;
    }

    if (!email.trim()) {
      setError('Email is required');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Invalid email format');
      return;
    }

    if (!password.trim()) {
      setError('Password is required');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    try {
      await register(name, email, password);
      router.push('/auth/login');
    } catch (err) {
      setError('Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-8 w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

        {/* Display error message */}
        {error && (
          <div className="mb-4 text-red-600 text-center">
            {error}
          </div>
        )}

        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError(''); // Clear error on input change
              }}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError(''); // Clear error on input change
              }}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(''); // Clear error on input change
              }}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={handleRegister}
            className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
          >
            Register
          </button>
        </form>

        {/* Link to Login Page */}
        <div className="mt-4 text-center">
          <p className="text-gray-700">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-blue-500 hover:underline">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
