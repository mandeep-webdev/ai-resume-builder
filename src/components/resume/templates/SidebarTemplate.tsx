import type { ResumeFormValues } from "../../../types/resume";
import { Mail, Phone, MapPin } from "lucide-react";

type Props = {
  data: ResumeFormValues;
};

/* ---------- helper ---------- */

const requiredValue = (value: string | undefined, placeholder: string) => {
  if (!value || value.trim() === "") return placeholder;
  return value;
};

/* ---------- sidebar section ---------- */

function SidebarSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="uppercase text-sm tracking-wider mb-3 border-b border-gray-400 pb-2">
        {title}
      </h3>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

/* ---------- main section ---------- */

function MainSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="text-lg font-semibold border-b border-gray-300 pb-2 mb-4">
        {title}
      </h3>
      {children}
    </div>
  );
}

/* ---------- experience item ---------- */

function ExperienceItem({ job }: { job: any }) {
  const bullets = requiredValue(
    job.description,
    "Add responsibilities and achievements",
  )
    .split("\n")
    .map((line: string) => line.trim())
    .filter(Boolean);

  return (
    <div className="mb-8">
      <div className="flex justify-between">
        <div>
          <h4 className="font-semibold text-lg">
            {requiredValue(job.position, "Add role")}
          </h4>

          <p className="text-blue-600 font-medium">
            {requiredValue(job.company, "Add company")}
          </p>
        </div>

        <p className="text-sm text-gray-500">
          {requiredValue(job.startDate, "Start date")} -{" "}
          {job.current ? "Present" : job.endDate || "End date"}
        </p>
      </div>

      <ul className="list-disc ml-5 mt-3 text-sm space-y-1">
        {bullets.map((point: string, i: number) => (
          <li key={i}>{point}</li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- template ---------- */

const SidebarTemplate = ({ data }: Props) => {
  return (
    <div className="w-full h-full flex font-sans">
      {/* LEFT SIDEBAR */}

      <div className="w-1/3 bg-slate-800 text-white p-10 space-y-10">
        {/* NAME (mandatory) */}

        <h1 className="text-3xl font-light tracking-wider">
          {requiredValue(data.personalInfo.fullName, "Your Name")}
        </h1>

        {/* EDUCATION (mandatory fields inside) */}

        {data.education?.length > 0 && (
          <SidebarSection title="Education">
            {data.education.map((edu, i) => (
              <div key={i} className="text-sm space-y-1">
                <p className="font-semibold">
                  {requiredValue(edu.degree, "Add degree")}
                </p>

                {edu.fieldOfStudy && <p>{edu.fieldOfStudy}</p>}

                <p>{requiredValue(edu.institution, "Add institution")}</p>

                <p className="text-gray-300">
                  {requiredValue(edu.startDate, "Start")} -{" "}
                  {edu.current ? "Present" : edu.endDate || "End"}
                </p>
              </div>
            ))}
          </SidebarSection>
        )}

        {/* SKILLS (mandatory) */}

        <SidebarSection title="Skills">
          <p className="text-sm leading-relaxed text-gray-300">
            {data.skills?.length ? data.skills.join(" • ") : "Add skills"}
          </p>
        </SidebarSection>
      </div>

      {/* RIGHT CONTENT */}

      <div className="w-2/3 bg-gray-50 p-12 space-y-10">
        {/* HEADLINE (optional) */}

        {data.personalInfo.headline && (
          <h2 className="text-xl text-blue-600 font-medium mb-1">
            {data.personalInfo.headline}
          </h2>
        )}

        {/* CONTACT (mandatory fields only) */}

        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <span className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-gray-500" />
            {requiredValue(data.personalInfo.email, "Add email")}
          </span>

          <span className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-gray-500" />
            {requiredValue(data.personalInfo.phone, "Add phone")}
          </span>

          {data.personalInfo.location && (
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-500" />
              {data.personalInfo.location}
            </span>
          )}
        </div>

        {/* SUMMARY (optional) */}

        {data.summary && (
          <MainSection title="Summary">
            <p className="text-sm leading-relaxed">{data.summary}</p>
          </MainSection>
        )}

        {/* EXPERIENCE (mandatory) */}

        <MainSection title="Experience">
          {data.experience.map((job, i) => (
            <ExperienceItem key={i} job={job} />
          ))}
        </MainSection>

        {/* PROJECTS (optional) */}

        {data.projects?.length > 0 && (
          <MainSection title="Projects">
            {data.projects.map((project, i) => (
              <div key={i} className="mb-6">
                <h4 className="font-semibold text-lg">{project.name}</h4>

                {project.technologies?.length > 0 && (
                  <p className="text-blue-600 text-sm">
                    {project.technologies.join(", ")}
                  </p>
                )}

                <ul className="list-disc ml-5 mt-2 text-sm space-y-1">
                  {project.description.map((point, j) => (
                    <li key={j}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </MainSection>
        )}

        {/* LANGUAGES (mandatory) */}

        <MainSection title="Languages">
          <div className="grid grid-cols-2 gap-4 text-sm">
            {data.languages?.length ? (
              data.languages.map((lang, i) => (
                <div key={i}>
                  <span className="font-medium">{lang.name}</span>
                  <span className="text-gray-500 ml-2">{lang.level}</span>
                </div>
              ))
            ) : (
              <p>Add language</p>
            )}
          </div>
        </MainSection>
      </div>
    </div>
  );
};

export default SidebarTemplate;
