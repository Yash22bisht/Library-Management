// Shared sidebar component for the student and librarian dashboards.

const icons = {
  catalog: (
    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" /><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
    </svg>
  ),
  mybooks: (
    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
    </svg>
  ),
  inventory: (
    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" />
      <line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
  ),
  borrowlog: (
    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" />
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
    </svg>
  ),
  addbook: (
    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" viewBox="0 0 24 24">
      <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  ),
};

const SwitchIcon = () => (
  <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

export default function AppSidebar({ role, navItems, activeTab, onTabChange, onSwitchRole }) {
  const subtitle = role === "student" ? "Student Portal" : "Librarian Panel";

  return (
    <aside className="w-64 min-h-screen bg-[#0f2027] flex flex-col shrink-0">
      <div className="px-5 py-6 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-400 via-yellow-400 to-green-400 shrink-0" />
          <div>
            <div className="text-white font-bold text-base leading-tight">Library</div>
            <div className="text-[#94a3b8] text-xs">{subtitle}</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-3 flex flex-col gap-1 mt-2">
        {navItems.map((item) => {
          const isActive = activeTab === item.key;
          return (
            <button
              key={item.key}
              onClick={() => onTabChange(item.key)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium w-full text-left transition
                ${isActive ? "bg-white/10 text-[#2dd4bf]" : "text-[#94a3b8] hover:text-white hover:bg-white/5"}`}
            >
              <span>{icons[item.key]}</span>
              <span className="flex-1">{item.label}</span>
              {item.badge !== undefined && (
                <span className="bg-[#2a9d8f] text-white text-xs font-bold px-2 py-0.5 rounded-full min-w-[22px] text-center">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {onSwitchRole && (
        <div className="p-3 border-t border-white/10">
          <button
            onClick={onSwitchRole}
            className="flex items-center gap-3 px-4 py-2.5 w-full rounded-xl text-sm font-medium text-[#94a3b8] hover:text-white hover:bg-white/5 transition"
          >
            <SwitchIcon />
            Switch Role
          </button>
        </div>
      )}
    </aside>
  );
}