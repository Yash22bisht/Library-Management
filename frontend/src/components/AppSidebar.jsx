import book from "../assets/icons/book.png";
import bookmark from "../assets/icons/bookmark.png";
import logout from "../assets/icons/logout.png";
import inventory from "../assets/icons/inventory.png";
import logs from "../assets/icons/logs.png";
import add from "../assets/icons/add.png";


const icons = {
  catalog: (
    <img src={book} alt="Catalog" className="w-7 h-7" />
  ),
  mybooks: (
    <img src={bookmark} alt="My Books" className="w-7 h-7" />
  ),
  inventory: (
    <img src={inventory} alt="Inventory" className="w-7 h-7" />
  ),
  borrowlog: (
    <img src={logs} alt="Borrowing Logs" className="w-7 h-7" />
  ),
  addbook: (
    <img src={add} alt="Add Book" className="w-7 h-7" />
  ),
};

const SwitchIcon = () => (
  <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

export default function AppSidebar({ role, navItems, activeTab, onTabChange, onLogOut }) {
  const subtitle = role === "student" ? "Student Portal" : "Librarian Panel";

  return (
    <aside className="w-64 min-h-screen bg-[#0f2027] flex flex-col shrink-0">
      <div className="px-5 py-6 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 bg-[#d9eeed] rounded-full flex items-center justify-center">
            <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="#2a9d8f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" />
              <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
            </svg>
          </div>
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
              {/* {item.badge !== undefined && (
                <span className="bg-[#2a9d8f] text-white text-xs font-bold px-2 py-0.5 rounded-full min-w-[22px] text-center">
                  {item.badge}
                </span>
              )} */}
            </button>
          );
        })}
      </nav>

      {onLogOut && (
        <div className="p-3 border-t border-white/10">
          <button
            onClick={onLogOut}
            className="flex items-center gap-3 px-4 py-2.5 w-full rounded-xl text-sm font-medium text-[#94a3b8] hover:text-white hover:bg-white/5 transition"
          >
            <img src={logout} alt="Log Out" className="w-6 h-6"  />
            LogOut
          </button>
        </div>
      )}
    </aside>
  );
}