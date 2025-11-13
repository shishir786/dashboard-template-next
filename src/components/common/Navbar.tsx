"use client";

import { useState } from 'react'
import { MessageSquare, Bell, User, Moon, Sun, Menu } from 'lucide-react';
import { useSidebar } from "../ui/sidebar";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from 'next/link';
import NotificationMenu from './NotificationMenu'

const Navbar = () => {
  const { setTheme } = useTheme();
  const { toggleSidebar, state } = useSidebar();
  const sidebarOpen = state === "expanded";
  const [showNotifications, setShowNotifications] = useState(false)

  return (
    <>
      {/* Yellow top bar */}
      <div className="fixed top-0 left-0 w-full h-3 md:h-5 bg-background z-50"></div>

      {/* Main navbar */}
      <div className={`fixed top-3 md:top-5 right-0 z-40 h-[68px] md:h-[84px] bg-sidebar rounded-lg rounded-t-none shadow-md mx-2 md:mx-5 transition-all duration-300 ${sidebarOpen ? "md:left-77" : "md:left-22"}`}>
        <div className="flex h-full w-full justify-between items-center px-2 md:px-4 ml-2 md:ml-5">
          {/* Left Section */}
          <div className="flex items-center gap-3 md:gap-6 min-w-0 flex-1">
            <button
              onClick={toggleSidebar}
              className="flex items-center justify-center flex-shrink-0"
            >
              <Menu className="w-6 h-6 md:w-8 md:h-8 text-gray-900 dark:text-white" strokeWidth={2} />
            </button>
            <div className="flex flex-col min-w-0">
              <h1 className="text-gray-900 dark:text-white text-base md:text-xl font-bold leading-tight truncate">
                Welcome, DS
              </h1>
              <p className="text-gray-900 dark:text-white text-xs md:text-sm font-semibold -mt-1 hidden sm:block">
                Have a nice day!
              </p>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-1.5 md:gap-3 pr-0 md:pr-2 shrink-0">
            {/* Theme Toggle */}
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <button className="flex w-[40px] h-[40px] md:w-[52px] md:h-[52px] flex-shrink-0 items-center justify-center rounded-full border border-gray-900 dark:border-white bg-transparent hover:bg-white/10 cursor-pointer relative">
                  <Sun className="h-5 w-5 md:h-6 md:w-6 text-gray-900 dark:text-white rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" strokeWidth={2} />
                  <Moon className="absolute h-5 w-5 md:h-6 md:w-6 text-gray-900 dark:text-white rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" strokeWidth={2} />
                  <span className="sr-only">Toggle theme</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" side="bottom" sideOffset={8} className="z-[60]">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Messages */}
            <Link href="/chats" className="flex-shrink-0">
              <div className="flex w-[40px] h-[40px] md:w-[52px] md:h-[52px] items-center justify-center rounded-full border border-gray-900 dark:border-white bg-transparent hover:bg-white/10 cursor-pointer">
                <MessageSquare className="w-5 h-5 md:w-6 md:h-6 text-gray-900 dark:text-white" strokeWidth={2} />
              </div>
            </Link>

            {/* Notifications */}
            <div className="relative flex-shrink-0">
              <button
                onClick={() => setShowNotifications((s) => !s)}
                className="flex w-[40px] h-[40px] md:w-[52px] md:h-[52px] items-center justify-center rounded-full border border-gray-900 dark:border-white bg-transparent hover:bg-white/10 cursor-pointer"
              >
                <Bell className="w-5 h-5 md:w-6 md:h-6 text-gray-900 dark:text-white" strokeWidth={2} />
                <div className="absolute top-1 right-1 md:top-2 md:right-2 w-3 h-3 md:w-4 md:h-4 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-normal">.</span>
                </div>
              </button>
              <NotificationMenu open={showNotifications} onClose={() => setShowNotifications(false)} />
            </div>

            {/* Profile */}
            <div className="flex w-[40px] h-[40px] md:w-[52px] md:h-[52px] flex-shrink-0 items-center justify-center rounded-full border border-gray-900 dark:border-white bg-transparent overflow-hidden cursor-pointer">
              <User className="w-5 h-5 md:w-6 md:h-6 text-gray-900 dark:text-white" strokeWidth={2} />
            </div>
          </div>
        </div>
      </div>

      {/* Spacer to prevent content from going under fixed navbar */}
      <div className="h-[71px] md:h-[89px]"></div>
    </>
  )
}

export default Navbar
