// src/pages/MyProfile.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaCheckCircle,
  FaIdBadge,
  FaArrowLeft,
  FaEdit,
  FaSave,
  FaTimes,
  FaCamera,
  FaEye,
  FaStar
} from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function MyProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(localStorage.getItem('profilePhoto') || '/logo.jpg');

  const [tutor, setTutor] = useState({
    name: 'Kerstein Violon',
    email: 'kerstein@example.com',
    birthdate: '1999-05-12',
    age: 25,
    gender: 'Male',
    address: 'Digos City, Davao del Sur',
    school: 'University of Mindanao',
    attainment: 'Bachelor’s Degree',
    experience: 3,
    gradeLevel: 'Grade 4',
    availability: 'Weekdays - Morning (8AM-12PM)',
    rate: '₱200/hr',
    subjects: ['Math', 'English', 'Science'],
    badgeLevel: 'Mid-Level Tutor',
    verified: true,
    uploads: {
      validId: 'ValidID_Kerstein.pdf',
      selfieId: 'Selfie_Kerstein.jpg',
      certifications: 'TESOL.pdf',
      prcLicense: 'PRC_ID.pdf',
    },
    averageRating: 4.7,
    totalReviews: 35,
  });

  const handleChange = (e) => {
    setTutor({ ...tutor, [e.target.name]: e.target.value });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    localStorage.setItem('profilePhoto', profilePhoto);
    setIsEditing(false);
    console.log('Updated tutor:', tutor);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f4f8f9] to-[#e0f7f9] py-10 px-6 md:px-16 text-[#2f2f2f]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-between mb-8"
      >
        <div className="flex items-center gap-4 relative">
          <div className="relative w-20 h-20">
            <img
              src={profilePhoto}
              alt="Avatar"
              className="w-20 h-20 rounded-full object-cover border-4 border-[#58A8B6] shadow"
            />
            {isEditing && (
              <label className="absolute bottom-0 right-0 bg-[#58A8B6] p-1 rounded-full cursor-pointer">
                <FaCamera className="text-white text-sm" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>
          <div>
            <h1 className="text-2xl font-bold">
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={tutor.name}
                  onChange={handleChange}
                  className="border px-2 py-1 rounded w-full"
                />
              ) : (
                tutor.name
              )}
            </h1>

            <div className="flex items-center gap-2 text-sm text-[#58A8B6] mt-1">
              <FaIdBadge />
              <span>{tutor.badgeLevel}</span>
              {tutor.verified && (
                <span className="flex items-center text-green-600 gap-1">
                  <FaCheckCircle /> Verified
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 text-sm text-yellow-500 mt-1">
              <FaStar />
              <span>{tutor.averageRating} ({tutor.totalReviews} reviews)</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3 items-center">
          <Link
            to="/dashboard"
            className="text-sm bg-gray-200 px-3 py-1 rounded-full flex items-center gap-1 hover:bg-gray-300"
          >
            <FaArrowLeft /> Dashboard
          </Link>

          <Link
            to="/profile-preview"
            className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full flex items-center gap-2 hover:bg-blue-200"
          >
            <FaEye /> Public Profile
          </Link>

          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="text-sm bg-[#58A8B6] text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-[#4aa0a4]"
            >
              <FaEdit /> Edit
            </button>
          ) : (
            <>
              <button
                onClick={handleSave}
                className="text-sm bg-green-600 text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-green-700"
              >
                <FaSave /> Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="text-sm bg-gray-300 text-gray-700 px-4 py-2 rounded-full flex items-center gap-2 hover:bg-gray-400"
              >
                <FaTimes /> Cancel
              </button>
            </>
          )}
        </div>
      </motion.div>

      {/* Sections */}
      <section className="grid md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white shadow-md rounded-xl p-6 border">
          <h3 className="font-bold text-lg mb-3 text-[#58A8B6]">Personal Information</h3>
          {['email', 'birthdate', 'age', 'gender', 'address'].map((field) => (
            <p key={field} className="mb-1">
              <strong>{field.charAt(0).toUpperCase() + field.slice(1)}:</strong>{' '}
              {isEditing ? (
                <input
                  type="text"
                  name={field}
                  value={tutor[field]}
                  onChange={handleChange}
                  className="border px-2 py-1 rounded w-full mt-1"
                />
              ) : (
                tutor[field]
              )}
            </p>
          ))}
        </div>

        <div className="bg-white shadow-md rounded-xl p-6 border">
          <h3 className="font-bold text-lg mb-3 text-[#58A8B6]">Educational Background</h3>
          {['school', 'attainment', 'experience'].map((field) => (
            <p key={field} className="mb-1">
              <strong>{field.charAt(0).toUpperCase() + field.slice(1)}:</strong>{' '}
              {isEditing ? (
                <input
                  type="text"
                  name={field}
                  value={tutor[field]}
                  onChange={handleChange}
                  className="border px-2 py-1 rounded w-full mt-1"
                />
              ) : field === 'experience' ? (
                `${tutor[field]} years`
              ) : (
                tutor[field]
              )}
            </p>
          ))}
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white shadow-md rounded-xl p-6 border">
          <h3 className="font-bold text-lg mb-3 text-[#58A8B6]">Teaching Details</h3>
          {['gradeLevel', 'availability', 'rate'].map((field) => (
            <p key={field} className="mb-1">
              <strong>{field.charAt(0).toUpperCase() + field.slice(1)}:</strong>{' '}
              {isEditing ? (
                <input
                  type="text"
                  name={field}
                  value={tutor[field]}
                  onChange={handleChange}
                  className="border px-2 py-1 rounded w-full mt-1"
                />
              ) : (
                tutor[field]
              )}
            </p>
          ))}

          <div className="mt-2">
            <strong>Subjects of Expertise:</strong>
            <div className="flex flex-wrap gap-2 mt-2">
              {tutor.subjects.map((subject, idx) => (
                <span
                  key={idx}
                  className="bg-[#e2f4f6] text-[#58A8B6] px-3 py-1 rounded-full text-sm"
                >
                  {subject}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6 border">
          <h3 className="font-bold text-lg mb-3 text-[#58A8B6]">Uploaded Documents</h3>
          <ul className="space-y-1 text-sm">
            {Object.entries(tutor.uploads).map(([label, value]) => (
              <li key={label}>📎 {label}: {value}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="bg-white shadow-md rounded-xl p-6 border mt-10">
        <h3 className="font-bold text-lg mb-4 text-[#58A8B6]">Student & Parent Feedback</h3>
        <div className="space-y-4">
          {[
            {
              name: "Maria Dela Cruz",
              avatar: "/reviews/mother.jpg",
              rating: 5,
              comment: "Tutor Kerstein is amazing! My son now enjoys math and is more confident.",
            },
            {
              name: "Jonathan Reyes",
              avatar: "/reviews/father.jpg",
              rating: 4,
              comment: "Very patient and professional. Helped my daughter in English.",
            },
          ].map((review, index) => (
            <div key={index} className="flex items-start gap-4 bg-[#f9fafa] p-4 rounded-xl border">
              <img
                src={review.avatar}
                alt={review.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-[#58A8B6]"
              />
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-[#2f2f2f]">{review.name}</span>
                  <span className="text-yellow-500 text-sm">
                    {"★".repeat(review.rating)}{" "}
                    <span className="text-gray-400">{5 - review.rating > 0 ? "☆".repeat(5 - review.rating) : ""}</span>
                  </span>
                </div>
                <p className="text-sm text-gray-700">{review.comment}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
