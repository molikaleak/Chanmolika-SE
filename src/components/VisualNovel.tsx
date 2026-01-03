import { useEffect, useState } from "react";
import { storyScript, type StoryScene } from "../data/storyScript";

const TYPING_SPEED = 26;

export default function VisualNovel() {
  const [cameraZ, setCameraZ] = useState(0);
  const [sceneIndex, setSceneIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  const scene: StoryScene = storyScript[sceneIndex];

  // 🎥 Move camera forward
  const moveForward = () => {
    if (isTyping) {
      setDisplayedText(scene.dialogue);
      setIsTyping(false);
      return;
    }

    const next = storyScript[sceneIndex + 1];
    if (!next) return;

    setCameraZ(next.cameraZ);
    setSceneIndex(sceneIndex + 1);
  };

  // ⌨️ Typewriter
  useEffect(() => {
    setDisplayedText("");
    setIsTyping(true);

    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText((p) => p + scene.dialogue[i]);
      i++;
      if (i >= scene.dialogue.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, TYPING_SPEED);

    return () => clearInterval(interval);
  }, [sceneIndex]);

  return (
  <div
    onClick={moveForward}
    className="fixed inset-0 bg-black overflow-hidden select-none"
  >
    {/* 🌑 BACKGROUND */}
    <div className="absolute inset-0 bg-gradient-to-b from-[#0b0b0d] via-[#0a0a0c] to-black" />

    {/* 🌑 VIGNETTE */}
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_35%,rgba(0,0,0,0.85)_80%)]" />

    {/* 🌸 CHARACTER STAGE */}
    <div className="absolute inset-0 flex items-end justify-center pb-32">
      <div
        className="
          w-[320px] h-[480px]
          sm:w-[360px] sm:h-[520px]
          md:w-[420px] md:h-[620px]
          overflow-hidden
          rounded-lg
          shadow-[0_40px_120px_rgba(0,0,0,0.9)]
        "
      >
        <img
          src={scene.image}
          alt={scene.character}
          className="w-full h-full object-cover object-center"
        />
      </div>
    </div>

    {/* 💬 STORY PANEL */}
    <div className="absolute bottom-0 w-full">
      <div
        className="
          mx-auto
          max-w-4xl
          px-6 py-6
          bg-black/70 backdrop-blur-xl
          border-t border-white/10
        "
      >
        <p className="text-pink-400 text-sm font-semibold mb-2">
          {scene.character}
        </p>

        <p className="text-white text-base sm:text-lg leading-relaxed min-h-[4.5rem]">
          {displayedText}
          {isTyping && <span className="animate-pulse">▌</span>}
        </p>

        {!isTyping && scene.skills.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {scene.skills.map((skill) => (
              <span
                key={skill}
                className="
                  px-3 py-1 text-xs rounded-full
                  bg-pink-500/15 text-pink-300
                  border border-pink-400/30
                "
              >
                {skill}
              </span>
            ))}
          </div>
        )}

        {!isTyping && (
          <p className="mt-4 text-xs text-gray-400 animate-pulse text-right">
            Tap to continue
          </p>
        )}
      </div>
    </div>
  </div>
);
}