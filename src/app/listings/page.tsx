"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetAllListingsQuery } from "~/graphql/generated";

function ListingsPage() {
  const { data, isLoading } = useGetAllListingsQuery();

  if (isLoading) {
    return (
      <div className="container relative mt-20">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <Card
              key={i}
              className="overflow-hidden border-0 bg-[#1E1B2E]/60 shadow-xl backdrop-blur-sm"
            >
              <CardHeader className="border-b border-white/[0.08]">
                <div className="space-y-2">
                  <Skeleton className="h-6 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Skeleton className="aspect-[4/3] w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!data?.customListings?.nodes) {
    return null;
  }

  return (
    <div className="container relative mt-20">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data.customListings.nodes.map((listing) => (
          <Link
            key={listing.id}
            href={`/listings/${listing.id}`}
            className="block transition-all duration-300 hover:scale-[1.02]"
          >
            <Card className="overflow-hidden border-0 bg-[#1E1B2E]/60 shadow-xl backdrop-blur-sm">
              <CardHeader className="border-b border-white/[0.08]">
                <CardTitle className="text-lg font-medium text-white">
                  {listing.title}
                </CardTitle>
                {listing.reviews?.nodes && (
                  <p className="text-sm text-gray-400">
                    {listing.reviews.nodes.length} Reviews
                  </p>
                )}
              </CardHeader>
              <CardContent className="p-0">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <Image
                    src="https://nft.wsatraining.com/wp-content/uploads/2021/09/wsa_nft_5dc_klueart-scaled.jpeg"
                    alt={listing.title ?? ""}
                    height={300}
                    width={300}
                    className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {listing.reviews?.nodes &&
                    listing.reviews.nodes.length > 0 && (
                      <div className="absolute bottom-3 left-3">
                        <span className="inline-flex items-center rounded-full bg-gradient-to-r from-pink-500 to-purple-500 px-3 py-1 text-sm font-medium text-white ring-1 ring-white/10">
                          FEATURED
                        </span>
                      </div>
                    )}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ListingsPage;
