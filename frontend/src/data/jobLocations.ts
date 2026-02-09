export type ThemeKey = "red" | "purple" | "green" | "blue" | "pink";

export type JobLocation = {
  id: string;
  title: string;
  company: string;
  position: [number, number, number];

  // 🖼️ UI content
  image: string;          // path from /public
  description: string;
  period?: string;
  tags?: string[];
  theme?: ThemeKey;
};

export const jobLocations: JobLocation[] = [
  {
    id: "job-1",
    title: "LMS Lead",
    company: "Mavex",
    position: [2.5, 0.2, -2.0],
    image: `${import.meta.env.BASE_URL}moo1.png`,
    description:
      "Led LMS platform development, integrating interactive UI and real-time features.",
    period: "2023 – 2024",
    tags: ["React", "Three.js", "UI/UX"],
     theme: "purple", 
  },
  {
    id: "job-2",
    title: "Frontend Engineer",
    company: "Company B",
    position: [-3.0, 0.2, 2.5],
    image: `${import.meta.env.BASE_URL}moo2.png`,
    description:
      "Built scalable front-end systems with performance-focused architecture.",
    period: "2022 – 2023",
    tags: ["TypeScript", "Tailwind"],
     theme: "blue", 
  },
  {
    id: "job-3",
    title: "Fullstack Developer",
    company: "Company C",
    position: [0.0, 0.2, 4.0],
    image: `${import.meta.env.BASE_URL}moo3.png`,
    description:
      "Developed APIs and dashboards supporting real-world business workflows.",
    period: "2021 – 2022",
    tags: ["Node.js", "PostgreSQL"],
        theme: "red",
  },
  {
    id: "job-4",
    title: "AI Research Assistant",
    company: "University Lab",
    position: [3.5, 0.2, 1.8],
    image: `${import.meta.env.BASE_URL}moo4.png`,
    description:
      "Researched ML models and data pipelines for experimental AI systems.",
    period: "2020 – 2021",
    tags: ["Python", "ML"],
        theme: "green",
  },
  {
    id: "job-5",
    title: "Freelance Developer",
    company: "Remote",
    position: [-3.8, 0.2, -3.0],
    image: `${import.meta.env.BASE_URL}moo5.png`,
    description:
      "Delivered end-to-end solutions for multiple international clients.",
    tags: ["Fullstack", "Consulting"],
        theme: "pink",
  },
];
