import React from "react";

const templates = [
  {
    id: "classic",
    name: "Classic",
    description: "Traditional layout perfect for corporate roles.",
    image: "/classic.png",
  },
  {
    id: "modern",
    name: "Modern",
    description: "Clean and contemporary design for all industries.",
    image: "/modern.png",
    featured: true,
  },
  {
    id: "sidebar",
    name: "Sidebar",
    description: "Stylish layout with side profile section.",
    image: "/sidebar.png",
  },
];
interface Props {
  navigate: (path: string, options?: any) => void;
  parsedData?: any;
}

const TemplateGrid = ({ navigate, parsedData }: Props) => {
  return (
    <div className="grid md:grid-cols-3 gap-12 p-10">
      {templates.map((template) => (
        <div
          key={template.id}
          className={`
            group relative rounded-3xl overflow-hidden
            transition-all duration-500
            hover:-translate-y-4 hover:shadow-2xl
           ${template.featured ? "shadow-xl border-2 border-violet-500" : "shadow-lg"}

          `}
          onClick={() =>
            navigate(`/builder/${template.id}`, {
              state: { parsedData },
            })
          }
        >
          {/* Featured Badge */}
          {template.featured && (
            <span className="absolute top-4 left-4 bg-gradient-to-r from-violet-500 to-purple-600 text-white text-xs px-3 py-1 rounded-full shadow-lg">
              Most Popular
            </span>
          )}

          {/* Image */}
          <div className="bg-gray-50 h-[520px] flex items-center justify-center p-6">
            <img
              src={template.image}
              alt={template.name}
              className="max-h-full max-w-full object-contain group-hover:scale-105 transition duration-500"
            />
          </div>

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
            <button className="bg-white text-violet-600 px-6 py-3 rounded-2xl font-semibold shadow-lg hover:scale-105 transition">
              Use Template
            </button>
          </div>

          {/* Bottom Info */}
          <div className="bg-white p-6 text-center">
            <h3 className="text-xl font-semibold">{template.name}</h3>
            <p className="mt-2 text-gray-600 text-sm">{template.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TemplateGrid;
