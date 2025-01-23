"use client";

import { Button } from "./ui/button";
import React from "react";
import { useAuth } from "~/contexts/AuthContext";

function ClientButton() {
  const { user, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;

  if (user)
    return (
      <div>
        <div>User email: {user.email}</div>
        <div>User wallet address: {user.web3address}</div>
      </div>
    );
  return (
    <div>
      <Button></Button>
    </div>
  );
}

export default ClientButton;
