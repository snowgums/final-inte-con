import React from 'react';
import { FaUserCheck, FaUserTimes, FaChartLine, FaUsers } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function AdminDashboard() {
  return (
    <div>
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-2xl font-bold mb-6 text-[#58A8B6]"
      >
        Welcome, Admin!
      </motion.h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-white p-6 rounded-xl shadow border-l-4 border-[#58A8B6]"
        >
          <div className="flex items-center gap-3">
            <FaUsers className="text-[#58A8B6] text-2xl" />
            <div>
              <p className="text-sm text-gray-500">Total Tutors</p>
              <p className="text-lg font-bold">120</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-white p-6 rounded-xl shadow border-l-4 border-yellow-400"
        >
          <div className="flex items-center gap-3">
            <FaUserTimes className="text-yellow-400 text-2xl" />
            <div>
              <p className="text-sm text-gray-500">Pending Applications</p>
              <p className="text-lg font-bold">8</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-white p-6 rounded-xl shadow border-l-4 border-green-500"
        >
          <div className="flex items-center gap-3">
            <FaUserCheck className="text-green-500 text-2xl" />
            <div>
              <p className="text-sm text-gray-500">Approved Tutors</p>
              <p className="text-lg font-bold">95</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-white p-6 rounded-xl shadow border-l-4 border-indigo-500"
        >
          <div className="flex items-center gap-3">
            <FaChartLine className="text-indigo-500 text-2xl" />
            <div>
              <p className="text-sm text-gray-500">Tutor Levels Tracked</p>
              <p className="text-lg font-bold">3</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Optional: Add more insights or activity list */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-lg font-semibold text-[#58A8B6] mb-3">Recent Admin Actions</h3>
        <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
          <li>Accepted Anna Reyes as Mid-Level Tutor</li>
          <li>Rejected 1 invalid application</li>
          <li>Updated tutor level settings</li>
        </ul>
      </div>
    </div>
  );
}
