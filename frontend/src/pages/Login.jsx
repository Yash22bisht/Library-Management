import { useState } from "react";
import open_eye from "../assets/icons/open_eye.png";
import closed_eye from "../assets/icons/closed_eye.png";
import { useNavigate ,Link } from "react-router-dom";
import { authAPI } from "../service";

function EyeIcon({ open }) {
  return open ? (
    <img src={open_eye} alt="Open Eye" className="w-5 h-5" />
  ) : (
    <img src={closed_eye} alt="Closed Eye" className="w-5 h-5" />
  );
}


export default function LibraryLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [role, setRole] = useState("student");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async () => {
    console.log('signing in ', { email, password, role });

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    setError("");
    setLoading(true);

    try {
      console.log("inisde try block")
      const Login = role === "student" ? await authAPI.loginStudent(email, password) : await authAPI.loginLibrarian(email, password);

      navigate(role === "student" ? "/student" : "/librarian");

    } catch (error) {
      console.error(error);
      setError(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }

  };

  return (
    <div className="min-h-screen bg-[#eef2f5] flex items-center justify-center">
      <div className="flex flex-col items-center gap-5">

        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-[#d9eeed] rounded-2xl flex items-center justify-center">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#2a9d8f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" />
              <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
            </svg>
          </div>
          <h1 className="mt-4 text-2xl font-bold text-[#1a2e35] tracking-tight">
            Library Manager
          </h1>
          <p className="text-sm text-[#6b7f88] mt-1">Sign in to your account</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 w-[360px] flex flex-col gap-5">

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-2.5 rounded-xl">
              {error}
            </div>
          )}

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#1a2e35]">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#dde4e8] bg-[#f7f9fa] text-[#1a2e35] placeholder-[#aab5bb] outline-none focus:border-[#2a9d8f] focus:bg-white transition"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#1a2e35]">Password</label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 pr-10 text-sm rounded-xl border border-[#dde4e8] bg-[#f7f9fa] text-[#1a2e35] placeholder-[#aab5bb] outline-none focus:border-[#2a9d8f] focus:bg-white transition"
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

          {/* Role Selector */}
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-[#1a2e35]">Login as</span>
            <div className="flex gap-2.5">
              <button
                onClick={() => setRole("student")}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border transition
                  ${role === "student"
                    ? "bg-[#2a9d8f] border-[#2a9d8f] text-white"
                    : "bg-[#f7f9fa] border-[#dde4e8] text-[#3d5560] hover:border-[#2a9d8f] hover:text-[#2a9d8f]"
                  }`}
              >
                Student
              </button>
              <button
                onClick={() => setRole("librarian")}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border transition
                  ${role === "librarian"
                    ? "bg-[#2a9d8f] border-[#2a9d8f] text-white"
                    : "bg-[#f7f9fa] border-[#dde4e8] text-[#3d5560] hover:border-[#2a9d8f] hover:text-[#2a9d8f]"
                  }`}
              >
                Librarian
              </button>
            </div>
          </div>

          <button
            onClick={handleSignIn}
            className="w-full py-3 bg-[#2a9d8f] hover:bg-[#228b7e] active:scale-95 text-white text-sm font-bold rounded-xl transition"
          >
            Sign In
          </button>

          <p className="text-center text-sm text-[#6b7f88]">
            New student?{" "}
            <Link to="/register" className="text-[#2a9d8f] font-semibold hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}