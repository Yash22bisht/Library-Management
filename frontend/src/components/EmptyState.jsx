// Reusable empty state used across tabs
export default function EmptyState({ title, subtitle }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-16 h-16 bg-[#d9eeed] rounded-2xl flex items-center justify-center mb-4">
        <svg width="30" height="30" fill="none" stroke="#2a9d8f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" />
          <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
        </svg>
      </div>
      <p className="text-[#1a2e35] font-semibold text-lg">{title}</p>
      {subtitle && <p className="text-[#6b7f88] text-sm mt-1">{subtitle}</p>}
    </div>
  );
}