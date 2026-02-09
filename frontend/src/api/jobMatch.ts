
export async function matchJobPdf(file: File) {
  const formData = new FormData();
  formData.append("jd", file);

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";
  const res = await fetch(`${apiBaseUrl}/api/match-job-pdf`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Failed to analyze job match");
  }

  return res.json();
}
