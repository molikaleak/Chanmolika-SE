import type { ThemeKey } from "../../data/jobLocations";

interface Experience {
  title: string;
  company: string;
  image: string;
  description: string;
  period?: string;
  tags?: string[];
  theme?: ThemeKey;
}

interface Props {
  experience: Experience;
  onBack: () => void;
}

const THEME_MAP = {
  red: {
    border: "border-red-500/40",
    text: "text-red-100",
    subText: "text-red-400",
    divider: "bg-red-500/40",
    tagBorder: "border-red-500/40",
    button: "bg-red-500 text-black",
  },
  purple: {
    border: "border-purple-400/40",
    text: "text-purple-100",
    subText: "text-purple-400",
    divider: "bg-purple-400/40",
    tagBorder: "border-purple-400/40",
    button: "bg-purple-400 text-black",
  },
  green: {
    border: "border-lime-400/40",
    text: "text-lime-100",
    subText: "text-lime-400",
    divider: "bg-lime-400/40",
    tagBorder: "border-lime-400/40",
    button: "bg-lime-400 text-black",
  },
  blue: {
    border: "border-blue-400/40",
    text: "text-blue-100",
    subText: "text-blue-400",
    divider: "bg-blue-400/40",
    tagBorder: "border-blue-400/40",
    button: "bg-blue-400 text-black",
  },
  pink: {
    border: "border-pink-500/40",
    text: "text-pink-100",
    subText: "text-pink-400",
    divider: "bg-pink-500/40",
    tagBorder: "border-pink-500/40",
    button: "bg-pink-500 text-black",
  },
} as const;

export default function ExperiencePopup({ experience, onBack }: Props) {
  const theme = THEME_MAP[experience.theme ?? "red"];

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className={`relative flex gap-6 bg-black/80 rounded-xl p-6 max-w-[900px] border ${theme.border}`}>
        <img
          src={experience.image}
          alt={experience.title}
          className={`w-[260px] md:w-[320px] rounded-lg border ${theme.border}`}
        />

        <div className={`flex-1 ${theme.text}`}>
          <h2 className={`text-sm tracking-widest font-bold ${theme.subText}`}>
            EXPERIENCE PROFILE
          </h2>

          <h3 className="text-2xl font-semibold mt-2">
            {experience.title}
          </h3>

          <p className={`text-sm ${theme.subText}`}>
            {experience.company}
            {experience.period && ` • ${experience.period}`}
          </p>

          <div className={`my-4 h-px ${theme.divider}`} />

          <p className="text-sm">{experience.description}</p>

          {experience.tags && (
            <div className="mt-4 flex gap-2 flex-wrap">
              {experience.tags.map((tag) => (
                <span
                  key={tag}
                  className={`text-xs px-2 py-1 rounded-md border ${theme.tagBorder}`}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <button
            onClick={onBack}
            className={`mt-6 px-5 py-2 font-bold rounded-md ${theme.button}`}
          >
            ◀ BACK TO MAP
          </button>
        </div>
      </div>
    </div>
  );
}
