export const sanitizeAIResume = (data: any) => {
  return {
    personalInfo: {
      fullName: data?.personalInfo?.fullName || "",
      email: data?.personalInfo?.email || "",
      phone: data?.personalInfo?.phone || "",
      linkedin: data?.personalInfo?.linkedin || "",
      github: data?.personalInfo?.github || "",
      targetRole: data?.personalInfo?.targetRole || "",
    },

    skills: Array.isArray(data?.skills)
      ? data.skills.map((s: any) => (typeof s === "string" ? s : s?.name || ""))
      : [],

    experience: Array.isArray(data?.experience)
      ? data.experience.map((exp: any) => ({
          position: exp?.position || "",
          company: exp?.company || "",
          location: exp?.location || "",
          startDate: exp?.startDate || "",
          endDate: exp?.endDate || "",
          description: Array.isArray(exp?.description)
            ? exp.description.join("\n")
            : exp?.description || "",
        }))
      : [],

    education: Array.isArray(data?.education)
      ? data.education.map((edu: any) => ({
          degree: edu?.degree || "",
          institution: edu?.institution || "",
          location: edu?.location || "",
          startDate: edu?.startDate || "",
          endDate: edu?.endDate || "",
        }))
      : [],

    projects: Array.isArray(data?.projects)
      ? data.projects.map((proj: any) => ({
          name: proj?.name || "",
          description: Array.isArray(proj?.description) ? proj.description : [],
          technologies: Array.isArray(proj?.technologies)
            ? proj.technologies
            : [],
          liveLink: proj?.liveLink || "",
          githubLink: proj?.githubLink || "",
        }))
      : [],
  };
};
