import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function GitHubActivityCard() {
  return (
    <div
      className="
        relative
        w-full
        rounded-3xl
        bg-gradient-to-br from-[#160407] via-[#3b0f14] to-[#5a141b]
        p-5
        border border-white/10
        shadow-[0_20px_60px_rgba(0,0,0,0.5)]
        overflow-hidden
      "
    >
      {/* GLOW */}
      <div className="absolute inset-0 pointer-events-none bg-red-500/5 blur-2xl" />

      {/* HEADER */}
      <div className="relative z-10 flex items-center justify-between mb-3">
        <div>
          <h3 className="text-sm font-bold text-white tracking-wide">
            🧑‍💻 GitHub Quest Log
          </h3>
          <p className="text-[11px] text-white/70">
            365 contributions · Last 12 months
          </p>
        </div>

        {/* LEVEL BADGE */}
        <div
          className="
            px-3 py-1
            rounded-full
            bg-red-500/20
            border border-red-400/30
            text-[11px]
            font-semibold
            text-red-300
          "
        >
          Lv. 42
        </div>
      </div>

      {/* XP BAR */}
      <div className="relative z-10 mb-4">
        <div className="h-2 rounded-full bg-black/40 overflow-hidden">
          <div
            className="
              h-full
              w-[78%]
              rounded-full
              bg-gradient-to-r from-red-500 via-pink-500 to-red-400
              animate-[xpfill_1.2s_ease-out_forwards]
            "
          />
        </div>
        <p className="mt-1 text-[10px] text-white/60">
          XP Progress · Active Developer
        </p>
      </div>

      {/* GITHUB GRAPH */}
      <div className="relative z-10 overflow-x-auto">
        <img
          src="https://ghchart.rshah.org/molikaleak"
          alt="GitHub contribution graph"
          className="
            min-w-[720px]
            brightness-90
            saturate-150
            hue-rotate-[-120deg]
          "
        />

        {/* RED TINT OVERLAY */}
        <div className="absolute inset-0 pointer-events-none bg-red-500/5" />
      </div>

      {/* FOOTER */}
      <div className="relative z-10 mt-4 flex flex-col gap-2">
        <span className="text-[10px] text-white/60">
          Quest type: Private + Public Repositories
        </span>

        {/* SOCIAL ICON HUD */}
        <div className="flex items-center gap-3">
          <span className="text-[10px] text-white/50 mr-1">
            Connect ▸
          </span>

          {/* GitHub */}
          <a
            href="https://github.com/molikaleak"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub"
            className="
              text-red-300
              hover:text-red-200
              transition
              hover:drop-shadow-[0_0_6px_rgba(255,80,90,0.8)]
            "
          >
            <FaGithub size={14} />
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/chanmolika-leak-a8a783265/?isSelfProfile=true"
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn"
            className="
              text-red-300
              hover:text-red-200
              transition
              hover:drop-shadow-[0_0_6px_rgba(255,80,90,0.8)]
            "
          >
            <FaLinkedin size={14} />
          </a>

          {/* Email */}
          <a
            href="mailto:chanmolikaleak171@gmail.com"
            title="Email"
            className="
              text-red-300
              hover:text-red-200
              transition
              hover:drop-shadow-[0_0_6px_rgba(255,80,90,0.8)]
            "
          >
            <FaEnvelope size={14} />
          </a>
        </div>
      </div>

      {/* SCANLINE EFFECT */}
      <div
        className="
          absolute inset-0
          pointer-events-none
          bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)]
          bg-[size:100%_6px]
          opacity-20
        "
      />
    </div>
  );
}
