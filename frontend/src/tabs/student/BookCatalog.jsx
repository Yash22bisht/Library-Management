import { useState } from "react";
import Tooltip from '@mui/material/Tooltip';
import { useLibrary } from "../../context/LibraryContext";
import SearchBar from "../../components/SearchBar";
import StatusBadge from "../../components/StatusBadge";
import EmptyState from "../../components/EmptyState";

export default function BookCatalog() {
  const { books, booksLoading, booksError, borrowBook, borrowing } = useLibrary();
  const [search, setSearch] = useState("");

  const filtered = books.filter(
    (b) =>
      b.title?.toLowerCase().includes(search.toLowerCase()) ||
      b.author?.toLowerCase().includes(search.toLowerCase()) ||
      b.category?.toLowerCase().includes(search.toLowerCase())
  );

  if (booksLoading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#f0f4f5]">
        <div className="text-[#6b7f88] text-sm animate-pulse">Loading books...</div>
      </div>
    );
  }

  if (booksError) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#f0f4f5]">
        <div className="text-red-500 text-sm">{booksError.message}</div>
      </div>
    );
  }

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

      {filtered.length === 0 ? (
        <EmptyState title="No books found" subtitle="Try a different search term." />
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {filtered.map((book) => {
            const isBorrowed = book.status === "APPROVED" ;
            const isPending = book.status === "PENDING";
            return (
              <div key={book._id || book.id} className="bg-white rounded-2xl border border-[#e8edf0] p-5 flex flex-col gap-3">
                <div className="flex items-start justify-between gap-2">
                  <h2 className="font-bold text-[#1a2e35] text-base leading-snug">{book.title}</h2>
                  <StatusBadge status={book.status?.toLowerCase() || "available"} />
                </div>
                <p className="text-sm text-[#6b7f88]">{book.author}</p>
                <span className="self-start text-xs text-[#6b7f88] border border-[#dde4e8] rounded-lg px-2.5 py-1">
                  {book.category}
                </span>
                {(
                  <Tooltip
                    title={borrowing ? "Request in progress..." : isBorrowed ? "Already borrowed" : isPending ? "Request pending" : book.available_copies === 0 ? "No copies available" : "Click to borrow"
                    }
                    arrow
                  >
                    <span>
                      <button
                        onClick={() => borrowBook(book.book_id)}
                        disabled={borrowing || isBorrowed || isPending || book.available_copies === 0}
                        className="mt-1 w-full py-2.5 bg-[#2a9d8f] hover:bg-[#228b7e] disabled:opacity-60 active:scale-95 text-white text-sm font-bold rounded-xl transition"
                      >
                        {borrowing ? "Requesting..." : "Borrow"}
                      </button>
                    </span>
                  </Tooltip>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}