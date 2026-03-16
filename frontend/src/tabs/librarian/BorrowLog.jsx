import { useLibrary } from "../../context/LibraryContext";
import StatusBadge from "../../components/StatusBadge";
import EmptyState from "../../components/EmptyState";

const ReturnIcon = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <polyline points="1 4 1 10 7 10" />
    <path d="M3.51 15a9 9 0 102.13-9.36L1 10" />
  </svg>
);

export default function BorrowLog() {
  const { borrowLog, returnBook } = useLibrary();

  return (
    <div className="flex-1 p-8 bg-[#f0f4f5] min-h-screen overflow-y-auto">
      <h1 className="text-2xl font-bold text-[#1a2e35] mb-6">Borrow Log</h1>

      {borrowLog.length === 0 ? (
        <EmptyState title="No active borrows" subtitle="All books are currently available." />
      ) : (
        <div className="bg-white rounded-2xl border border-[#e8edf0] overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#e8edf0] bg-[#f7f9fa]">
                <th className="text-left px-5 py-3.5 font-semibold text-[#1a2e35]">Book</th>
                <th className="text-left px-5 py-3.5 font-semibold text-[#1a2e35]">Student</th>
                <th className="text-left px-5 py-3.5 font-semibold text-[#1a2e35]">Borrow Date</th>
                <th className="text-left px-5 py-3.5 font-semibold text-[#1a2e35]">Due Date</th>
                <th className="text-left px-5 py-3.5 font-semibold text-[#1a2e35]">Status</th>
                <th className="text-right px-5 py-3.5 font-semibold text-[#1a2e35]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {borrowLog.map((log) => (
                <tr key={log.id} className="border-b border-[#e8edf0] last:border-0 hover:bg-[#f7f9fa] transition">
                  <td className="px-5 py-4 text-[#1a2e35] font-medium">{log.book}</td>
                  <td className="px-5 py-4 text-[#6b7f88]">{log.student}</td>
                  <td className="px-5 py-4 text-[#6b7f88]">{log.borrowDate}</td>
                  <td className="px-5 py-4 text-[#6b7f88]">{log.dueDate}</td>
                  <td className="px-5 py-4">
                    <StatusBadge status="borrowed" />
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button
                      onClick={() => returnBook(log.id)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#2a9d8f] hover:bg-[#228b7e] text-white text-xs font-semibold rounded-xl transition active:scale-95"
                    >
                      <ReturnIcon /> Return
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}