"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/app/_components/ui/avatar";
import {
  useGetListingByIdQuery,
  useGetListingBySlugQuery,
} from "~/graphql/generated";

import Link from "next/link";
import React from "react";

export default function ListingHeader({ profile: id }: { profile: string }) {
  const { data } = useGetListingBySlugQuery({ slug: id });
  console.log(data);

  const listing = data?.customListing;

  if (!listing) {
    return (
      <div className="relative flex h-80 flex-col justify-end bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-blue-500/20 py-8">
        <div className="container relative">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex w-full flex-col justify-start gap-6 md:flex-row md:items-center">
              <div className="h-24 w-24 animate-pulse rounded-full bg-white/5" />
              <div className="flex flex-1 flex-col gap-2">
                <div className="h-8 w-[300px] animate-pulse rounded-lg bg-white/5" />
                <div className="h-4 w-[200px] animate-pulse rounded-lg bg-white/5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex h-80 flex-col justify-end bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-blue-500/20 py-8">
      <div className="container relative">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex w-full flex-col justify-start gap-6 md:flex-row md:items-center">
            <Link href={`/${listing.slug}`}>
              <Avatar className="h-24 w-24 border-4 border-purple-500/20 shadow-xl transition-transform hover:scale-105">
                <AvatarImage
                  src={listing.featuredImage?.node?.sourceUrl ?? ""}
                />
                <AvatarFallback className="bg-gradient-to-br from-pink-500 to-purple-500">
                  {listing.title?.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </Link>
            <div className="flex flex-1 flex-col gap-2">
              <Link
                href={`/${listing.slug}`}
                className="text-3xl font-bold text-white transition-colors hover:text-gray-200"
              >
                {listing.title}
              </Link>
              {listing.reviews?.nodes && (
                <p className="text-gray-300">
                  {listing.reviews.nodes.length} Reviews
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
