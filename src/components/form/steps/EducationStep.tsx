import React from "react";
import { FieldArray, useFormikContext, getIn } from "formik";
import type { ResumeFormValues } from "../../../types/resume";

const EducationStep = () => {
  const { values, errors, touched, handleChange, handleBlur, setFieldValue } =
    useFormikContext<ResumeFormValues>();
  return (
    <div className="space-y-10">
      {/* Section Header */}
      <div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
          Education
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          Add your academic background and qualifications.
        </p>
      </div>

      <FieldArray name="education">
        {({ push, remove }) => (
          <div className="space-y-8">
            {values.education.map((edu, i) => {
              const eduErrors = getIn(errors, `education.${i}`);
              const eduTouched = getIn(touched, `education.${i}`);

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
                      Education {i + 1}
                    </h3>

                    {values.education.length > 1 && (
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

                  {/* Institution + Location */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Institution */}
                    <div className="flex flex-col gap-1">
                      <label className="text-sm font-medium text-gray-600">
                        Institution
                      </label>
                      <input
                        type="text"
                        name={`education.${i}.institution`}
                        value={edu.institution}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="w-full px-4 py-2.5 rounded-xl
                        border border-gray-200 focus:border-violet-500
                        focus:ring-2 focus:ring-violet-200 focus:outline-none
                        transition"
                      />
                      {eduTouched?.institution && eduErrors?.institution && (
                        <p className="text-red-500 text-xs">
                          {eduErrors.institution}
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
                        name={`education.${i}.location`}
                        value={edu.location}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="e.g. Chandigarh, India"
                        className="w-full px-4 py-2.5 rounded-xl
                        border border-gray-200
                       focus:border-violet-500 focus:ring-2 focus:ring-violet-200
                        focus:outline-none transition"
                      />
                      {eduTouched?.location && eduErrors?.location && (
                        <p className="text-red-500 text-xs">
                          {eduErrors.location}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Degree + Field */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-sm font-medium text-gray-600">
                        Degree
                      </label>
                      <input
                        type="text"
                        name={`education.${i}.degree`}
                        value={edu.degree}
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
                      {eduTouched?.degree && eduErrors?.degree && (
                        <p className="text-red-500 text-xs">
                          {eduErrors.degree}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-sm font-medium text-gray-600">
                        Field of Study
                      </label>
                      <input
                        type="text"
                        name={`education.${i}.fieldOfStudy`}
                        value={edu.fieldOfStudy}
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
                      {eduTouched?.fieldOfStudy && eduErrors?.fieldOfStudy && (
                        <p className="text-red-500 text-xs">
                          {eduErrors.fieldOfStudy}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Dates */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-sm font-medium text-gray-600">
                        Start Date
                      </label>
                      <input
                        type="date"
                        name={`education.${i}.startDate`}
                        value={edu.startDate}
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
                      {eduTouched?.startDate && eduErrors?.startDate && (
                        <p className="text-red-500 text-xs">
                          {eduErrors.startDate}
                        </p>
                      )}
                    </div>

                    {!edu.current && (
                      <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-600">
                          End Date
                        </label>
                        <input
                          type="date"
                          name={`education.${i}.endDate`}
                          value={edu.endDate}
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
                        {eduTouched?.endDate && eduErrors?.endDate && (
                          <p className="text-red-500 text-xs">
                            {eduErrors.endDate}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Current Checkbox */}
                  <div className="flex items-center gap-3 mt-2">
                    <input
                      type="checkbox"
                      checked={edu.current}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setFieldValue(`education.${i}.current`, checked);
                        if (checked) {
                          setFieldValue(`education.${i}.endDate`, "");
                        }
                      }}
                      className="w-4 h-4 accent-violet-600"
                    />
                    <label className="text-sm text-gray-600">
                      Currently Studying Here
                    </label>
                  </div>

                  {/* Description */}
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-600">
                      Description
                    </label>
                    <textarea
                      name={`education.${i}.description`}
                      value={edu.description}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      rows={3}
                      className="
                        w-full px-4 py-2.5 rounded-xl
                        border border-gray-200
                        focus:border-violet-500
                        focus:ring-2 focus:ring-violet-200
                        focus:outline-none
                        transition
                        resize-none
                      "
                    />
                  </div>
                </div>
              );
            })}

            {/* Add Button */}
            <button
              type="button"
              onClick={() =>
                push({
                  institution: "",
                  location: "",
                  degree: "",
                  fieldOfStudy: "",
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
              + Add Education
            </button>
          </div>
        )}
      </FieldArray>
    </div>
  );
};

export default EducationStep;
