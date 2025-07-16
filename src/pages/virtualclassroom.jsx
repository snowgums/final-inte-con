import { useEffect, useRef, useState } from 'react';
import { FaStop, FaUserClock, FaStar, FaUpload, FaCheckCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function VirtualClassroom() {
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [pointsEarned, setPointsEarned] = useState(0);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [materials, setMaterials] = useState(() => JSON.parse(localStorage.getItem('uploadedMaterials')) || []);
  const [newMaterial, setNewMaterial] = useState(null);
  const [focusedMaterial, setFocusedMaterial] = useState('');
  const [checklist, setChecklist] = useState(['Introduction', 'Main Concepts', 'Exercises']);
  const [completed, setCompleted] = useState([]);
  const intervalRef = useRef(null);

  const studentName = 'Maria Lopez';

  const startSession = () => {
    setIsSessionActive(true);
    intervalRef.current = setInterval(() => {
      setSecondsElapsed(prev => prev + 1);
    }, 1000);
  };

  const stopSession = () => {
    setIsSessionActive(false);
    clearInterval(intervalRef.current);
  };

  useEffect(() => {
    if (isSessionActive && secondsElapsed > 0 && secondsElapsed % 18 === 0) {
      setPointsEarned(prev => prev + 1);
      const audio = new Audio('/point.mp3');
      audio.play().catch(() => {});
    }
  }, [secondsElapsed, isSessionActive]);

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  const handleMaterialUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const newItem = {
      id: Date.now(),
      name: file.name,
    };

    const updated = [newItem, ...materials];
    setMaterials(updated);
    localStorage.setItem('uploadedMaterials', JSON.stringify(updated));
  };

  const toggleChecklistItem = (item) => {
    if (completed.includes(item)) {
      setCompleted(prev => prev.filter(i => i !== item));
    } else {
      setCompleted(prev => [...prev, item]);
    }
  };

  const formatTime = (sec) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-[#f4f8f9] p-8 text-[#2f2f2f]">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto bg-white rounded-xl shadow-md border p-6 space-y-8"
      >
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#58A8B6] flex items-center gap-2">
            <FaUserClock /> Virtual Classroom
          </h1>
          <p className="text-sm text-gray-600">Student: <strong>{studentName}</strong></p>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Timer & Points */}
          <div className="bg-[#e2f4f6] rounded-xl p-6 shadow-sm text-center">
            <p className="text-sm text-gray-600">Session Duration</p>
            <h2 className="text-4xl font-bold text-[#2f2f2f]">{formatTime(secondsElapsed)}</h2>

            <div className="mt-4">
              <p className="text-sm text-gray-600">Points Earned</p>
              <h2 className="text-3xl font-bold text-green-600 flex justify-center items-center gap-2">
                <FaStar className="text-yellow-500" /> {pointsEarned} pts
              </h2>
            </div>

            <div className="mt-6">
              <button
                onClick={stopSession}
                disabled={!isSessionActive}
                className={`px-6 py-2 rounded-full text-white font-semibold flex items-center gap-2 justify-center transition ${
                  isSessionActive
                    ? 'bg-red-500 hover:bg-red-600'
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
              >
                <FaStop /> End Session
              </button>
            </div>
          </div>

          {/* Video Placeholder + Material Upload */}
          <div className="space-y-4">
            <div className="border border-dashed p-4 rounded-xl bg-gray-50 text-center">
              <p className="text-gray-600 mb-2">Live Video (Jitsi Placeholder)</p>
              <div className="bg-white border rounded-lg h-40 flex items-center justify-center text-gray-400">
                Jitsi will appear here
              </div>
            </div>

            {/* Upload Material */}
            <div className="bg-white p-4 border rounded-xl shadow-sm">
              <label className="text-sm font-semibold mb-1 block text-[#2f2f2f]">
                Upload Material During Session:
              </label>
              <input type="file" onChange={handleMaterialUpload} className="text-sm" />
            </div>
          </div>
        </div>

        {/* Focus Material & Checklist */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white border rounded-xl p-4">
            <h3 className="font-bold text-[#58A8B6] mb-3">Materials</h3>
            <ul className="space-y-2 text-sm">
              {materials.map(mat => (
                <li
                  key={mat.id}
                  onClick={() => setFocusedMaterial(mat.name)}
                  className={`cursor-pointer px-3 py-2 rounded border ${
                    focusedMaterial === mat.name
                      ? 'bg-[#e2f4f6] border-[#58A8B6] font-semibold'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  {mat.name}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white border rounded-xl p-4">
            <h3 className="font-bold text-[#58A8B6] mb-3">Live Checklist</h3>
            <ul className="space-y-2 text-sm">
              {checklist.map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2"
                  onClick={() => toggleChecklistItem(item)}
                >
                  <input
                    type="checkbox"
                    checked={completed.includes(item)}
                    readOnly
                    className="accent-[#58A8B6]"
                  />
                  {item}
                  {completed.includes(item) && (
                    <FaCheckCircle className="text-green-500 text-xs" />
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Current Focus */}
        {focusedMaterial && (
          <div className="bg-white border border-dashed rounded-xl p-4 text-center text-sm mt-6">
            <span className="text-gray-600">Currently Presenting:</span>{' '}
            <strong className="text-[#58A8B6]">{focusedMaterial}</strong>
          </div>
        )}

        {/* Start button */}
        {!isSessionActive && (
          <div className="mt-8 text-center">
            <button
              onClick={startSession}
              className="px-8 py-3 bg-[#58A8B6] hover:bg-[#4aa0a4] text-white rounded-full font-semibold text-sm"
            >
              ▶ Start Live Session
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
