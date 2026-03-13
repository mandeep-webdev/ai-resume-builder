import type { ResumeFormValues } from "../../../types/resume";

type Props = {
  data: ResumeFormValues;
};

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-8">
      <h2 className="text-center text-base font-semibold tracking-widest uppercase">
        {title}
      </h2>

      <div className="border-t border-gray-700 mt-2 mb-4" />

      {children}
    </div>
  );
}

const ClassicTemplate = ({ data }: Props) => {
  const formatUrl = (url?: string) => {
    if (!url) return "";
    const trimmed = url.trim();
    if (!trimmed) return "";
    return trimmed.startsWith("http") ? trimmed : `https://${trimmed}`;
  };

  const formatDate = (date?: string) => {
    if (!date) return "";

    const d = new Date(date);

    if (isNaN(d.getTime())) return "";

    return d.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="max-w-[850px] mx-auto bg-white text-black px-16 py-14 font-serif leading-relaxed">
      {/* HEADER */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold uppercase tracking-wide">
          {data.personalInfo.fullName || "YOUR NAME"}
        </h1>

        {data.personalInfo.headline && (
          <p className="mt-1">{data.personalInfo.headline}</p>
        )}

        <p className="text-sm mt-2">
          {data.personalInfo.phone} • {data.personalInfo.email}
          {data.personalInfo.linkedin && (
            <>
              {" • "}
              <a
                href={formatUrl(data.personalInfo.linkedin)}
                target="_blank"
                className="underline"
              >
                LinkedIn
              </a>
            </>
          )}
          {data.personalInfo.location && ` • ${data.personalInfo.location}`}
        </p>
      </div>

      {/* SUMMARY */}
      {data.summary?.trim() && (
        <Section title="Summary">
          <p className="text-sm">{data.summary}</p>
        </Section>
      )}

      {/* EXPERIENCE */}
      <Section title="Experience">
        {data.experience.map((job, i) => (
          <div key={i} className="mb-6">
            {/* Company + Location */}
            <div className="flex justify-between">
              <h3 className="font-semibold">{job.company || "Company Name"}</h3>

              <span className="text-sm">{job.location || "Location"}</span>
            </div>

            {/* Role + Dates */}
            <div className="flex justify-between">
              <p className="text-sm font-medium">
                {job.position || "Position"}
              </p>

              <p className="text-sm">
                {formatDate(job.startDate)} -{" "}
                {job.current ? "Present" : formatDate(job.endDate)}
              </p>
            </div>

            {/* Description */}
            <ul className="text-sm list-disc pl-5 mt-2 space-y-1">
              {Array.isArray(job.description)
                ? job.description.map((line, index) => (
                    <li key={index}>{line}</li>
                  ))
                : job.description
                    ?.split("\n")
                    .map((line) => line.replace(/^[-•*]\s*/, "").trim())
                    .filter(Boolean)
                    .map((line, i) => <li key={i}>{line}</li>)}
            </ul>
          </div>
        ))}
      </Section>

      {/* EDUCATION */}
      {data.education?.length > 0 && (
        <Section title="Education">
          {data.education.map((edu, i) => (
            <div key={i} className="mb-4">
              <div className="flex justify-between">
                <h3 className="font-semibold">
                  {edu.institution || "University"}
                </h3>

                <span className="text-sm">
                  {formatDate(edu.startDate)} -{" "}
                  {edu.current ? "Present" : formatDate(edu.endDate)}
                </span>
              </div>

              <p className="text-sm">
                {edu.degree}
                {edu.fieldOfStudy && `, ${edu.fieldOfStudy}`}
              </p>
            </div>
          ))}
        </Section>
      )}

      {/* ACHIEVEMENTS */}
      {data.achievements?.length > 0 && (
        <Section title="Key Achievements">
          <div className="grid grid-cols-3 gap-6 text-sm">
            {data.achievements.map((ach, i) => (
              <div key={i}>{ach}</div>
            ))}
          </div>
        </Section>
      )}

      {/* PROJECTS */}
      {data.projects?.length > 0 && (
        <Section title="Projects">
          {data.projects.map((project, i) => (
            <div key={i} className="mb-4">
              <div className="flex justify-between">
                <h3 className="font-semibold">{project.name}</h3>

                <div className="text-sm">
                  {project.liveUrl && (
                    <a
                      href={formatUrl(project.liveUrl)}
                      className="underline mr-2"
                      target="_blank"
                    >
                      Live
                    </a>
                  )}

                  {project.githubUrl && (
                    <a
                      href={formatUrl(project.githubUrl)}
                      className="underline"
                      target="_blank"
                    >
                      GitHub
                    </a>
                  )}
                </div>
              </div>

              <p className="text-sm italic">
                {project.technologies?.join(", ")}
              </p>

              <ul className="list-disc pl-5 text-sm mt-1 space-y-1">
                {project.description
                  .map((line) => line.replace(/^[-•*]\s*/, "").trim())
                  .filter(Boolean)
                  .map((line, i) => (
                    <li key={i}>{line}</li>
                  ))}
              </ul>
            </div>
          ))}
        </Section>
      )}

      {/* SKILLS */}
      {data.skills?.length > 0 && (
        <Section title="Skills">
          <p className="text-sm">{data.skills.join(" · ")}</p>
        </Section>
      )}

      {/* LANGUAGES */}
      {data.languages?.length > 0 && (
        <Section title="Languages">
          <div className="text-sm space-y-1">
            {data.languages.map((lang, i) => (
              <p key={i}>
                <span className="font-medium">{lang.name}</span>
                {lang.level && ` — ${lang.level}`}
              </p>
            ))}
          </div>
        </Section>
      )}
    </div>
  );
};

export default ClassicTemplate;
