import * as Yup from "yup";

export const resumeValidationSchema = Yup.object({
  personalInfo: Yup.object({
    fullName: Yup.string()
      .min(2, "Full name must be at least 2 characters")
      .required("Full name is required"),
    targetRole: Yup.string()
      .min(2, "Target role must be at least 2 characters")
      .required("Target role is required"),
    headline: Yup.string(),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),

    phone: Yup.string()
      .matches(/^(\+?\d{1,3}[- ]?)?\d{10}$/, "Enter valid phone number")
      .required("Phone is required"),

    location: Yup.string(),

    linkedin: Yup.string().url("Must be valid URL"),

    github: Yup.string().url("Must be valid URL"),
  }),
  summary: Yup.string()
    .min(50, "Summary should be at least 50 characters")
    .nullable()
    .notRequired(),

  experience: Yup.array()
    .of(
      Yup.object({
        company: Yup.string().required("Company is required"),
        position: Yup.string().required("Position is required"),
        location: Yup.string().required("Location is required"),

        startDate: Yup.string().required("Start date is required"),

        current: Yup.boolean(),
        endDate: Yup.string().when("current", {
          is: false,
          then: (schema) =>
            schema
              .required("End date is required")
              .test(
                "is-after-start",
                "End date cannot be before start date",
                function (value) {
                  const { startDate } = this.parent;

                  if (!startDate || !value) return true;

                  return new Date(value) >= new Date(startDate);
                },
              ),
          otherwise: (schema) => schema.notRequired(),
        }),
        description: Yup.string()
          .min(20, "Description must be at least 20 characters")
          .required("Description is required"),
      }),
    )
    .min(1, "At least one experience is required"),
  education: Yup.array().of(
    Yup.object({
      institution: Yup.string().required("Institution is required"),
      location: Yup.string().required("Location is required"),
      degree: Yup.string().required("Degree is required"),
      fieldOfStudy: Yup.string(),
      current: Yup.boolean(),
      startDate: Yup.string().required("Start date is required"),
      endDate: Yup.string().when("current", {
        is: false,
        then: (schema) =>
          schema
            .required("End date is required")
            .test(
              "is-after-start",
              "End date must be after start date",
              function (value) {
                const { startDate } = this.parent;
                if (!startDate || !value) return true;
                return new Date(value) > new Date(startDate);
              },
            ),
        otherwise: (schema) => schema.notRequired(),
      }),
      description: Yup.string(),
    }),
  ),
  projects: Yup.array().of(
    Yup.object({
      name: Yup.string().required("Project name is required"),
      technologies: Yup.array()
        .of(Yup.string().trim())
        .min(1, "At least one technology is required")
        .required("Technologies are required"),
      githubUrl: Yup.string().url("Must be valid URL").nullable().notRequired(),
      liveUrl: Yup.string().url("Must be valid URL").nullable().notRequired(),
      description: Yup.array()
        .of(Yup.string().trim().min(5, "Bullet too short"))
        .min(1, "At least one bullet is required"),
    }),
  ),
  skills: Yup.array()
    .of(Yup.string().required())
    .min(1, "At least one skill is required"),
  achievements: Yup.array().of(Yup.string().trim()),
  certificates: Yup.array()
    .of(
      Yup.object({
        name: Yup.string().trim(),
        issuer: Yup.string().trim(),
        issueDate: Yup.string().trim(),
        credentialUrl: Yup.string()
          .trim()
          .url("Enter a valid URL")
          .notRequired(),
      }).test(
        "complete-certificate",
        "Please fill name, issuer and year if adding a certificate",
        (value) => {
          if (!value) return true;

          const { name, issuer, issueDate, credentialUrl } = value;

          const isEmpty = !name && !issuer && !issueDate && !credentialUrl;

          if (isEmpty) return true; // allow completely empty object

          return !!(name && issuer && issueDate); // require core fields
        },
      ),
    )
    .min(0),

  languages: Yup.array()
    .of(
      Yup.object({
        name: Yup.string().required("Language name is required"),
        level: Yup.string()
          .oneOf(["Basic", "Intermediate", "Professional", "Native"])
          .required("Level is required"),
      }),
    )
    .min(1, "At least one language is required"),
});
