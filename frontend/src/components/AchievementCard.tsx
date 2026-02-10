import { motion } from "framer-motion";
import { ExternalLink, Calendar, Tag } from "lucide-react";
import type { Achievement } from "../data/achievements";

interface AchievementCardProps {
  achievement: Achievement;
  index: number;
}

export default function AchievementCard({ achievement, index }: AchievementCardProps) {
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut" as const
      }
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: { duration: 0.2 }
    }
  };

  const imageVariants = {
    hover: { scale: 1.1 }
  };

  return (
    <motion.div
      className="
        relative
        rounded-2xl
        bg-gradient-to-br from-gray-900 to-gray-800
        border border-gray-700
        overflow-hidden
        shadow-2xl
        h-full
        flex flex-col
      "
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
    >
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <motion.img
          src={achievement.image}
          alt={achievement.title}
          className="w-full h-full object-cover"
          variants={imageVariants}
          transition={{ duration: 0.3 }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="
            px-3 py-1
            text-xs font-semibold
            rounded-full
            bg-purple-600/80
            text-white
            backdrop-blur-sm
          ">
            {achievement.category}
          </span>
        </div>

        {/* Date Badge */}
        <div className="absolute top-4 right-4 flex items-center gap-1">
          <Calendar size={12} className="text-gray-300" />
          <span className="text-xs font-medium text-gray-300">
            {achievement.date}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-bold text-white mb-2">
          {achievement.title}
        </h3>
        
        <p className="text-gray-300 text-sm mb-4 flex-1">
          {achievement.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {achievement.tags.map((tag) => (
            <div
              key={tag}
              className="
                inline-flex items-center gap-1
                px-3 py-1
                text-xs
                rounded-full
                bg-gray-800
                text-gray-300
              "
            >
              <Tag size={10} />
              {tag}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto">
          {achievement.link ? (
            <motion.a
              href={achievement.link}
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex items-center gap-2
                px-4 py-2
                text-sm font-semibold
                rounded-lg
                bg-gradient-to-r from-purple-600 to-pink-600
                text-white
                hover:shadow-lg
              "
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Details
              <ExternalLink size={14} />
            </motion.a>
          ) : (
            <span className="text-sm text-gray-400">No link available</span>
          )}
          
          <motion.div
            className="
              w-8 h-8
              rounded-full
              bg-gradient-to-r from-blue-500 to-cyan-400
              flex items-center justify-center
              text-white text-sm font-bold
            "
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            {index + 1}
          </motion.div>
        </div>
      </div>

      {/* Glow Effect */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );
}