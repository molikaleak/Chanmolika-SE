import { Trophy, MapPin, Calendar, Star } from "lucide-react";

type QuestCardProps = {
  title: string;
  company: string;
  year: string;
  type?: "MAIN QUEST" | "SIDE QUEST";
  objectives: string[];
  rewards: string[];
};

export default function QuestCard({
  title,
  company,
  year,
  type = "MAIN QUEST",
  objectives,
  rewards,
}: QuestCardProps) {
  return (
    <div
      className="
        relative
        w-full
        max-w-xl
        rounded-3xl
        bg-gradient-to-br from-[#1a0508] via-[#3b0f14] to-[#5a141b]
        p-6
        text-white
        shadow-[0_25px_70px_rgba(0,0,0,0.55)]
        border border-white/10
        overflow-hidden
      "
    >
      {/* Quest Badge */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className="
            px-3 py-1
            rounded-full
            text-xs font-bold tracking-wide
            bg-red-500/20 text-red-300
          "
        >
          {type}
        </div>
        <span className="text-xs text-white/50 flex items-center gap-1">
          <Calendar size={12} />
          {year}
        </span>
      </div>

      {/* Quest Title */}
      <h3 className="text-xl font-bold mb-1">
        🎯 {title}
      </h3>

      <div className="text-sm text-white/70 mb-4 flex items-center gap-1">
        <MapPin size={14} />
        {company}
      </div>

      {/* Objectives */}
      <div className="mb-5">
        <p className="text-xs uppercase tracking-wide text-white/50 mb-2">
          Objectives Completed
        </p>
        <ul className="space-y-2 text-sm">
          {objectives.map((item, idx) => (
            <li key={idx} className="flex gap-2">
              <Star size={14} className="text-red-400 mt-[2px]" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Rewards */}
      <div>
        <p className="text-xs uppercase tracking-wide text-white/50 mb-2">
          Rewards Unlocked
        </p>
        <div className="flex flex-wrap gap-2">
          {rewards.map((reward, idx) => (
            <span
              key={idx}
              className="
                px-3 py-1
                rounded-full
                text-xs
                bg-white/10
                border border-white/10
              "
            >
              +{reward}
            </span>
          ))}
        </div>
      </div>

      {/* Glow */}
      <div
        className="
          pointer-events-none
          absolute -inset-1
          rounded-3xl
          bg-gradient-to-r from-red-500/20 to-rose-600/20
          blur-xl
          opacity-30
        "
      />
    </div>
  );
}
