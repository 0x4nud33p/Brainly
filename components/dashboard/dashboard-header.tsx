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
  Share2,
  Settings,
} from "lucide-react";

export default function DashboardHeader() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (searchQuery.trim()) {
      router.push(
        `/dashboard?search=${encodeURIComponent(searchQuery.trim())}`
      );
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <header className="sticky top-0 z-30 w-full border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/90 backdrop-blur supports-backdrop-blur:bg-white/60">
      <div className="flex h-16 items-center justify-between px-4 w-full">
        <div className="flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="mr-4 p-2 rounded-md text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white md:hidden"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <Link href="/dashboard" className="flex items-center">
            <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
              Brainly
            </span>
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <form
            onSubmit={handleSearch}
            className="hidden md:flex items-center w-full max-w-md"
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
            <button className="ml-2 p-2 rounded-md text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">
              <Share2 />
            </button>
          </form>

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
