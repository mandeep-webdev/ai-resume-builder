import React, { useState } from "react";
import { useFormikContext } from "formik";
import axios from "axios";
import type { ResumeFormValues } from "../../../types/resume";
import ResumePreview from "../../resume/ResumePreview";


interface ReviewResponse {
  overallSuggestions: string[];
  sections: {
    summary: {
      improvedText: string;
      suggestions: string[];
    };
    experience: {
      index: number;
      improvedBullets: string[];
    }[];
  };
}
interface ATSResponse {
  atsScore: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  suggestions: {
    type: "skill" | "project" | "experience";
    keyword: string;
    message: string;
  }[];
}

const ReviewStep = () => {
  const { values, setFieldValue } = useFormikContext<ResumeFormValues>();

  const [reviewData, setReviewData] = useState<ReviewResponse | null>(null);

  const [editedSummary, setEditedSummary] = useState<string>("");

  const [loading, setLoading] = useState(false);
  const [atsData, setAtsData] = useState<ATSResponse | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [atsLoading, setAtsLoading] = useState(false);
  const [showATSInput, setShowATSInput] = useState(false);

  const isSummaryMissing =
    !values.summary || values.summary.trim().length === 0;

  const analyzeResume = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5001/api/review", {
        resumeData: values,
        targetRole: values.personalInfo.targetRole,
      });

      setReviewData(response.data);

      if (response.data.sections.summary.improvedText) {
        setEditedSummary(response.data.sections.summary.improvedText);
      }
    } catch (error: any) {
      console.error("Review Error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const analyzeATS = async () => {
    if (!jobDescription.trim()) return;

    setAtsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5001/api/ats-analyze",
        {
          resumeData: values,
          jobDescription,
        },
      );

      setAtsData(response.data);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error: any) {
      console.error("ATS Error:", error.response?.data || error.message);
    } finally {
      setAtsLoading(false);
    }
  };
  const applySummary = () => {
    setFieldValue("summary", editedSummary);
  };
  const applySuggestion = (
    suggestion: ATSResponse["suggestions"][number],
    index: number,
  ) => {
    const keyword = suggestion.keyword;

    if (suggestion.type === "skill") {
      if (!values.skills.includes(keyword)) {
        setFieldValue("skills", [...values.skills, keyword]);
      }
    }

    if (suggestion.type === "project") {
      const updatedProjects = values.projects.map((p, i) => {
        if (i === 0) {
          return {
            ...p,
            description: [
              ...(Array.isArray(p.description)
                ? p.description
                : [p.description]),
              `Implemented ${keyword}`,
            ],
          };
        }
        return p;
      });

      setFieldValue("projects", updatedProjects);
    }

    if (suggestion.type === "experience") {
      const updatedExp = values.experience.map((exp, i) => {
        if (i === 0) {
          return {
            ...exp,
            description:
              exp.description + `\n• Experience working with ${keyword}`,
          };
        }
        return exp;
      });

      setFieldValue("experience", updatedExp);
    }

    // 🔥 REMOVE SUGGESTION AFTER APPLY
    if (atsData) {
      const updatedSuggestions = atsData.suggestions.filter(
        (_, i) => i !== index,
      );

      setAtsData({
        ...atsData,
        suggestions: updatedSuggestions,
      });
    }
  };

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="bg-white border border-violet-100 rounded-2xl p-6 shadow-md space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
            Review & Optimize
          </h2>

          <span className="px-4 py-1 rounded-full text-sm font-semibold bg-violet-50 text-violet-700 border border-violet-200">
            {values.personalInfo.targetRole}
          </span>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={analyzeResume}
            disabled={loading}
            className="px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-violet-500 to-purple-600 shadow-md hover:shadow-xl transition-all disabled:opacity-50"
          >
            {loading ? "Analyzing..." : "🔍 Analyze Resume"}
          </button>

          <button
            type="button"
            onClick={() => setShowATSInput(true)}
            className="px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-violet-500 to-purple-600 shadow-md hover:shadow-xl transition-all disabled:opacity-50"
          >
            📊 Check ATS Score
          </button>
        </div>
        {showATSInput && (
          <div className="bg-gray-50 border rounded-xl p-4 space-y-3">
            <h3 className="font-semibold text-violet-700">
              Paste Job Description
            </h3>

            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              rows={5}
              placeholder="Paste the job description you are applying for..."
              className="w-full border border-violet-400 rounded-lg p-3 text-sm"
            />

            <button
              type="button"
              onClick={analyzeATS}
              disabled={atsLoading}
              className="px-6 py-3 rounded-xl font-semibold text-white 
  bg-gradient-to-r from-violet-500 to-purple-600 
  shadow-md hover:shadow-xl transition-all 
  disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {atsLoading ? "Analyzing..." : "Analyze ATS"}
            </button>
          </div>
        )}
      </div>

      {/* AI SUGGESTIONS */}
      {reviewData && (
        <div className="bg-white border border-violet-100 rounded-2xl p-6 shadow-md space-y-6">
          {/* Overall Suggestions */}
          {reviewData.overallSuggestions.length > 0 && (
            <div>
              <h3 className="font-semibold text-violet-700 mb-2">
                📌 Overall Suggestions
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {reviewData.overallSuggestions.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Summary Improvement */}
          {reviewData.sections.summary.improvedText && (
            <div>
              <h3 className="font-semibold text-violet-700 mb-2">
                {isSummaryMissing
                  ? "📝 Suggested Summary"
                  : "✨ Improved Summary"}
              </h3>
              {isSummaryMissing && (
                <div className="mb-3 text-sm text-amber-600 bg-amber-50 border border-amber-200 p-3 rounded-lg">
                  You have not added a professional summary. Adding one
                  significantly improves recruiter visibility and ATS ranking.
                </div>
              )}

              <textarea
                value={editedSummary}
                onChange={(e) => setEditedSummary(e.target.value)}
                className="w-full border rounded-xl p-3 text-sm"
                rows={5}
              />

              <button
                type="button"
                onClick={applySummary}
                className="mt-3 px-4 py-2 bg-violet-600 text-white rounded-lg"
              >
                Apply Summary
              </button>
            </div>
          )}
        </div>
      )}
      {atsData && (
        <div className="bg-white border border-violet-100-100 rounded-2xl p-6 shadow-md space-y-4">
          <h3 className="text-lg font-semibold text-violet-700-700">
            📊 ATS Score: {atsData.atsScore}%
          </h3>

          <div>
            <h4 className="font-semibold text-green-600 mb-2">
              Matched Keywords
            </h4>
            <div className="flex flex-wrap gap-2">
              {atsData.matchedKeywords.map((k, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
                >
                  {k}
                </span>
              ))}
            </div>
          </div>

          {atsData.missingKeywords.length > 0 && (
            <div>
              <h4 className="font-semibold text-red-600 mb-2">
                Missing Keywords
              </h4>

              <div className="flex flex-wrap gap-2">
                {atsData.missingKeywords.map((k, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm"
                  >
                    {k}
                  </span>
                ))}
              </div>
            </div>
          )}
          {atsData.suggestions.map((s, i) => (
            <div
              key={i}
              className="flex justify-between items-center border rounded-lg p-3"
            >
              <span className="text-sm text-gray-700">{s.message}</span>

              <button
                type="button"
                onClick={() => applySuggestion(s, i)}
                className="px-3 py-1 bg-violet-600 text-white rounded-md text-sm hover:bg-violet-700"
              >
                Apply
              </button>
            </div>
          ))}
        </div>
      )}
      {/* PREVIEW */}
      <div
        id="resume-preview"
        className="bg-white border border-violet-100 rounded-2xl p-8 shadow-lg"
      >
        <ResumePreview data={values} templateId={values.template} />
      </div>
    </div>
  );
};

export default ReviewStep;
