import React from "react";
import { useFormikContext } from "formik";
import type { ResumeFormValues } from "../../../types/resume";

const PersonalInfoStep = () => {
  const { values, errors, touched, handleChange, handleBlur } =
    useFormikContext<ResumeFormValues>();
  const personalErrors = errors.personalInfo;
  const personalTouched = touched.personalInfo;

  return (
    <div className="space-y-10">
      {/* PERSONAL INFO SECTION */}
      <div className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-violet-100 space-y-8">
        {/* Section Header */}
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
            Personal Information
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Tell us about yourself so employers can reach you.
          </p>
        </div>

        {/* Full Name */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            name="personalInfo.fullName"
            value={values.personalInfo.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white
          focus:outline-none focus:ring-2 focus:ring-violet-400
          focus:border-violet-400 transition-all"
          />
          {personalTouched?.fullName && personalErrors?.fullName && (
            <p className="text-rose-500 text-sm">{personalErrors.fullName}</p>
          )}
        </div>
        {/* Target Role */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">
            Target Role (Job You’re Applying For)
          </label>
          <input
            type="text"
            name="personalInfo.targetRole"
            value={values.personalInfo.targetRole}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="e.g. Frontend Developer"
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white
    focus:outline-none focus:ring-2 focus:ring-violet-400
    focus:border-violet-400 transition-all"
          />
          {personalTouched?.targetRole && personalErrors?.targetRole && (
            <p className="text-rose-500 text-sm">{personalErrors.targetRole}</p>
          )}
        </div>
        {/* Headline */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Headline</label>
          <input
            type="text"
            name="personalInfo.headline"
            value={values.personalInfo.headline}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white
          focus:outline-none focus:ring-2 focus:ring-violet-400
          focus:border-violet-400 transition-all"
          />
          {personalTouched?.headline && personalErrors?.headline && (
            <p className="text-rose-500 text-sm">{personalErrors.headline}</p>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="personalInfo.email"
            placeholder="eg. mail@example.com"
            value={values.personalInfo.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white
          focus:outline-none focus:ring-2 focus:ring-violet-400
          focus:border-violet-400 transition-all"
          />
          {personalTouched?.email && personalErrors?.email && (
            <p className="text-rose-500 text-sm">{personalErrors.email}</p>
          )}
        </div>

        {/* Phone + Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Phone</label>
            <input
              type="text"
              name="personalInfo.phone"
              value={values.personalInfo.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white
            focus:outline-none focus:ring-2 focus:ring-violet-400
            focus:border-violet-400 transition-all"
            />
            {personalTouched?.phone && personalErrors?.phone && (
              <p className="text-rose-500 text-sm">{personalErrors.phone}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              name="personalInfo.location"
              value={values.personalInfo.location}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white
            focus:outline-none focus:ring-2 focus:ring-violet-400
            focus:border-violet-400 transition-all"
            />
          </div>
        </div>

        {/* LinkedIn + Github */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              LinkedIn
            </label>
            <input
              type="text"
              name="personalInfo.linkedin"
              value={values.personalInfo.linkedin}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white
            focus:outline-none focus:ring-2 focus:ring-violet-400
            focus:border-violet-400 transition-all"
            />
            {personalTouched?.linkedin && personalErrors?.linkedin && (
              <p className="text-rose-500 text-sm">{personalErrors.linkedin}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Github</label>
            <input
              type="text"
              name="personalInfo.github"
              value={values.personalInfo.github}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white
            focus:outline-none focus:ring-2 focus:ring-violet-400
            focus:border-violet-400 transition-all"
            />
            {personalTouched?.github && personalErrors?.github && (
              <p className="text-rose-500 text-sm">{personalErrors.github}</p>
            )}
          </div>
        </div>
      </div>

      {/* SUMMARY SECTION */}
      <div className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-violet-100 space-y-6">
        {/* Section Header */}
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
            Professional Summary
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Write a short introduction that highlights your experience and
            strengths.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Summary</label>

          <textarea
            name="summary"
            value={values.summary}
            onChange={handleChange}
            onBlur={handleBlur}
            rows={5}
            placeholder="Frontend Developer with 2+ years of experience building scalable React applications..."
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white resize-none
      focus:outline-none focus:ring-2 focus:ring-violet-400
      focus:border-violet-400 transition-all"
          />

          {touched.summary && errors.summary && (
            <p className="text-rose-500 text-sm">{errors.summary}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoStep;
