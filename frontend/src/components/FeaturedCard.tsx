export default function FeaturedCard() {
  return (
    <div
      className="
        absolute inset-0
        rounded-[24px] md:rounded-[32px]
        bg-gradient-to-br from-red-500 via-red-600 to-rose-900
        p-5 sm:p-6 md:p-8
        text-white
        shadow-2xl
        overflow-hidden
      "
    >
      <div className="max-w-full sm:max-w-[70%] md:max-w-[58%]">
        {/* Badge */}
        <span
          className="
            inline-flex
            px-3 py-1 md:px-4
            mb-3 md:mb-4
            text-[10px] md:text-xs
            font-semibold
            rounded-full
            bg-white/20
          "
        >
          🔥 Featured
        </span>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
          Software Engineer
        </h2>

        {/* Description */}
        <p className="mt-3 md:mt-4 text-xs sm:text-sm text-white/90">
          Innovative and tech-savvy problem solver with strong leadership skills, specializing in fintech and technology .
        </p>

        {/* Stats */}
        <div
          className="
            grid
            grid-cols-3
            gap-4 sm:gap-6 md:gap-8
            mt-6 md:mt-8
          "
        >
          <div>
            <p className="text-lg sm:text-xl md:text-2xl font-bold">7+</p>
            <p className="text-[10px] sm:text-xs text-white/70">Work Experiences</p>
          </div>
          <div>
            <p className="text-lg sm:text-xl md:text-2xl font-bold">10+</p>
            <p className="text-[10px] sm:text-xs text-white/70">Achievements</p>
          </div>
        </div>
      </div>
    </div>
  );
}
