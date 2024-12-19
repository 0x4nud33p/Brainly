"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../components/ui/sidebar.jsx";
import {
  IconArrowLeft,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import {Link, Outlet} from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils.js";
import { FaLightbulb } from "react-icons/fa";
import { HiOutlineSaveAs } from "react-icons/hi";
import { GrInstagram } from "react-icons/gr";
import { TfiTwitter } from "react-icons/tfi";
import { SlSocialYoutube } from "react-icons/sl";
import { FiLogOut } from "react-icons/fi";

export function Nav() {
  const links = [
    {
      label: "Collections",
      href: "content",
      icon: (
        <HiOutlineSaveAs  className="text-neutral-700 dark:text-neutral-200 h-6 w-6 flex-shrink-0" />
      ),
    },
    {
      label: "Instagram Links",
      href: "instacollection",
      icon: (
        <GrInstagram className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Twitter Links",
      href: "xcollection",
      icon: (
        <TfiTwitter className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Youtube Links",
      href: "ytcollection",
      icon: (
        <SlSocialYoutube className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Logout",
      href: "#",
      icon: (
        <FiLogOut className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    (<div
      className={cn(
        "flex flex-col md:flex-row bg-gradient-to-b from-gray-900 to-gray-800 w-full flex-1 mx-auto overflow-hidden",
        "min-h-screen"
      )}>
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10 min-h-screen">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "Anudeep Avula",
                href: "#",
                icon: (
                  <img
                    src="https://avatars.githubusercontent.com/u/148236417?v=4"
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar" />
                ),
              }} />
          </div>
        </SidebarBody>
      </Sidebar>
      <Dashboard />
    </div>)
  );
}
export const Logo = () => {
  return (
    (<Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20">
      <div
        className="" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre">
        <Link to={"/"}>
         <div className="flex items-center space-x-2">
        <FaLightbulb className="text-white h-8 w-8" />
        <h1 className="text-xl font-bold text-white">Brainly</h1>
        </div>
        </Link>
      </motion.span>
    </Link>)
  );
};
export const LogoIcon = () => {
  return (
    (<Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20">
        <FaLightbulb className="text-white h-8 w-8" />
      <div
        className="" />
    </Link>)
  );
};


const Dashboard = () => {
  return (
    <>
    <Outlet />
    </>
  );
};
