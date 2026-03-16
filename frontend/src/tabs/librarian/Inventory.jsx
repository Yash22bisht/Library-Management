import { useState } from "react";
import { useLibrary } from "../../context/LibraryContext";
import SearchBar from "../../components/SearchBar";
import trashIcon from "../../assets/icons/trash.png";
import StatusBadge from "../../components/StatusBadge";


export default function Inventory() {
  const { books, deleteBook } = useLibrary();
  const [search, setSearch] = useState("");

  const filtered = books.filter(
    (b) =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 p-8 bg-[#f0f4f5] min-h-screen overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#1a2e35]">Book Inventory</h1>
        <SearchBar value={search} onChange={setSearch} placeholder="Search books..." width="w-64" />
      </div>

      <div className="bg-white rounded-2xl border border-[#e8edf0] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#e8edf0] bg-[#f7f9fa]">
              <th className="text-left px-5 py-3.5 font-semibold text-[#1a2e35]">Title</th>
              <th className="text-left px-5 py-3.5 font-semibold text-[#1a2e35]">Author</th>
              <th className="text-left px-5 py-3.5 font-semibold text-[#1a2e35]">Category</th>
              <th className="text-left px-5 py-3.5 font-semibold text-[#1a2e35]">Status</th>
              <th className="text-right px-5 py-3.5 font-semibold text-[#1a2e35]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((book) => (
              <tr key={book.id} className="border-b border-[#e8edf0] last:border-0 hover:bg-[#f7f9fa] transition">
                <td className="px-5 py-4 text-[#1a2e35] font-medium">{book.title}</td>
                <td className="px-5 py-4 text-[#6b7f88]">{book.author}</td>
                <td className="px-5 py-4 text-[#6b7f88]">{book.category}</td>
                <td className="px-5 py-4">
                  <StatusBadge status={book.status} borrowedBy={book.borrowedBy} />
                </td>
                <td className="px-5 py-4 text-right">
                  <button
                    onClick={() => deleteBook(book.id)}
                    className="text-red-400 hover:text-red-600 transition p-1"
                  >
                    <img src={trashIcon} alt="Delete" className="w-5 h-5" />
                    {/* <TrashIcon /> */}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}