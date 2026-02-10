import { Flame, Shield, Zap, Brain, Cpu, Database, Cloud, Lock } from "lucide-react";
import { useEffect, useState } from "react";

const skills = [
  { name: "Frontend & Mobile", level: 92, icon: Flame },
  { name: "Backend & Database", level: 88, icon: Database },
  { name: "AI / Machine Learning", level: 82, icon: Brain },
  { name: "DevOps & Cloud", level: 85, icon: Cloud },
  { name: "Security", level: 80, icon: Lock },
];

export default function SkillCard() {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="
        relative
        w-full sm:w-[320px] md:w-[360px]
        rounded-3xl
        bg-gradient-to-br from-[#2a0b0f] via-[#5a141b] to-[#3b0f14]
        p-5 sm:p-6
        text-white
        shadow-[0_20px_60px_rgba(0,0,0,0.45)]
        backdrop-blur-xl
        border border-white/10
        transition-transform duration-300
        hover:-translate-y-1
      "
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center">
          <Zap size={20} className="text-red-400" />
        </div>
        <h3 className="text-lg font-bold tracking-wide">
          Tech Stack Mastery
        </h3>
      </div>

      {/* Skills */}
      <div className="space-y-5">
        {skills.map((skill, index) => {
          const Icon = skill.icon;
          return (
            <div key={skill.name}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <Icon size={16} className="text-red-400" />
                  {skill.name}
                </div>
                <span className="text-xs text-white/70">
                  Lv. {skill.level}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="h-2 rounded-full bg-black/40 overflow-hidden">
                <div
                  className="
                    h-full
                    bg-gradient-to-r from-red-400 to-rose-600
                    rounded-full
                    transition-all
                    duration-1000
                    ease-out
                  "
                  style={{
                    width: animated ? `${skill.level}%` : "0%",
                    transitionDelay: `${index * 120}ms`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-6 text-xs text-white/50 text-center">
        React, TypeScript, Node.js, Python, Docker, AWS, PostgreSQL, TensorFlow
      </div>

      {/* Glow */}
      <div
        className="
          pointer-events-none
          absolute -inset-1
          rounded-3xl
          bg-gradient-to-r from-red-500/20 to-rose-600/20
          blur-xl
          opacity-40
        "
      />
    </div>
  );
}
