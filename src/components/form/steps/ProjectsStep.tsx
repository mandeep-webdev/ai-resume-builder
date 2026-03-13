import React, { useState } from "react";
import { FieldArray, useFormikContext, getIn } from "formik";
import type { ResumeFormValues } from "../../../types/resume";

const ProjectsStep = () => {
  const { values, errors, touched, handleChange, handleBlur, setFieldValue } =
    useFormikContext<ResumeFormValues>();

  const [loadingIndex, setLoadingIndex] = useState<number | null>(null);
  const handleGenerateDescription = async (index: number) => {
    const project = values.projects[index];

    if (!project.name || !project.technologies) return;

    try {
      setLoadingIndex(index);

      const res = await fetch(
        "http://localhost:5001/api/generate-project-description",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            projectName: project.name,
            technologies: project.technologies,
            role: values.personalInfo.headline,
          }),
        },
      );

      const data = await res.json();

      // Expecting: { description: string[] }
      setFieldValue(`projects.${index}.description`, data.description);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingIndex(null);
    }
  };
  return (
    <div className="space-y-10">
      {/* Section Header */}
      <div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
          Projects
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          Showcase projects that highlight your skills and impact.
        </p>
      </div>

      <FieldArray name="projects">
        {({ push, remove }) => (
          <div className="space-y-8">
            {values.projects.map((project, i) => {
              const projectErrors = getIn(errors, `projects.${i}`);
              const projectTouched = getIn(touched, `projects.${i}`);

              return (
                <div
                  key={i}
                  className="
                    relative
                    bg-white
                    border border-violet-100
                    rounded-2xl
                    p-6
                    shadow-md
                    hover:shadow-lg
                    transition-all duration-300
                    space-y-5
                  "
                >
                  {/* Card Header */}
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-violet-700">
                      Project {i + 1}
                    </h3>

                    {values.projects.length > 1 && (
                      <button
                        type="button"
                        onClick={() => remove(i)}
                        className="text-sm text-red-500 hover:text-red-600 transition"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  {/* Project Name */}
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-600">
                      Project Name
                    </label>
                    <input
                      type="text"
                      name={`projects.${i}.name`}
                      value={project.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="
                        w-full px-4 py-2.5 rounded-xl
                        border border-gray-200
                        focus:border-violet-500
                        focus:ring-2 focus:ring-violet-200
                        focus:outline-none
                        transition
                      "
                    />
                    {projectTouched?.name && projectErrors?.name && (
                      <p className="text-red-500 text-xs">
                        {projectErrors.name}
                      </p>
                    )}
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-600">
                      Technologies Used
                    </label>
                    <input
                      type="text"
                      name={`projects.${i}.technologies`}
                      value={(project.technologies || []).join(",")}
                      onChange={(e) => {
                        const value = e.target.value;

                        setFieldValue(
                          `projects.${i}.technologies`,
                          value.split(","),
                        );
                      }}
                      onBlur={(e) => {
                        const value = e.target.value;

                        const arrayValue = value
                          .split(",")
                          .map((item) => item.trim())
                          // remove empty or falsy value from arr
                          .filter(Boolean);

                        setFieldValue(`projects.${i}.technologies`, arrayValue);
                      }}
                      placeholder="React, TypeScript, Tailwind CSS"
                      className="
                        w-full px-4 py-2.5 rounded-xl
                        border border-gray-200
                        focus:border-violet-500
                        focus:ring-2 focus:ring-violet-200
                        focus:outline-none
                        transition
                      "
                    />
                    {projectTouched?.technologies &&
                      projectErrors?.technologies && (
                        <p className="text-red-500 text-xs">
                          {projectErrors.technologies}
                        </p>
                      )}
                  </div>

                  {/* Live + GitHub Links */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-sm font-medium text-gray-600">
                        Live URL
                      </label>
                      <input
                        type="text"
                        name={`projects.${i}.liveUrl`}
                        value={project.liveUrl}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="https://yourproject.com"
                        className="
                          px-4 py-2.5 rounded-xl
                          border border-gray-200
                          focus:border-violet-500
                          focus:ring-2 focus:ring-violet-200
                          focus:outline-none
                          transition
                        "
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-sm font-medium text-gray-600">
                        GitHub URL
                      </label>
                      <input
                        type="text"
                        name={`projects.${i}.githubUrl`}
                        value={project.githubUrl}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="https://github.com/username/project"
                        className="
                          px-4 py-2.5 rounded-xl
                          border border-gray-200
                          focus:border-violet-500
                          focus:ring-2 focus:ring-violet-200
                          focus:outline-none
                          transition
                        "
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div className="flex flex-col gap-1">
                    {/* Description Bullets */}
                    <div className="flex flex-col gap-3">
                      <div className="flex justify-between items-center">
                        <label className="text-sm font-medium text-gray-600">
                          Description (Bullet Points)
                        </label>

                        <button
                          type="button"
                          onClick={() => handleGenerateDescription(i)}
                          disabled={loadingIndex === i}
                          className="text-xs font-semibold text-violet-600 hover:text-purple-700 transition"
                        >
                          {loadingIndex === i
                            ? "Generating..."
                            : "✨ Generate with AI"}
                        </button>
                      </div>

                      {project.description.map((bullet, bulletIndex) => (
                        <div
                          key={bulletIndex}
                          className="flex items-center gap-2"
                        >
                          <input
                            type="text"
                            value={bullet}
                            onChange={(e) =>
                              setFieldValue(
                                `projects.${i}.description.${bulletIndex}`,
                                e.target.value,
                              )
                            }
                            className="flex-1 px-4 py-2 rounded-xl border border-gray-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
                          />

                          {project.description.length > 1 && (
                            <button
                              type="button"
                              onClick={() => {
                                const updated = [...project.description];
                                updated.splice(bulletIndex, 1);
                                setFieldValue(
                                  `projects.${i}.description`,
                                  updated,
                                );
                              }}
                              className="text-red-500 hover:text-red-600 text-sm font-bold px-2"
                            >
                              ✕
                            </button>
                          )}
                        </div>
                      ))}

                      {/* Add bullet */}
                      <button
                        type="button"
                        onClick={() =>
                          setFieldValue(`projects.${i}.description`, [
                            ...project.description,
                            "",
                          ])
                        }
                        className="text-xs text-violet-500 hover:text-violet-700 text-left"
                      >
                        + Add Bullet
                      </button>
                    </div>
                    {projectTouched?.description &&
                      projectErrors?.description && (
                        <p className="text-red-500 text-xs">
                          {projectErrors.description}
                        </p>
                      )}
                  </div>
                </div>
              );
            })}

            {/* Add Button */}
            <button
              type="button"
              onClick={() =>
                push({
                  name: "",
                  technologies: [],
                  githubUrl: "",
                  liveUrl: "",
                  description: [""],
                })
              }
              className="
                px-6 py-3 rounded-xl font-semibold text-white
                bg-gradient-to-r from-violet-500 to-purple-600
                shadow-md
                hover:shadow-xl hover:scale-[1.02]
                transition-all duration-200
              "
            >
              + Add Project
            </button>
          </div>
        )}
      </FieldArray>
    </div>
  );
};

export default ProjectsStep;
