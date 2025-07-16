// src/components/MaterialUpload.jsx
import { useState } from 'react';
import { FaUpload, FaTrash, FaFileAlt } from 'react-icons/fa';

export default function MaterialUpload() {
  const [materials, setMaterials] = useState([]);
  const [file, setFile] = useState(null);
  const [subject, setSubject] = useState('');
  const [grade, setGrade] = useState('');

  const handleUpload = (e) => {
    e.preventDefault();
    if (!file || !subject || !grade) return;

    const newMaterial = {
      id: Date.now(),
      name: file.name,
      subject,
      grade
    };

    setMaterials([newMaterial, ...materials]);
    setFile(null);
    setSubject('');
    setGrade('');
  };

  const handleDelete = (id) => {
    setMaterials(materials.filter((mat) => mat.id !== id));
  };

  const truncateName = (name, length = 25) =>
    name.length > length ? `${name.substring(0, length)}...` : name;

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h2 className="text-2xl font-bold text-[#2f2f2f] mb-1">📚 Upload Learning Materials</h2>
        <p className="text-sm text-gray-600">Provide helpful content for students by uploading files tagged by grade and subject.</p>
      </div>

      {/* Upload Form */}
      <form onSubmit={handleUpload} className="flex flex-col md:flex-row gap-4 items-center">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="border rounded px-3 py-2 text-sm w-full md:w-auto"
        />
        <input
          type="text"
          placeholder="Subject (e.g., Math)"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="border rounded px-3 py-2 text-sm w-full md:w-auto"
        />
        <input
          type="text"
          placeholder="Grade (e.g., Grade 3)"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          className="border rounded px-3 py-2 text-sm w-full md:w-auto"
        />
        <button
          type="submit"
          className="bg-[#58A8B6] text-white px-4 py-2 rounded hover:bg-[#4aa0a4] flex items-center gap-2 text-sm"
        >
          <FaUpload /> Upload
        </button>
      </form>

      {/* Uploaded Materials */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {materials.map((mat) => (
          <div
            key={mat.id}
            className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 relative"
          >
            <div className="flex items-center gap-2 mb-2">
              <FaFileAlt className="text-[#58A8B6]" />
              <h3 className="text-sm font-semibold text-[#2f2f2f]">{truncateName(mat.name)}</h3>
            </div>

            <div className="flex gap-2 text-xs mb-2">
              <span className="bg-[#58A8B6] text-white px-2 py-0.5 rounded-full">{mat.subject}</span>
              <span className="bg-[#e2f4f6] text-[#58A8B6] px-2 py-0.5 rounded-full">{mat.grade}</span>
            </div>

            <button
              onClick={() => handleDelete(mat.id)}
              className="absolute top-2 right-2 text-red-400 hover:text-red-600 text-xs"
              title="Delete"
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
