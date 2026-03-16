// Reusable search bar used in Book Catalog and Inventory
const SearchIcon = () => (
  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

export default function SearchBar({ value, onChange, placeholder = "Search...", width = "w-72" }) {
  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#aab5bb]">
        <SearchIcon />
      </span>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`pl-9 pr-4 py-2.5 text-sm rounded-xl border border-[#dde4e8] bg-white text-[#1a2e35] placeholder-[#aab5bb] outline-none focus:border-[#2a9d8f] transition ${width}`}
      />
    </div>
  );
}