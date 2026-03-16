// Reusable status badge used in both panels
export default function StatusBadge({ status, borrowedBy }) {
  if (status === "available") {
    return (
      <span className="bg-teal-50 text-teal-600 text-xs font-semibold px-2.5 py-1 rounded-full">
        Available
      </span>
    );
  }
  return (
    <span className="bg-orange-100 text-orange-500 text-xs font-semibold px-2.5 py-1 rounded-full">
      {borrowedBy ? `Borrowed by ${borrowedBy}` : "Borrowed"}
    </span>
  );
}