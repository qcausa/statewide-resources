"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import { useAccount } from "wagmi";
import { useModal } from "connectkit";

interface NavUserProps {
  user?: {
    name: string;
    email: string;
    avatar: string;
  };
}

export function NavUser({ user }: NavUserProps = {}) {
  const { isMobile } = useSidebar();
  const { address, isConnected } = useAccount();
  const { setOpen } = useModal();

  if (!isConnected) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:from-pink-600 hover:to-purple-600"
      >
        Connect Wallet
      </button>
    );
  }

  // Format the address to show first 6 and last 4 characters
  const formattedAddress = `${address?.slice(0, 6)}...${address?.slice(-4)}`;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="rounded-lg bg-gradient-to-r from-pink-500/10 to-purple-500/10 p-2 hover:from-pink-500/20 hover:to-purple-500/20"
            >
              <Avatar className="border-gradient-to-r h-8 w-8 rounded-lg border-2 from-pink-500 to-purple-500">
                <AvatarImage src={`https://effigy.im/a/${address}.svg`} />
                <AvatarFallback className="bg-gradient-to-r from-pink-500 to-purple-500">
                  {formattedAddress?.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold text-white">
                  {formattedAddress}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto size-4 text-white/70" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg border border-white/10 bg-black/90 text-white backdrop-blur-xl"
            side={isMobile ? "bottom" : "bottom"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 rounded-t-lg bg-gradient-to-r from-pink-500/10 to-purple-500/10 px-3 py-2">
                <Avatar className="border-gradient-to-r h-8 w-8 rounded-lg border-2 from-pink-500 to-purple-500">
                  <AvatarImage src={`https://effigy.im/a/${address}.svg`} />
                  <AvatarFallback className="bg-gradient-to-r from-pink-500 to-purple-500">
                    {formattedAddress?.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold text-white">
                    {formattedAddress}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-white/[0.08]" />
            <DropdownMenuGroup>
              <DropdownMenuItem className="focus:bg-gradient-to-r focus:from-pink-500/20 focus:to-purple-500/20">
                <Sparkles className="mr-2 h-4 w-4 text-pink-500" />
                <span>Upgrade to Pro</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="bg-white/[0.08]" />
            <DropdownMenuItem
              onClick={() => setOpen(true)}
              className="focus:bg-gradient-to-r focus:from-pink-500/20 focus:to-purple-500/20"
            >
              <LogOut className="mr-2 h-4 w-4 text-pink-500" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
