import { useNavigate } from "react-router-dom";

export default function PageNotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#eef2f5] flex items-center justify-center">
      <div className="flex flex-col items-center text-center gap-6">

        
        <h1 className="text-[120px] font-black text-[#2a9d8f] leading-none tracking-tight select-none">
          404
        </h1>
        
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold text-[#1a2e35] tracking-tight">
            Page Not Found
          </h2>
          <p className="text-sm text-[#6b7f88] max-w-xs">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="flex gap-3 mt-2">
          <button
            onClick={() => navigate(-1)}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold border border-[#dde4e8] bg-white text-[#3d5560] hover:border-[#2a9d8f] hover:text-[#2a9d8f] transition"
          >
            Go Back
          </button>
          <button
            onClick={() => navigate("/")}
            className="px-5 py-2.5 rounded-xl text-sm font-bold bg-[#2a9d8f] hover:bg-[#228b7e] active:scale-95 text-white transition"
          >
            Back to Home
          </button>
        </div>

      </div>
    </div>
  );
}