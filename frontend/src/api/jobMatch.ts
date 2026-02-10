export interface JobMatchResult {
  score: number;
  strengths: string[];
  gaps: string[];
  summary: string;
}
export async function matchJobPdf(
  file: File | null,
  jobDescription: string
) {
  const formData = new FormData();

  if (file) {
    formData.append("file", file);
  }
  if (jobDescription) {
    formData.append("job_description", jobDescription);
  }

  const apiBaseUrl =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

  const url = `${apiBaseUrl}/api/match-job-pdf`;
  console.log("🔍 Fetching from:", url);
  console.log("🔍 Request details:", { file: file?.name, jobDescriptionLength: jobDescription.length });

  let res;
  try {
    res = await fetch(url, {
      method: "POST",
      body: formData,
    });
  } catch (fetchError) {
    console.error("❌ Fetch failed:", fetchError);
    const message = fetchError instanceof Error ? fetchError.message : String(fetchError);
    throw new Error(`Network error: ${message}`);
  }

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Backend error");
  }

  const data = await res.json();

  console.log("✅ RAW BACKEND RESPONSE:", data);

  // 🔥 FIXED MAPPING
  return {
    score: data.match_score ?? 0,
    strengths: data.strong_matches ?? [],
    gaps: data.missing_skills ?? [],
    summary: data.analysis ?? "No analysis available.",
  };
}