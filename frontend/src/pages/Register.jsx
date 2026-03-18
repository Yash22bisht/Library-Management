import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authAPI } from "../service";
import open_eye from "../assets/icons/open_eye.png";
import closed_eye from "../assets/icons/closed_eye.png";

function EyeIcon({ open }) {
  return open ? (
    <img src={open_eye} alt="Open Eye" className="w-5 h-5" />
  ) : (
    <img src={closed_eye} alt="Closed Eye" className="w-5 h-5" />
  );
}

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleRegister = async () => {
    setError("");

    if (!form.name.trim() || !form.email.trim() || !form.password.trim() || !form.confirmPassword.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (form.password.length < 7) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      await authAPI.registerStudent({ name: form.name, email: form.email, password: form.password });
      navigate("/");
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#dde4e8] bg-[#f7f9fa] text-[#1a2e35] placeholder-[#aab5bb] outline-none focus:border-[#2a9d8f] focus:bg-white transition";

  return (
    <div className="min-h-screen bg-[#eef2f5] flex items-center justify-center py-10">
      <div className="flex flex-col items-center gap-5">

        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-[#d9eeed] rounded-2xl flex items-center justify-center">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#2a9d8f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" />
              <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
            </svg>
          </div>
          <h1 className="mt-4 text-2xl font-bold text-[#1a2e35] tracking-tight">Create Account</h1>
          <p className="text-sm text-[#6b7f88] mt-1">Register as a student to get started</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 w-[380px] flex flex-col gap-5">

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-2.5 rounded-xl">
              {error}
            </div>
          )}


          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#1a2e35]">Full Name</label>
            <input
              name="name"
              type="text"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#1a2e35]">Email</label>
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#1a2e35]">Password</label>
            <div className="relative">
              <input
                name="password"
                type={showPass ? "text" : "password"}
                placeholder="Min. 6 characters"
                value={form.password}
                onChange={handleChange}
                className={`${inputClass} pr-10`}
              />
              <button
                type="button"
                onClick={() => setShowPass((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#aab5bb] hover:text-[#2a9d8f] transition"
              >
                <EyeIcon open={showPass} />
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#1a2e35]">Confirm Password</label>
            <div className="relative">
              <input
                name="confirmPassword"
                type={showConfirm ? "text" : "password"}
                placeholder="Re-enter password"
                value={form.confirmPassword}
                onChange={handleChange}
                className={`${inputClass} pr-10`}
              />
              <button
                type="button"
                onClick={() => setShowConfirm((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#aab5bb] hover:text-[#2a9d8f] transition"
              >
                <EyeIcon open={showConfirm} />
              </button>
            </div>
            {/* Password match indicator */}
            {form.confirmPassword && (
              <p className={`text-xs mt-0.5 ${form.password === form.confirmPassword ? "text-teal-500" : "text-red-400"}`}>
                {form.password === form.confirmPassword ? "✓ Passwords match" : "✗ Passwords do not match"}
              </p>
            )}
          </div>

          {/* Register Button */}
          <button
            onClick={handleRegister}
            disabled={loading}
            className="w-full py-3 bg-[#2a9d8f] hover:bg-[#228b7e] disabled:opacity-60 disabled:cursor-not-allowed active:scale-95 text-white text-sm font-bold rounded-xl transition"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>

          {/* Login link */}
          <p className="text-center text-sm text-[#6b7f88]">
            Already have an account?{" "}
            <Link to="/" className="text-[#2a9d8f] font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}