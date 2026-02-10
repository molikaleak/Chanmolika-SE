import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { matchJobPdf } from "../api/jobMatch";
import { useMutation } from "@tanstack/react-query";

/* ================= TYPES ================= */

type MatchResult = {
  score: number;
  strengths: string[];
  gaps: string[];
  summary: string;
};

/* ================= COMPONENT ================= */

export default function JobMatchSection() {
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState<MatchResult | null>(null);

  const mutation = useMutation({
    mutationFn: ({ file, jobDescription }: { file: File | null; jobDescription: string }) =>
      matchJobPdf(file, jobDescription),
    onSuccess: (data) => {
      console.log("Mutation success, data:", data);
      setResult(data);
    },
    onError: (err: any) => {
      console.error("Mutation error:", err);
      console.error("Error details:", err.message, err.stack);
    },
  });

  const handleAnalyze = () => {
    if (!file && !jobDescription) {
      alert("Please upload a PDF OR paste the job description (or both).");
      return;
    }

    setResult(null);
    mutation.mutate({ file, jobDescription });
  };

  return (
    <section className="mt-24 max-w-4xl mx-auto">
      {/* ================= HEADER ================= */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-rose-300 bg-clip-text text-transparent">
          Job Match Analysis
        </h2>
        <p className="mt-2 text-sm text-gray-400 max-w-xl">
          AI-powered analysis of how well this role aligns with my background.
        </p>
      </motion.div>

      {/* ================= UPLOAD CARD ================= */}
      <div className="mt-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl p-8 shadow-[0_20px_60px_rgba(0,0,0,0.35)] space-y-6">
        {/* PDF Upload */}
        <label className="cursor-pointer">
          <div className="rounded-xl border border-dashed border-white/20 bg-black/30 p-6 text-center hover:border-pink-400/60 hover:bg-pink-500/5 transition">
            <p className="text-sm text-gray-300">
              {file ? "PDF Selected" : "Click to upload job description PDF"}
            </p>
            {file && (
              <p className="mt-2 text-xs text-pink-300 truncate">
                {file.name}
              </p>
            )}
          </div>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="hidden"
          />
        </label>

        {/* Job Description */}
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste the job description here..."
          rows={5}
          className="w-full rounded-lg bg-black/30 border border-white/10 p-4 text-sm text-gray-300 focus:outline-none focus:border-pink-400/60"
        />

        {/* Action */}
        <button
          onClick={handleAnalyze}
          disabled={mutation.isPending}
          className="
            w-fit px-7 py-2.5 rounded-lg
            bg-gradient-to-r from-pink-500/30 to-rose-400/30
            text-pink-200 border border-pink-400/40
            hover:from-pink-500/40 hover:to-rose-400/40
            disabled:opacity-50 disabled:cursor-not-allowed
            transition
          "
        >
          {mutation.isPending ? "Analyzing with AI..." : "Analyze Match"}
        </button>

        {mutation.error && (
          <p className="text-sm text-red-400">
            {(mutation.error as Error).message}
          </p>
        )}
      </div>

      {/* ================= RESULT ================= */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mt-12 space-y-8"
          >
            {/* SCORE CARD */}
            <ScoreCard score={result.score} />

            {/* SKILLS */}
            <div className="grid md:grid-cols-2 gap-6">
              <SkillBar title="Strengths" items={result.strengths} color="emerald" />
              <SkillBar title="Gaps" items={result.gaps} color="amber" />
            </div>

            {/* SUMMARY */}
            <div className="rounded-xl bg-black/40 border border-white/10 p-6">
              <h4 className="text-sm font-semibold text-pink-300 mb-2">
                AI Summary
              </h4>
              <p className="text-sm text-gray-400 leading-relaxed">
                {result.summary}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ================= SCORE CARD ================= */

function ScoreCard({ score }: { score: number }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/40 p-6 flex items-center gap-6">
      <div className="text-4xl font-bold text-pink-300">{score}%</div>
      <div>
        <h3 className="text-lg font-semibold text-gray-200">Match Score</h3>
        <p className="text-sm text-gray-400">Overall alignment strength</p>
      </div>
    </div>
  );
}

/* ================= SKILL BAR ================= */

function SkillBar({
  title,
  items,
  color,
}: {
  title: string;
  items: string[];
  color: "emerald" | "amber";
}) {
  const colorMap = {
    emerald: {
      title: "text-emerald-300",
      bar: "bg-emerald-400/70",
    },
    amber: {
      title: "text-amber-300",
      bar: "bg-amber-400/70",
    },
  };

  return (
    <div className="rounded-xl bg-white/5 border border-white/10 p-5">
      <h4 className={`text-sm font-semibold ${colorMap[color].title} mb-4`}>
        {title}
      </h4>

      <div className="space-y-3">
        {items.map((item, i) => {
          const value = Math.max(35, 90 - i * 12);

          return (
            <div key={item}>
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>{item}</span>
                <span>{value}%</span>
              </div>

              <div className="h-2 rounded-full bg-black/40 overflow-hidden">
                <motion.div
                  className={`h-full ${colorMap[color].bar}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${value}%` }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}