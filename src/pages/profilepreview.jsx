import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle, FaIdBadge, FaArrowLeft, FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function ProfilePreview() {
  const [profilePhoto] = useState(localStorage.getItem('profilePhoto') || '/logo.jpg');

  const tutor = {
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
    averageRating: 4.7,
    totalReviews: 35,
  };

  return (
    <div className="min-h-screen bg-[#f4f8f9] pb-16">
      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-[#58A8B6] to-[#9cd2dc] py-10 px-6 text-white text-center shadow-md">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <div className="flex flex-col items-center gap-4">
            <img
              src={profilePhoto}
              alt="Tutor Avatar"
              className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-xl"
            />
            <h1 className="text-3xl font-bold">{tutor.name}</h1>

            <div className="flex items-center gap-2 text-sm">
              <FaIdBadge />
              <span>{tutor.badgeLevel}</span>
              {tutor.verified && (
                <span className="flex items-center text-green-100 gap-1">
                  <FaCheckCircle /> Verified
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 text-sm text-yellow-300">
              <FaStar />
              <span>{tutor.averageRating} ({tutor.totalReviews} reviews)</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Public Info Section */}
      <div className="max-w-4xl mx-auto px-6 mt-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-md p-6 mb-8 border"
        >
          <h2 className="text-2xl font-bold text-[#58A8B6] mb-4">About Me</h2>
          <p className="text-gray-700 leading-relaxed">
            Hello! I'm <strong>{tutor.name}</strong>, a passionate and verified tutor from <strong>{tutor.address}</strong>. 
            I specialize in <strong>{tutor.subjects.join(', ')}</strong> and work with <strong>{tutor.gradeLevel}</strong> learners.
            I have <strong>{tutor.experience} years</strong> of teaching experience and currently hold a <strong>{tutor.attainment}</strong> degree.
          </p>
        </motion.div>

        {/* Teaching Info */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6 border">
            <h3 className="font-semibold text-[#58A8B6] text-lg mb-3">Teaching Details</h3>
            <p><strong>Grade Level:</strong> {tutor.gradeLevel}</p>
            <p><strong>Availability:</strong> {tutor.availability}</p>
            <p><strong>Hourly Rate:</strong> {tutor.rate}</p>
            <div className="mt-3">
              <strong>Subjects:</strong>
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

          {/* Educational Info */}
          <div className="bg-white rounded-xl shadow-md p-6 border">
            <h3 className="font-semibold text-[#58A8B6] text-lg mb-3">Educational Background</h3>
            <p><strong>School:</strong> {tutor.school}</p>
            <p><strong>Degree:</strong> {tutor.attainment}</p>
            <p><strong>Experience:</strong> {tutor.experience} years</p>
          </div>
        </div>

        {/* Back button */}
        <div className="text-center mt-10">
          <Link
            to="/dashboard"
            className="text-sm bg-gray-200 px-4 py-2 rounded-full inline-flex items-center gap-2 hover:bg-gray-300 transition"
          >
            <FaArrowLeft /> Back to Dashboard
          </Link>
        </div>

        {/* Reviews Section with Tutor Replies */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-[#58A8B6] mb-6 text-center">What Students & Parents Say</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto px-4">
            {[
              {
                name: "Mother of Bryan",
                avatar: "/reviews/mother.jpg",
                rating: 5,
                comment: "We noticed immediate improvement in Bryan's reading after working with Tutor Kerstein. Highly recommended!",
                reply: "Thank you so much! Bryan was a joy to teach and I'm glad he's gaining confidence.",
              },
              {
                name: "Father of Angel",
                avatar: "/reviews/father.jpg",
                rating: 4,
                comment: "Kerstein is very patient and passionate. Angel felt more confident tackling her math exams.",
                reply: "Appreciate the feedback! Angel did great and I’m always happy to help further.",
              },
            ].map((review, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-md border flex flex-col gap-4"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-[#58A8B6]"
                  />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-[#2f2f2f] font-semibold">{review.name}</h4>
                      <span className="text-yellow-500 text-sm">
                        {"★".repeat(review.rating)}
                        <span className="text-gray-300">
                          {"☆".repeat(5 - review.rating)}
                        </span>
                      </span>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">{review.comment}</p>
                  </div>
                </div>

                {/* Tutor's Reply */}
                {review.reply && (
                  <div className="ml-16 mt-2 pl-4 border-l-2 border-[#58A8B6] bg-[#f8fdfd] rounded-md py-2 pr-3">
                    <p className="text-sm text-[#2f2f2f] italic">
                      <span className="font-semibold text-[#58A8B6]">Tutor Reply:</span> {review.reply}
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </section>


      </div>
    </div>
  );
}
