import { useLibrary } from "../../context/LibraryContext";
import StatusBadge from "../../components/StatusBadge";
import EmptyState from "../../components/EmptyState";

export default function MyBooks() {
  const { myBooks, myBooksLoading, returnBook, returning } = useLibrary();

  if (myBooksLoading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#f0f4f5]">
        <div className="text-[#6b7f88] text-sm animate-pulse">Loading your books...</div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-8 bg-[#f0f4f5] min-h-screen overflow-y-auto">
      <h1 className="text-2xl font-bold text-[#1a2e35] mb-6">My Books</h1>

      {myBooks.length === 0 ? (
        <EmptyState title="No books borrowed yet" subtitle="Head to the Book Catalog to borrow a book." />
      ) : (
        <div className="bg-white rounded-2xl border border-[#e8edf0] overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#e8edf0] bg-[#f7f9fa]">
                <th className="text-left px-5 py-3.5 font-semibold text-[#1a2e35]">Book</th>
                <th className="text-left px-5 py-3.5 font-semibold text-[#1a2e35]">Borrow / Requested Date</th>
                <th className="text-left px-5 py-3.5 font-semibold text-[#1a2e35]">Due Date</th>
                <th className="text-left px-5 py-3.5 font-semibold text-[#1a2e35]">Status</th>
                <th className="text-right px-5 py-3.5 font-semibold text-[#1a2e35]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {myBooks.filter(item => ["APPROVED", "PENDING", "RETURN_INITIATED","REJECTED"].includes(item.status)).map((item) => {
                const isApproved = item.status === "APPROVED";

                return (<tr key={item._id || item.id} className="border-b border-[#e8edf0] last:border-0 hover:bg-[#f7f9fa] transition">
                  <td className="px-5 py-4 text-[#1a2e35] font-medium">{item.title}</td>
                  <td className="px-5 py-4 text-[#6b7f88]">{item.issue_date?.split("T")[0] || item.request_date?.split("T")[0]}</td>
                  <td className="px-5 py-4 text-[#6b7f88]">{item.due_date?.split("T")[0] || "---"}</td>
                  <td className="px-5 py-4">
                    <StatusBadge status={item.status?.toLowerCase() || "available"} />
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button
                      onClick={() => returnBook(item.issue_id)}
                      disabled={returning || item.status !== "APPROVED"}
                      className="px-3.5 py-1.5 bg-orange-100 hover:bg-orange-200 text-orange-600 text-xs font-semibold rounded-xl transition disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {returning ? "Requesting..." : "Return"}
                    </button>
                  </td>
                </tr>)
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}