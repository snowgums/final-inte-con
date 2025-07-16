// src/pages/dashboard.jsx
import { useState } from 'react';
import Sidebar from '../components/sidebar';
import Topbar from '../components/topbar';
import TabsSection from '../components/tabssection';
import MatchSwipeSection from '../components/matchswipesection';
import { motion } from 'framer-motion';
import { FaIdBadge, FaCalendarAlt, FaChalkboardTeacher, FaStar, FaMedal } from 'react-icons/fa';

export default function Dashboard() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-[#f4f8f9] overflow-hidden">
      {/* Sidebar */}
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      {/* Content */}
      <div className="flex flex-col flex-1">
        <Topbar isCollapsed={isCollapsed} />

        <main className="flex-1 overflow-y-auto px-6 pt-6 pb-12">
          {/* Greeting Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <FaChalkboardTeacher className="text-[#58A8B6] text-4xl" />
              <h1 className="text-4xl font-extrabold text-[#2f2f2f]">Welcome, Tutor!</h1>
            </div>
            <p className="text-gray-700 text-lg mb-6">
              This is your teaching dashboard. From here, you can manage your profile, sessions, student matches, and more.
            </p>
          </motion.div>

          {/* Phase 1 Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white p-5 rounded-xl shadow-md border"
              >
                <div className="flex items-center gap-2 text-[#58A8B6] mb-2">
                  <FaMedal className="text-xl" />
                  <span className="text-sm font-semibold text-gray-700">Badge Level</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900">Mid-Level Tutor</h3>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="bg-white p-5 rounded-xl shadow-md border"
              >
                <div className="flex items-center gap-2 text-[#58A8B6] mb-2">
                  <FaIdBadge className="text-xl" />
                  <span className="text-sm font-semibold text-gray-700">Points Earned</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900">720 pts</h3>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white p-5 rounded-xl shadow-md border"
              >
                <div className="flex items-center gap-2 text-[#58A8B6] mb-2">
                  <FaStar className="text-xl" />
                  <span className="text-sm font-semibold text-gray-700">Feedback Rating</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900">★ 4.7 / 5</h3>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="bg-white p-5 rounded-xl shadow-md border"
              >
                <div className="flex items-center gap-2 text-[#58A8B6] mb-2">
                  <FaCalendarAlt className="text-xl" />
                  <span className="text-sm font-semibold text-gray-700">Upcoming Session</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900">Tue, 10:00 AM • Mathematics</h3>
              </motion.div>
            </div>

          {/* Match Section */}
          <MatchSwipeSection />

          {/* Tabs Section */}
          <TabsSection />

        </main>
      </div>
    </div>
  );
}
