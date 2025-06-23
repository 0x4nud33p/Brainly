import { motion } from 'framer-motion';
import { Link, ArrowRight, Star, Search, LayoutDashboard, Folder, Globe, Smartphone, BookOpen, BarChart, Zap, Users } from 'lucide-react';
import React from 'react'

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

export const Hero = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial="initial"
          animate="animate"
          variants={stagger}
          className="md:order-1"
        >
          <motion.div {...fadeInUp} className="mb-6">
            <span className="inline-block bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-sm font-medium px-4 py-1.5 rounded-full">
              Organize your digital life ✨
            </span>
          </motion.div>

          <motion.h1
            {...fadeInUp}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
          >
            Your Second Brain for <br />
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Digital Knowledge
            </span>
          </motion.h1>

          <motion.p
            {...fadeInUp}
            className="text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-xl"
          >
            Brainly helps you capture, organize, and rediscover your digital
            knowledge. Save links, articles, and resources effortlessly in one
            central hub.
          </motion.p>

          <motion.div {...fadeInUp} className="flex flex-col sm:flex-row gap-4">
            <Link href="/dashboard" className="w-full sm:w-auto">
              <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-medium flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-indigo-200 dark:hover:shadow-indigo-900/30 transition-all">
                Start Organizing
                <ArrowRight className="h-5 w-5" />
              </button>
            </Link>

            <a href="#video" className="w-full sm:w-auto">
              <button className="w-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-8 py-4 rounded-xl font-medium flex items-center justify-center gap-2 hover:shadow-lg transition-all border border-slate-200 dark:border-slate-700">
                <span>Watch Demo</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-indigo-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </a>
          </motion.div>

          <motion.div {...fadeInUp} className="mt-12 flex flex-wrap gap-8">
            {[
              { value: "10k+", label: "Active Users" },
              { value: "5M+", label: "Links Saved" },
              {
                value: "4.8/5",
                label: "User Rating",
                icon: (
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                ),
              },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                {item.icon && item.icon}
                <div>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">
                    {item.value}
                  </p>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                    {item.label}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative md:order-2"
        >
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10 animate-blob"></div>
          <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10 animate-blob animation-delay-2000"></div>

          <div className="relative bg-white dark:bg-slate-900 rounded-3xl shadow-xl overflow-hidden border border-slate-100 dark:border-slate-800">
            <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <div className="bg-slate-100 dark:bg-slate-800 rounded-lg px-4 py-1.5 text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2">
                <Search className="h-4 w-4" />
                <p className="hidden sm:block">Search your brain...</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
                <span className="text-white text-xs font-bold">JS</span>
              </div>
            </div>

            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                {
                  icon: <LayoutDashboard className="h-5 w-5 text-indigo-600" />,
                  title: "Dashboard",
                  color: "bg-indigo-100 dark:bg-indigo-900/30",
                },
                {
                  icon: <Folder className="h-5 w-5 text-purple-600" />,
                  title: "Collections",
                  color: "bg-purple-100 dark:bg-purple-900/30",
                },
                {
                  icon: <Globe className="h-5 w-5 text-blue-600" />,
                  title: "Web Clipper",
                  color: "bg-blue-100 dark:bg-blue-900/30",
                },
                {
                  icon: <Smartphone className="h-5 w-5 text-green-600" />,
                  title: "Mobile App",
                  color: "bg-green-100 dark:bg-green-900/30",
                },
                {
                  icon: <BookOpen className="h-5 w-5 text-amber-600" />,
                  title: "Reading List",
                  color: "bg-amber-100 dark:bg-amber-900/30",
                },
                {
                  icon: <BarChart className="h-5 w-5 text-rose-600" />,
                  title: "Insights",
                  color: "bg-rose-100 dark:bg-rose-900/30",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`p-4 rounded-xl ${item.color} flex items-center gap-3 hover:translate-y-[-4px] transition-transform cursor-pointer`}
                >
                  {item.icon}
                  <span className="font-medium text-slate-800 dark:text-slate-200">
                    {item.title}
                  </span>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex justify-between text-sm text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-indigo-500" />
                <span>Quick Save</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-purple-500" />
                <span>Share</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
