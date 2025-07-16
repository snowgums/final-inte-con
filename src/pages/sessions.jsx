// src/pages/Sessions.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FaCalendarAlt,
  FaCheck,
  FaTimes,
  FaSyncAlt,
  FaSortAmountDown,
  FaSortAmountUp,
  FaSearch,
} from 'react-icons/fa';

export default function Sessions() {
  const [sessions, setSessions] = useState([
    {
      id: 1,
      student: 'Maria Lopez',
      subject: 'Mathematics',
      date: '2025-07-20',
      time: '10:00 AM',
      status: 'Pending',
    },
    {
      id: 2,
      student: 'John Santos',
      subject: 'English',
      date: '2025-07-22',
      time: '3:30 PM',
      status: 'Confirmed',
    },
    {
      id: 3,
      student: 'Angela Dela Cruz',
      subject: 'Science',
      date: '2025-07-12',
      time: '1:00 PM',
      status: 'Completed',
    },
  ]);

  const [filter, setFilter] = useState('All');
  const [sortAsc, setSortAsc] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const handleStatusChange = (id, newStatus) => {
    setSessions(prev =>
      prev.map(s => (s.id === id ? { ...s, status: newStatus } : s))
    );
  };

  const filteredSessions = sessions
    .filter(session =>
      (filter === 'All' ? true : session.status === filter)
    )
    .filter(session =>
      session.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.subject.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const dateA = new Date(`${a.date} ${a.time}`);
      const dateB = new Date(`${b.date} ${b.time}`);
      return sortAsc ? dateA - dateB : dateB - dateA;
    });

  const statusColors = {
    Pending: 'bg-yellow-100 text-yellow-700',
    Confirmed: 'bg-green-100 text-green-700',
    Completed: 'bg-gray-100 text-gray-700',
    Declined: 'bg-red-100 text-red-600',
    Rescheduled: 'bg-blue-100 text-blue-700',
  };

  return (
    <div className="min-h-screen bg-[#f4f8f9] p-6 md:p-10 text-[#2f2f2f]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-3">
          <div className="flex items-center gap-3">
            <FaCalendarAlt className="text-[#58A8B6] text-3xl" />
            <h1 className="text-3xl font-bold">My Sessions</h1>
          </div>

          <div className="flex flex-wrap gap-3 items-center">
            {/* Filter Dropdown */}
            <select
              value={filter}
              onChange={e => setFilter(e.target.value)}
              className="border px-3 py-1 rounded text-sm"
            >
              <option value="All">All</option>
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Completed">Completed</option>
              <option value="Declined">Declined</option>
              <option value="Rescheduled">Rescheduled</option>
            </select>

            {/* Sort Button */}
            <button
              onClick={() => setSortAsc(!sortAsc)}
              className="flex items-center gap-1 bg-white border px-3 py-1 rounded text-sm hover:bg-gray-100"
            >
              {sortAsc ? <FaSortAmountDown /> : <FaSortAmountUp />}
              {sortAsc ? 'Oldest First' : 'Newest First'}
            </button>

            {/* Search Bar */}
            <div className="flex items-center border rounded px-2 py-1 bg-white text-sm">
              <FaSearch className="text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="outline-none w-40 sm:w-56 bg-transparent"
              />
            </div>

            <Link
              to="/calendar"
              className="bg-[#58A8B6] text-white text-sm px-4 py-2 rounded-full hover:bg-[#4aa0a4] transition"
            >
              📅 View Full Calendar
            </Link>
          </div>
        </div>

        <p className="text-gray-600">Filter, sort, and search through your tutoring sessions.</p>
      </motion.div>

      {/* Session List */}
      <div className="space-y-4">
        {filteredSessions.map(session => (
          <div
            key={session.id}
            className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:shadow-md transition"
          >
            <div>
              <h3 className="font-semibold text-[#2f2f2f] text-lg">
                {session.subject}
              </h3>
              <p className="text-sm text-gray-600">👤 {session.student}</p>
              <p className="text-sm text-gray-600">
                🕒 {session.date} at {session.time}
              </p>
              <p
                className={`inline-block mt-2 px-3 py-1 text-xs rounded-full font-medium ${statusColors[session.status]}`}
              >
                {session.status}
              </p>
            </div>

            {/* Actions */}
            {session.status === 'Pending' && (
              <div className="flex gap-2">
                <button
                  onClick={() => handleStatusChange(session.id, 'Confirmed')}
                  className="px-4 py-1 text-sm bg-green-600 text-white rounded-full flex items-center gap-1 hover:bg-green-700"
                >
                  <FaCheck /> Accept
                </button>
                <button
                  onClick={() => handleStatusChange(session.id, 'Declined')}
                  className="px-4 py-1 text-sm bg-red-500 text-white rounded-full flex items-center gap-1 hover:bg-red-600"
                >
                  <FaTimes /> Decline
                </button>
              </div>
            )}

            {session.status === 'Confirmed' && (
              <button
                onClick={() => handleStatusChange(session.id, 'Rescheduled')}
                className="px-4 py-1 text-sm bg-blue-500 text-white rounded-full flex items-center gap-1 hover:bg-blue-600"
              >
                <FaSyncAlt /> Reschedule
              </button>
            )}
          </div>
        ))}

        {filteredSessions.length === 0 && (
          <p className="text-center text-gray-500 py-12">No sessions found.</p>
        )}
      </div>
    </div>
  );
}
