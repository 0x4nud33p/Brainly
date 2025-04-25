"use client";

import { motion } from "framer-motion";
import { ArrowRight, Bookmark } from "lucide-react";
import Link from "next/link";

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

const LandingPage = () => {
  return (
    <section className="min-h-screen bg-white dark:bg-slate-950 flex items-center px-6">
      <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-16 items-center py-20">
        <motion.div initial="initial" animate="animate" variants={stagger}>
          <motion.span
            {...fadeInUp}
            className="mb-4 inline-block bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-medium px-4 py-1.5 rounded-full"
          >
            Organize your digital life
          </motion.span>

          <motion.h1
            {...fadeInUp}
            className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-pink-400"
          >
            Save links, <br />
            <span className="bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
              organize thoughts
            </span>
          </motion.h1>

          <motion.p
            {...fadeInUp}
            className="text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-xl"
          >
            Brainly helps you save, organize, and revisit all your important
            links in one place. The smart way to bookmark.
          </motion.p>

          <motion.div {...fadeInUp} className="flex flex-col sm:flex-row gap-4">
            <Link href="/dashboard" className="w-full"> 
              <button className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-medium flex items-center justify-center hover:bg-indigo-700 transition-transform transform hover:-translate-y-1 shadow-lg hover:shadow-indigo-200">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </Link>
          </motion.div>

          <motion.div {...fadeInUp} className="mt-12 grid grid-cols-3 gap-8">
            {[
              { value: "10k+", label: "Users" },
              { value: "5M+", label: "Links Saved" },
              { value: "4.8/5", label: "User Rating" },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {item.value}
                </p>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                  {item.label}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center relative"
        >
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8 flex flex-col justify-between space-y-6 transform hover:scale-[1.02] transition-transform">
            <div className="space-y-4">
              <div className="bg-slate-100 dark:bg-slate-700 h-8 w-full rounded-lg animate-pulse"></div>
              <div className="bg-slate-100 dark:bg-slate-700 h-6 w-3/4 rounded-lg"></div>
              <div className="bg-slate-100 dark:bg-slate-700 h-6 w-5/6 rounded-lg"></div>
            </div>
            <div className="flex justify-between text-sm text-slate-500 dark:text-slate-400 pt-6 border-t border-slate-100 dark:border-slate-800">
              {["Videos", "Articles", "Watch Later"].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 hover:text-indigo-600 transition-colors"
                >
                  <Bookmark className="h-4 w-4" /> {item}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LandingPage;
