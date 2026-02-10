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
    title: "CamTech Idea Competition – Top 1",
    description: "Project addressed educational challenges in Cambodia. Introduced innovative revenue model. Developed a STEM app emphasizing hands-on practice with experiments using computers and smart devices.",
    image: "/archivment/cic.png",
    category: "Competition",
    date: "2023",
    tags: ["Education", "STEM", "Innovation", "App Development"]
  },
  {
    id: "achievement-2",
    title: "KonektAgri Hackathon – Top 1",
    description: "Role: Team leader and presenter. Focused on agriTech. Introduced an innovative solution combining branding and business intelligence for the agriculture market.",
    image: "/archivment/agri.png",
    category: "Hackathon",
    date: "2023",
    tags: ["AgriTech", "Business Intelligence", "Team Leadership", "Presentation"]
  },
  {
    id: "achievement-3",
    title: "Incubation Innovation – Runner-up",
    description: "Boba developed a mobile POS solution for online sellers. Selected as runner-up. Participated in a three-month incubation program focused on startups and entrepreneurship.",
    image: "/archivment/ino.png",
    category: "Startup",
    date: "2023",
    tags: ["POS", "Mobile App", "Incubation", "Entrepreneurship"]
  },
  {
    id: "achievement-4",
    title: "Reverse Innovation – Top 2",
    description: "Team worked on promoting banking popularity. Created game-changing products. Introduced new features tailored for Gen Z with focus on UX and UI design.",
    image: "/archivment/RI.png",
    category: "Innovation",
    date: "2023",
    tags: ["Banking", "Gen Z", "UX/UI", "Product Design"]
  },
  {
    id: "achievement-5",
    title: "Canadia Hackathon – Top 3",
    description: "Participated in Canadia Hackathon 2023, achieving top 3 position with innovative solution in fintech/banking sector.",
    image: "/archivment/boba.png",
    category: "Hackathon",
    date: "2023",
    tags: ["Fintech", "Banking", "Hackathon", "Innovation"]
  },
  {
    id: "achievement-6",
    title: "FIRST Global Challenge – Top 10",
    description: "Participated during COVID-19 pandemic. Team of 12 students from E2STEM Preah Yukunthor High School. Achieved 10th place among 175 countries in international robotics competition.",
    image: "/archivment/fgc.png",
    category: "Robotics",
    date: "2020",
    tags: ["Robotics", "STEM", "International", "Team Competition"]
  },
  {
    id: "achievement-9",
    title: "Professional 3D Design – Siemens",
    description: "Completed professional 3D design course. Designed a drone car project, applying creativity and technical skills.",
    image: "/archivment/3d.png",
    category: "Design",
    date: "2022",
    tags: ["3D Design", "CAD", "Siemens", "Engineering"]
  },

];