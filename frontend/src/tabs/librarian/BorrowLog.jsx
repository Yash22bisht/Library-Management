import { useLibrary } from "../../context/LibraryContext";
import StatusBadge from "../../components/StatusBadge";
import EmptyState from "../../components/EmptyState";
import ActionButton from "../../components/ActionButton";
// import {, approveReturnRequest, rejectRequest} from "../../context/LibraryContext";


export default function BorrowLog() {
  const { borrowLog, borrowLogLoading,approveRequest, approveReturnRequest, rejectRequest } = useLibrary();

  if (borrowLogLoading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#f0f4f5]">
        <div className="text-[#6b7f88] text-sm animate-pulse">Loading borrow log...</div>
      </div>
    );
  }

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
                  <td className="px-5 py-4 text-[#1a2e35] font-medium">{log.title}</td>
                  <td className="px-5 py-4 text-[#6b7f88]">{log.name}</td>
                  <td className="px-5 py-4 text-[#6b7f88]">{log.issue_date?.split("T")[0] || "NA"}</td>
                  <td className="px-5 py-4 text-[#6b7f88]">{log.due_date?.split("T")[0] || "NA"}</td>
                  <td className="px-5 py-4">
                    {/* {log.status.toLowerCase()} */}
                    <StatusBadge status={log.status.toLowerCase()} />
                  </td>
                  <td className="px-5 py-4 text-right">
                    <ActionButton
                      status={log.status.toLowerCase()}
                      logId={log.id}
                      onApprove={() => approveRequest({ issue_id: log.issue_id})}
                      onReject={() => rejectRequest({ issue_id: log.issue_id })}
                      onApproveReturn={() => approveReturnRequest({ issue_id: log.issue_id })}
                    />
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