"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useGetListingByIdQuery,
  useGetListingBySlugQuery,
} from "~/graphql/generated";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { NFTCard } from "~/app/_components/NFTCard";
import { useParams } from "next/navigation";

export default function ListingPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const { data, isLoading } = useGetListingBySlugQuery({ slug });
  console.log(data);

  const listing = data?.customListing;

  if (!listing) {
    return <div>Listing not found</div>;
  }

  return (
    <div className="flex h-full flex-1 flex-col gap-5 py-5">
      <div className="">
        <h2 className="mb-4 text-xl font-semibold text-white">
          Unlockable Content
        </h2>
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {listing.nfts?.nodes?.map((nft) => (
            <NFTCard
              key={nft.id}
              id={nft.id}
              name={nft.title!}
              //   collection={asset.node.collection}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
