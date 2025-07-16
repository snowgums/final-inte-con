import { useState } from 'react';
import { FaPaperPlane, FaTimes } from 'react-icons/fa';

const dummyMessages = [
  { id: 1, sender: 'student', text: 'Hi, is our session still on today?' },
  { id: 2, sender: 'tutor', text: 'Yes! See you at 10 AM.' },
];

export default function ChatBox({ onClose }) {
  const [messages, setMessages] = useState(dummyMessages);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() === '') return;
    setMessages([...messages, { id: Date.now(), sender: 'tutor', text: input }]);
    setInput('');
  };

  return (
    <div className="flex flex-col h-[400px]">
      {/* Header */}
      <div className="flex justify-between items-center bg-[#58A8B6] text-white px-4 py-2 rounded-t-xl">
        <h3 className="text-sm font-semibold">💬 Messages</h3>
        <button onClick={onClose}>
          <FaTimes />
        </button>
      </div>

      {/* Message Feed */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2 bg-gray-50 text-sm">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`max-w-[75%] px-3 py-2 rounded-lg ${
              msg.sender === 'tutor'
                ? 'bg-[#e2f4f6] text-[#2f2f2f] self-end ml-auto'
                : 'bg-gray-200 text-gray-800 self-start mr-auto'
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex items-center border-t px-3 py-2">
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 text-sm px-3 py-1 border rounded-full mr-2 focus:outline-none"
        />
        <button
          onClick={handleSend}
          className="text-[#58A8B6] hover:text-[#4aa0a4]"
        >
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
}
