"use client";

import { motion } from "framer-motion";
import { BarChart, Bookmark, Search, Smartphone, TagIcon, Users } from "lucide-react";


const Features = () => {
  const features = [
    {
      title: "Capture Everything",
      description:
        "Save links, articles, and resources from anywhere on the web with a single click.",
      icon: <Bookmark className="h-6 w-6 text-indigo-600" />,
    },
    {
      title: "Organize Effortlessly",
      description:
        "Use tags and categories to keep your knowledge structured and easy to find.",
      icon: <TagIcon className="h-6 w-6 text-indigo-600" />,
    },
    {
      title: "Smart Search",
      description:
        "Find what you need instantly with our powerful search functionality.",
      icon: <Search className="h-6 w-6 text-indigo-600" />,
    },
    {
      title: "Cross-Device Sync",
      description:
        "Access your knowledge from any device, anywhere, anytime.",
      icon: <Smartphone className="h-6 w-6 text-indigo-600" />,
    },
    {
      title: "Visual Dashboards",
      description:
        "Get insights into your knowledge with beautiful visualizations and stats.",
      icon: <BarChart className="h-6 w-6 text-indigo-600" />,
    },
    {
      title: "Collaborate & Share",
      description:
        "Work together with friends or colleagues on shared knowledge bases.",
      icon: <Users className="h-6 w-6 text-indigo-600" />,
    },
  ];

  return (
    <section
      id="features"
      className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900 rounded-t-3xl"
    >
      <div className="text-center max-w-3xl mx-auto mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          Powerful Features to{" "}
          <span className="text-indigo-600">Organize Your Mind</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-lg text-slate-600 dark:text-slate-300"
        >
          Brainly gives you the tools to capture, organize, and rediscover your
          digital knowledge effortlessly.
        </motion.p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="bg-white dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 hover:shadow-lg transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mb-4">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">
              {feature.title}
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Features;
