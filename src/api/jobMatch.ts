
export async function matchJobPdf(file: File) {
  const formData = new FormData();
  formData.append("jd", file);

  const res = await fetch("http://localhost:4000/api/match-job-pdf", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Failed to analyze job match");
  }

  return res.json();
}
