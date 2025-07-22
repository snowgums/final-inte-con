// src/App.jsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

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
import AdminApplications from './pages/adminapplications';

function AppContent() {
  const location = useLocation();

  // Determine if chat should be shown
  const hideChatOnRoutes = ['/', '/signup', '/messages', '/profile-preview', '/admin-applications'];
  const showFloatingChat = !hideChatOnRoutes.includes(location.pathname);

  return (
    <>
      <Routes>
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
        <Route path="/admin-applications" element={<AdminApplications />} />
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
