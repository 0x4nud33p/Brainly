import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGithub } from 'react-icons/fa';
import { HiOutlineMenuAlt1 } from 'react-icons/hi';
import { FaLightbulb } from "react-icons/fa";
import { Toaster } from 'react-hot-toast';

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const blogLinks = [
    { name: 'Collections', path: '/content' },
  ];

  return (
    <nav className="bg-gray-900 fixed w-full top-0 font-Cabin z-10">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-gray-300 hover:bg-[#61669B] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <HiOutlineMenuAlt1 className="block h-6 w-6" />
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0">
              <Link to="/">
                <FaLightbulb  className="text-white h-8 w-8" />
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
      <div className={`${isMenuOpen ? 'block' : 'hidden'} sm:hidden`} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1">
          {blogLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-white hover:bg-[#292c3e] hover:text-gray-300 block px-3 py-2 rounded-md text-base font-medium"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
