// src/pages/messages.jsx
import { useEffect, useRef, useState } from 'react';
import { FaUser, FaPaperPlane } from 'react-icons/fa';

const students = ['Maria Lopez', 'John Santos', 'Angela Dela Cruz'];

export default function MessagesPage() {
  const [activeStudent, setActiveStudent] = useState(students[0]);
  const [messages, setMessages] = useState({});
  const [newMessage, setNewMessage] = useState('');
  const [unreadCounts, setUnreadCounts] = useState({});
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    const stored = localStorage.getItem('multiChatMessages');
    const storedUnread = localStorage.getItem('multiChatUnread');
    if (stored) setMessages(JSON.parse(stored));
    if (storedUnread) setUnreadCounts(JSON.parse(storedUnread));
  }, []);

  useEffect(() => {
    localStorage.setItem('multiChatMessages', JSON.stringify(messages));
    localStorage.setItem('multiChatUnread', JSON.stringify(unreadCounts));
    scrollToBottom();
  }, [messages, activeStudent, unreadCounts]);

  const scrollToBottom = () => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSend = () => {
    if (!newMessage.trim()) return;

    const newMsg = {
      id: Date.now(),
      text: newMessage,
      sender: 'tutor',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updated = {
      ...messages,
      [activeStudent]: [...(messages[activeStudent] || []), newMsg],
    };

    setMessages(updated);
    setNewMessage('');

    setIsTyping(true);
    setTimeout(() => {
      const reply = {
        id: Date.now() + 1,
        text: 'Thanks for your message!',
        sender: 'student',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => {
        const updatedMsgs = {
          ...prev,
          [activeStudent]: [...(prev[activeStudent] || []), reply],
        };

        // Increment unread count if not active tab
        setUnreadCounts((prevUnread) => ({
          ...prevUnread,
          [activeStudent]: (prevUnread[activeStudent] || 0) + 1,
        }));

        return updatedMsgs;
      });

      setIsTyping(false);
    }, 1200);
  };

  const handleSwitchStudent = (student) => {
    setActiveStudent(student);
    setUnreadCounts((prev) => ({ ...prev, [student]: 0 }));
  };

  return (
    <div className="flex h-screen bg-[#f4f8f9] text-[#2f2f2f] overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r shadow-sm p-4">
        <h2 className="font-bold text-lg mb-4 text-[#58A8B6]">Students</h2>
        <ul className="space-y-2">
          {students.map((student) => (
            <li
              key={student}
              onClick={() => handleSwitchStudent(student)}
              className={`cursor-pointer px-3 py-2 rounded-md flex justify-between items-center hover:bg-[#e2f4f6] ${
                student === activeStudent
                  ? 'bg-[#e2f4f6] font-semibold text-[#58A8B6]'
                  : 'text-gray-700'
              }`}
            >
              <div className="flex items-center gap-2">
                <FaUser />
                {student}
              </div>
              {unreadCounts[student] > 0 && (
                <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {unreadCounts[student]}
                </span>
              )}
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b bg-white shadow-sm flex justify-between items-center">
          <div className="text-lg font-semibold flex items-center gap-2">
            <FaUser className="text-[#58A8B6]" /> {activeStudent}
          </div>
          {isTyping && (
            <span className="text-sm text-gray-500 italic animate-pulse">
              Typing...
            </span>
          )}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#fdfdfd]">
          {(messages[activeStudent] || []).map((msg) => (
            <div
              key={msg.id}
              className={`px-4 py-2 rounded-xl shadow-sm text-sm w-fit max-w-[80%] break-words ${
                msg.sender === 'tutor'
                  ? 'bg-[#e2f4f6] self-end ml-auto text-right'
                  : 'bg-gray-100 self-start text-left'
              }`}
            >
              <p>{msg.text}</p>
              <span className="text-[10px] text-gray-500 block mt-1">{msg.time}</span>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* Input Box */}
        <div className="p-4 border-t bg-white flex items-center gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border rounded-full focus:outline-none text-sm"
          />
          <button
            onClick={handleSend}
            className="bg-[#58A8B6] hover:bg-[#4aa0a4] text-white p-2 rounded-full"
          >
            <FaPaperPlane size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
