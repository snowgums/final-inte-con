import { FaWallet, FaMoneyBillWave } from 'react-icons/fa';

const dummyTransactions = [
  { id: 1, date: 'July 15, 2025', type: 'Session Completed', points: 120 },
  { id: 2, date: 'July 12, 2025', type: 'Session Completed', points: 100 },
  { id: 3, date: 'July 10, 2025', type: 'Cashout', points: -200 },
];

export default function EarningsPanel() {
  const totalPoints = dummyTransactions.reduce((sum, tx) => sum + tx.points, 0);
  const conversionRate = 1; // 1 point = ₱1
  const minimumCashout = 100;

  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <div className="bg-white rounded-xl border shadow p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
        <div>
          <div className="flex items-center gap-3 text-[#58A8B6] text-xl mb-1">
            <FaWallet />
            <span className="font-semibold text-[#2f2f2f]">Available Points</span>
          </div>
          <h3 className="text-3xl font-bold text-[#2f2f2f]">{totalPoints} pts</h3>
          <p className="text-sm text-gray-500 mt-1">₱{totalPoints * conversionRate} equivalent</p>
          <p className="text-xs text-gray-400 mt-1">Points accumulate during live sessions (₱200/hr = 200pts)</p>
        </div>
        <div>
          <div className="mb-2 text-sm font-medium text-gray-700">Cashout Progress</div>
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div
              className={`h-4 rounded-full bg-[#58A8B6] transition-all duration-300`}
              style={{ width: `${Math.min(100, (totalPoints / minimumCashout) * 100)}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Minimum cashout: {minimumCashout} pts
          </p>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-xl overflow-hidden shadow text-sm">
          <thead className="bg-[#58A8B6] text-white text-left">
            <tr>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3">Points</th>
            </tr>
          </thead>
          <tbody className="text-[#2f2f2f] divide-y divide-gray-200">
            {dummyTransactions.map((tx) => (
              <tr key={tx.id}>
                <td className="px-4 py-2 whitespace-nowrap">{tx.date}</td>
                <td className="px-4 py-2">{tx.type}</td>
                <td
                  className={`px-4 py-2 font-semibold ${
                    tx.points < 0 ? 'text-red-500' : 'text-green-600'
                  }`}
                >
                  {tx.points > 0 ? `+${tx.points}` : tx.points}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Convert Points */}
      <div className="flex justify-end">
        <button
          disabled={totalPoints < minimumCashout}
          className={`flex items-center gap-2 text-white px-6 py-2 rounded shadow text-sm transition ${
            totalPoints >= minimumCashout
              ? 'bg-[#58A8B6] hover:bg-[#4aa0a4]'
              : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          <FaMoneyBillWave /> Convert Points to Cash
        </button>
      </div>
    </div>
  );
}
