"use client";

import { readUserSession, signOut } from "../(auth)/actions";

import { Button } from "./ui/button";
import { ConnectKitButton } from "connectkit";
import React from "react";
import Session from "~/lib/session";
import { Skeleton } from "./ui/skeleton";
import { redirect } from "next/navigation";
import { toast } from "./ui/use-toast";
import { useAuth } from "~/contexts/AuthContext";

async function handleSignout() {
  console.log("handleSignout");
  // "use server";
  // const { error } = await signOut();

  // if (error?.message) {
  //   toast({
  //     title: "You submitted the following values:",
  //     description: (
  //       <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
  //         <code className="text-white">{error.message}</code>
  //       </pre>
  //     ),
  //   });
  // } else {
  //   toast({
  //     title: "Sucessfully Logged Out:",
  //   });
  //   redirect("/login");
  // }
}

function AuthButton() {
  const { user, isLoading } = useAuth();
  console.log("AuthButton_user", user);

  if (isLoading) {
    return (
      <div className="flex items-center space-x-3 rounded-2xl bg-white/10 p-3">
        <Skeleton className="h-6 w-6 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-1 w-[110px]" />
          <Skeleton className="h-1 w-[75px]" />
        </div>
      </div>
    );
  }

  if (!user)
    return (
      <form>
        <Button variant={"outline"}>Sign In</Button>
      </form>
    );
  return (
    // <form action={handleSignout}>
    //   <Button variant={"outline"}>Sign Out</Button>
    // </form>
    <ConnectKitButton />
  );
}

export default AuthButton;
