export type CharacterPosition = "left" | "right" | "center";

export type CharacterExpression =
  | "soft"
  | "thinking"
  | "focused"
  | "confident"
  | "serious"
  | "tired"
  | "determined"
  | "happy"
  | "leader"
  | "mastery";

export interface StoryScene {
  id: number;
  character: string;
  expression: CharacterExpression;
  image: string;
  position: CharacterPosition;
  dialogue: string;
  skills: string[];
  glow: boolean;
  cameraZ: number;
}

export const storyScript: StoryScene[] = [
  {
    id: 1,
    character: "Moo",
    expression: "soft",
    image: "/assets/girl/image1.png",
    position: "center",
    dialogue:
      "At the beginning, I was just curious. I didn't know what I wanted to become, but I knew I loved creating things.",
    skills: [],
    glow: false,
    cameraZ: 0,
  },
  {
    id: 2,
    character: "Moo",
    expression: "thinking",
    image: "/assets/girl/image2.png",
    position: "left",
    dialogue:
      "I started learning how the web works. Every small success felt like magic.",
    skills: ["HTML", "CSS", "JavaScript"],
    glow: true,
    cameraZ: -8,
  },
  {
    id: 3,
    character: "Moo",
    expression: "focused",
    image: "/assets/girl/image3.png",
    position: "right",
    dialogue:
      "When things broke, I didn't give up. I learned how to debug, one error at a time.",
    skills: ["Problem Solving", "Debugging"],
    glow: true,
    cameraZ: -18,
  },
  {
    id: 4,
    character: "Moo",
    expression: "confident",
    image: "/assets/girl/image4.png",
    position: "right",
    dialogue:
      "I fell in love with building interfaces that feel alive, smooth, and meaningful.",
    skills: ["React", "UI Design", "Animations"],
    glow: true,
    cameraZ: -28,
  },
  {
    id: 5,
    character: "Moo",
    expression: "serious",
    image: "/assets/girl/image5.png",
    position: "left",
    dialogue:
      "Behind the scenes, I learned how systems talk to each other and how data flows.",
    skills: ["Backend", "API Design", "Databases"],
    glow: true,
    cameraZ: -40,
  },
  {
    id: 6,
    character: "Moo",
    expression: "tired",
    image: "/assets/girl/image6.png",
    position: "left",
    dialogue:
      "There were nights I felt stuck. But every challenge made me stronger.",
    skills: ["Resilience", "Self-learning"],
    glow: false,
    cameraZ: -54,
  },
  {
    id: 7,
    character: "Moo",
    expression: "determined",
    image: "/assets/girl/image7.png",
    position: "right",
    dialogue:
      "I began structuring my code, thinking about scalability and clarity.",
    skills: ["Clean Code", "Architecture"],
    glow: true,
    cameraZ: -70,
  },
  {
    id: 8,
    character: "Moo",
    expression: "happy",
    image: "/assets/girl/image8.png",
    position: "right",
    dialogue:
      "Working with others taught me how important communication and empathy are.",
    skills: ["Teamwork", "Communication"],
    glow: true,
    cameraZ: -86,
  },
  {
    id: 9,
    character: "Moo",
    expression: "leader",
    image: "/assets/girl/image9.png",
    position: "left",
    dialogue:
      "I learned how to guide projects, make decisions, and take responsibility.",
    skills: ["Leadership", "Ownership"],
    glow: true,
    cameraZ: -104,
  },
  {
    id: 10,
    character: "Moo",
    expression: "mastery",
    image: "/assets/girl/image10.png",
    position: "center",
    dialogue:
      "This is not the end of my story. I'm still learning, still growing, and still dreaming.",
    skills: ["Full-Stack", "Problem Solver", "Creative Thinker"],
    glow: true,
    cameraZ: -130,
  },
];