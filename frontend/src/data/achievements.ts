export interface Achievement {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  date: string;
  tags: string[];
  link?: string;
}

export const achievements: Achievement[] = [
  {
    id: "achievement-1",
    title: "Full-Stack Portfolio Website",
    description: "Designed and developed a responsive portfolio with React, TypeScript, and Three.js integrations. Features interactive 3D maps and real-time animations.",
    image: "/moo1.png",
    category: "Web Development",
    date: "2024",
    tags: ["React", "TypeScript", "Three.js", "Tailwind CSS"],
    link: "https://github.com/username/portfolio"
  },
  {
    id: "achievement-2",
    title: "AI-Powered Resume Analyzer",
    description: "Built a machine learning service that extracts and matches resume content with job descriptions using NLP and vector embeddings.",
    image: "/moo2.png",
    category: "AI/ML",
    date: "2023",
    tags: ["Python", "FastAPI", "OpenAI", "PostgreSQL"],
    link: "https://github.com/username/resume-analyzer"
  },
  {
    id: "achievement-3",
    title: "Game Development with Unity",
    description: "Created a 2D platformer game with custom physics, particle effects, and level design. Published on itch.io with 500+ downloads.",
    image: "/moo3.png",
    category: "Game Dev",
    date: "2022",
    tags: ["Unity", "C#", "Blender", "Photoshop"],
    link: "https://itch.io/game"
  },
  {
    id: "achievement-4",
    title: "Open Source Contribution",
    description: "Contributed to popular open-source projects including React Native and Vite. Fixed bugs and improved documentation.",
    image: "/moo4.png",
    category: "Open Source",
    date: "2023",
    tags: ["Git", "GitHub", "Documentation", "Bug Fixes"],
    link: "https://github.com/react-native"
  },
  {
    id: "achievement-5",
    title: "UI/UX Design System",
    description: "Designed a comprehensive design system with reusable components, color palettes, and typography scales for enterprise applications.",
    image: "/moo5.png",
    category: "Design",
    date: "2024",
    tags: ["Figma", "Design Tokens", "Accessibility", "Prototyping"]
  },
  {
    id: "achievement-6",
    title: "Cloud Deployment Pipeline",
    description: "Set up CI/CD pipelines with GitHub Actions, Docker, and AWS ECS for automated deployment of microservices.",
    image: "/assets/girl/image1.png",
    category: "DevOps",
    date: "2023",
    tags: ["AWS", "Docker", "GitHub Actions", "Terraform"],
    link: "https://example.com"
  },
  {
    id: "achievement-7",
    title: "Mobile App for Health Tracking",
    description: "Developed a cross-platform mobile app for health monitoring using React Native, with real-time charts and push notifications.",
    image: "/assets/girl/image2.png",
    category: "Mobile",
    date: "2024",
    tags: ["React Native", "Firebase", "Chart.js", "Expo"]
  },
  {
    id: "achievement-8",
    title: "Data Visualization Dashboard",
    description: "Created an interactive dashboard for business analytics with D3.js and WebGL, handling large datasets with smooth animations.",
    image: "/assets/girl/image3.png",
    category: "Data Viz",
    date: "2023",
    tags: ["D3.js", "WebGL", "Python", "Dash"]
  },
  {
    id: "achievement-9",
    title: "Cybersecurity Certification",
    description: "Earned professional certification in cybersecurity fundamentals, covering network security, cryptography, and ethical hacking.",
    image: "/assets/girl/image4.png",
    category: "Certification",
    date: "2022",
    tags: ["Security", "Networking", "Cryptography", "Ethical Hacking"]
  }
];