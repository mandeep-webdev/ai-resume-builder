import React from "react";
import { FieldArray, useFormikContext, getIn } from "formik";
import type { ResumeFormValues } from "../../../types/resume";

const AchievementsStep = () => {
  const { values, errors, touched, handleChange, handleBlur } =
    useFormikContext<ResumeFormValues>();

  return (
    <div className="space-y-10">
      {/* Section Header */}
      <div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
          Achievements
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          Highlight awards, recognitions, rankings, or special accomplishments.
        </p>
      </div>

      <FieldArray name="achievements">
        {({ push, remove }) => (
          <div className="space-y-6">
            {/* Show card ONLY if achievements exist */}
            {values.achievements.length > 0 && (
              <div
                className="
                  bg-white
                  border border-violet-100
                  rounded-2xl
                  flex flex-col
                  p-5 gap-4
                  shadow-md
                  hover:shadow-lg
                  transition-all duration-300
                "
              >
                {values.achievements.map((achievement, i) => {
                  const achievementError = getIn(errors, `achievements.${i}`);
                  const achievementTouched = getIn(
                    touched,
                    `achievements.${i}`,
                  );

                  return (
                    <div key={i}>
                      <div className="flex items-center gap-3">
                        <input
                          type="text"
                          name={`achievements.${i}`}
                          value={achievement}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="e.g., Winner – Hackathon 2024"
                          className="
                            flex-1
                            px-4 py-2.5
                            rounded-xl
                            border border-gray-200
                            focus:border-violet-500
                            focus:ring-2 focus:ring-violet-200
                            focus:outline-none
                            transition
                          "
                        />

                        {values.achievements.length > 0 && (
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
                              text-sm
                              font-semibold
                            "
                          >
                            ✕
                          </button>
                        )}
                      </div>

                      {achievementTouched && achievementError && (
                        <p className="text-red-500 text-xs mt-2">
                          {achievementError}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Add Button */}
            <button
              type="button"
              onClick={() => push("")}
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
              + Add Achievement
            </button>
          </div>
        )}
      </FieldArray>
    </div>
  );
};

export default AchievementsStep;
