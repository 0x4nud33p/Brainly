"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Bookmark
} from "lucide-react";
import Link from "next/link";
import React from "react";
import { Hero } from "../hero/Hero";
import Features from "../features/Features";
import Footer from "../footer/Footer";
import Video from "../video/VideoComponent";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
      <header className="px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
            <Bookmark className="h-6 w-6 text-white" />
          </div>
          <h1 className="hidden sm:block text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-500 bg-clip-text text-transparent">
            Brainly
          </h1>
        </motion.div>

        <div className="flex items-center gap-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="hidden md:flex gap-6 text-slate-700 dark:text-slate-300"
          >
            <Link
              href="#features"
              className="hover:text-indigo-600 transition-colors"
            >
              Features
            </Link>
            <Link
              href="#video"
              className="hover:text-indigo-600 transition-colors"
            >
              Demo
            </Link>
            <Link
              href="#cta"
              className="hover:text-indigo-600 transition-colors"
            >
              Pricing
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Link
              href="/dashboard"
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2.5 rounded-xl font-medium flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-indigo-200 dark:hover:shadow-indigo-900/30 transition-all"
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </header>

      {/* Hero Section */}
      <Hero />

      {/* Video Demo Section */}
      <section
        id="video"
        className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
      >
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            See Brainly in{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Action
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 dark:text-slate-300"
          >
            Watch how Brainly transforms how you save, organize, and rediscover
            knowledge.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl blur-3xl -z-10"></div>
          <Video />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          {[
            {
              icon: "🚀",
              title: "One-click saving",
              desc: "Save from any browser or device",
            },
            {
              icon: "📚",
              title: "Smart organization",
              desc: "AI-powered tagging & sorting",
            },
            {
              icon: "🔍",
              title: "Instant search",
              desc: "Find anything in seconds",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white dark:bg-slate-800/50 p-5 rounded-xl border border-slate-100 dark:border-slate-700"
            >
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="font-bold text-lg mb-1">{item.title}</h3>
              <p className="text-slate-600 dark:text-slate-300">{item.desc}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Features Section */}
      <Features />

      {/* CTA Section */}
      <section
        id="cta"
        className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto"
      >
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl p-8 md:p-12 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            Ready to Organize Your Digital Life?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-indigo-100 max-w-2xl mx-auto mb-8"
          >
            Join thousands of users who have transformed how they save and
            organize knowledge with Brainly.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/dashboard"
              prefetch={true}
              className="w-full sm:w-auto"
            >
              <button className="w-full sm:w-auto bg-white text-indigo-600 hover:bg-slate-100 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all text-sm sm:text-base">
                Get Started Free
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </Link>

            <a href="#video" className="w-full sm:w-auto">
              <button className="w-full bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all">
                Watch Demo
              </button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
