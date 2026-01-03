import {
  User,
  Briefcase,
  Brain,
  Rocket,
  Trophy,
  FileText,
  Mail,
} from "lucide-react";
import { useEffect, useState } from "react";
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
  const [visible, setVisible] = useState(false);

  /* ================= EDGE DETECTION ================= */
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientX < 40) setVisible(true);
    };

    const handleScroll = () => {
      setVisible(true);
      setTimeout(() => setVisible(false), 1500);
    };

    const handleTouch = (e: TouchEvent) => {
      if (e.touches[0].clientX < 40) setVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("touchstart", handleTouch);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("touchstart", handleTouch);
    };
  }, []);

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
        ${visible ? "w-[72px] opacity-100" : "w-[72px] opacity-0 -translate-x-20"}
        hover:w-[220px]
      `}
      onMouseLeave={() => setVisible(false)}
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
