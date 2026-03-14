import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Eye,
  Sparkles,
  Layout,
  Upload,
  FileDown,
  FileSearch,
} from "lucide-react";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const features = [
  {
    icon: Eye,
    title: "Live Preview",
    desc: "See real-time updates while editing your resume.",
  },
  {
    icon: Sparkles,
    title: "AI Enhancement",
    desc: "Improve resume content with AI-powered suggestions.",
  },
  {
    icon: Layout,
    title: "Modern Templates",
    desc: "Choose from professionally designed layouts.",
  },
  {
    icon: Upload,
    title: "Resume Parsing",
    desc: "Upload your resume and auto-fill all fields instantly.",
  },
  {
    icon: FileSearch,
    title: "ATS Optimization",
    desc: "Ensure your resume passes ATS screening systems.",
  },
  {
    icon: FileDown,
    title: "Instant PDF Export",
    desc: "Download a polished resume ready for recruiters.",
  },
];
const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/parse-resume`,
        {
          method: "POST",
          body: formData,
        },
      );

      const parsedData = await response.json();

      navigate("/templates", {
        state: { parsedData },
      });
    } catch (error) {
      console.error("Resume parsing failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white text-gray-900">
      {/* Navbar */}
      <Navbar />
      {/* Hero Section */}
      <section
        className="relative px-10 py-32 overflow-hidden
  bg-gradient-to-r from-violet-200 via-purple-100 to-violet-100
  animate-gradient"
      >
        {/* Soft Glow Background */}
        <div
          className="absolute -top-40 -left-40 w-[500px] h-[500px]
      bg-violet-300 opacity-30 blur-[140px] rounded-full"
        ></div>

        <div
          className="max-w-6xl mx-auto grid md:grid-cols-2 
      items-center gap-16 relative"
        >
          {/* Left */}
          <div>
            <h1 className="text-5xl font-bold leading-tight">
              Create a Resume That
              <span
                className="bg-gradient-to-r from-violet-500 to-purple-600
            bg-clip-text text-transparent"
              >
                {" "}
                Gets You Hired
              </span>
            </h1>

            <p className="mt-6 text-lg text-gray-600">
              Choose from modern templates, customize instantly, and download a
              professional resume in minutes.
            </p>

            <div className="mt-10 flex gap-4">
              <button
                onClick={() => navigate("/templates")}
                className="bg-violet-500 hover:bg-violet-600
              text-white px-8 py-3 rounded-2xl shadow-xl transition"
              >
                Get Started
              </button>

              <div>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleUpload}
                  className="hidden"
                  id="resumeUpload"
                />

                <label
                  htmlFor="resumeUpload"
                  className="px-8 py-3 rounded-2xl border border-gray-300 hover:bg-gray-100 transition cursor-pointer inline-block"
                >
                  {loading ? "Parsing Resume..." : "Upload Resume"}
                </label>
              </div>
            </div>
          </div>

          {/* Right - Image */}
          <div className="relative w-[360px] rounded-3xl">
            <div className="absolute -inset-1 bg-gradient-to-r from-violet-400 to-purple-600 rounded-3xl blur opacity-40"></div>

            <div className="relative p-3 bg-white/30 backdrop-blur-xl rounded-3xl shadow-2xl">
              <img
                src="/banner.png"
                alt="Resume Preview"
                className="w-full rounded-2xl animate-float"
              />
            </div>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="px-10 py-28 bg-white relative">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold">Why Choose ResumeBot?</h2>

          <p className="mt-4 text-gray-600">
            Everything you need to create a job-winning resume.
          </p>

          <div className="mt-20 grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <div
                  key={index}
                  className="
                group
                p-10
                rounded-3xl
                bg-violet-50
                border border-violet-100
                transition-all duration-500
                hover:-translate-y-4
                hover:shadow-2xl
                hover:bg-white
                "
                >
                  {/* Icon Circle */}
                  <div
                    className="
                  w-16 h-16
                  flex items-center justify-center
                  mx-auto
                  rounded-2xl
                  bg-gradient-to-r from-violet-400 to-purple-600
                  text-white
                  shadow-lg
                  transition-all duration-500
                  group-hover:scale-110
                "
                  >
                    <Icon size={28} />
                  </div>

                  <h3 className="mt-6 text-xl font-semibold">
                    {feature.title}
                  </h3>

                  <p className="mt-4 text-gray-600">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {/* CTA */}
      <section
        className="
  relative
  px-10 py-32 text-center text-white
  bg-gradient-to-r from-violet-500 via-purple-500 to-violet-600
  overflow-hidden
"
      >
        {/* Soft Glow Background */}
        <div
          className="absolute inset-0 opacity-30 blur-3xl
  bg-gradient-to-r from-violet-300 to-purple-400"
        ></div>

        <div className="relative max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Ready to Land Your
            <span className="block">Next Opportunity?</span>
          </h2>

          <p className="mt-6 text-lg text-violet-100">
            Create a professional resume in minutes and stand out from the
            crowd.
          </p>

          <button
            onClick={() => navigate("/templates")}
            className="
        mt-10
        bg-white
        text-violet-600
        px-10 py-4
        rounded-2xl
        font-semibold
        shadow-2xl
        transition-all duration-300
        hover:scale-105
        hover:shadow-white/40
      "
          >
            Get Started — It’s Free
          </button>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
