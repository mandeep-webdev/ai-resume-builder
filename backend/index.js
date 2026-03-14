import express from "express";
import cors from "cors";
import axios from "axios";
import multer from "multer";
import fs from "fs";
import { createRequire } from "module";
import { analyzeATS } from "./services/atsAnalyzer.js";
import https from "https";
import "dotenv/config";

const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");
const GROK_API_KEY = process.env.GROK_API_KEY;
const app = express();
const PORT = 5001;

app.use((req, res, next) => {
  console.log("➡️ Incoming:", req.method, req.url);
  next();
});
// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

const agent = new https.Agent({
  keepAlive: true,
  rejectUnauthorized: true, // always verify SSL cert
  minVersion: "TLSv1.2",
});

app.post("/api/parse-resume", upload.single("file"), async (req, res) => {
  try {
    const filePath = req.file.path;

    // 1️⃣ Read PDF file
    const buffer = fs.readFileSync(filePath);
    const pdfData = await pdfParse(buffer);
    const extractedText = pdfData.text;
    const cleanedText = extractedText.replace(/([a-z])([A-Z])/g, "$1 $2");

    console.log(cleanedText);

    // 2️⃣ Send extracted text to Ollama
    const aiResponse = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "user",
            content: `
Extract structured resume JSON from the text below.

Return ONLY valid JSON.

Rules:
- skills must be string[]
- description must be string[]
- technologies must be string[]
- startDate and endDate must be extracted if present
- Do not duplicate personal info in experience
- Do not invent data
- Extract full URLs exactly as written.
- Only include links if they appear as complete URLs (must start with http or https).
- Do NOT guess or reconstruct incomplete links.
- If no valid link exists, leave the field empty.

For targetRole:
- Infer a suitable role from experience and skills
- Must be a short professional title (2–4 words)
- Prefer most recent job title
- If unclear infer from skills

Examples:
React + UI → Frontend Developer
Python + SQL → Data Analyst
AWS + Docker → DevOps Engineer
Figma + UX → UI/UX Designer

Return this exact structure:

{
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    linkedin: string;
    github: string;
    targetRole: string;
  },
  skills: string[],
  experience: [
    {
      position: string;
      company: string;
      location: string;
      startDate: string;
      endDate: string;
      description: string[];
    }
  ],
  education: [
    {
      degree: string;
      institution: string;
      location: string;
      startDate: string;
      endDate: string;
    }
  ],
  projects: [
    {
      name: string;
      description: string[];
      technologies: string[];
      liveLink: string;
      githubLink: string;
    }
  ]
}

Resume Text:
${cleanedText}
`,
          },
        ],
        temperature: 0.2,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROK_API_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );

    // 3 Parse AI response
    let parsedData;

    try {
      let aiText = aiResponse.data.choices[0].message.content.trim();

      // remove markdown wrappers
      aiText = aiText
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();
      parsedData = JSON.parse(aiText);

      function deepClean(obj) {
        if (Array.isArray(obj)) return obj.map(deepClean);

        if (typeof obj === "object" && obj !== null) {
          const newObj = {};
          for (const key in obj) newObj[key] = deepClean(obj[key]);
          return newObj;
        }

        if (typeof obj === "string") {
          return obj.replace(/^"+|"+$/g, "").trim();
        }

        return obj;
      }

      function isValidUrl(val) {
        return (
          typeof val === "string" && /^https?:\/\/[^\s]+$/i.test(val.trim())
        );
      }

      parsedData = deepClean(parsedData);

      parsedData.personalInfo = parsedData.personalInfo || {};
      parsedData.skills = parsedData.skills || [];
      parsedData.experience = parsedData.experience || [];
      parsedData.education = parsedData.education || [];
      parsedData.projects = parsedData.projects || [];

      if (!isValidUrl(parsedData.personalInfo.github)) {
        parsedData.personalInfo.github = "";
      }

      if (!isValidUrl(parsedData.personalInfo.linkedin)) {
        parsedData.personalInfo.linkedin = "";
      }
    } catch (err) {
      console.error(
        "AI returned invalid JSON:",
        aiResponse.data.choices?.[0]?.message?.content,
      );

      return res.status(500).json({
        error: "AI formatting issue. Try again.",
      });
    }

    // 4️⃣ Delete uploaded file (VERY IMPORTANT)
    fs.unlinkSync(filePath);

    // 5️⃣ Send structured JSON to frontend
    return res.json(parsedData);
  } catch (error) {
    console.error("FULL RESUME PARSE ERROR:");
    console.error(error);
    console.error("Message:", error.message);
    console.error("Stack:", error.stack);

    return res.status(500).json({
      error: error.message || "Resume parsing failed",
    });
  } finally {
    if (req.file?.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
  }
});

