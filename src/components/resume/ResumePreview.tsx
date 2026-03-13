import type { ResumeFormValues } from "../../types/resume";
import ClassicTemplate from "./templates/ClassicTemplate";
import ModernTemplate from "./templates/ModernTemplate";
import SidebarTemplate from "./templates/SidebarTemplate";

type ResumePreviewProps = {
  templateId: ResumeFormValues["template"];
  data: ResumeFormValues;
};

const ResumePreview = ({ templateId, data }: ResumePreviewProps) => {
  const templates: Record<
    ResumeFormValues["template"],
    React.ComponentType<{ data: ResumeFormValues }>
  > = {
    classic: ClassicTemplate,
    modern: ModernTemplate,
    sidebar: SidebarTemplate,
  };

  const SelectedTemplate = templates[templateId];
  return (
    <div className=" bg-white min-h-screen flex justify-center py-4">
      <div className="bg-white w-[794px] min-h-[1123px] shadow-2xl">
        <SelectedTemplate data={data} />
      </div>
    </div>
  );
};

export default ResumePreview;
