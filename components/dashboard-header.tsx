"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
  Search,
  Plus,
  Sun,
  Moon,
  LogOut,
  Menu,
  X,
  User,
  Settings,
} from "lucide-react";

export default function DashboardHeader() {
  // const { data: session } = useSession();
  const session = {
    user: {
      name: "John Doe",
      image: "https://via.placeholder.com/150",
    },
  }
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();

    if (searchQuery.trim()) {
      router.push(
        `/dashboard?search=${encodeURIComponent(searchQuery.trim())}`
      );
    } else {
      router.push("/dashboard");
    }
  };

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);

    // Toggle class on document
    if (newMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Save preference to localStorage
    localStorage.setItem("darkMode", newMode ? "true" : "false");
  };

  // Effect to initialize dark mode from localStorage
  useState(() => {
    // Check if we're in browser environment
    if (typeof window !== "undefined") {
      const savedMode = localStorage.getItem("darkMode") === "true";
      setIsDarkMode(savedMode);

      if (savedMode) {
        document.documentElement.classList.add("dark");
      }

      // Also check for system preference if nothing saved
      if (
        localStorage.getItem("darkMode") === null &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        setIsDarkMode(true);
        document.documentElement.classList.add("dark");
      }
    }
  });

  return (
    <header className="sticky top-0 z-30 w-full border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/90 backdrop-blur supports-backdrop-blur:bg-white/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="mr-4 p-2 rounded-md text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white md:hidden"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Logo */}
          <Link href="/dashboard" className="flex items-center">
            <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
              Brainly
            </span>
          </Link>
        </div>

        {/* Search bar */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex items-center w-full max-w-md mx-4"
        >
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search links..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-slate-800 dark:text-white"
            />
          </div>
        </form>

        {/* Right side actions */}
        <div className="flex items-center space-x-1">
          {/* Add link button */}
          <button
            onClick={() =>
              window.dispatchEvent(new CustomEvent("openAddLinkModal"))
            }
            className="hidden md:flex items-center px-3 py-2 rounded-md bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-white transition-colors"
          >
            <Plus className="h-4 w-4 mr-1" />
            <span>Add Link</span>
          </button>

          {/* Small add button on mobile */}
          <button
            onClick={() =>
              window.dispatchEvent(new CustomEvent("openAddLinkModal"))
            }
            className="md:hidden flex items-center justify-center p-2 rounded-md bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-white"
          >
            <Plus className="h-5 w-5" />
          </button>

          {/* Theme toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-md text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>

          {/* User menu */}
          <div className="relative">
            <button
              className="flex items-center space-x-1 rounded-full bg-slate-100 p-1.5 dark:bg-slate-800"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {session?.user?.image ? (
                <img
                  src={session.user.image}
                  alt={session.user.name || "User"}
                  className="h-6 w-6 rounded-full"
                />
              ) : (
                <User className="h-5 w-5 text-slate-600 dark:text-slate-300" />
              )}
            </button>

            {/* Dropdown menu */}
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-slate-900 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  {session?.user?.name && (
                    <div className="px-4 py-2 text-sm text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800">
                      Signed in as
                      <br />
                      <span className="font-medium">{session.user.name}</span>
                    </div>
                  )}

                  <Link
                    href="/settings"
                    className="flex items-center px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Link>

                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="w-full flex items-center px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile search - show when menu is open */}
      <div className={`md:hidden px-4 pb-4 ${isMenuOpen ? "block" : "hidden"}`}>
        <form onSubmit={handleSearch} className="flex items-center w-full">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search links..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-slate-800 dark:text-white"
            />
          </div>
        </form>
      </div>
    </header>
  );
}
