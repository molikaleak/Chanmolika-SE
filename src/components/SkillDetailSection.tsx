import React, { useState } from "react";
import {
  SiPython,
  SiC,
  SiCplusplus,
  SiOpenjdk,
  SiJavascript,
  SiR,
  SiDart,
  SiJsonwebtokens,
  SiPostgresql,
  SiMongodb,
  SiVitest,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiExpress,
  SiSpringboot,
  SiDocker,
  SiKubernetes,
  SiGrafana,
  SiSentry,
  SiGithubactions,
  SiKaggle,
  SiKeras,
  SiTensorflow,
  SiOpencv,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";

/* ---------- Skill Item ---------- */
const SkillItem = ({ icon, name }: { icon: React.ReactNode; name: string }) => (
  <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-black/25 border border-white/10 text-white text-[10px]">
    <div className="text-lg text-red-400">{icon}</div>
    <span className="text-center leading-tight">{name}</span>
  </div>
);

/* ---------- Accordion (Controlled) ---------- */
function SkillAccordion({
  title,
  skills,
  isOpen,
  onToggle,
}: {
  title: string;
  skills: { icon: React.ReactNode; name: string }[];
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-[#1a0508] via-[#3b0f14] to-[#5a141b] border border-white/10">
      <button
        onClick={onToggle}
        className="w-full flex justify-between px-4 py-3 text-xs font-semibold text-white"
      >
        {title}
        <span className="text-white/60">{isOpen ? "−" : "+"}</span>
      </button>

      {isOpen && (
        <div className="px-4 pb-4 grid grid-cols-5 gap-2">
          {skills.map((s) => (
            <SkillItem key={s.name} {...s} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------- DATA ---------- */
const SKILLS = [
  {
    title: "🧠 LANGUAGES",
    skills: [
      { icon: <SiPython />, name: "Python" },
      { icon: <SiC />, name: "C" },
      { icon: <SiCplusplus />, name: "C++" },
      { icon: <SiOpenjdk />, name: "Java" },
      { icon: <SiJavascript />, name: "JS" },
      { icon: <SiR />, name: "R" },
      { icon: <SiDart />, name: "Dart" },
    ],
  },
  {
    title: "🎨 FRONTEND",
    skills: [
      { icon: <SiReact />, name: "React" },
      { icon: <SiNextdotjs />, name: "Next.js" },
      { icon: <SiReact />, name: "RN" },
      { icon: <SiTailwindcss />, name: "Tailwind" },
    ],
  },
  {
    title: "⚙️ BACKEND",
    skills: [
      { icon: <SiExpress />, name: "Express" },
      { icon: <SiSpringboot />, name: "Spring" },
      { icon: <SiJsonwebtokens />, name: "JWT" },
      { icon: <SiPostgresql />, name: "Postgres" },
      { icon: <SiMongodb />, name: "MongoDB" },
      { icon: <span>🧬</span>, name: "Drizzle" },
      { icon: <SiVitest />, name: "Testing" },
      { icon: <span>📜</span>, name: "Logging" },
    ],
  },
  {
    title: "🤖 AI / ML",
    skills: [
      { icon: <SiPython />, name: "Python ML" },
      { icon: <SiKaggle />, name: "Kaggle" },
      { icon: <SiKeras />, name: "CNN" },
      { icon: <SiTensorflow />, name: "TF" },
      { icon: <SiOpencv />, name: "OpenCV" },
    ],
  },
  {
    title: "☁️ DEVOPS",
    skills: [
      { icon: <SiDocker />, name: "Docker" },
      { icon: <SiKubernetes />, name: "K8s" },
      { icon: <SiGrafana />, name: "Grafana" },
      { icon: <SiSentry />, name: "Sentry" },
      { icon: <SiGithubactions />, name: "CI/CD" },
      { icon: <FaAws />, name: "AWS" },
      { icon: <span>🖥️</span>, name: "On-Prem" },
    ],
  },
];

/* ---------- MAIN ---------- */
export default function SkillDetailSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // first open

  return (
    <div className="space-y-3">
      {SKILLS.map((group, index) => (
        <SkillAccordion
          key={group.title}
          title={group.title}
          skills={group.skills}
          isOpen={openIndex === index}
          onToggle={() =>
            setOpenIndex(openIndex === index ? null : index)
          }
        />
      ))}
    </div>
  );
}
