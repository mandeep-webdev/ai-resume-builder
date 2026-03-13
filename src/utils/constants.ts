import EducationStep from "../components/form/steps/EducationStep";
import ExperienceStep from "../components/form/steps/ExperienceStep";
import PersonalInfoStep from "../components/form/steps/PersonalInfoStep";
import ReviewStep from "../components/form/steps/ReviewStep";
import SkillsStep from "../components/form/steps/SkillsStep";
import ProjectsStep from "../components/form/steps/ProjectsStep";
import AchievementsStep from "../components/form/steps/AchievementsStep";
import LanguagesStep from "../components/form/steps/LanguagesStep";
import CertificatesStep from "../components/form/steps/CertificatesStep";
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
    label: "Projects",
    component: ProjectsStep,
  },
  {
    id: 4,
    label: "Skills",
    component: SkillsStep,
  },
  {
    id: 5,
    label: "Achievements",
    component: AchievementsStep,
  },
  {
    id: 6,
    label: "Certificates",
    component: CertificatesStep,
  },
  {
    id: 7,
    label: "Languages",
    component: LanguagesStep,
  },
  {
    id: 8,
    label: "Review",
    component: ReviewStep,
  },
];
