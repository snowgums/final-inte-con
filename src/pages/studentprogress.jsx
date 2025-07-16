import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaFilePdf, FaUserGraduate, FaChartLine, FaCalendarCheck } from 'react-icons/fa';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { motion } from 'framer-motion';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

const studentProfiles = {
  1: {
    name: 'Maria Lopez',
    grade: 'Grade 4',
    photo: '/students/anna.jpg',
    reviews: ['Maria_Lopez_Performance_Review.pdf'],
    attendance: [
      { date: '2025-07-01', status: 'Present' },
      { date: '2025-07-05', status: 'Absent' },
      { date: '2025-07-08', status: 'Present' },
    ],
    progress: [78, 82, 87, 92],
    months: ['April', 'May', 'June', 'July'],
  },
  2: {
    name: 'John Santos',
    grade: 'Grade 5',
    photo: '/students/mark.jpg',
    reviews: ['John_Santos_Report.pdf'],
    attendance: [
      { date: '2025-07-03', status: 'Present' },
      { date: '2025-07-06', status: 'Present' },
      { date: '2025-07-10', status: 'Absent' },
    ],
    progress: [65, 70, 75, 80],
    months: ['April', 'May', 'June', 'July'],
  },
  3: {
    name: 'Angela Dela Cruz',
    grade: 'Grade 3',
    photo: '/students/jane.jpg',
    reviews: [],
    attendance: [],
    progress: [60, 68, 74, 85],
    months: ['April', 'May', 'June', 'July'],
  },
};

export default function StudentProgress() {
  const { id } = useParams();
  const student = studentProfiles[id];

  if (!student) return <div className="p-10 text-center text-gray-600">Student not found.</div>;

  const chartData = {
    labels: student.months,
    datasets: [
      {
        label: 'Progress (%)',
        data: student.progress,
        borderColor: '#58A8B6',
        backgroundColor: 'rgba(88,168,182,0.2)',
        tension: 0.3,
        fill: true,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#f4f8f9] p-6 md:p-12 text-[#2f2f2f]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <img
            src={student.photo}
            alt={student.name}
            className="w-16 h-16 rounded-full object-cover border-4 border-[#58A8B6]"
          />
          <div>
            <h1 className="text-2xl font-bold">{student.name}</h1>
            <p className="text-gray-600">{student.grade}</p>
          </div>
        </div>

        <Link
          to="/students"
          className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-full flex items-center gap-2 text-sm"
        >
          <FaArrowLeft /> Back to Students
        </Link>
      </motion.div>

      {/* Progress Chart */}
      <div className="bg-white border rounded-xl p-6 shadow mb-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-[#58A8B6]">
          <FaChartLine /> Academic Progress
        </h2>
        <Line data={chartData} />
      </div>

      {/* Attendance Log */}
      <div className="bg-white border rounded-xl p-6 shadow mb-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-[#58A8B6]">
          <FaCalendarCheck /> Attendance Record
        </h2>
        {student.attendance.length > 0 ? (
          <ul className="text-sm space-y-2">
            {student.attendance.map((entry, index) => (
              <li key={index}>
                <span className="font-medium">{entry.date}</span>:{" "}
                <span
                  className={`${
                    entry.status === "Present" ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {entry.status}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-sm">No attendance data available.</p>
        )}
      </div>

      {/* Performance PDF Attachments */}
      <div className="bg-white border rounded-xl p-6 shadow">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-[#58A8B6]">
          <FaFilePdf /> Performance Reviews
        </h2>
        {student.reviews.length > 0 ? (
          <ul className="text-sm space-y-2">
            {student.reviews.map((pdf, idx) => (
              <li key={idx}>
                <a href={`/performance/${pdf}`} target="_blank" rel="noopener noreferrer" className="text-[#58A8B6] hover:underline flex items-center gap-2">
                  <FaFilePdf /> {pdf}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-sm">No performance reviews uploaded.</p>
        )}
      </div>
    </div>
  );
}
