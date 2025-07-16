// src/pages/Calendar.jsx
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { motion } from 'framer-motion';
import { FaCalendar } from 'react-icons/fa';

export default function Calendar() {
  const events = [
    {
      title: 'Math Session with Maria',
      date: '2025-07-20',
    },
    {
      title: 'English Review - John',
      date: '2025-07-22',
    },
    {
      title: 'Science Class - Angela',
      date: '2025-07-25',
    },
  ];

  return (
    <div className="min-h-screen bg-[#f4f8f9] p-6 md:p-10 text-[#2f2f2f]">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <div className="flex items-center gap-3 mb-2">
          <FaCalendar className="text-[#58A8B6] text-3xl" />
          <h1 className="text-3xl font-bold">My Calendar</h1>
        </div>
        <p className="text-gray-600">See your confirmed sessions and events at a glance.</p>
      </motion.div>

      <div className="bg-white p-4 rounded-xl shadow border max-w-5xl mx-auto">
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={events}
          height="auto"
        />
      </div>
    </div>
  );
}
