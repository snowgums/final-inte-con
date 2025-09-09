import React from "react";
import { motion } from "framer-motion";
import { FaStar, FaChalkboardTeacher } from "react-icons/fa";

const dummyTutors = [
  {
    id: 1,
    name: "Mark Dela Cruz",
    email: "mark.tutor@example.com",
    profilePhoto: "/uploads/upload2.png",
    sessions: 5,
    rating: 3.9
  },
  {
    id: 2,
    name: "Anna Reyes",
    email: "anna.tutor@example.com",
    profilePhoto: "/uploads/upload1.png",
    sessions: 12,
    rating: 4.3
  },
  {
    id: 3,
    name: "John Lim",
    email: "john.tutor@example.com",
    profilePhoto: "/uploads/upload3.png",
    sessions: 30,
    rating: 4.8
  }
];

function getLevelBadge(sessions, rating) {
  if (sessions >= 25 && rating >= 4.5) return "Senior";
  if (sessions >= 10 && rating >= 4.0) return "Mid";
  return "Entry";
}

function getBadgeColor(level) {
  return {
    Entry: "bg-gray-300 text-gray-800",
    Mid: "bg-yellow-400 text-yellow-900",
    Senior: "bg-green-500 text-white"
  }[level];
}

export default function AdminTutorLevels() {
  return (
    <div className="min-h-screen bg-[#f7f9fa] p-6 md:p-10 text-[#2f2f2f]">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <FaChalkboardTeacher className="text-[#58A8B6]" />
          Tutor Levels
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Track tutor progress and badge level based on sessions and feedback.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {dummyTutors.map((tutor) => {
          const level = getLevelBadge(tutor.sessions, tutor.rating);
          const badgeClass = getBadgeColor(level);

          return (
            <motion.div
              key={tutor.id}
              whileHover={{ y: -3 }}
              className="bg-white border rounded-xl shadow p-4 transition"
            >
              <div className="flex items-center gap-4 mb-3">
                <img
                  src={tutor.profilePhoto}
                  alt={tutor.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-[#58A8B6]"
                />
                <div>
                  <h2 className="font-semibold text-lg">{tutor.name}</h2>
                  <p className="text-sm text-gray-600">{tutor.email}</p>
                </div>
              </div>

              <div className="text-sm space-y-2">
                <p>
                  <strong>Sessions:</strong> {tutor.sessions}
                </p>
                <p className="flex items-center gap-1">
                  <strong>Rating:</strong>{" "}
                  <span className="flex items-center text-yellow-500">
                    <FaStar className="mr-1" />
                    {tutor.rating}
                  </span>
                </p>
                <p>
                  <strong>Level:</strong>{" "}
                  <span className={`px-2 py-1 rounded text-sm font-medium ${badgeClass}`}>
                    {level}
                  </span>
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
