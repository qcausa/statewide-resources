import ListingHeader from "~/app/[slug]/_components/Header";
import React from "react";
import { mockProfiles } from "~/data/mock-nfts";

export default function ListingLayout({
  params,
  children,
}: {
  params: { id: string };
  children: React.ReactNode;
}) {
  return (
    <div>
      <ListingHeader profile={params.id} />
      {children}
    </div>
  );
}
