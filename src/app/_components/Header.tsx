import Link from "next/link";
import Logo from "./Logo";
import { NavUser } from "./nav-user";
import React from "react";
import { SidebarTrigger } from "./ui/sidebar";
import TopNavbar from "./TopNavbar";

function Header() {
  return (
    <header className="left-0 z-50 -mb-16 flex w-full items-center border-b border-white/[0.08] bg-black/50 px-3 backdrop-blur-xl">
      <SidebarTrigger className="absolute left-3 top-4 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 p-2 text-white transition-colors hover:from-pink-600 hover:to-purple-600" />
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-xl font-bold text-transparent">
              MintStation
            </span>
          </Link>

          <TopNavbar />
        </div>
        <div className="w-[200px]">
          <NavUser />
        </div>
      </div>
    </header>
  );
}

export default Header;
