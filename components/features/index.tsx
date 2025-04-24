"use client";

import { motion } from "framer-motion";
import FeatureCard from "../FeatureCard";
import { Bookmark, Clock, TagIcon } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const Features = () => {
  const features = [
    {
      icon: <Bookmark className="w-8 h-8 text-slate-900 dark:text-white" />,
      title: "Smart Bookmarks",
      description:
        "Automatic categorization with AI-powered link analysis and rich previews.",
    },
    {
      icon: <TagIcon className="w-8 h-8 text-slate-900 dark:text-white" />,
      title: "Smart Tagging",
      description:
        "Auto-generate and manage tags for better link organization and filtering.",
    },
    {
      icon: <Clock className="w-8 h-8 text-slate-900 dark:text-white" />,
      title: "Read Later",
      description:
        "Mark links to revisit anytime and organize them by urgency or category.",
    },
  ];

  return (
    <section className="bg-white dark:bg-slate-950 py-24 px-6">
      <div className="max-w-7xl mx-auto text-center mb-20">
        <motion.h2
          {...fadeInUp}
          className="text-4xl font-bold mb-4 text-slate-900 dark:text-white"
        >
          Supercharge Your Productivity
        </motion.h2>
        <motion.p
          {...fadeInUp}
          className="text-slate-600 dark:text-slate-300 text-lg"
        >
          Designed for focus, built for modern workflows
        </motion.p>
      </div>

      <motion.div
        initial="initial"
        animate="animate"
        variants={stagger}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
      >
        {features.map((f, i) => (
          <FeatureCard key={i} {...f} />
        ))}
      </motion.div>
    </section>
  );
};

export default Features;
