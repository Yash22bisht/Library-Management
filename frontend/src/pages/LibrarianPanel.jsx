import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppSidebar from "../components/AppSidebar";
import { useLibrary } from "../context/LibraryContext";
import Inventory from "../tabs/librarian/Inventory";
import BorrowLog from "../tabs/librarian/BorrowLog";
import AddBook from "../tabs/librarian/AddBook";

const NAV_ITEMS = (inventoryCount, borrowCount) => [
  { key: "inventory", label: "Inventory", badge: inventoryCount },
  { key: "borrowlog", label: "Borrow Log", badge: borrowCount },
  { key: "addbook", label: "Add Book" },
];

export default function LibrarianPanel() {
  const [activeTab, setActiveTab] = useState("inventory");
  const { books, borrowLog } = useLibrary();
  const navigate = useNavigate();

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
        onSwitchRole={() => navigate("/")}
      />
      {renderTab()}
    </div>
  );
}