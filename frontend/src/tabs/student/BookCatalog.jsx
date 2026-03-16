import { useState } from "react";
import { useLibrary } from "../../context/LibraryContext";
import SearchBar from "../../components/SearchBar";
import StatusBadge from "../../components/StatusBadge";

export default function BookCatalog() {
  const { books, myBorrowedIds, borrowBook } = useLibrary();
  const [search, setSearch] = useState("");

  const filtered = books.filter(
    (b) =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase()) ||
      b.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 p-8 bg-[#f0f4f5] min-h-screen overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#1a2e35]">Book Catalog</h1>
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search by title, author, category..."
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        {filtered.map((book) => {
          const isMine = myBorrowedIds.includes(book.id);
          const isBorrowed = book.status === "borrowed";
          return (
            <div key={book.id} className="bg-white rounded-2xl border border-[#e8edf0] p-5 flex flex-col gap-3">
              <div className="flex items-start justify-between gap-2">
                <h2 className="font-bold text-[#1a2e35] text-base leading-snug">{book.title}</h2>
                <StatusBadge status={book.status} />
              </div>
              <p className="text-sm text-[#6b7f88]">{book.author}</p>
              <span className="self-start text-xs text-[#6b7f88] border border-[#dde4e8] rounded-lg px-2.5 py-1">
                {book.category}
              </span>
              {!isBorrowed && (
                <button
                  onClick={() => borrowBook(book.id)}
                  className="mt-1 w-full py-2.5 bg-[#2a9d8f] hover:bg-[#228b7e] active:scale-95 text-white text-sm font-bold rounded-xl transition"
                >
                  Borrow
                </button>
              )}
              {isMine && isBorrowed && (
                <div className="mt-1 w-full py-2.5 bg-teal-50 text-teal-600 text-sm font-semibold rounded-xl text-center">
                  Borrowed by you
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}