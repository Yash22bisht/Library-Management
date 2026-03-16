import { useLibrary } from "../../context/LibraryContext";
import StatusBadge from "../../components/StatusBadge";
import EmptyState from "../../components/EmptyState";

export default function MyBooks() {
  const { borrowLog, myBorrowedIds } = useLibrary();
  const myLog = borrowLog.filter((l) => myBorrowedIds.includes(l.bookId));

  return (
    <div className="flex-1 p-8 bg-[#f0f4f5] min-h-screen overflow-y-auto">
      <h1 className="text-2xl font-bold text-[#1a2e35] mb-6">My Books</h1>

      {myLog.length === 0 ? (
        <EmptyState
          title="No books borrowed yet"
          subtitle="Head to the Book Catalog to borrow a book."
        />
      ) : (
        <div className="bg-white rounded-2xl border border-[#e8edf0] overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#e8edf0] bg-[#f7f9fa]">
                <th className="text-left px-5 py-3.5 font-semibold text-[#1a2e35]">Book</th>
                <th className="text-left px-5 py-3.5 font-semibold text-[#1a2e35]">Borrow Date</th>
                <th className="text-left px-5 py-3.5 font-semibold text-[#1a2e35]">Due Date</th>
                <th className="text-left px-5 py-3.5 font-semibold text-[#1a2e35]">Status</th>
              </tr>
            </thead>
            <tbody>
              {myLog.map((log) => (
                <tr key={log.id} className="border-b border-[#e8edf0] last:border-0 hover:bg-[#f7f9fa] transition">
                  <td className="px-5 py-4 text-[#1a2e35] font-medium">{log.book}</td>
                  <td className="px-5 py-4 text-[#6b7f88]">{log.borrowDate}</td>
                  <td className="px-5 py-4 text-[#6b7f88]">{log.dueDate}</td>
                  <td className="px-5 py-4">
                    <StatusBadge status="borrowed" />
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