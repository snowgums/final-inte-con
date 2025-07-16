// src/components/topbar.jsx
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function Topbar({ isCollapsed }) {
  const [profilePhoto, setProfilePhoto] = useState('/logo.jpg');
  const navigate = useNavigate();

  useEffect(() => {
    const storedPhoto = localStorage.getItem('profilePhoto');
    if (storedPhoto) {
      setProfilePhoto(storedPhoto);
    }
  }, []);

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="flex justify-between items-center py-4 px-6 bg-white shadow sticky top-0 z-10 border-b border-gray-200"
    >
      {/* Logo + Title */}
      <div className="flex items-center gap-4">
        <img
          src="/logo.png"
          alt="Site Logo"
          className="h-8 w-auto object-contain"
        />
        <h1 className="text-lg font-semibold text-[#2f2f2f] tracking-wide">Dashboard</h1>
      </div>

      {/* Profile - Clickable */}
      <div
        onClick={() => navigate('/profile-preview')}
        title="View Public Profile"
        className="flex items-center space-x-3 cursor-pointer group"
      >
        <img
          src={profilePhoto}
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover border-2 border-[#58A8B6] shadow-sm group-hover:brightness-90 transition"
        />
        <span className="text-sm font-medium text-[#2f2f2f] group-hover:underline">
          Tutor Name
        </span>
      </div>
    </motion.div>
  );
}
