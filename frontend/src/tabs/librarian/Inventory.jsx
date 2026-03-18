import { useState } from "react";
import { useLibrary } from "../../context/LibraryContext";
import SearchBar from "../../components/SearchBar";
import trashIcon from "../../assets/icons/trash.png";
import editIcon from "../../assets/icons/edit.png";
import StatusBadge from "../../components/StatusBadge";

export default function Inventory() {
  const { books, editBook, deleteBook, booksLoading } = useLibrary();
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ title: "", author: "", category: "" });

  const filtered = books.filter(
    (b) =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase())
  );

  const handleEditClick = (book) => {
    setEditingId(book.book_id);
    setEditForm({ title: book.title, author: book.author, category: book.category , total_copies: book.total_copies });
  };

  const handleEditSave = () => {
    if (!editForm.title.trim() || !editForm.author.trim() || !editForm.category.trim()) return;
    editBook(editingId, editForm);
    setEditingId(null);
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditForm({ title: "", author: "", category: "" });
  };

  const inputClass =
    "w-full px-3 py-1.5 text-sm rounded-lg border border-[#dde4e8] outline-none focus:border-[#2a9d8f] bg-[#f7f9fa] focus:bg-white transition";

  if (booksLoading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#f0f4f5]">
        <div className="text-[#6b7f88] text-sm animate-pulse">Loading inventory...</div>
      </div>
    );
  }

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
              <th className="text-left px-5 py-3.5 font-semibold text-[#1a2e35]">Total Copies</th>
              <th className="text-left px-5 py-3.5 font-semibold text-[#1a2e35]">Available</th>
              <th className="text-right px-5 py-3.5 font-semibold text-[#1a2e35]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((book) => {
              const isEditing = editingId === book.book_id;

              return (
                <tr
                  key={book.book_id}
                  className={`border-b border-[#e8edf0] last:border-0 transition
                    ${isEditing ? "bg-[#f7fdfc]" : "hover:bg-[#f7f9fa]"}`}
                >
                  {isEditing ? (
                    <>
                      <td className="px-5 py-3">
                        <input
                          value={editForm.title}
                          onChange={(e) => setEditForm((f) => ({ ...f, title: e.target.value }))}
                          className={inputClass}
                          placeholder="Book title"
                          autoFocus
                        />
                      </td>
                      <td className="px-5 py-3">
                        <input
                          value={editForm.author}
                          onChange={(e) => setEditForm((f) => ({ ...f, author: e.target.value }))}
                          className={inputClass}
                          placeholder="Author name"
                        />
                      </td>
                      <td className="px-5 py-3">
                        <input
                          value={editForm.category}
                          onChange={(e) => setEditForm((f) => ({ ...f, category: e.target.value }))}
                          className={inputClass}
                          placeholder="Category"
                        />
                      </td>
                      <td className="px-5 py-3">
                        <input type="number" name="total_copies" value={editForm.total_copies} onChange={(e) => setEditForm((f) => ({ ...f, total_copies: parseInt(e.target.value) || 0 }))} />
                        
                      </td>
                      <td className="px-5 py-3">
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                          {book.available_copies} available
                        </span>
                      </td>
                      <td className="px-5 py-3 text-right">
                        <button
                          onClick={handleEditSave}
                          className="px-3.5 py-1.5 bg-[#2a9d8f] hover:bg-[#228b7e] text-white text-xs font-semibold rounded-xl transition active:scale-95 mr-2"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleEditCancel}
                          className="px-3.5 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs font-semibold rounded-xl transition active:scale-95"
                        >
                          Cancel
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-5 py-4 text-[#1a2e35] font-medium">{book.title}</td>
                      <td className="px-5 py-4 text-[#6b7f88]">{book.author}</td>
                      <td className="px-5 py-4 text-[#6b7f88]">{book.category}</td>
                      <td className="px-5 py-4">
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                          {book.total_copies} Total
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                          {book.available_copies} available
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <button
                          onClick={() => handleEditClick(book)}
                          className="mr-3 opacity-60 hover:opacity-100 transition"
                        >
                          <img src={editIcon} alt="Edit" className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => deleteBook(book.book_id)}
                          className="opacity-60 hover:opacity-100 transition"
                        >
                          <img src={trashIcon} alt="Delete" className="w-5 h-5" />
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}