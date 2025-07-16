// src/components/TabsSection.jsx
import { useState } from 'react';
import MaterialUpload from './materialupload';
import SessionTable from './sessiontable';
import EarningsPanel from './earningspanel';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFolderOpen, FaCalendarAlt, FaWallet } from 'react-icons/fa';

const tabs = [
  { id: 'materials', label: 'My Materials', icon: <FaFolderOpen /> },
  { id: 'sessions', label: 'My Sessions', icon: <FaCalendarAlt /> },
  { id: 'earnings', label: 'My Earnings', icon: <FaWallet /> }
];

export default function TabsSection() {
  const [activeTab, setActiveTab] = useState('materials');

  const renderContent = () => {
    switch (activeTab) {
      case 'materials':
        return <MaterialUpload />;
      case 'sessions':
        return <SessionTable />;
      case 'earnings':
        return <EarningsPanel />;
      default:
        return null;
    }
  };

  return (
    <section className="mt-12">
      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-3 mb-6 border-b border-gray-200 pb-2">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition duration-200 ${
              activeTab === tab.id
                ? 'bg-[#58A8B6] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span className="text-base">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="bg-white p-6 rounded-xl shadow border"
        >
          {renderContent()}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
