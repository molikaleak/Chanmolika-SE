import FeaturedCard from "../components/FeaturedCard";
import CharacterLayer from "../components/CharacterLayer";
import SkillCard from "../components/SkillCard";
import SkillDetailSection from "../components/SkillDetailSection";
import GitHubActivityCard from "../components/GitHubActivityCard";
import StarFollower from "../components/StarFollower";
import AppLayout from "./AppLayout";

export default function Introduction() {
  return (
    <AppLayout variant="default">
      {/* ⭐ Cursor Effect */}
      <StarFollower />

      {/* MAIN CONTENT */}
      <div
        className="
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
      </div>
    </AppLayout>
  );
}
