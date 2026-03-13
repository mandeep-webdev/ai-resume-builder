import { FieldArray, Field, ErrorMessage, useFormikContext } from "formik";

import { Plus, Trash2 } from "lucide-react";
import type { ResumeFormValues } from "../../../types/resume";
const CertificatesStep = () => {
  const { values } = useFormikContext<ResumeFormValues>();
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-purple-700">Certificates</h2>

      <FieldArray name="certificates">
        {({ push, remove }) => (
          <div className="space-y-6">
            {values.certificates?.map((_: any, index: number) => (
              <div
                key={index}
                className="p-5 border border-purple-200 rounded-xl bg-white space-y-4 relative"
              >
                {/* Remove Button */}
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="absolute text-sm top-3 right-3 text-red-500 hover:text-red-700"
                >
                  Remove
                  {/* <Trash2 size={18} /> */}
                </button>

                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-purple-700">
                    Certification Name
                  </label>
                  <Field
                    name={`certificates.${index}.name`}
                    className="mt-1 w-full px-3 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
                    placeholder="AWS Certified Developer"
                  />
                  <ErrorMessage
                    name={`certificates.${index}.name`}
                    component="div"
                    className="text-sm text-red-500"
                  />
                </div>

                {/* Issuer */}
                <div>
                  <label className="block text-sm font-medium text-purple-700">
                    Issuer
                  </label>
                  <Field
                    name={`certificates.${index}.issuer`}
                    className="mt-1 w-full px-3 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
                    placeholder="Amazon Web Services"
                  />
                  <ErrorMessage
                    name={`certificates.${index}.issuer`}
                    component="div"
                    className="text-sm text-red-500"
                  />
                </div>

                {/* Year */}
                <div>
                  <label className="block text-sm font-medium text-purple-700">
                    Year
                  </label>
                  <Field
                    name={`certificates.${index}.issueDate`}
                    className="mt-1 w-full px-3 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
                    placeholder="2024"
                  />
                  <ErrorMessage
                    name={`certificates.${index}.issueDate`}
                    component="div"
                    className="text-sm text-red-500"
                  />
                </div>

                {/* Credential URL */}
                <div>
                  <label className="block text-sm font-medium text-purple-700">
                    Credential URL
                  </label>
                  <Field
                    name={`certificates.${index}.credentialUrl`}
                    className="mt-1 w-full px-3 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
                    placeholder="https://..."
                  />
                  <ErrorMessage
                    name={`certificates.${index}.credentialUrl`}
                    component="div"
                    className="text-sm text-red-500"
                  />
                </div>
              </div>
            ))}

            {/* Add Button */}
            <button
              type="button"
              onClick={() =>
                push({
                  name: "",
                  issuer: "",
                  issueDate: "",
                  credentialUrl: "",
                })
              }
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
            >
              <Plus size={18} />
              Add Certificate
            </button>
          </div>
        )}
      </FieldArray>
    </div>
  );
};

export default CertificatesStep;
