import EducationStep from "../components/form/steps/EducationStep";
import ExperienceStep from "../components/form/steps/ExperienceStep";
import PersonalInfoStep from "../components/form/steps/PersonalInfoStep";
import ReviewStep from "../components/form/steps/ReviewStep";
import SkillsStep from "../components/form/steps/SkillsStep";
import type { Step } from "../types/form";

export const STEPS: Step[] = [
  {
    id: 0,
    label: "Personal Info",
    component: PersonalInfoStep,
  },
  {
    id: 1,
    label: "Work Experience",
    component: ExperienceStep,
  },
  {
    id: 2,
    label: "Education",
    component: EducationStep,
  },
  {
    id: 3,
    label: "Skills",
    component: SkillsStep,
  },
  {
    id: 4,
    label: "Review",
    component: ReviewStep,
  },
];
