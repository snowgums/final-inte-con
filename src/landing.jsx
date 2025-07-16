import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { MdEmojiEvents, MdSchool } from 'react-icons/md';
import {
  FaCalendarAlt,
  FaChartLine,
  FaFolderOpen,
  FaChalkboardTeacher,
  FaUserFriends,
  FaGamepad,
  FaStar,
  FaComments
} from 'react-icons/fa';


export default function Landing() {
  
      const [showModal, setShowModal] = useState(false);
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const navigate = useNavigate();

      const handleSignIn = (e) => {
        e.preventDefault();
        // Temporary logic for now; add authentication later
        if (email && password) {
          setShowModal(false);
          navigate('/dashboard');
        }
      };

  return (

    <div className="relative overflow-hidden min-h-screen bg-gradient-to-br from-[#98CFA4] to-[#58A8B6] text-white">

      {/* Floating Background Shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <span className="floating-shape w-16 h-16 bg-white rounded-full top-10 left-20"></span>
          <span className="floating-shape w-10 h-10 bg-white rounded-full top-40 right-16"></span>
          <span className="floating-shape w-12 h-12 bg-white rounded-full bottom-20 left-32"></span>
        </div>

      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 bg-white bg-opacity-20 backdrop-blur-md shadow-md rounded-b-2xl" data-aos="fade-down">
        <div className="flex items-center space-x-3">
          <img src="/logo.png" alt="Logo" className="h-8 w-auto object-contain" />
          <h1 className="text-2xl font-bold">Intellect Connect</h1>
        </div>
        <div className="space-x-6 text-white font-medium">
          <a href="#" className="hover:underline">Home</a>
          <a href="#" className="hover:underline">About</a>
          <Link
            to="/signup"
            className="bg-white text-[#58A8B6] px-4 py-2 rounded-full hover:bg-gray-100 transition font-semibold"
          >
            Sign Up
          </Link>
        
          <button
          onClick={() => setShowModal(true)}
          className="bg-[#58A8B6] text-white px-4 py-2 rounded-full hover:bg-[#4aa0a4]">
          Sign In
          </button>

        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="flex flex-col items-center justify-center text-center px-6 py-20"
        data-aos="fade-up"
        data-aos-delay="100"
        >
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-4 drop-shadow-md">Let’s Learn Together!</h2>
        <p className="text-lg max-w-xl mb-8 text-white/90 font-light">
          An online learning playground built for young minds — fun, safe, and interactive.
        </p>
        <a href="/signup" className="bg-white text-[#58A8B6] px-6 py-3 rounded-full font-bold shadow-md hover:scale-105 transition">
          Get Started Now
        </a>
      </section>

      {/* About Section */}
      <section className="bg-white text-[#2f2f2f] px-6 py-20 text-center" data-aos="zoom-in-up" id="about">
        <h2 className="text-3xl font-bold mb-6">What is Intellect Connect?</h2>
        <p className="max-w-2xl mx-auto text-lg font-light text-gray-600">
          Intellect Connect is a digital platform that empowers tutors to manage learners, track progress, and deliver engaging lessons — all in one place. Designed specifically to assist educators in guiding young learners with ease and confidence.
        </p>
      </section>

      {/* Features Section */}
      <section className="bg-[#f9f9f9] text-[#2f2f2f] px-6 py-20" id="features">
        <div className="max-w-6xl mx-auto">

          {/* Website Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            {[
              {
                title: 'Smart Scheduling',
                description: 'Organize classes and one-on-one sessions effortlessly.',
                icon: <FaCalendarAlt className="text-[#58A8B6] text-3xl mb-3" />,
              },
              {
                title: 'Progress Tracking',
                description: "Monitor every learner's journey and growth milestones.",
                icon: <FaChartLine className="text-[#58A8B6] text-3xl mb-3" />,
              },
              {
                title: 'Resource Sharing',
                description: 'Upload lesson materials, quizzes, and custom content.',
                icon: <FaFolderOpen className="text-[#58A8B6] text-3xl mb-3" />,
              },
              {
                title: 'Virtual Classrooms',
                description: 'Create focused online spaces for tutoring sessions.',
                icon: <FaChalkboardTeacher className="text-[#58A8B6] text-3xl mb-3" />,
              },
              {
                title: 'Parent Insights',
                description: 'Keep parents in the loop with performance reports.',
                icon: <FaUserFriends className="text-[#58A8B6] text-3xl mb-3" />,
              },
              {
                title: 'Chat & Notifications',
                description: 'Stay connected with learners through updates and messages.',
                icon: <FaComments className="text-[#58A8B6] text-3xl mb-3" />,
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-md p-6"
                data-aos="fade-up"
                data-aos-delay={idx * 100}
              >
                {item.icon}
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.description}</p>
              </div>
            ))}
          </div>

          {/* Mobile App Features */}
          <div
            className="flex flex-col-reverse lg:flex-row items-center gap-12 mt-20"
            data-aos="fade-up"
          >
            {/* Text Content */}
            <div className="lg:w-1/2 text-center lg:text-left" data-aos="fade-right">
              <h2 className="text-3xl font-bold mb-4">For Kids: Mobile App Fun</h2>
              <p className="text-gray-600 mb-6">
                Our mobile app turns learning into play! Designed with bright visuals and friendly prompts to help kids explore, learn, and grow independently.
              </p>
              <ul className="space-y-3 text-left">
                <li className="flex items-center gap-3">
                  <FaGamepad className="text-[#58A8B6] text-xl" />
                  <span>Interactive quizzes and lessons</span>
                </li>
                <li className="flex items-center gap-3">
                  <MdSchool className="text-[#58A8B6] text-xl" />
                  <span>Fun and smart learning materials</span>
                </li>
                <li className="flex items-center gap-3">
                  <FaComments className="text-[#58A8B6] text-xl" />
                  <span>User-friendly made for young learners</span>
                </li>
                <li className="flex items-center gap-3">
                  <MdEmojiEvents className="text-[#58A8B6] text-xl" />
                  <span>Rewards and badges</span>
                </li>
              </ul>
            </div>

            {/* Image Preview */}
            <div className="lg:w-1/2 flex justify-center" data-aos="zoom-in-left">
              <img
                src="/app-preview.png"
                alt="Mobile App Preview"
                className="rounded-xl shadow-lg w-full max-w-xs hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          {/* Testimonials Section */}
          <section className="bg-white text-[#2f2f2f] px-6 py-20" data-aos="fade-up">
            <div className="max-w-6xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">What People Are Saying</h2>
              <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
                Hear from parents and tutors who use Intellect Connect to bring learning to life.
              </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Testimonial Card 1 */}
              <div className="bg-[#f9f9f9] p-6 rounded-xl shadow-md" data-aos="zoom-in" data-aos-delay="100">
                <p className="text-sm italic text-gray-600 mb-4">"This platform made it easy to track my students' progress. Everything’s in one place!"</p>
                <div className="flex items-center gap-3">
                  <img src="/user1.jpg" alt="Tutor 1" className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="font-semibold text-sm">Elementary Student 1 Name</p>
                    <p className="text-xs text-gray-400">Elementary Student</p>
                  </div>
                </div>
              </div>

              {/* Testimonial Card 2 */}
              <div className="bg-[#f9f9f9] p-6 rounded-xl shadow-md" data-aos="zoom-in" data-aos-delay="200">
                <p className="text-sm italic text-gray-600 mb-4">"My child loves the app and asks to ‘study’ every afternoon. That’s a win for me!"</p>
                <div className="flex items-center gap-3">
                  <img src="/user2.jpg" alt="Parent" className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="font-semibold text-sm">Parent 1 Name</p>
                    <p className="text-xs text-gray-400">Parent of 2nd Grader</p>
                  </div>
                </div>
              </div>

              {/* Testimonial Card 3 */}
                  <div className="bg-[#f9f9f9] p-6 rounded-xl shadow-md" data-aos="zoom-in" data-aos-delay="300">
                    <p className="text-sm italic text-gray-600 mb-4">"Easy to use, bright visuals, and really engaging for my students. Highly recommended."</p>
                    <div className="flex items-center gap-3">
                      <img src="/user3.jpg" alt="Tutor 2" className="w-10 h-10 rounded-full object-cover" />
                      <div>
                        <p className="font-semibold text-sm">Tutor 1 Name</p>
                        <p className="text-xs text-gray-400">Grade 3 Teacher</p>
                      </div>
                    </div>
                  </div>
                </div>
                </div>
              </section>

        {/* How It Works Section */}
          <section className="bg-[#f0fdfa] text-[#2f2f2f] px-6 py-20" data-aos="fade-up">
            <div className="max-w-6xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">How It Works</h2>
              <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
                Getting started is simple. In just a few steps, you can begin making a difference in a learner’s life.
              </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition" data-aos="fade-up" data-aos-delay="100">
                <div className="w-16 h-16 mx-auto bg-[#98CFA4] text-white rounded-full flex items-center justify-center text-2xl mb-4">
                  📝
                </div>
                <h3 className="text-lg font-semibold mb-2">Sign Up</h3>
                <p className="text-gray-600 text-sm">Create your tutor profile in just a few clicks.</p>
              </div>

              {/* Step 2 */}
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition" data-aos="fade-up" data-aos-delay="200">
                <div className="w-16 h-16 mx-auto bg-[#7EBE8D] text-white rounded-full flex items-center justify-center text-2xl mb-4">
                  🎨
                </div>
                <h3 className="text-lg font-semibold mb-2">Customize</h3>
                <p className="text-gray-600 text-sm">Set your subjects, schedules, and rate per hour.</p>
              </div>

              {/* Step 3 */}
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition" data-aos="fade-up" data-aos-delay="300">
                <div className="w-16 h-16 mx-auto bg-[#58A8B6] text-white rounded-full flex items-center justify-center text-2xl mb-4">
                  🤝
                </div>
                <h3 className="text-lg font-semibold mb-2">Connect & Teach</h3>
                <p className="text-gray-600 text-sm">Meet learners, share resources, and make learning fun!</p>
              </div>
            </div>
          </div>
        </section>

        {/* Call-To-Action Section */}
        <section className="bg-gradient-to-r from-[#98CFA4] to-[#58A8B6] text-white px-6 py-20 text-center" data-aos="fade-up">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">Ready to make learning magical?</h2>
              <p className="text-white/90 text-lg mb-8">
                Join the Intellect Connect community and start teaching young minds with ease and fun.
              </p>
              <a href="/signup" className="bg-white text-[#58A8B6] px-6 py-3 rounded-full font-bold shadow-md hover:scale-105 transition inline-block">
                Become a Tutor Now
              </a>
            </div>
        </section>

        {/* Footer Section */}
        <footer className="bg-[#2f2f2f] text-white px-6 py-10">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
            <div>
              <h3 className="text-xl font-bold">Intellect Connect</h3>
              <p className="text-sm text-white/70 mt-2">
                Empowering tutors. Inspiring young learners.
              </p>
            </div>
            
            <div className="flex gap-6">
              <a href="#home" className="text-white/80 hover:text-white">Home</a>
              <a href="#about" className="text-white/80 hover:text-white">About</a>
              <a href="#features" className="text-white/80 hover:text-white">Features</a>
              <Link
                to="/signup"
                className="bg-white text-[#58A8B6] px-4 py-2 rounded-full hover:bg-gray-100 transition font-semibold"
              >
              Sign Up
              </Link>
            </div>
          </div>

          <div className="mt-6 text-center text-sm text-white/50">
            &copy; {new Date().getFullYear()} Intellect Connect. All rights reserved.
          </div>
        </footer>

        </div>
      </section>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
          <div className="bg-white text-[#2f2f2f] p-8 rounded-2xl w-full max-w-md shadow-xl relative animate-fade-in">
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-xl"
              onClick={() => setShowModal(false)}
            >
              &times;
            </button>

            {/* Title */}
            <h2 className="text-2xl font-bold text-center mb-6 text-[#58A8B6]">Tutor Sign In</h2>

            {/* Sign In Form */}
            <form onSubmit={handleSignIn} className="space-y-5">
              {/* Email Field */}
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  📧
                </span>
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#58A8B6]"
                  required
                />
              </div>

              {/* Password Field */}
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  🔒
                </span>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#58A8B6]"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 bg-[#58A8B6] text-white rounded-full font-semibold hover:bg-[#4aa0a4] transition"
              >
                Sign In
              </button>
            </form>

            {/* Sign Up Prompt */}
            <p className="text-center text-sm mt-6 text-gray-600">
              Not yet a tutor?{' '}
              <Link
                to="/signup"
                onClick={() => setShowModal(false)}
                className="text-[#58A8B6] hover:underline font-medium"
              >
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      )}


    </div>
  );
}
