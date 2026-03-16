import { useState } from "react";
import { useLibrary } from "../../context/LibraryContext";

export default function AddBook({ onSuccess }) {
  const { addBook } = useLibrary();
  const [form, setForm] = useState({ title: "", author: "", category: "" });

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = () => {
    if (!form.title.trim() || !form.author.trim() || !form.category.trim()) return;
    addBook(form);
    setForm({ title: "", author: "", category: "" });
    if (onSuccess) onSuccess(); // switch back to Inventory tab after adding
  };

  const isValid = form.title.trim() && form.author.trim() && form.category.trim();

  const inputClass =
    "w-full px-4 py-3 text-sm rounded-xl border border-[#dde4e8] bg-white text-[#1a2e35] placeholder-[#aab5bb] outline-none focus:border-[#2a9d8f] transition";

  return (
    <div className="flex-1 p-8 bg-[#f0f4f5] min-h-screen overflow-y-auto">
      <h1 className="text-2xl font-bold text-[#1a2e35] mb-6">Add New Book</h1>

      <div className="bg-white rounded-2xl border border-[#e8edf0] p-6 w-full max-w-xl flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[#1a2e35]">Title</label>
          <input name="title" type="text" placeholder="Book title" value={form.title} onChange={handleChange} className={inputClass} />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[#1a2e35]">Author</label>
          <input name="author" type="text" placeholder="Author name" value={form.author} onChange={handleChange} className={inputClass} />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[#1a2e35]">Category</label>
          <input name="category" type="text" placeholder="e.g. Computer Science" value={form.category} onChange={handleChange} className={inputClass} />
        </div>

        <button
          onClick={handleSubmit}
          disabled={!isValid}
          className="w-full py-3 bg-[#2a9d8f] hover:bg-[#228b7e] disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 text-white text-sm font-bold rounded-xl transition"
        >
          Add Book
        </button>
      </div>
    </div>
  );
}