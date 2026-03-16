import { createContext, useContext, useState } from "react";

const initialBooks = [
  { id: 1, title: "Introduction to Algorithms", author: "Thomas Cormen", category: "Computer Science", status: "available", borrowedBy: null },
  { id: 2, title: "Clean Code", author: "Robert C. Martin", category: "Software Engineering", status: "borrowed", borrowedBy: "Alice" },
  { id: 3, title: "Design Patterns", author: "Gang of Four", category: "Software Engineering", status: "available", borrowedBy: null },
  { id: 4, title: "The Pragmatic Programmer", author: "David Thomas", category: "Software Engineering", status: "available", borrowedBy: null },
  { id: 5, title: "Artificial Intelligence: A Modern Approach", author: "Stuart Russell", category: "AI", status: "borrowed", borrowedBy: "Bob" },
  { id: 6, title: "Database System Concepts", author: "Abraham Silberschatz", category: "Database", status: "available", borrowedBy: null },
  { id: 7, title: "Operating System Concepts", author: "Abraham Silberschatz", category: "Operating Systems", status: "available", borrowedBy: null },
  { id: 8, title: "Computer Networks", author: "Andrew Tanenbaum", category: "Networking", status: "borrowed", borrowedBy: "Charlie" },
];

const initialBorrowLog = [
  { id: 1, bookId: 2, book: "Clean Code", student: "Alice", borrowDate: "2026-03-10", dueDate: "2026-03-25", status: "borrowed" },
  { id: 2, bookId: 5, book: "Artificial Intelligence: A Modern Approach", student: "Bob", borrowDate: "2026-03-05", dueDate: "2026-03-20", status: "borrowed" },
  { id: 3, bookId: 8, book: "Computer Networks", student: "Charlie", borrowDate: "2026-03-12", dueDate: "2026-04-01", status: "borrowed" },
];

const LibraryContext = createContext(null);

export function LibraryProvider({ children }) {
  const [books, setBooks] = useState(initialBooks);
  const [borrowLog, setBorrowLog] = useState(initialBorrowLog);
  const [myBorrowedIds, setMyBorrowedIds] = useState([]);

  const borrowBook = (bookId) => {
    const today = new Date().toISOString().split("T")[0];
    const due = new Date(Date.now() + 15 * 86400000).toISOString().split("T")[0];
    const book = books.find((b) => b.id === bookId);
    setBooks((prev) => prev.map((b) => b.id === bookId ? { ...b, status: "borrowed", borrowedBy: "Student" } : b));
    setBorrowLog((prev) => [...prev, { id: Date.now(), bookId, book: book.title, student: "Student", borrowDate: today, dueDate: due, status: "borrowed" }]);
    setMyBorrowedIds((prev) => [...prev, bookId]);
  };

  const returnBook = (logId) => {
    const log = borrowLog.find((l) => l.id === logId);
    setBooks((prev) => prev.map((b) => b.id === log.bookId ? { ...b, status: "available", borrowedBy: null } : b));
    setBorrowLog((prev) => prev.filter((l) => l.id !== logId));
    setMyBorrowedIds((prev) => prev.filter((id) => id !== log.bookId));
  };

  const addBook = (book) => {
    setBooks((prev) => [...prev, { ...book, id: Date.now(), status: "available", borrowedBy: null }]);
  };

  const deleteBook = (bookId) => {
    setBooks((prev) => prev.filter((b) => b.id !== bookId));
    setBorrowLog((prev) => prev.filter((l) => l.bookId !== bookId));
    setMyBorrowedIds((prev) => prev.filter((id) => id !== bookId));
  };

  return (
    <LibraryContext.Provider value={{ books, borrowLog, myBorrowedIds, borrowBook, returnBook, addBook, deleteBook }}>
      {children}
    </LibraryContext.Provider>
  );
}

export const useLibrary = () => {
  const context = useContext(LibraryContext);
  if (!context) {
    throw new Error("useLibrary must be used inside <LibraryProvider>. Make sure App.jsx wraps your routes with <LibraryProvider>.");
  }
  return context;
};