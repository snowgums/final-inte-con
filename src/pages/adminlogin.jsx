import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Temporary hardcoded login
    if (email === 'admin@intellectconnect.com' && password === 'admin123') {
      navigate('/admin-dashboard');
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#98CFA4] to-[#58A8B6] flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-8 relative">
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-[#58A8B6] p-4 rounded-full shadow-md">
          <img src="/logo.png" alt="Admin Logo" className="h-10 w-10" />
        </div>
        <h2 className="text-2xl font-bold text-center mb-6 mt-6 text-[#58A8B6]">
          Intellect Connect Admin
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#58A8B6]"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#58A8B6]"
            required
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-[#58A8B6] text-white py-2 rounded-lg hover:bg-[#4aa0a4] transition"
          >
            Login as Admin
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-500">
          Return to{' '}
          <a href="/" className="text-[#58A8B6] hover:underline font-medium">
            Main Website
          </a>
        </p>
      </div>
    </div>
  );
}
