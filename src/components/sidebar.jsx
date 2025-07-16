// src/components/sidebar.jsx
import { Link } from 'react-router-dom';
import {
  FaChevronLeft,
  FaChevronRight,
  FaTachometerAlt,
  FaUserCircle,
  FaUserGraduate,
  FaCalendarAlt,
  FaClock,
  FaSignOutAlt,
  FaChalkboardTeacher
} from 'react-icons/fa';

export default function Sidebar({ isCollapsed, setIsCollapsed }) {
  const menuItems = [
    { label: 'Dashboard', path: '/dashboard', icon: <FaTachometerAlt /> },
    { label: 'My Profile', path: '/profile', icon: <FaUserCircle /> },
    { label: 'Students', path: '/students', icon: <FaUserGraduate /> },
    { label: 'Sessions', path: '/sessions', icon: <FaCalendarAlt /> },
    { label: 'Availability', path: '/availability', icon: <FaClock /> },
    { label: 'Virtual Classroom', path: '/virtualclassroom', icon: <FaChalkboardTeacher /> }

  ];

  return (
    <aside
      className={`bg-[#58A8B6] text-white flex flex-col h-screen py-6 transition-all duration-300 shrink-0 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Header & Toggle Button */}
      <div className="flex items-center justify-between px-4 mb-8">
        {!isCollapsed && <h2 className="text-xl font-bold">Intellect Connect</h2>}
        <button onClick={() => setIsCollapsed(!isCollapsed)} className="text-white">
          {isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
        </button>
      </div>

      {/* Menu */}
      <nav className="flex flex-col space-y-2 px-2">
        {menuItems.map(({ label, path, icon }) => (
          <Link
            to={path}
            key={label}
            className="flex items-center gap-3 hover:bg-[#4aa0a4] px-3 py-2 rounded text-sm"
          >
            <span className="text-lg">{icon}</span>
            {!isCollapsed && <span>{label}</span>}
          </Link>
        ))}

        {/* Logout */}
        <div className="mt-auto">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 bg-white text-[#58A8B6] hover:bg-[#4aa0a4] hover:text-white px-3 py-2 rounded text-sm mx-2"
          >
            <FaSignOutAlt className="text-lg" />
            {!isCollapsed && <span>Logout</span>}
          </Link>
        </div>
      </nav>
    </aside>
  );
}