// Improve bullet route using Ollama
app.post("/api/improve-bullet", async (req, res) => {
  try {
    const { bullet, role } = req.body;

    if (!bullet) {
      return res.status(400).json({ error: "Bullet point is required" });
    }

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "user",
            content: `
ROLE:
You are a senior resume writer and technical recruiter.

CONTEXT:
The candidate wrote the following responsibility in their resume.

Text:
${bullet}

Candidate Role:
${role}

TASK:
Rewrite this into 3 strong resume bullet points.

RULES:
- Start each bullet with •
- Use strong action verbs
- Focus on technical implementation
- Do NOT invent fake numbers or placeholders
- Do NOT write things like "[insert percentage]"
- Do NOT fabricate teamwork if not mentioned
- Maximum 25 words per bullet
- Return ONLY bullet points
`,
          },
        ],
        temperature: 0.2,
        stream: false,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROK_API_KEY}`,
          "Content-Type": "application/json",
        },
        httpsAgent: agent,
      },
    );

    let improvedBullet = response.data.choices[0].message.content.trim();

    // remove AI explanations
    improvedBullet = improvedBullet.replace(/Here.*?\n/i, "").trim();

    // normalize bullets
    improvedBullet = improvedBullet.replace(/^\*\s*/gm, "• ");

    improvedBullet = improvedBullet
      .split("\n")
      .map((line) => {
        line = line.trim();
        if (!line.startsWith("•")) {
          return "• " + line.replace(/^[•\-]\s*/, "");
        }
        return line;
      })
      .join("\n");

    res.json({ improvedBullet });
  } catch (error) {
    console.error("full err obj");
    console.error(error);

    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
    }

    res.status(500).json({
      error: error.response?.data || error.message || "AI generation failed",
    });
  }
});
// Generate project description (bullet array)
app.post("/api/generate-project-description", async (req, res) => {
  try {
    const { projectName, technologies, role } = req.body;

    if (!projectName || !technologies) {
      return res.status(400).json({
        error: "Project name and technologies are required",
      });
    }

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "user",
            content: `You are a senior software engineer and resume writer.

Your task is to generate strong resume bullet points for a project.

Project Name:
${projectName}

Technologies Used:
${technologies.join(", ")}

Candidate Role:
${role}

Write exactly 3 resume bullet points describing the project.

STRICT RULES:
Each bullet MUST start with: •
Maximum 25 words per bullet
Focus on technical implementation and features
Mention relevant technologies when useful
Do NOT invent numbers or metrics
Do NOT add explanations
Do NOT add extra text`,
          },
        ],
        temperature: 0.2,
        stream: false,
      },
      {
        headers: {
          Authorization: `Bearer ${GROK_API_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );

    let output = response.data.choices[0].message.content.trim();

    // Remove unwanted intro text if model adds any
    output = output.replace(/Here.*?\n/i, "").trim();

    const bullets = output
      .split("\n")
      .map((line) => {
        line = line.trim();
        if (!line) return null;

        // remove bullet symbol
        line = line.replace(/^[•\-\*]\s*/, "");

        return line;
      })
      .filter(Boolean);

    res.json({ description: bullets });
  } catch (error) {
    console.error("PROJECT AI ERROR:");
    console.error(error.response?.data || error.message);

    res.status(500).json({
      error:
        error.response?.data || error.message || "Project AI generation failed",
    });
  }
});

