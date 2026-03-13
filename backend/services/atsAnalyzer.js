import { extractResumeText } from "../utils/extractResumeText.js";
import { techKeywords } from "../utils/techKeywords.js";

const normalizeText = (text) => {
  return text
    .toLowerCase()
    .replace(/type\s+script/g, "typescript")
    .replace(/java\s+script/g, "javascript")
    .replace(/mongo\s+db/g, "mongodb")
    .replace(/git\s+hub/g, "github")
    .replace(/rest\s+apis?/g, "api")
    .replace(/\s+/g, " ")
    .trim();
};
export const analyzeATS = (resumeText, jdText) => {
  const resume = normalizeText(extractResumeText(resumeText));
  const jd = normalizeText(jdText);

  const jdSkills = techKeywords.filter((skill) => jd.includes(skill));

  // matched skills
  const matchedKeywords = jdSkills.filter((skill) => resume.includes(skill));

  // missing skills
  const missingKeywords = jdSkills.filter((skill) => !resume.includes(skill));

  // ATS score
  const atsScore =
    jdSkills.length === 0
      ? 0
      : Math.round((matchedKeywords.length / jdSkills.length) * 100);

  // suggestions
  const suggestions = missingKeywords.map((k) => {
    if (["react", "redux", "typescript"].includes(k)) {
      return {
        keyword: k,
        type: "skill",
        message: `Add "${k}" to your skills section`,
      };
    }

    if (["api", "graphql"].includes(k)) {
      return {
        keyword: k,
        type: "project",
        message: `Mention "${k}" in one of your projects`,
      };
    }

    return {
      keyword: k,
      type: "experience",
      message: `Add "${k}" experience in your work history`,
    };
  });

  return {
    atsScore,
    matchedKeywords,
    missingKeywords,
    suggestions,
  };
};
