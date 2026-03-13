import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-violet-50 border-t border-violet-100 px-10 py-16">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 text-center md:text-left">
        {/* Brand */}
        <div>
          <h3 className="text-xl font-bold text-violet-600">ResumeBot</h3>
          <p className="mt-4 text-gray-600">
            Create modern, job-winning resumes in minutes.
          </p>
        </div>

        {/* Product */}
        <div>
          <h4 className="font-semibold text-gray-800">Product</h4>
          <ul className="mt-4 space-y-2 text-gray-600">
            <li>
              <Link
                to="/templates"
                className="hover:text-violet-600 transition"
              >
                Templates
              </Link>
            </li>
            <li>
              <Link to="" className="hover:text-violet-600 transition">
                Features
              </Link>
            </li>
            <li>
              <Link to={""} className="hover:text-violet-600 transition">
                Pricing
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="font-semibold text-gray-800">Legal</h4>
          <ul className="mt-4 space-y-2 text-gray-600">
            <li className="hover:text-violet-600 cursor-pointer transition">
              Privacy Policy
            </li>
            <li className="hover:text-violet-600 cursor-pointer transition">
              Terms of Service
            </li>
            <li className="hover:text-violet-600 cursor-pointer transition">
              Contact
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-12 pt-6 border-t border-violet-100 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} ResumeBot. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
