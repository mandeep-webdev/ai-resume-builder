export const extractResumeText = (resumeData) => {
  let textParts = [];

  // SUMMARY
  if (resumeData.summary) {
    textParts.push(resumeData.summary);
  }

  // SKILLS
  if (resumeData.skills && Array.isArray(resumeData.skills)) {
    textParts.push(resumeData.skills.join(" "));
  }

  // EXPERIENCE
  if (resumeData.experience) {
    resumeData.experience.forEach((exp) => {
      if (exp.position) textParts.push(exp.position);
      if (exp.company) textParts.push(exp.company);
      if (exp.description) textParts.push(exp.description);
    });
  }

  // PROJECTS
  if (resumeData.projects) {
    resumeData.projects.forEach((project) => {
      if (project.name) textParts.push(project.name);

      if (Array.isArray(project.description)) {
        textParts.push(project.description.join(" "));
      } else if (project.description) {
        textParts.push(project.description);
      }

      if (Array.isArray(project.technologies)) {
        textParts.push(project.technologies.join(" "));
      }
    });
  }

  // EDUCATION
  if (resumeData.education) {
    resumeData.education.forEach((edu) => {
      if (edu.degree) textParts.push(edu.degree);
      if (edu.institution) textParts.push(edu.institution);
    });
  }

  return textParts.join(" ").toLowerCase();
};
