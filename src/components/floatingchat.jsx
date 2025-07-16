// src/components/FloatingChat.jsx
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaComments, FaPaperPlane, FaTimes } from 'react-icons/fa';

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const chatRef = useRef(null);
  const navigate = useNavigate();

  const activeStudent = 'Maria Lopez'; // Fixed, just like Messenger's current chat

  useEffect(() => {
    const stored = localStorage.getItem('floatingChat');
    if (stored) setMessages(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem('floatingChat', JSON.stringify(messages));
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!newMessage.trim()) return;

    const newMsg = {
      id: Date.now(),
      sender: 'tutor',
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, newMsg]);
    setNewMessage('');

    // Simulate reply
    setTimeout(() => {
      const reply = {
        id: Date.now() + 1,
        sender: 'student',
        text: 'Thank you for the message!',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, reply]);
    }, 1000);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-[#58A8B6] text-white p-4 rounded-full shadow-lg z-50 hover:bg-[#4aa0a4] transition"
      >
        {isOpen ? <FaTimes size={20} /> : <FaComments size={24} />}
      </button>

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 w-96 max-w-sm bg-white border rounded-xl shadow-xl flex flex-col z-50">
          {/* Header */}
          <div className="bg-[#58A8B6] text-white px-4 py-3 font-semibold flex justify-between items-center text-sm rounded-t-xl">
            Chat with {activeStudent}
            <button onClick={() => setIsOpen(false)} className="text-white hover:opacity-75">
              <FaTimes size={16} />
            </button>
          </div>

          {/* Messages */}
          <div className="p-4 h-64 overflow-y-auto space-y-2 text-sm" ref={chatRef}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`max-w-[75%] px-3 py-2 rounded-lg ${
                  msg.sender === 'tutor'
                    ? 'bg-[#e2f4f6] text-right self-end ml-auto'
                    : 'bg-gray-100 text-left'
                }`}
              >
                <p>{msg.text}</p>
                <span className="text-[10px] text-gray-500 block mt-1">{msg.time}</span>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="flex items-center border-t px-3 py-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type a message..."
              className="flex-1 border px-3 py-2 rounded-full text-sm focus:outline-none"
            />
            <button
              onClick={handleSend}
              className="ml-2 bg-[#58A8B6] text-white p-2 rounded-full hover:bg-[#4aa0a4]"
            >
              <FaPaperPlane size={14} />
            </button>
          </div>

          {/* View All Link */}
          <button
            onClick={() => {
              setIsOpen(false);
              navigate('/messages');
            }}
            className="text-xs text-[#58A8B6] text-center py-2 border-t hover:underline"
          >
            View All Messages →
          </button>
        </div>
      )}
    </>
  );
}
