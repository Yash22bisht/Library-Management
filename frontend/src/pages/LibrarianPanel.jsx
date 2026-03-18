import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LibrarianProvider, useLibrary } from "../context/LibraryContext";
import { authAPI } from "../service";
import AppSidebar from "../components/AppSidebar";
import Inventory from "../tabs/librarian/Inventory";
import BorrowLog from "../tabs/librarian/BorrowLog";
import AddBook from "../tabs/librarian/AddBook";

const NAV_ITEMS = (inventoryCount, borrowCount) => [
  { key: "inventory", label: "Inventory", badge: inventoryCount },
  { key: "borrowlog", label: "Borrow Log", badge: borrowCount },
  { key: "addbook", label: "Add Book" },
];

// Inner component — must be inside LibrarianProvider to use useLibrary
function LibrarianPanelInner() {
  const [activeTab, setActiveTab] = useState("inventory");
  const { books, borrowLog } = useLibrary();
  const navigate = useNavigate();

  const handleLogOut = () => {
    authAPI.logout().finally(() => navigate("/")); // backend clears the cookie
  };

  const renderTab = () => {
    switch (activeTab) {
      case "inventory": return <Inventory />;
      case "borrowlog": return <BorrowLog />;
      case "addbook": return <AddBook onSuccess={() => setActiveTab("inventory")} />;
      default: return <Inventory />;
    }
  };

  return (
    <div className="flex min-h-screen">
      <AppSidebar
        role="librarian"
        navItems={NAV_ITEMS(books.length, borrowLog.length)}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onLogOut={handleLogOut}
      />
      {renderTab()}
    </div>
  );
}

// Outer component — wraps with LibrarianProvider
export default function LibrarianPanel() {
  return (
    <LibrarianProvider>
      <LibrarianPanelInner />
    </LibrarianProvider>
  );
}