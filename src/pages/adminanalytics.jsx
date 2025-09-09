import React from "react";
import { motion } from "framer-motion";
import { FaUserTie, FaUsers, FaClock, FaStar, FaExclamationTriangle } from "react-icons/fa";
import AdminLayout from "../layouts/adminlayout";

const dummyAnalytics = {
  totalTutors: 42,
  totalStudents: 120,
  totalSessions: 389
};

const topTutors = [
  {
    id: 1,
    name: "Anna Reyes",
    email: "anna.tutor@example.com",
    photo: "/uploads/upload1.png",
    sessions: 22,
    rating: 4.4
  },
  {
    id: 2,
    name: "John Lim",
    email: "john.tutor@example.com",
    photo: "/uploads/upload3.png",
    sessions: 29,
    rating: 4.7
  }
];

const flaggedTutors = [
  {
    id: 3,
    name: "Carlos Tan",
    issue: "Inactive for 30+ days",
    severity: "warning"
  },
  {
    id: 4,
    name: "Diane Cruz",
    issue: "Low rating (2.8)",
    severity: "danger"
  }
];

function getProgressStatus(sessions, rating) {
  if (sessions >= 25 && rating >= 4.5) return "Senior";
  if (sessions >= 10 && rating >= 4.0) return "Mid";
  return "Entry";
}

export default function AdminAnalytics() {
  return (
      <div className="min-h-screen bg-[#f7f9fa] p-6 md:p-10 text-[#2f2f2f]">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold flex items-center gap-3 text-[#58A8B6]">
            <FaClock />
            Admin Analytics
          </h1>
          <p className="text-sm text-gray-500 mt-1">Monitor platform performance and tutor trends.</p>
        </motion.div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white shadow rounded-xl p-6 border">
            <FaUserTie className="text-2xl text-[#58A8B6] mb-2" />
            <h2 className="text-lg font-semibold">Total Tutors</h2>
            <p className="text-2xl font-bold">{dummyAnalytics.totalTutors}</p>
          </div>
          <div className="bg-white shadow rounded-xl p-6 border">
            <FaUsers className="text-2xl text-[#58A8B6] mb-2" />
            <h2 className="text-lg font-semibold">Total Students</h2>
            <p className="text-2xl font-bold">{dummyAnalytics.totalStudents}</p>
          </div>
          <div className="bg-white shadow rounded-xl p-6 border">
            <FaClock className="text-2xl text-[#58A8B6] mb-2" />
            <h2 className="text-lg font-semibold">Total Sessions</h2>
            <p className="text-2xl font-bold">{dummyAnalytics.totalSessions}</p>
          </div>
        </div>

        {/* Top Tutors */}
        <div className="mb-10">
          <h2 className="text-xl font-bold mb-4 text-[#58A8B6]">Top Performing Tutors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {topTutors.map((tutor) => {
              const progress = getProgressStatus(tutor.sessions, tutor.rating);
              return (
                <div
                  key={tutor.id}
                  className="bg-white rounded-lg border shadow p-4 flex items-center gap-4"
                >
                  <img
                    src={tutor.photo}
                    alt={tutor.name}
                    className="w-14 h-14 rounded-full border-2 border-[#58A8B6]"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{tutor.name}</h3>
                    <p className="text-sm text-gray-600">{tutor.email}</p>
                    <p className="text-sm mt-1">
                      <strong>Sessions:</strong> {tutor.sessions},{" "}
                      <strong>Rating:</strong> {tutor.rating} ⭐
                    </p>
                    <p className="text-sm mt-1">
                      <strong>Progress:</strong>{" "}
                      <span className="text-[#58A8B6] font-medium">{progress}</span>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Flags or Alerts */}
        <div>
          <h2 className="text-xl font-bold mb-4 text-[#58A8B6]">Alerts / Flags</h2>
          <div className="space-y-3">
            {flaggedTutors.map((tutor) => (
              <div
                key={tutor.id}
                className={`flex items-center gap-3 border-l-4 rounded-md shadow p-3 bg-white ${
                  tutor.severity === "danger"
                    ? "border-red-500 bg-red-50"
                    : "border-yellow-400 bg-yellow-50"
                }`}
              >
                <FaExclamationTriangle
                  className={`text-xl ${
                    tutor.severity === "danger" ? "text-red-500" : "text-yellow-500"
                  }`}
                />
                <div>
                  <h4 className="font-semibold">{tutor.name}</h4>
                  <p className="text-sm">{tutor.issue}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
  );
}
