// src/App.jsx 
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Public/Tutor Pages
import Landing from './landing';
import Signup from './pages/signup';
import Dashboard from './pages/dashboard';
import MyProfile from './pages/myprofile';
import ProfilePreview from './pages/profilepreview';
import Sessions from './pages/sessions';
import Availability from './pages/availability';
import Calendar from './pages/calendar';
import MessagesPage from './pages/messages';
import FloatingChat from './components/floatingchat';
import VirtualClassroom from './pages/virtualclassroom';
import Students from './pages/students';
import StudentProgress from './pages/studentprogress';

// Admin Pages
import AdminLogin from './pages/adminlogin';
import AdminLayout from './layouts/adminlayout';
import AdminDashboard from './pages/admindashboard';
import AdminApplications from './pages/adminapplications'; 
import AdminTutorLevels from './pages/admintutorlevels';
import AdminAnalytics from './pages/adminanalytics';
import AdminSettings from './pages/adminsettings';

function AppContent() {
  const location = useLocation();

  // Hide chat
  const hideChatOnRoutes = [
    '/', '/signup', '/messages', '/profile-preview',
    '/admin-login', '/admin-dashboard', '/admin-dashboard/applications', '/admin-dashboard/tutor-levels', '/admin-dashboard/analytics', '/admin-dashboard/settings'
  ];

  const showFloatingChat = !hideChatOnRoutes.includes(location.pathname);

  return (
    <>
      <Routes>
        {/* Public & Tutor Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<MyProfile />} />
        <Route path="/profile-preview" element={<ProfilePreview />} />
        <Route path="/sessions" element={<Sessions />} />
        <Route path="/availability" element={<Availability />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/messages" element={<MessagesPage />} />
        <Route path="/virtualclassroom" element={<VirtualClassroom />} />
        <Route path="/students" element={<Students />} />
        <Route path="/student-progress/:id" element={<StudentProgress />} />
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* ✅ Admin Routes Nested Under Layout */}
        <Route path="/admin-dashboard" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="applications" element={<AdminApplications />} />
          <Route path="tutor-levels" element={<AdminTutorLevels />} />
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Routes>

      {showFloatingChat && <FloatingChat />}
    </>
  );
}

export default function App() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <Router>
      <AppContent />
    </Router>
  );
}
