import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StudentProvider, useLibrary } from "../context/LibraryContext";
import { authAPI } from "../service";
import AppSidebar from "../components/AppSidebar";
import BookCatalog from "../tabs/student/BookCatalog";
import MyBooks from "../tabs/student/MyBooks";

const NAV_ITEMS = (myBooksCount) => [
  { key: "catalog", label: "Book Catalog" },
  { key: "mybooks", label: "My Books", badge: myBooksCount },
];


function StudentPanelInner() {
  const [activeTab, setActiveTab] = useState("catalog");
  const { myBooks } = useLibrary();
  const navigate = useNavigate();
 
  const handleLogOut = () => {
    authAPI.logout().finally(() => navigate("/")); // backend clears the cookie
  };
 
  const renderTab = () => {
    switch (activeTab) {
      case "catalog": return <BookCatalog />;
      case "mybooks": return <MyBooks />;
      default: return <BookCatalog />;
    }
  };
 
  return (
    <div className="flex min-h-screen">
      <AppSidebar
        role="student"
        navItems={NAV_ITEMS(myBooks.length)}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onLogOut={handleLogOut}
      />
      {renderTab()}
    </div>
  );
}

export default function StudentPanel() {
  return (
    <StudentProvider>
      <StudentPanelInner />
    </StudentProvider>
  );
}