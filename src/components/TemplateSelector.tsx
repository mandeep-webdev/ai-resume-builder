import { useFormikContext } from "formik";
import React from "react";
import { TEMPLATES } from "../types/resume";

const TemplateSelector = () => {
  const { setFieldValue, values } = useFormikContext();
  return (
    <div className="grid grid-cols-3 gap-4">
      {TEMPLATES.map((t) => (
        <button
          key={t}
          type="button"
          onClick={() => setFieldValue("template", t)}
          className={`p-4 border rounded-xl ${
            values.template === t ? "border-blue-600" : "border-gray-300"
          }`}
        >
          {t}
        </button>
      ))}
    </div>
  );
};

export default TemplateSelector;
