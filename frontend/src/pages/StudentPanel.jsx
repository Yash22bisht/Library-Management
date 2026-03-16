import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppSidebar from "../components/AppSidebar";
import { useLibrary } from "../context/LibraryContext";
import BookCatalog from "../tabs/student/BookCatalog";
import MyBooks from "../tabs/student/MyBooks";

const NAV_ITEMS = (myBooksCount) => [
  { key: "catalog", label: "Book Catalog" },
  { key: "mybooks", label: "My Books", badge: myBooksCount },
];

export default function StudentPanel() {
  const [activeTab, setActiveTab] = useState("catalog");
  const { myBorrowedIds } = useLibrary();
  const navigate = useNavigate();

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
        navItems={NAV_ITEMS(myBorrowedIds.length)}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onSwitchRole={() => navigate("/")}
      />
      {renderTab()}
    </div>
  );
}