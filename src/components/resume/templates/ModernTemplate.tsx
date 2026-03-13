import type { ResumeFormValues } from "../../../types/resume";
import { Mail, Phone, MapPin } from "lucide-react";

type Props = {
  data: ResumeFormValues;
};

const formatDate = (dateString?: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "";

  return date.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
};

function Header({ data }: { data: any }) {
  return (
    <div>
      <h1 className="text-4xl font-bold text-blue-900">
        {data.fullName || "Your Name"}
      </h1>

      <p className="text-lg text-blue-600 mt-1">
        {data.targetRole || "Add your role"}
      </p>

      <div className="flex flex-wrap gap-8 text-sm text-gray-600 mt-4">
        {data.phone && (
          <span className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-blue-500" />
            {data.phone}
          </span>
        )}

        {data.email && (
          <span className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-blue-500" />
            {data.email}
          </span>
        )}

        {data.location && (
          <span className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-blue-500" />
            {data.location}
          </span>
        )}

        {data.linkedin && <span>{data.linkedin}</span>}
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="text-lg font-bold text-blue-900 uppercase tracking-wide">
        {title}
      </h2>
      <div className="border-b-2 border-blue-800 mt-1 mb-4" />
      {children}
    </div>
  );
}

function ExperienceItem({ job }: { job: any }) {
  return (
    <div className="mb-6">
      <h3 className="font-semibold text-blue-900">
        {job.position || "Position"}
      </h3>

      <p className="text-blue-600 font-medium">{job.company}</p>

      <p className="text-xs text-gray-500 mt-1">
        {formatDate(job.startDate)} -{" "}
        {job.current ? "Present" : formatDate(job.endDate)}
      </p>

      <ul className="list-disc ml-5 text-sm mt-3 space-y-1">
        {(Array.isArray(job.description)
          ? job.description
          : job.description?.split("\n")
        )?.map((point: string, i: number) => (
          <li key={i}>{point}</li>
        ))}
      </ul>
    </div>
  );
}

function EducationItem({ edu }: { edu: any }) {
  return (
    <div className="mb-4">
      <h3 className="font-semibold text-blue-900">{edu.degree}</h3>

      <p className="text-blue-600 text-sm">{edu.institution}</p>

      <p className="text-xs text-gray-500">
        {formatDate(edu.startDate)} -{" "}
        {edu.current ? "Present" : formatDate(edu.endDate)}
      </p>
    </div>
  );
}

function SkillItem({ skill }: { skill: string }) {
  return (
    <span className="border-b border-gray-400 pb-1 text-sm">
      {skill.charAt(0).toUpperCase() + skill.slice(1)}
    </span>
  );
}

function LanguageItem({ lang }: { lang: any }) {
  const levelMap: Record<string, number> = {
    beginner: 1,
    intermediate: 2,
    proficient: 3,
    fluent: 4,
    native: 5,
  };

  const level = levelMap[lang.level?.toLowerCase()] || 3;

  return (
    <div className="flex items-center justify-between mb-2 text-sm">
      <span>{lang.name}</span>

      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className={`w-3 h-3 rounded-full ${
              i < level ? "bg-blue-500" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function ModernTemplate({ data }: Props) {
  return (
    <div className="w-full bg-gray-50 text-gray-800 font-sans p-12">
      {/* HEADER */}
      <Header data={data.personalInfo} />

      {/* GRID */}
      <div className="grid grid-cols-3 gap-12 mt-10">
        {/* LEFT COLUMN */}
        <div className="col-span-2 space-y-10">
          {data.summary && (
            <Section title="Summary">
              <p className="text-sm leading-relaxed">{data.summary}</p>
            </Section>
          )}

          <Section title="Experience">
            {data.experience.map((job, i) => (
              <ExperienceItem key={i} job={job} />
            ))}
          </Section>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-10">
          {data.education?.length > 0 && (
            <Section title="Education">
              {data.education.map((edu, i) => (
                <EducationItem key={i} edu={edu} />
              ))}
            </Section>
          )}

          {data.skills?.length > 0 && (
            <Section title="Skills">
              <div className="grid grid-cols-2 gap-3">
                {data.skills.map((skill, i) => (
                  <SkillItem key={i} skill={skill} />
                ))}
              </div>
            </Section>
          )}

          {data.languages?.length > 0 && (
            <Section title="Languages">
              {data.languages.map((lang, i) => (
                <LanguageItem key={i} lang={lang} />
              ))}
            </Section>
          )}
        </div>
      </div>
    </div>
  );
}

export default ModernTemplate;
