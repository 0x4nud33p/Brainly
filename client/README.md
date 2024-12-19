# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGithub } from 'react-icons/fa';
import { HiOutlineMenuAlt1, HiOutlineX } from 'react-icons/hi';
import { motion } from 'framer-motion';
import { FaLightbulb } from "react-icons/fa";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const blogLinks = [
    { name: 'Collections', path: '/content' },
  ];

  const variants = {
    open: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.3, ease: 'easeOut' },
    },
    closed: {
      x: '-100%',
      opacity: 0,
      transition: { duration: 0.3, ease: 'easeIn' },
    },
  };

  return (
    <nav className="bg-gray-900 fixed w-full top-0 z-10">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
     
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-gray-300 hover:bg-[#61669B] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <HiOutlineX className="block h-6 w-6" />
              ) : (
                <HiOutlineMenuAlt1 className="block h-6 w-6" />
              )}
              <span className="sr-only">
                {isMenuOpen ? 'Close menu' : 'Open menu'}
              </span>
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0">
              <Link to="/">
                <FaLightbulb className="text-white h-8 w-8" />
              </Link>
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                {blogLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="text-white hover:bg-[#292c3e] hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <a
              href="https://github.com/anudeep009/Brainly"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 ml-4 rounded-full text-white hover:text-gray-300"
            >
              <FaGithub className="h-6 w-6" />
              <span className="sr-only">GitHub</span>
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Menu (Animated) */}
      <motion.div
        variants={variants}
        animate={isMenuOpen ? 'open' : 'closed'}
        className={`px-2 pt-2 pb-3 space-y-1 sm:hidden ${
          isMenuOpen ? 'block' : 'hidden'
        }`}
        id="mobile-menu"
      >
        {blogLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className="text-white hover:bg-[#292c3e] hover:text-gray-300 block px-3 py-2 rounded-md text-base font-medium"
          >
            {link.name}
          </Link>
        ))}
      </motion.div>
    </nav>
  );
};

export default Nav;