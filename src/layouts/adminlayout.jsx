import React from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';

const navItems = [
  { name: 'Applications', path: '/admin-dashboard/applications' },
  { name: 'Tutor Levels', path: '/admin-dashboard/tutor-levels' },
  { name: 'Analytics', path: '/admin-dashboard/analytics' },
  { name: 'Settings', path: '/admin-dashboard/settings' },
];

export default function AdminLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#f4f8f9] text-[#2f2f2f]">
      {/* Topbar */}
      <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-[#58A8B6]">Admin Dashboard</h1>
        <nav className="space-x-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`font-medium ${
                location.pathname === item.path
                  ? 'text-[#58A8B6] underline'
                  : 'text-gray-600 hover:text-[#58A8B6]'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </header>

      {/* Page Content */}
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}
