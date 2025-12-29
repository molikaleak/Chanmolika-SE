import {
  User,
  Briefcase,
  Brain,
  Rocket,
  Trophy,
  FileText,
  Mail,
} from "lucide-react";

export const navItems = [
  { id: "profile", label: "Profile", icon: User, path: "/profile" },
  { id: "job", label: "Experience", icon: Briefcase, path: "/job" },
  { id: "skills", label: "Skills", icon: Brain, path: "/skills" },
  { id: "projects", label: "Projects", icon: Rocket, path: "/projects" },
  { id: "achievements", label: "Achievements", icon: Trophy, path: "/achievements" },
  { id: "resume", label: "Resume", icon: FileText, path: "/resume" },
  { id: "contact", label: "Contact", icon: Mail, path: "/contact" },
];
