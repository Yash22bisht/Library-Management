// BorrowActions — renders different action buttons based on borrow status
// Used in the Librarian BorrowLog tab

const ReturnIcon = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <polyline points="1 4 1 10 7 10" />
    <path d="M3.51 15a9 9 0 102.13-9.36L1 10" />
  </svg>
);

export default function ActionButton({ status, logId, onApprove, onReject, onApproveReturn }) {
  switch (status) {

    case "pending":
      return (
        <div className="inline-flex gap-2">
          <button
            onClick={() => onApprove(logId)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#2a9d8f] hover:bg-[#228b7e] text-white text-xs font-semibold rounded-xl transition active:scale-95"
          >
            Accept
          </button>
          <button
            onClick={() => onReject(logId)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-red-50 hover:bg-red-100 text-red-500 text-xs font-semibold rounded-xl transition active:scale-95"
          >
            Reject
          </button>
        </div>
      );

    case "return_initiated":
      return (
        <button
          onClick={() => onApproveReturn(logId)}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-orange-100 hover:bg-orange-200 text-orange-600 text-xs font-semibold rounded-xl transition active:scale-95"
        >
          <ReturnIcon /> Approve Return
        </button>
      );

    case "borrowed":
      return (
        <button disabled className="px-3.5 py-1.5 bg-gray-100 text-gray-400 text-xs font-semibold rounded-xl cursor-not-allowed">
          Borrowed
        </button>
      );

    case "rejected":
      return (
        <button disabled className="px-3.5 py-1.5 bg-red-50 text-red-300 text-xs font-semibold rounded-xl cursor-not-allowed">
          Rejected
        </button>
      );

    case "returned":
      return (
        <button disabled className="px-3.5 py-1.5 bg-teal-50 text-teal-300 text-xs font-semibold rounded-xl cursor-not-allowed">
          Returned
        </button>
      );

    default:
      return (
        <button disabled className="px-3.5 py-1.5 bg-gray-100 text-gray-400 text-xs font-semibold rounded-xl cursor-not-allowed">
          {status}
        </button>
      );
  }
}