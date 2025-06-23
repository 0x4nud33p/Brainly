"use client";

import { motion } from "framer-motion";
import { Github, Twitter, Mail, Bookmark } from "lucide-react";
import Link from "next/link";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const Footer = () => {
  return (
    <footer className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center text-slate-500 dark:text-slate-400 text-sm">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center gap-3 mb-4 md:mb-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
            <Bookmark className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold bg-gradient-to-r from-indigo-600 to-purple-500 bg-clip-text text-transparent">
            Brainly
          </span>
        </div>

        <div className="mb-4 md:mb-0">
          © {new Date().getFullYear()} Brainly. All rights reserved.
        </div>

        <div className="flex gap-4">
          <Link href="#" className="hover:text-indigo-600 transition-colors">
            Privacy
          </Link>
          <Link href="#" className="hover:text-indigo-600 transition-colors">
            Terms
          </Link>
          <Link href="#" className="hover:text-indigo-600 transition-colors">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
