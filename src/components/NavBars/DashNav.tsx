"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BookOpen,
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  Mic,
  Play,
  User,
  X,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { signOut, useSession } from "next-auth/react";

const navItems = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    href: "/dashboard",
    active: true,
  },
  { icon: Mic, label: "Interview", href: "/interview/setup", active: false },
  { icon: BookOpen, label: "Questions", href: "/questions", active: false },
  { icon: FileText, label: "Resume", href: "/resume", active: false },
  { icon: User, label: "Profile", href: "/profile", active: false },
];

function DashNav() {
  const [open, setOpen] = useState(false);
  const session = useSession();
  const user = session.data?.user;

  return (
    <>
      <header className="text-white px-3 py-2 border sticky top-0 z-30 bg-black/80 border-gray-800 flex justify-between items-center backdrop-blur">
        <div className="flex gap-2 items-center">
          <button
            className="md:hidden text-gray-500 hover:text-white transition-colors"
            onClick={() => setOpen(true)}
          >
            <Menu />
          </button>
          <div>
            <h1 className="hidden md:flex">Dashboard</h1>
            <p className="text-[10px] md:text-xs text-gray-500">Welcome back, {user?.username} 👋</p>
          </div>
        </div>
        <Link
          href="/interview/setup"
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#6C63FF] text-white text-xs font-medium hover:bg-[#5B52EE] transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(108,99,255,0.4)]"
        >
          <Play size={14} />
          New Interview
        </Link>
      </header>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={{ x: open ? 0 : "-100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed left-0 top-0 bottom-0 w-60 bg-[#0D0D14] flex flex-col z-50 text-gray-400 md:hidden"
      >
        <div className="p-5 text-white flex items-center gap-2.5 justify-between border-b border-gray-600">
          <div className="flex items-center gap-2.5">
            <div className="p-1 w-fit rounded-lg bg-[#6C63FF] ">
              <Zap className="text-white" />
            </div>
            <span className="font-semibold tracking-tight">PrepMasterAi</span>
          </div>

          <button
            onClick={() => setOpen(false)}
            className="md:hidden text-white/40 hover:text-white p-1"
          >
            <X size={20} />
          </button>
        </div>

        <div
          id="user"
          className=" border-b border-gray-600 py-3 px-5 flex gap-2 items-center"
        >
          <div className="w-fit p-2 rounded-full bg-gradient-to-r from-[#6C63FF] to-[#FF6B6B] text-white font-semibold">
            <User />
          </div>
          <div className="text-[10px]">
            <p className="text-white text-xs">{user?.username}</p>
            <p>{user?.email}</p>
          </div>
        </div>

        <div className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {navItems.map(({ icon: Icon, label, href, active }) => (
            <Link
              key={label}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                active
                  ? "bg-[#6C63FF]/15 text-[#6C63FF] font-medium"
                  : "text-white/40 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon />
              {label}
              {active && <div></div>}
            </Link>
          ))}
        </div>

        <div className="px-5 py-2 border-t border-gray-600">
          <Button
            className="cursor-pointer text-gray-400 hover:text-white"
            onClick={() => signOut()}
          >
            <LogOut />
            Sign Out
          </Button>
        </div>
      </motion.aside>
    </>
  );
}

export default DashNav;
