import { motion } from "framer-motion";
import AppLayout from "./AppLayout";
import StarFollower from "../components/StarFollower";
import AchievementCard from "../components/AchievementCard";
import { achievements } from "../data/achievements";

export default function Achievements() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  const statsVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.6, delay: 0.4 },
    },
    hover: { scale: 1.05 },
  };

  return (
    <AppLayout variant="default">
      {/* ⭐ Cursor Effect */}
      <StarFollower />

      {/* MAIN CONTENT */}
      <motion.div
        className="px-4 md:px-10 py-6"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Page Header */}
        <motion.div className="mb-10 text-center" variants={itemVariants}>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            My Achievements
          </h1>
          <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">
            A collection of milestones, projects, and accomplishments that showcase my journey in software development and design.
          </p>
        </motion.div>

        {/* Achievements Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
        >
          {achievements.map((achievement, index) => (
            <AchievementCard
              key={achievement.id}
              achievement={achievement}
              index={index}
            />
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="mt-16 p-8 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-gray-700"
          variants={statsVariants}
          whileHover="hover"
        >
          <h2 className="text-2xl font-bold mb-6 text-white">Achievement Stats</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: achievements.length, label: "Total Achievements", color: "text-purple-400" },
              { value: 5, label: "Certifications", color: "text-green-400" },
              { value: "12+", label: "Projects Completed", color: "text-blue-400" },
              { value: 3, label: "Years Experience", color: "text-yellow-400" },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                className="text-center p-4 bg-gray-800/50 rounded-xl"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className={`text-3xl font-bold ${stat.color}`}>{stat.value}</div>
                <div className="text-gray-300">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="mt-12 text-center"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
        >
          <p className="text-gray-400 mb-6">
            Want to collaborate on something amazing? Let's connect!
          </p>
          <motion.button
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold"
            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(168, 85, 247, 0.4)" }}
            whileTap={{ scale: 0.95 }}
          >
            Get In Touch
          </motion.button>
        </motion.div>
      </motion.div>
    </AppLayout>
  );
}