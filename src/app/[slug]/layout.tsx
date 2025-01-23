import ListingHeader from "./_components/Header";
import React from "react";
import { mockProfiles } from "~/data/mock-nfts";

export default function ListingLayout({
  params,
  children,
}: {
  params: { slug: string };
  children: React.ReactNode;
}) {
  console.log(params.slug);
  return (
    <div>
      <ListingHeader profile={params.slug} />
      {children}
    </div>
  );
}
