// src/pages/Availability.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaClock, FaCalendarDay, FaSave } from 'react-icons/fa';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const timeSlots = ['Morning (8AM–12PM)', 'Afternoon (1PM–5PM)', 'Evening (6PM–9PM)'];

export default function Availability() {
  const [availability, setAvailability] = useState(() =>
    days.reduce((acc, day) => {
      acc[day] = [];
      return acc;
    }, {})
  );

  const toggleSlot = (day, slot) => {
    setAvailability(prev => {
      const isSelected = prev[day].includes(slot);
      const updated = isSelected
        ? prev[day].filter(s => s !== slot)
        : [...prev[day], slot];
      return { ...prev, [day]: updated };
    });
  };

  const handleSave = () => {
    console.log('Saved availability:', availability);
    // TODO: Save to backend or local storage
    alert('Availability saved!');
  };

  return (
    <div className="min-h-screen bg-[#f4f8f9] py-10 px-6 md:px-10 text-[#2f2f2f]">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <div className="flex items-center gap-3 mb-2">
          <FaCalendarDay className="text-[#58A8B6] text-3xl" />
          <h1 className="text-3xl font-bold">Set Your Weekly Availability</h1>
        </div>
        <p className="text-gray-600">Let students know when you're available to teach.</p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {days.map(day => (
          <div key={day} className="bg-white rounded-xl shadow-md border p-4">
            <h3 className="text-lg font-bold text-[#58A8B6] mb-3">{day}</h3>
            <div className="space-y-2">
              {timeSlots.map(slot => (
                <label
                  key={slot}
                  className={`flex items-center gap-2 text-sm p-2 rounded cursor-pointer border ${
                    availability[day].includes(slot)
                      ? 'bg-[#e1f4f6] border-[#58A8B6] text-[#2f2f2f]'
                      : 'bg-gray-50 border-gray-200 text-gray-600'
                  }`}
                >
                  <input
                    type="checkbox"
                    className="accent-[#58A8B6]"
                    checked={availability[day].includes(slot)}
                    onChange={() => toggleSlot(day, slot)}
                  />
                  {slot}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleSave}
        className="bg-[#58A8B6] text-white px-6 py-2 rounded-full flex items-center gap-2 hover:bg-[#4aa0a4]"
      >
        <FaSave /> Save Availability
      </button>
    </div>
  );
}
