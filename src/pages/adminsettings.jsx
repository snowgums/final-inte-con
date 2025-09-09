import React, { useState } from "react";
import { motion } from "framer-motion";
import AdminLayout from "../layouts/adminlayout";
import { FaCog, FaEnvelope, FaLock, FaBell, FaShieldAlt } from "react-icons/fa";

export default function AdminSettings() {
  const [email, setEmail] = useState("admin@example.com");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [availability, setAvailability] = useState(true);
  const [defaultRate, setDefaultRate] = useState(200);
  const [sessionRules, setSessionRules] = useState("Tutors must notify 12 hours before cancellation.");
  const [alerts, setAlerts] = useState({
    newApplications: true,
    disputes: true,
  });
  const [enable2FA, setEnable2FA] = useState(false);
  const [timeout, setTimeout] = useState(30);

  const handleSave = () => {
    alert("Settings saved successfully!");
  };

  const handleReset = () => {
    setEmail("admin@example.com");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setAvailability(true);
    setDefaultRate(200);
    setSessionRules("Tutors must notify 12 hours before cancellation.");
    setAlerts({ newApplications: true, disputes: true });
    setEnable2FA(false);
    setTimeout(30);
  };

  return (
      <div className="min-h-screen bg-[#f7f9fa] p-6 md:p-10 text-[#2f2f2f]">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <FaCog className="text-[#58A8B6]" />
            Settings
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage admin preferences and platform settings.
          </p>
        </motion.div>

        <div className="space-y-8">
          {/* Account Info */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-[#58A8B6]">
              <FaEnvelope /> Account Information
            </h2>
            <div className="grid gap-4">
              <label>
                Email
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-full p-2 border rounded"
                />
              </label>
              <div className="grid md:grid-cols-3 gap-4">
                <label>
                  Current Password
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="mt-1 w-full p-2 border rounded"
                  />
                </label>
                <label>
                  New Password
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="mt-1 w-full p-2 border rounded"
                  />
                </label>
                <label>
                  Confirm Password
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="mt-1 w-full p-2 border rounded"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Platform Settings */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-[#58A8B6]">
              <FaCog /> Platform Settings
            </h2>
            <div className="grid gap-4">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={availability}
                  onChange={(e) => setAvailability(e.target.checked)}
                />
                Enable Tutor Availability
              </label>
              <label>
                Default Hourly Rate (₱)
                <input
                  type="number"
                  value={defaultRate}
                  onChange={(e) => setDefaultRate(e.target.value)}
                  className="mt-1 w-full p-2 border rounded"
                />
              </label>
              <label>
                Session Rules
                <textarea
                  value={sessionRules}
                  onChange={(e) => setSessionRules(e.target.value)}
                  className="mt-1 w-full p-2 border rounded"
                />
              </label>
            </div>
          </div>

          {/* Notification Preferences */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-[#58A8B6]">
              <FaBell /> Notification Preferences
            </h2>
            <div className="grid gap-3">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={alerts.newApplications}
                  onChange={(e) =>
                    setAlerts({ ...alerts, newApplications: e.target.checked })
                  }
                />
                Email alert for new tutor applications
              </label>
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={alerts.disputes}
                  onChange={(e) =>
                    setAlerts({ ...alerts, disputes: e.target.checked })
                  }
                />
                Email alert for session disputes
              </label>
            </div>
          </div>

          {/* Security Options */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-[#58A8B6]">
              <FaShieldAlt /> Security Settings
            </h2>
            <div className="grid gap-4">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={enable2FA}
                  onChange={(e) => setEnable2FA(e.target.checked)}
                />
                Enable 2-Factor Authentication (UI Only)
              </label>
              <label>
                Auto Logout Timeout (minutes)
                <input
                  type="number"
                  value={timeout}
                  onChange={(e) => setTimeout(e.target.value)}
                  className="mt-1 w-full p-2 border rounded"
                />
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleSave}
              className="bg-[#58A8B6] hover:bg-[#4e97a5] text-white px-6 py-2 rounded"
            >
              Save Changes
            </button>
            <button
              onClick={handleReset}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded"
            >
              Reset to Defaults
            </button>
          </div>
        </div>
      </div>
  );
}
