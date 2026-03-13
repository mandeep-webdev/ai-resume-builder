import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import TemplateGrid from "../components/TemplateGrid";
import Footer from "../components/Footer";
const Templates = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const parsedData = location.state?.parsedData;

  return (
    <div className="bg-white text-gray-900">
      {/* Navbar */}
      <Navbar />
      {/* Header */}
      <section className="px-10 py-20 text-center bg-violet-50">
        <h1 className="text-4xl md:text-5xl font-bold">
          Choose Your Perfect Template
        </h1>
        <p className="mt-4 text-gray-600">
          Professionally designed layouts for every career.
        </p>
      </section>
      {/* Template Grid */}
      <TemplateGrid navigate={navigate} parsedData={parsedData} />
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Templates;
