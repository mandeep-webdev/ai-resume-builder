import React, { useState } from "react";
import { FieldArray, useFormikContext, getIn } from "formik";
import type { ResumeFormValues } from "../../../types/resume";
import axios from "axios";

const ExperienceStep = () => {
  const [loadingIndex, setLoadingIndex] = useState<number | null>(null);
  const { values, errors, touched, handleChange, handleBlur, setFieldValue } =
    useFormikContext<ResumeFormValues>();

  const handleImproveBullet = async (index: number) => {
    const currentText = values.experience[index].description;
    const selectedRole = values.experience[index].position;

    if (!currentText.trim()) return;

    setLoadingIndex(index);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/improve-bullet`,
        {
          bullet: currentText,
          role: selectedRole,
        },
      );

      console.log("AI Response:", response.data);

      if (response.data.improvedBullet) {
        setFieldValue(
          `experience.${index}.description`,
          response.data.improvedBullet,
        );
      }
    } catch (error: any) {
      console.error("AI Error:", error.response?.data || error.message);
    } finally {
      setLoadingIndex(null);
    }
  };
  return (
    <div className="space-y-10">
      {/* Section Header */}
      <div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
          Work Experience
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          Add your professional journey and achievements.
        </p>
      </div>

      <FieldArray name="experience">
        {({ push, remove }) => (
          <div className="space-y-8">
            {values.experience.map((exp, i) => {
              const expErrors = getIn(errors, `experience.${i}`);
              const expTouched = getIn(touched, `experience.${i}`);

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
                  {/* Experience Label */}
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-violet-700">
                      Experience {i + 1}
                    </h3>

                    {values.experience.length > 1 && (
                      <button
                        type="button"
                        onClick={() => remove(i)}
                        className="
                          text-sm text-red-500
                          hover:text-red-600
                          transition
                        "
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  {/* Company */}
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-600">
                      Company
                    </label>
                    <input
                      type="text"
                      name={`experience.${i}.company`}
                      value={exp.company}
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
                    {expTouched?.company && expErrors?.company && (
                      <p className="text-red-500 text-xs">
                        {expErrors.company}
                      </p>
                    )}
                  </div>
                  {/* Location */}
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-600">
                      Location
                    </label>
                    <input
                      type="text"
                      name={`experience.${i}.location`}
                      value={exp.location}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="e.g. Bangalore, India"
                      className="w-full px-4 py-2.5 rounded-xl
                      border border-gray-200
                      focus:border-violet-500 focus:ring-2 focus:ring-violet-200
                      focus:outline-none transition"
                    />
                    {expTouched?.location && expErrors?.location && (
                      <p className="text-red-500 text-xs">
                        {expErrors.location}
                      </p>
                    )}
                  </div>

                  {/* Position */}
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-600">
                      Position
                    </label>
                    <input
                      type="text"
                      name={`experience.${i}.position`}
                      value={exp.position}
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
                    {expTouched?.position && expErrors?.position && (
                      <p className="text-red-500 text-xs">
                        {expErrors.position}
                      </p>
                    )}
                  </div>

                  {/* Dates */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-sm font-medium text-gray-600">
                        Start Date
                      </label>
                      <input
                        type="date"
                        name={`experience.${i}.startDate`}
                        value={exp.startDate}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="
                          px-4 py-2.5 rounded-xl
                          border border-gray-200
                          focus:border-violet-500
                          focus:ring-2 focus:ring-violet-200
                          focus:outline-none
                          transition
                        "
                      />
                      {expTouched?.startDate && expErrors?.startDate && (
                        <p className="text-red-500 text-xs">
                          {expErrors.startDate}
                        </p>
                      )}
                    </div>

                    {!exp.current && (
                      <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-600">
                          End Date
                        </label>
                        <input
                          type="date"
                          name={`experience.${i}.endDate`}
                          value={exp.endDate}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="
                            px-4 py-2.5 rounded-xl
                            border border-gray-200
                            focus:border-violet-500
                            focus:ring-2 focus:ring-violet-200
                            focus:outline-none
                            transition
                          "
                        />
                        {expTouched?.endDate && expErrors?.endDate && (
                          <p className="text-red-500 text-xs">
                            {expErrors.endDate}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Current */}
                  <div className="flex items-center gap-3 mt-2">
                    <input
                      type="checkbox"
                      name={`experience.${i}.current`}
                      checked={exp.current}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setFieldValue(`experience.${i}.current`, checked);
                        if (checked) {
                          setFieldValue(`experience.${i}.endDate`, "");
                        }
                      }}
                      className="w-4 h-4 accent-violet-600"
                    />
                    <label className="text-sm text-gray-600">
                      Currently Working Here
                    </label>
                  </div>

                  {/* Description */}
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-600">
                      Description
                    </label>
                    <textarea
                      name={`experience.${i}.description`}
                      value={exp.description}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      rows={4}
                      className="
                        px-4 py-2.5 rounded-xl
                        border border-gray-200
                        focus:border-violet-500
                        focus:ring-2 focus:ring-violet-200
                        focus:outline-none
                        transition
                        resize-none
                      "
                    />
                    <button
                      type="button"
                      onClick={() => handleImproveBullet(i)}
                      disabled={loadingIndex === i}
                      className="mt-3 inline-flex items-center gap-2
                       px-4 py-2 rounded-xl text-sm font-semibold
                     bg-violet-50 text-violet-700 border border-violet-200
                      hover:bg-violet-100 transition"
                    >
                      {loadingIndex === i
                        ? "Improving..."
                        : "✨ Improve with AI"}
                    </button>
                    {expTouched?.description && expErrors?.description && (
                      <p className="text-red-500 text-xs">
                        {expErrors.description}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Add Experience Button */}
            <button
              type="button"
              onClick={() =>
                push({
                  company: "",
                  position: "",
                  location: "",
                  startDate: "",
                  endDate: "",
                  current: false,
                  description: "",
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
              + Add Experience
            </button>
          </div>
        )}
      </FieldArray>
    </div>
  );
};

export default ExperienceStep;
