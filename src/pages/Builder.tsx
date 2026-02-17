import { useState } from "react";
import ResumePreview from "../components/resume/ResumePreview";
import { STEPS } from "../utils/constants";
import FormNavigation from "../components/form/FormNavigation";
import { Formik, Form } from "formik";
import type { ResumeFormValues } from "../types/resume";
import { resumeValidationSchema } from "../schemas/resumeSchemas";

const Builder = () => {
  const [activeStep, setActiveStep] = useState(0);
  const currentStep = STEPS[activeStep];
  const StepComponent = currentStep.component;
  const totalSteps = STEPS.length;

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prev) => prev - 1);
    }
  };
  const stepFieldsMap: (keyof ResumeFormValues)[] = [
    "personalInfo",
    "experience",
    "education",
    "skills",
  ];

  //   main Form State
  const initialValues: ResumeFormValues = {
    personalInfo: {
      fullName: "",
      headline: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      github: "",
    },
    experience: [],
    education: [],
    skills: [],
  };

  return (
    <div className=" flex min-h-screen">
      {/* Left Section Form */}
      <div className="w-1/2 overflow-y-auto p-6 bg-[#dedbee] text-[#1b1b5f]">
        <Formik
          initialValues={initialValues}
          validationSchema={resumeValidationSchema}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({ validateForm }) => {
            const handleNext = async () => {
              const errors = await validateForm();
              console.log("FULL ERRORS:", errors);
              const currentStepKey = stepFieldsMap[activeStep];
              const stepErrors = errors[currentStepKey];
              if (!stepErrors || Object.keys(stepErrors).length === 0) {
                if (activeStep < totalSteps - 1) {
                  setActiveStep((prev) => prev + 1);
                }
              }
            };
            return (
              <Form>
                <StepComponent />
                <FormNavigation
                  activeStep={activeStep}
                  totalSteps={totalSteps}
                  onBack={handleBack}
                  onNext={handleNext}
                />
              </Form>
            );
          }}
        </Formik>
      </div>
      {/* Right Section Resume Preview */}
      <div className="w-1/2 border-l p-6">
        <ResumePreview />
      </div>
    </div>
  );
};

export default Builder;
