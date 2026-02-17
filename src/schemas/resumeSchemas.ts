import * as Yup from "yup";

export const resumeValidationSchema = Yup.object({
  personalInfo: Yup.object({
    fullName: Yup.string().required("Full name is required"),
    headline: Yup.string(),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),

    phone: Yup.string().required("Phone is required"),

    location: Yup.string(),

    linkedin: Yup.string().url("Must be valid URL"),

    github: Yup.string().url("Must be valid URL"),
  }),
  education: Yup.array(),
  experience: Yup.array(),
  skills: Yup.array(),
});
