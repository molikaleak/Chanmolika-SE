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
  const [result, setResult] = useState<MatchResult | null>(null);

  const mutation = useMutation({
    mutationFn: matchJobPdf,
    onSuccess: (data) => {
      setResult(data);
    },
    onError: (err: any) => {
      console.error("Mutation error:", err);
    },
  });

  const handleAnalyze = () => {
    if (!file) {
      alert("Please upload a job description PDF.");
      return;
    }
    setResult(null);
    mutation.mutate(file);
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
      <div className="mt-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl p-8 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
        <div className="grid gap-6">
          <label className="cursor-pointer">
            <div className="rounded-xl border border-dashed border-white/20 bg-black/30 p-6 text-center hover:border-pink-400/60 hover:bg-pink-500/5 transition">
              <p className="text-sm text-gray-300">
                {file ? "PDF Selected" : "Click to upload job description"}
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

          {mutation.error && <p className="text-sm text-red-400">{mutation.error.message}</p>}
        </div>
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
            {/* ================= SCORE CARD ================= */}
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 p-6">
              {/* BREATHING GLOW */}
              <motion.div
                className="absolute inset-0 z-0"
                animate={{
                  opacity: [0.25, 0.6, 0.25],
                  scale: [0.95, 1.05, 0.95],
                }}
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="absolute inset-0 bg-pink-500/30 blur-3xl" />
              </motion.div>

              {/* SPARKLES (SUBTLE) */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={{ opacity: [0, 0.15, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <div className="absolute top-6 left-10 w-1 h-1 bg-pink-300 rounded-full blur-sm" />
                <div className="absolute bottom-8 right-12 w-1 h-1 bg-rose-300 rounded-full blur-sm" />
              </motion.div>

              {/* CONTENT */}
              <div className="relative z-10 flex items-center gap-6">
                {/* SCORE RING */}
                <div className="relative w-24 h-24">
                  <svg className="w-full h-full -rotate-90">
                    <circle
                      cx="48"
                      cy="48"
                      r="42"
                      stroke="rgba(255,255,255,0.12)"
                      strokeWidth="8"
                      fill="none"
                    />
                    <motion.circle
                      cx="48"
                      cy="48"
                      r="42"
                      stroke="url(#grad)"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={264}
                      initial={{ strokeDashoffset: 264 }}
                      animate={{
                        strokeDashoffset:
                          264 - (264 * result.score) / 100,
                      }}
                      transition={{ duration: 1.4, ease: "easeOut" }}
                      strokeLinecap="round"
                      style={{
                        filter:
                          "drop-shadow(0 0 12px rgba(244,114,182,0.9))",
                      }}
                    />
                    <defs>
                      <linearGradient id="grad">
                        <stop offset="0%" stopColor="#f472b6" />
                        <stop offset="100%" stopColor="#fb7185" />
                      </linearGradient>
                    </defs>
                  </svg>

                  <span className="absolute inset-0 flex items-center justify-center text-lg font-bold text-pink-300">
                    {result.score}%
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-200">
                    Match Score
                  </h3>
                  <p className="text-sm text-gray-400">
                    Overall alignment strength
                  </p>
                </div>
              </div>
            </div>

            {/* ================= SKILL BARS ================= */}
            <div className="grid md:grid-cols-2 gap-6">
              <SkillBar
                title="Strengths"
                items={result.strengths}
                color="emerald"
              />
              <SkillBar
                title="Gaps"
                items={result.gaps}
                color="amber"
              />
            </div>

            {/* ================= SUMMARY ================= */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="rounded-xl bg-black/40 border border-white/10 p-6"
            >
              <h4 className="text-sm font-semibold text-pink-300 mb-2">
                AI Summary
              </h4>
              <p className="text-sm text-gray-400 leading-relaxed">
                {result.summary}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
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
  return (
    <div className="rounded-xl bg-white/5 border border-white/10 p-5">
      <h4 className={`text-sm font-semibold text-${color}-300 mb-4`}>
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
                  className={`h-full bg-${color}-400/70`}
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
