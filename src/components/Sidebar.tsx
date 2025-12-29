import {
  User,
  Briefcase,
  Brain,
  Rocket,
  Trophy,
  FileText,
  Mail,
} from "lucide-react";
import type { JSX } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const navItems = [
  { icon: User, label: "Profile", path: "/profile" },
  { icon: Briefcase, label: "Experience", path: "/job" },
  { icon: Brain, label: "Skills", path: "/skills" },
  { icon: Rocket, label: "Projects", path: "/projects" },
  { icon: Trophy, label: "Achievements", path: "/achievements" },
  { icon: FileText, label: "Resume", path: "/resume" },
  { icon: Mail, label: "Contact", path: "/contact" },
];

export default function Sidebar(): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside
      className="
        h-full w-[88px]
        rounded-[28px]
        bg-gradient-to-b from-[#3b0f14] via-[#5a141b] to-[#2a0b0f]
        shadow-[0_20px_60px_rgba(0,0,0,0.45)]
        flex flex-col items-center
        py-6
      "
    >
      {/* Logo */}
      <div className="mb-8 text-white font-bold text-xl">CV</div>

      {/* Navigation */}
      <nav className="flex flex-col gap-5 flex-1">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              className={`
                relative w-12 h-12
                flex items-center justify-center
                rounded-xl
                transition-all duration-200
                ${
                  isActive
                    ? "bg-white/20 text-white shadow-md"
                    : "text-white/60 hover:bg-white/10 hover:text-white"
                }
              `}
              title={item.label}
            >
              {isActive && (
                <span
                  className="
                    absolute -left-3
                    w-1.5 h-6
                    rounded-full
                    bg-red-400
                  "
                />
              )}
              <Icon size={22} />
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
