import { useState } from "react";
import { motion } from "framer-motion";
import { FaUserCheck, FaUserTimes, FaIdCard, FaFileAlt, FaRegImage } from "react-icons/fa";

const dummyApplications = [
  {
    id: 1,
    name: "Mark Dela Cruz",
    email: "mark.tutor@example.com",
    subject: "Math",
    level: "Entry",
    profilePhoto: "/uploads/upload2.png",
    idPhoto: "/uploads/mark_id.png",
    selfie: "/uploads/mark_selfie.png",
    resume: "/uploads/mark_resume.pdf",
    prc: null,
    certifications: ["/uploads/mark_cert1.pdf", "/uploads/mark_cert2.pdf"],
    status: "Pending"
  },
  {
    id: 2,
    name: "Anna Reyes",
    email: "anna.tutor@example.com",
    subject: "English",
    level: "Mid",
    profilePhoto: "/uploads/upload1.png",
    idPhoto: "/uploads/anna_id.jpg",
    selfie: "/uploads/anna_selfie.jpg",
    resume: "/uploads/anna_resume.pdf",
    prc: "/uploads/anna_prc.png",
    certifications: [],
    status: "Pending"
  }
];

export default function AdminApplications() {
  const [applications, setApplications] = useState(dummyApplications);

  const handleDecision = (id, decision) => {
    const updated = applications.map(app =>
      app.id === id ? { ...app, status: decision } : app
    );
    setApplications(updated);
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
          <FaIdCard className="text-[#58A8B6]" />
          Tutor Applications
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Monitor and validate tutor sign-up credentials.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {applications.map((app) => (
          <motion.div
            key={app.id}
            whileHover={{ y: -3 }}
            className="bg-white border rounded-xl shadow p-4 transition"
          >
            <div className="flex items-center gap-4 mb-3">
              <img
                src={app.profilePhoto}
                alt={app.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-[#58A8B6]"
              />
              <div>
                <h2 className="font-semibold text-lg">{app.name}</h2>
                <p className="text-sm text-gray-600">{app.email}</p>
              </div>
            </div>

            <div className="space-y-2 text-sm mb-3">
              <p>
                <strong>Subject:</strong> {app.subject}
              </p>
              <p>
                <strong>Level:</strong> {app.level}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span className={`font-semibold ${app.status === "Accepted" ? "text-green-600" : app.status === "Rejected" ? "text-red-600" : "text-yellow-500"}`}>
                  {app.status}
                </span>
              </p>
            </div>

            <div className="border-t pt-3 text-sm space-y-1">
              <a href={app.idPhoto} target="_blank" className="text-[#58A8B6] hover:underline flex items-center gap-2">
                <FaIdCard /> View Valid ID
              </a>
              <a href={app.selfie} target="_blank" className="text-[#58A8B6] hover:underline flex items-center gap-2">
                <FaRegImage /> View Selfie w/ ID
              </a>
              <a href={app.resume} target="_blank" className="text-[#58A8B6] hover:underline flex items-center gap-2">
                <FaFileAlt /> View Resume
              </a>
              {app.prc && (
                <a href={app.prc} target="_blank" className="text-[#58A8B6] hover:underline flex items-center gap-2">
                  <FaFileAlt /> View PRC License
                </a>
              )}
              {app.certifications.length > 0 && (
                <div>
                  {app.certifications.map((cert, i) => (
                    <a
                      key={i}
                      href={cert}
                      target="_blank"
                      className="text-[#58A8B6] hover:underline flex items-center gap-2"
                    >
                      <FaFileAlt /> Certificate {i + 1}
                    </a>
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => handleDecision(app.id, "Accepted")}
                disabled={app.status !== "Pending"}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white text-sm px-3 py-1.5 rounded disabled:opacity-50"
              >
                <FaUserCheck className="inline mr-1" /> Accept
              </button>
              <button
                onClick={() => handleDecision(app.id, "Rejected")}
                disabled={app.status !== "Pending"}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1.5 rounded disabled:opacity-50"
              >
                <FaUserTimes className="inline mr-1" /> Reject
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
