import {
  User,
  Briefcase,
  Brain,
  Rocket,
  Trophy,
  FileText,
  Mail,
} from "lucide-react";
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

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  // Sidebar is always visible, expands on hover
  const visible = true;

  return (
    <aside
      className={`
        group fixed left-4 top-1/2 -translate-y-1/2 z-40
        h-[520px]
        rounded-[28px]
        bg-gradient-to-b from-[#3b0f14] via-[#5a141b] to-[#2a0b0f]
        shadow-[0_20px_60px_rgba(0,0,0,0.45)]
        transition-all duration-300 ease-out
        overflow-hidden
        w-[72px] opacity-100
        hover:w-[220px]
      `}
    >
      {/* LOGO */}
      <div className="mb-8 flex items-center gap-3 px-4 py-6">
        <span className="text-white font-bold text-xl">CV</span>
        <span
          className="
            text-white/70 text-sm font-medium
            opacity-0 translate-x-[-8px]
            group-hover:opacity-100 group-hover:translate-x-0
            transition
            whitespace-nowrap
          "
        >
          Resume
        </span>
      </div>

      {/* NAV */}
      <nav className="flex flex-col gap-2 px-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`
                relative flex items-center gap-4
                h-11 rounded-xl px-3
                transition
                ${
                  isActive
                    ? "bg-white/20 text-white"
                    : "text-white/60 hover:bg-white/10 hover:text-white"
                }
              `}
            >
              {isActive && (
                <span className="absolute left-0 w-1.5 h-6 bg-red-400 rounded-full" />
              )}

              <Icon size={20} className="shrink-0" />

              <span
                className="
                  text-sm font-medium
                  opacity-0 translate-x-[-6px]
                  group-hover:opacity-100 group-hover:translate-x-0
                  transition
                  whitespace-nowrap
                "
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