// Resume Review Route
app.post("/api/review", async (req, res) => {
  try {
    const { resumeData, targetRole } = req.body;
    if (!resumeData || !targetRole) {
      return res.status(400).json({
        error: "Resume data and target role are required",
      });
    }
    //  Calculate total YOE
    const calculateTotalExperience = (experience = []) => {
      let totalMonths = 0;

      experience.forEach((job) => {
        if (!job.startDate) return;

        const start = new Date(job.startDate);
        if (isNaN(start.getTime())) return;
        const end =
          job.endDate && job.endDate.toLowerCase() !== "present"
            ? new Date(job.endDate)
            : new Date();

        if (!isNaN(start) && !isNaN(end)) {
          const months =
            (end.getFullYear() - start.getFullYear()) * 12 +
            (end.getMonth() - start.getMonth());

          if (months > 0) totalMonths += months;
        }
      });

      return (totalMonths / 12).toFixed(1);
    };

    const totalYOE = calculateTotalExperience(resumeData.experience || []);
    const prompt = `You are a senior technical recruiter and professional resume editor.

    Target role: ${targetRole}
   Verified total years of experience: ${totalYOE}

   Your responsibilities:

1. Identify seniority level based on verified experience.
2. Identify the most relevant technical skills for the target role.
3. Prioritize recent and high-impact roles.
4. Rewrite the professional summary (80–120 words, 3–4 lines max).

CRITICAL REQUIREMENT:
- The summary MUST explicitly mention "${totalYOE}+ years of experience".
- Use the exact numeric value provided.
- Do NOT omit years of experience.
- Do NOT estimate or recalculate it.
5. Rewrite weak experience bullets to be action-driven and results-focused.
6. Do NOT fabricate metrics. Only use measurable results if explicitly present in the resume data.



Return ONLY valid JSON in this exact structure:

{
  "overallSuggestions": ["suggestion1", "suggestion2"],
  "sections": {
    "summary": {
      "improvedText": "Professional summary paragraph.",
      "suggestions": ["suggestion1", "suggestion2"]
    },
    "experience": [
      {
        "index": number,
        "improvedBullets": ["Bullet 1", "Bullet 2"]
      }
    ]
  }
}

STRICT RULES:
- Do NOT include markdown.
- Do NOT include explanations.
- Do NOT include text before or after JSON.
- Always return an experience array (empty if none).
- Always return valid JSON.

MANDATORY SUMMARY RULES:
- The first sentence MUST contain "${totalYOE}+ years of experience".
- The number must match the verified experience exactly.
- Example format: "Full Stack Developer with 2.5+ years of experience..."

Resume Data:
${JSON.stringify(resumeData)}
`;
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.2,
        stream: false,
      },
      {
        headers: {
          Authorization: `Bearer ${GROK_API_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );
    let parsed;

    try {
      const aiText = response.data.choices[0].message.content.trim();
      parsed = JSON.parse(aiText);
    } catch (err) {
      console.error(
        "JSON Parse Error:",
        response.data.choices?.[0]?.message?.content,
      );

      return res.json({
        overallSuggestions: ["AI response formatting issue. Try again."],
        sections: {
          summary: {
            improvedText: "",
            suggestions: [],
          },
          experience: [],
        },
      });
    }
    const safeResponse = {
      overallSuggestions: Array.isArray(parsed.overallSuggestions)
        ? parsed.overallSuggestions
        : [],

      sections: {
        summary: {
          improvedText:
            typeof parsed.sections?.summary?.improvedText === "string"
              ? parsed.sections.summary.improvedText
              : "",

          suggestions: Array.isArray(parsed.sections?.summary?.suggestions)
            ? parsed.sections.summary.suggestions
            : [],
        },

        experience: Array.isArray(parsed.sections?.experience)
          ? parsed.sections.experience.map((exp) => ({
              index: Number.isInteger(exp.index) ? exp.index : -1,

              improvedBullets: Array.isArray(exp.improvedBullets)
                ? exp.improvedBullets
                : [],
            }))
          : [],
      },
    };

    return res.json(safeResponse);
  } catch (error) {
    console.error("REVIEW ERROR:");
    console.error(error.response?.data || error.message);

    return res.status(500).json({
      overallSuggestions: ["Resume review failed. Please try again."],
      sections: {
        summary: {
          improvedText: "",
          suggestions: [],
        },
        experience: [],
      },
    });
  }
});
app.post("/api/ats-analyze", async (req, res) => {
  try {
    const { resumeData, jobDescription } = req.body;

    if (!resumeData || !jobDescription) {
      return res.status(400).json({
        error: "resumeData and jobDescription are required",
      });
    }
    const result = analyzeATS(resumeData, jobDescription);

    res.json(result);
  } catch (error) {
    console.error("ATS ANALYZE ERROR:", error);

    return res.status(500).json({
      atsScore: 0,
      matchedKeywords: [],
      missingKeywords: [],
    });
  }
});
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
