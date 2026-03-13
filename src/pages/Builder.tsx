import { useState } from "react";
import * as Yup from "yup";
import ResumePreview from "../components/resume/ResumePreview";
import { STEPS } from "../utils/constants";
import FormNavigation from "../components/form/FormNavigation";
import { Formik, Form } from "formik";
import type { ResumeFormValues } from "../types/resume";
import { resumeValidationSchema } from "../schemas/resumeSchemas";
import Navbar from "../components/Navbar";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import type { TemplateType } from "../types/resume";
import Stepper from "../components/Stepper";
import html2pdf from "html2pdf.js";
import { sanitizeAIResume } from "../utils/sanitizeAIResume";

const handleDownload = async (values: ResumeFormValues) => {
  const element = document.getElementById("resume-pdf");

  if (!element) return;

  const opt = {
    margin: 0,
    filename: `${values.personalInfo.fullName || "resume"}.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: {
      scale: 3,
      useCORS: true,
      scrollY: 0,
    },
    jsPDF: {
      unit: "mm",
      format: "a4",
      orientation: "portrait",
    },
    pagebreak: {
      mode: ["css", "legacy"],
    },
  };

  await html2pdf().set(opt).from(element).save();
};
const Builder = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const currentStep = STEPS[activeStep];
  const StepComponent = currentStep.component;
  const totalSteps = STEPS.length;
  const { tempId } = useParams<{ tempId: string }>();

  const location = useLocation();
  const rawParsedData = location.state?.parsedData;
  console.log(rawParsedData);
  const parsedData = rawParsedData ? sanitizeAIResume(rawParsedData) : null;
  console.log("parsedData", parsedData);
  const isValidTemplate = (value: any): value is TemplateType => {
    return ["classic", "modern", "sidebar"].includes(value);
  };

  const selectedTemplate: TemplateType = isValidTemplate(tempId)
    ? tempId
    : "classic";

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prev) => prev - 1);
    }
  };
  const markAllFieldsTouched = (obj: any): any => {
    if (Array.isArray(obj)) {
      return obj.map((item) => markAllFieldsTouched(item));
    }

    if (typeof obj === "object" && obj !== null) {
      return Object.keys(obj).reduce((acc, key) => {
        acc[key] = markAllFieldsTouched(obj[key]);
        return acc;
      }, {} as any);
    }

    return true;
  };

  const stepFieldsMap: (keyof ResumeFormValues | null)[] = [
    "personalInfo",
    "experience",
    "education",
    "projects",
    "skills",
    "achievements",
    "certificates",
    "languages",
    null, // Review step has no validation
  ];

  const defaultValues: ResumeFormValues = {
    template: selectedTemplate,
    theme: "blue",
    personalInfo: {
      fullName: "",
      targetRole: "",
      headline: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      github: "",
    },
    summary: "",
    experience: [
      {
        company: "",
        position: "",
        location: "",
        startDate: "",
        endDate: "",
        current: false,
        description: "",
      },
    ],
    education: [
      {
        institution: "",
        location: "",
        degree: "",
        fieldOfStudy: "",
        startDate: "",
        endDate: "",
        current: false,
        description: "",
      },
    ],
    projects: [
      {
        name: "",
        technologies: [],
        githubUrl: "",
        liveUrl: "",
        description: [],
      },
    ],
    skills: [],
    achievements: [],
    certificates: [],
    languages: [],
  };
  //   main Form State
  const initialValues: ResumeFormValues = {
    ...defaultValues,

    template: selectedTemplate,

    personalInfo: {
      ...defaultValues.personalInfo,
      ...(parsedData?.personalInfo || {}),
    },

    summary: parsedData?.summary || "",

    experience:
      parsedData?.experience && parsedData.experience.length > 0
        ? parsedData.experience
        : defaultValues.experience,

    education:
      parsedData?.education && parsedData.education.length > 0
        ? parsedData.education
        : defaultValues.education,

    projects:
      parsedData?.projects && parsedData.projects.length > 0
        ? parsedData.projects
        : defaultValues.projects,

    skills: parsedData?.skills || defaultValues.skills,

    achievements: parsedData?.achievements || defaultValues.achievements,

    certificates: parsedData?.certificates || defaultValues.certificates,

    languages: parsedData?.languages || defaultValues.languages,
  };
  return (
    <div className="min-h-screen bg-violet-50">
      <Navbar />
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={resumeValidationSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ validateForm, setTouched, values }) => {
          const handleNext = async () => {
            const isLastStep = activeStep === totalSteps - 1;
            if (isLastStep) {
              await handleDownload(values);
              setIsCompleted(true);
              return;
            }

            const currentStepKey = stepFieldsMap[activeStep];

            // Validate the whole form
            const errors = await validateForm();

            // Only block if there are errors in the current step
            if (currentStepKey && errors[currentStepKey]) {
              setTouched(
                {
                  [currentStepKey]: markAllFieldsTouched(
                    values[currentStepKey],
                  ),
                },
                false,
              );
              return; // stop if validation fails
            }

            // No errors, go to next step
            setActiveStep((prev) => prev + 1);
          };

          return (
            <div className="px-8 py-10">
              <div className="max-w-7xl mx-auto mb-10">
                <Stepper
                  steps={STEPS}
                  activeStep={isCompleted ? totalSteps : activeStep}
                  onStepClick={(index) => {
                    setIsCompleted(false);
                    setActiveStep(index);
                  }}
                />
              </div>

              <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">
                {/* Left Section Form */}
                <div className=" bg-white rounded-3xl shadow-lg p-8">
                  <Form>
                    <StepComponent />
                    <FormNavigation
                      activeStep={activeStep}
                      totalSteps={totalSteps}
                      onBack={handleBack}
                      onNext={handleNext}
                    />
                  </Form>
                </div>
                {/*Right Section Resume Preview  */}

                <div className="sticky top-24 self-start">
                  <div
                    id="resume-preview"
                    className="bg-white rounded-3xl shadow-xl p-6 w-full"
                  >
                    <ResumePreview templateId={values.template} data={values} />
                  </div>
                </div>

                {/* Hidden PDF Version */}
                <div className="hidden">
                  <div
                    id="resume-pdf"
                    style={{
                      width: "794px",
                      minHeight: "1123px",
                      padding: "40px",
                      background: "white",
                    }}
                  >
                    <ResumePreview templateId={values.template} data={values} />
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </Formik>
    </div>
  );
};

export default Builder;
