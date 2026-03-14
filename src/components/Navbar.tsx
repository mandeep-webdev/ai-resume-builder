import React from "react";
// https://smart-ai-resume-builder.netlify.app/
import { Link, useNavigate } from "react-router-dom";
import { Bot } from "lucide-react";
const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav
      className="flex justify-between items-center px-10 py-6 
    bg-white/70 backdrop-blur-md border-b border-violet-100 sticky top-0 z-50"
    >
      <h1 className="flex items-center gap-2 text-xl font-bold tracking-wide text-violet-600">
        <Bot size={26} />
        <Link to="/">ResumeBot</Link>
      </h1>

      <div className="flex items-center gap-6">
        <button
          onClick={() => navigate("/templates")}
          className="bg-violet-500 hover:bg-violet-600 
          text-white px-6 py-2 rounded-2xl shadow-lg transition"
        >
          Create Resume
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
