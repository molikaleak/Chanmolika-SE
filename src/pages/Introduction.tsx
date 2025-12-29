import FeaturedCard from "../components/FeaturedCard";
import CharacterLayer from "../components/CharacterLayer";
import SkillCard from "../components/SkillCard";
import Sidebar from "../components/Sidebar";
import SkillDetailSection from "../components/SkillDetailSection";
import GitHubActivityCard from "../components/GitHubActivityCard";
import StarFollower from "../components/StarFollower";

export default function Introduction() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-100 to-rose-200 flex relative">
      {/* ⭐ Cursor Effect */}
      <StarFollower />

      {/* LEFT SIDEBAR */}
      <aside
        className="
          fixed
          md:static
          left-0
          top-1/2
          -translate-y-1/2
          md:translate-y-0
          md:top-auto
          z-20
          ml-5
          mr-5
          my-5
        "
      >
        <Sidebar />
      </aside>

      {/* MAIN CONTENT */}
      <main
        className="
          w-full
          pl-[120px]
          md:pl-0
          px-4
          md:px-10
          py-6
        "
      >
        {/* ROW 1 — MAIN CARDS */}
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-[1.6fr_1fr_1.2fr]
            gap-8
            items-start
          "
        >
          {/* FEATURED */}
          <div className="relative h-80 md:h-96">
            <FeaturedCard />
            <CharacterLayer />
          </div>

          {/* SKILL TREE */}
          <SkillCard />

          {/* SKILL DETAILS */}
          <SkillDetailSection />
        </div>

        {/* ROW 2 — GITHUB ACTIVITY */}
        <div className="mt-10">
          <GitHubActivityCard />
        </div>
      </main>
    </div>
  );
}
