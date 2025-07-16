import React, { useState, useRef } from 'react';
import TinderCard from 'react-tinder-card';
import { FaChevronLeft, FaChevronRight, FaCheckCircle } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const dummyStudents = [
  {
    id: 1,
    name: 'Jane Dela Cruz',
    subjectNeed: 'Mathematics',
    grade: 'Grade 2',
    description: 'Struggling with Algebra and needs weekly review sessions.',
    image: '/students/jane.jpg'
  },
  {
    id: 2,
    name: 'Mark Santos',
    subjectNeed: 'Science',
    grade: 'Grade 6',
    description: 'Looking for help in Physics problem-solving.',
    image: '/students/mark.jpg'
  },
  {
    id: 3,
    name: 'Anna Lopez',
    subjectNeed: 'English',
    grade: 'Kindergarten',
    description: 'Needs grammar and essay writing coaching.',
    image: '/students/anna.jpg'
  }
];

export default function MatchSwipeSection() {
  const [students, setStudents] = useState(dummyStudents);
  const [matchSent, setMatchSent] = useState(false);
  const childRefs = useRef(dummyStudents.map(() => React.createRef()));

  const swiped = (direction, nameToRemove) => {
    console.log(`Swiped ${direction} on ${nameToRemove}`);
    if (direction === 'right') {
      setMatchSent(true);
      setTimeout(() => setMatchSent(false), 1500);
    }
    setStudents((prev) => prev.filter((s) => s.name !== nameToRemove));
  };

  const outOfFrame = (name) => {
    console.log(`${name} left the screen`);
  };

  const swipe = async (dir) => {
    const lastIndex = students.length - 1;
    if (lastIndex >= 0 && childRefs.current[lastIndex]?.current) {
      await childRefs.current[lastIndex].current.swipe(dir);
    }
  };

  return (
    <section className="mt-10 relative">
      <h2 className="text-3xl font-extrabold text-[#2f2f2f] mb-4 text-center">🎯 Student Match Recommendations</h2>
      <p className="text-gray-600 mb-6 text-center text-lg">Click right to match with a student, or use arrows to navigate.</p>

      <div className="relative flex justify-center items-center h-[540px] max-w-4xl mx-auto overflow-hidden pt-6 pb-6">
        {/* Arrows */}
        <button
          onClick={() => swipe('left')}
          className="absolute left-4 z-20 bg-white shadow-md text-[#58A8B6] rounded-full w-12 h-12 flex items-center justify-center hover:bg-[#e5f5f8] transition"
        >
          <FaChevronLeft size={20} />
        </button>

        <div className="relative w-full h-full max-w-xl flex items-center justify-center">
          {students.length === 0 ? (
            <div className="text-center text-lg text-gray-500">No more student matches available.</div>
          ) : (
            <AnimatePresence initial={false}>
              {students.map((student, index) => (
                <TinderCard
                  className="absolute w-full h-full"
                  key={student.id}
                  ref={childRefs.current[index]}
                  onSwipe={(dir) => swiped(dir, student.name)}
                  onCardLeftScreen={() => outOfFrame(student.name)}
                  preventSwipe={['up', 'down']}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 40, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -30, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    className="relative bg-white rounded-3xl shadow-2xl border border-[#e5e7eb] p-6 h-[480px] flex flex-col overflow-hidden"
                  >
                    {/* Top Image */}
                    <div className="h-48 w-full rounded-xl overflow-hidden">
                      <img
                        src={student.image}
                        alt={student.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col justify-between flex-1 mt-4">
                      <div>
                        <h3 className="text-2xl font-bold text-[#2f2f2f] mb-1">{student.name}</h3>
                        <p className="text-sm text-gray-500 italic mb-3">{student.description}</p>

                        <div className="flex flex-wrap gap-2">
                          <span className="bg-[#d1f5f9] text-[#058b9a] text-xs font-medium px-3 py-1 rounded-full">{student.grade}</span>
                          <span className="bg-[#fee2e2] text-[#b91c1c] text-xs font-medium px-3 py-1 rounded-full">{student.subjectNeed}</span>
                        </div>
                      </div>

                      <div className="mt-5 text-sm text-center italic text-gray-600">
                        "Swipe right if you're ready to guide this learner!"
                      </div>
                    </div>
                  </motion.div>
                </TinderCard>
              ))}
            </AnimatePresence>
          )}
        </div>

        <button
          onClick={() => swipe('right')}
          className="absolute right-4 z-20 bg-white shadow-md text-[#58A8B6] rounded-full w-12 h-12 flex items-center justify-center hover:bg-[#e5f5f8] transition"
        >
          <FaChevronRight size={20} />
        </button>

        {matchSent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="absolute bottom-8 bg-green-100 text-green-800 px-6 py-3 rounded-full flex items-center gap-2 shadow-lg"
          >
            <FaCheckCircle /> <span>Match sent successfully!</span>
          </motion.div>
        )}
      </div>
    </section>
  );
}
