import React from "react";
import { useFormikContext } from "formik";
import type { ResumeFormValues } from "../../../types/resume";

const PersonalInfoStep = () => {
  const { values, errors, touched, handleChange, handleBlur } =
    useFormikContext<ResumeFormValues>();
  const personalErrors = errors.personalInfo;
  const personalTouched = touched.personalInfo;

  return (
    <div className="space-y-1 ">
      <h2 className="text-xl font-semibold mb-4 text-[#1b1b5f]">
        Personal Information
      </h2>
      <div className="flex flex-col gap-1">
        <label className=" text-sm font-medium">Full Name</label>
        <input
          type="text"
          name="personalInfo.fullName"
          value={values.personalInfo.fullName}
          onChange={handleChange}
          onBlur={handleBlur}
          className="w-full px-3 py-2 rounded-lg bg-white border border-gray-300 shadow-sm focus:outline-none  focus:border-[#1b1b5f] transition"
        />
        {personalTouched?.fullName && personalErrors?.fullName && (
          <p className="text-red-500 text-sm">{personalErrors.fullName}</p>
        )}
      </div>
      {/* Headline */}
      <div className="flex flex-col gap-1">
        <label className=" text-sm font-medium">Headline</label>
        <input
          type="text"
          name="personalInfo.headline"
          value={values.personalInfo.headline}
          onChange={handleChange}
          onBlur={handleBlur}
          className="w-full px-3 py-2 rounded-lg bg-white border border-gray-300 shadow-sm focus:outline-none  focus:border-[#1b1b5f] transition"
        />
        {personalTouched?.headline && personalErrors?.headline && (
          <p className="text-red-500 text-sm">{personalErrors.headline}</p>
        )}
      </div>
      {/* email */}
      <div className="flex flex-col gap-1">
        <label className=" text-sm font-medium">Email</label>
        <input
          type="email"
          name="personalInfo.email"
          value={values.personalInfo.email}
          onChange={handleChange}
          onBlur={handleBlur}
          className="w-full px-3 py-2 rounded-lg bg-white border border-gray-300 shadow-sm focus:outline-none  focus:border-[#1b1b5f] transition"
        />
        {personalTouched?.email && personalErrors?.email && (
          <p className="text-red-500 text-sm">{personalErrors.email}</p>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* phone */}
        <div className="flex flex-col gap-1">
          <label className=" text-sm font-medium">Phone</label>
          <input
            type="text"
            name="personalInfo.phone"
            value={values.personalInfo.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full px-3 py-2 rounded-lg bg-white border border-gray-300 shadow-sm focus:outline-none  focus:border-[#1b1b5f] transition"
          />
          {personalTouched?.phone && personalErrors?.phone && (
            <p className="text-red-500 text-sm">{personalErrors.phone}</p>
          )}
        </div>
        {/* Location */}
        <div className="flex flex-col gap-1">
          <label className=" text-sm font-medium">Location</label>
          <input
            type="text"
            name="personalInfo.location"
            value={values.personalInfo.location}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full px-3 py-2 rounded-lg bg-white border border-gray-300 shadow-sm focus:outline-none  focus:border-[#1b1b5f] transition"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Linkedin */}
        <div className="flex flex-col gap-1">
          <label className=" text-sm font-medium">LinkedIn</label>
          <input
            type="text"
            name="personalInfo.linkedin"
            value={values.personalInfo.linkedin}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full px-3 py-2 rounded-lg bg-white border border-gray-300 shadow-sm focus:outline-none  focus:border-[#1b1b5f] transition"
          />
          {personalTouched?.linkedin && personalErrors?.linkedin && (
            <p className="text-red-500 text-sm">{personalErrors.linkedin}</p>
          )}
        </div>
        {/* github */}
        <div className="flex flex-col gap-1">
          <label className=" text-sm font-medium">Github</label>
          <input
            type="text"
            name="personalInfo.github"
            value={values.personalInfo.github}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full px-3 py-2 rounded-lg bg-white border border-gray-300 shadow-sm focus:outline-none  focus:border-[#1b1b5f] transition"
          />
          {personalTouched?.github && personalErrors?.github && (
            <p className="text-red-500 text-sm">{personalErrors.github}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoStep;
