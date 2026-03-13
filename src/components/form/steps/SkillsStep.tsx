import React, { useState } from "react";
import { useFormikContext, getIn } from "formik";
import type { ResumeFormValues } from "../../../types/resume";

const SkillsStep = () => {
  const { values, setFieldValue, errors, touched } =
    useFormikContext<ResumeFormValues>();

  const [skillInput, setSkillInput] = useState("");
  const skillsError = getIn(errors, "skills");
  const skillsTouched = getIn(touched, "skills");

  const handleAddSkill = () => {
    const trimmed = skillInput.trim();

    if (!trimmed) return;

    if (!values.skills.includes(trimmed)) {
      setFieldValue("skills", [...values.skills, trimmed]);
    }

    setSkillInput("");
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setFieldValue(
      "skills",
      values.skills.filter((skill) => skill !== skillToRemove),
    );
  };

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
          Skills
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          Add your technical and professional skills.
        </p>
      </div>

      {/* Input Row */}
      <div className="flex gap-3">
        <input
          type="text"
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAddSkill();
            }
          }}
          placeholder="Enter a skill (e.g. React)"
          className="
            flex-1 px-4 py-2.5 rounded-xl
            border border-gray-200
            focus:border-violet-500
            focus:ring-2 focus:ring-violet-200
            focus:outline-none
            transition
          "
        />

        <button
          type="button"
          onClick={handleAddSkill}
          className="
            px-6 py-2.5 rounded-xl font-semibold text-white
            bg-gradient-to-r from-violet-500 to-purple-600
            shadow-md cursor-pointer
            hover:shadow-xl hover:scale-[1.02]
            transition-all duration-200
          "
        >
          Add
        </button>
      </div>
      {/* Error */}
      {skillsTouched && skillsError && (
        <p className="text-red-500 text-sm">{skillsError}</p>
      )}
      {/* Skills Chips */}
      <div className="flex flex-wrap gap-3">
        {values.skills.map((skill, index) => (
          <div
            key={index}
            className="
              flex items-center gap-2
              bg-violet-50
              text-violet-700
              px-4 py-1.5
              rounded-full
              text-sm font-medium
              border border-violet-200
              hover:bg-violet-100
              transition
            "
          >
            <span>{skill}</span>

            <button
              type="button"
              onClick={() => handleRemoveSkill(skill)}
              className="
                text-violet-500
                hover:text-red-500
                text-xs
                transition
                cursor-pointer
              "
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsStep;
