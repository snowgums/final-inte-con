// src/components/SessionTable.jsx
import { FaCheckCircle, FaTimesCircle, FaClock } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const dummySessions = [
  {
    id: 1,
    student: 'Jane Dela Cruz',
    subject: 'Mathematics',
    time: 'July 18, 2025 – 10:00 AM',
    status: 'upcoming',
  },
  {
    id: 2,
    student: 'Mark Santos',
    subject: 'Science',
    time: 'July 17, 2025 – 2:00 PM',
    status: 'completed',
  },
  {
    id: 3,
    student: 'Anna Lopez',
    subject: 'English',
    time: 'July 16, 2025 – 11:30 AM',
    status: 'cancelled',
  },
];

export default function SessionTable() {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-green-600 bg-green-100 rounded-full">
            <FaCheckCircle className="text-sm" /> Completed
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-red-600 bg-red-100 rounded-full">
            <FaTimesCircle className="text-sm" /> Cancelled
          </span>
        );
      case 'upcoming':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-yellow-600 bg-yellow-100 rounded-full">
            <FaClock className="text-sm" /> Upcoming
          </span>
        );
    }
  };

  return (
    <div className="overflow-x-auto space-y-4">
      <table className="min-w-full bg-white border rounded-xl overflow-hidden shadow text-sm">
        <thead className="bg-[#58A8B6] text-white text-left">
          <tr>
            <th className="px-4 py-3">Student</th>
            <th className="px-4 py-3">Subject</th>
            <th className="px-4 py-3">Schedule</th>
            <th className="px-4 py-3">Status</th>
          </tr>
        </thead>
        <tbody className="text-[#2f2f2f] divide-y divide-gray-200">
          {dummySessions.map((session) => (
            <tr key={session.id}>
              <td className="px-4 py-2">{session.student}</td>
              <td className="px-4 py-2">{session.subject}</td>
              <td className="px-4 py-2">{session.time}</td>
              <td className="px-4 py-2">{getStatusBadge(session.status)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="text-right">
        <Link
          to="/sessions"
          className="inline-block text-sm text-[#58A8B6] font-medium hover:underline"
        >
          View All Sessions →
        </Link>
      </div>
    </div>
  );
}
