import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaUserGraduate,
  FaTimes,
  FaSearch,
  FaFileAlt,
  FaStickyNote,
  FaCalendarCheck
} from 'react-icons/fa';

const dummyStudents = [
  {
    id: 1,
    name: 'Maria Lopez',
    grade: 'Grade 4',
    subjects: ['Math', 'English'],
    photo: '/students/anna.jpg',
    email: 'maria.lopez@example.com',
    notes: 'Very responsive and eager to learn.',
    downloads: ['MultiplicationBasics.pdf', 'GrammarReview.docx'],
    sessions: ['July 5, 2025 - Math', 'July 12, 2025 - English'],
  },
  {
    id: 2,
    name: 'John Santos',
    grade: 'Grade 5',
    subjects: ['Science'],
    photo: '/students/mark.jpg',
    email: 'john.santos@example.com',
    notes: 'Struggles with time management. Needs reminders.',
    downloads: ['PhotosynthesisSlides.pptx'],
    sessions: ['July 10, 2025 - Science'],
  },
  {
    id: 3,
    name: 'Angela Dela Cruz',
    grade: 'Grade 3',
    subjects: ['English', 'Math'],
    photo: '/students/jane.jpg',
    email: 'angela.dc@example.com',
    notes: 'Excellent progress. Very polite.',
    downloads: [],
    sessions: [],
  },
];

export default function Students() {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [search, setSearch] = useState('');
  const [notes, setNotes] = useState({});

  // Load notes from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('studentNotes');
    if (stored) {
      setNotes(JSON.parse(stored));
    }
  }, []);

  const handleNoteChange = (id, value) => {
    const updated = { ...notes, [id]: value };
    setNotes(updated);
    localStorage.setItem('studentNotes', JSON.stringify(updated));
  };

  const filtered = dummyStudents.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f4f8f9] p-6 md:p-10 text-[#2f2f2f]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
      >
        <div className="flex items-center gap-3">
          <FaUserGraduate className="text-[#58A8B6] text-3xl" />
          <h1 className="text-3xl font-bold">Students</h1>
        </div>

        <div className="relative w-full md:w-80">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search student..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 w-full rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#58A8B6] text-sm"
          />
        </div>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filtered.map((student) => (
          <motion.div
            key={student.id}
            whileHover={{ y: -4 }}
            className="bg-white border shadow-md rounded-xl overflow-hidden group transition hover:shadow-lg"
          >
            <div className="relative w-full h-40 overflow-hidden">
              <img src={student.photo} alt={student.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-[#2f2f2f]">{student.name}</h3>
              <p className="text-sm text-gray-600">{student.grade}</p>
              <div className="flex flex-wrap gap-2 mt-2 text-xs">
                {student.subjects.map((subj, idx) => (
                  <span
                    key={idx}
                    className="bg-[#e2f4f6] text-[#58A8B6] px-2 py-0.5 rounded-full"
                  >
                    {subj}
                  </span>
                ))}
              </div>

              <button
                onClick={() => setSelectedStudent(student)}
                className="mt-4 w-full bg-[#58A8B6] text-white text-sm py-2 rounded-full hover:bg-[#4aa0a4] transition"
              >
                View Profile
              </button>
            </div>
          </motion.div>
        ))}
      </div>

        {/* Modal */}
        <AnimatePresence>
        {selectedStudent && (
            <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black bg-opacity-30 flex items-center justify-center p-4"
            >
            <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl p-6 max-w-md w-full shadow-lg relative"
            >
                <button
                onClick={() => setSelectedStudent(null)}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                >
                <FaTimes />
                </button>

                <div className="text-center">
                <img
                    src={selectedStudent.photo}
                    alt={selectedStudent.name}
                    className="w-24 h-24 mx-auto rounded-full object-cover border-4 border-[#58A8B6] shadow"
                />
                <h2 className="mt-3 text-xl font-bold text-[#2f2f2f]">{selectedStudent.name}</h2>
                <p className="text-sm text-gray-600">{selectedStudent.grade}</p>
                <p className="text-sm text-gray-600 mb-2">{selectedStudent.email}</p>

                <div className="flex flex-wrap justify-center gap-2 text-xs mb-4">
                    {selectedStudent.subjects.map((s, i) => (
                    <span
                        key={i}
                        className="bg-[#e2f4f6] text-[#58A8B6] px-3 py-0.5 rounded-full"
                    >
                        {s}
                    </span>
                    ))}
                </div>

                <div className="text-sm text-gray-700 bg-gray-50 p-3 rounded border mb-4">
                    <strong>Notes:</strong> {selectedStudent.notes}
                </div>

                {/* Performance Review Upload */}
                <div className="mb-4 text-left">
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                    Attach Performance Review (PDF)
                    </label>
                    <input
                    type="file"
                    accept=".pdf"
                    className="text-sm border rounded px-3 py-1 w-full"
                    />
                </div>

                {/* View Progress Button */}
                <button
                    onClick={() => {
                    setSelectedStudent(null);
                    window.location.href = `/student-progress/${selectedStudent.id}`;
                    }}
                    className="w-full bg-[#58A8B6] hover:bg-[#4aa0a4] text-white text-sm py-2 rounded-full font-medium"
                >
                    📈 View Progress
                </button>
                </div>
            </motion.div>
            </motion.div>
        )}
        </AnimatePresence>

    </div>
  );
}
