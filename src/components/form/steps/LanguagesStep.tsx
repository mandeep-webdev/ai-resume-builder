import React from "react";
import { FieldArray, useFormikContext, getIn } from "formik";
import type { ResumeFormValues } from "../../../types/resume";

const LanguagesStep = () => {
  const { values, errors, touched, handleChange, handleBlur } =
    useFormikContext<ResumeFormValues>();

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
          Languages
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          Add languages you can communicate in.
        </p>
      </div>

      <FieldArray name="languages">
        {({ push, remove }) => (
          <div className="space-y-6">
            {values.languages.map((language, i) => {
              const languageErrors = getIn(errors, `languages.${i}`);
              const languageTouched = getIn(touched, `languages.${i}`);

              return (
                <div
                  key={i}
                  className="
                    bg-white
                    border border-violet-100
                    rounded-2xl
                    p-5
                    shadow-md
                    hover:shadow-lg
                    transition-all duration-300
                    flex flex-col md:flex-row gap-4
                  "
                >
                  {/* Language Name */}
                  <div className="flex-1 flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-600">
                      Language
                    </label>
                    <input
                      type="text"
                      name={`languages.${i}.name`}
                      value={language.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="English"
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

                  {/* Level */}
                  <div className="flex-1 flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-600">
                      Proficiency
                    </label>
                    <select
                      name={`languages.${i}.level`}
                      value={language.level}
                      onChange={handleChange}
                      className="
                        px-4 py-2.5 rounded-xl
                        border border-gray-200
                        focus:border-violet-500
                        focus:ring-2 focus:ring-violet-200
                        focus:outline-none
                        transition
                      "
                    >
                      <option value="Basic">Basic</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Professional">Professional</option>
                      <option value="Native">Native</option>
                    </select>
                  </div>

                  {/* Remove */}
                  {values.languages.length > 1 && (
                    <div className="flex items-end">
                      <button
                        type="button"
                        onClick={() => remove(i)}
                        className="
                          px-3 py-2
                          rounded-xl
                          bg-red-50
                          text-red-500
                          hover:bg-red-100
                          transition
                          text-sm font-semibold
                        "
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Add Button */}
            <button
              type="button"
              onClick={() =>
                push({
                  name: "",
                  level: "Intermediate",
                })
              }
              className="
                px-6 py-3
                rounded-xl
                font-semibold
                text-white
                bg-gradient-to-r from-violet-500 to-purple-600
                shadow-md
                hover:shadow-xl hover:scale-[1.02]
                transition-all duration-200
              "
            >
              + Add Language
            </button>
          </div>
        )}
      </FieldArray>
    </div>
  );
};

export default LanguagesStep;
