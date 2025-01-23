"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Facebook, Instagram, Share, Twitter } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { ConnectKitButton } from "connectkit";
import { DescriptionField } from "~/app/_components/descriptonField";
import { ImageRing3D } from "~/components/ImageRing3D";
import Link from "next/link";
import { NFTCard } from "@/components/NFTCard";
import React from "react";
import { VideoCarousel } from "~/components/VideoCarousel";
import VideoCarousel3D from "~/components/VideoCarousel3D";
import { VideoEmbed } from "~/components/VideoEmbed";
import { mockProfiles } from "~/data/mock-nfts";
import { notFound } from "next/navigation";
import { useAccount } from "wagmi";

type Props = {
  params: {
    slug: string[];
  };
};

export default function ProfilePage({ params }: Props) {
  const { isConnected } = useAccount();
  const profile = mockProfiles[params.slug[0]];
  console.log(params.slug);
  console.log(profile);

  if (!profile) {
    notFound();
  }

  // Check if we're viewing a specific NFT
  const isViewingNFT = params.slug.length > 1;
  const nftId = params.slug[1];

  if (isViewingNFT) {
    // Find the specific NFT
    const nft = profile.assets.find((asset) => asset.id === nftId);
    if (!nft) {
      return <div>NFT not found</div>;
    }

    // If not connected and viewing NFT, show connect wallet message
    if (!isConnected) {
      return (
        <div className="from-theme-background via-theme-background-secondary to-theme-background flex min-h-screen flex-1 flex-col bg-gradient-to-br">
          <Header profile={profile} />
          <div className="container flex flex-col items-center justify-center py-12 text-center">
            <h2 className="mb-6 text-2xl font-bold text-white">
              Connect Your Wallet
            </h2>
            <p className="mb-8 text-gray-400">
              Please connect your wallet to view this NFT
            </p>
            <ConnectKitButton />
          </div>
        </div>
      );
    }

    // Add video content for WSA profile only
    const isWSA = profile.id === "wsa";

    const videos = [
      {
        id: "711859608",
        title: "My Come Up Video",
        description: "Watch my journey and story",
        videoUrl: "https://player.vimeo.com/video/711859608?loop=1&autopause=0",
        bgColor: "#1a1a1a",
      },
      {
        id: "781863320",
        title: "WSA 5 Day Course",
        description: "Learn the fundamentals",
        videoUrl: "https://player.vimeo.com/video/781863320?loop=1&autopause=0",
        bgColor: "#1a1a1a",
      },
    ];

    const images = [
      "https://picsum.photos/id/32/600/400",
      "https://picsum.photos/id/33/600/400",
      "https://picsum.photos/id/34/600/400",
      "https://picsum.photos/id/35/600/400",
      "https://picsum.photos/id/36/600/400",
    ];

    return (
      <div className="from-theme-background via-theme-background-secondary to-theme-background flex min-h-screen flex-1 flex-col bg-gradient-to-br">
        <Header profile={profile} />
        <div className="container py-12">
          <Button
            asChild
            variant="ghost"
            className="hover:bg-theme-card/60 group mb-8"
          >
            <Link
              href={`/u/${profile.id}`}
              className="flex items-center gap-2 text-gray-400 transition-colors hover:text-gray-200"
            >
              <ChevronLeft
                size={16}
                className="transition-transform group-hover:-translate-x-0.5"
              />
              Back to Collection
            </Link>
          </Button>

          <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-center">
            <h2 className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-3xl font-bold text-transparent">
              {nft.name}
            </h2>
            <Button
              asChild
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600"
            >
              <a
                href="https://t.me/+LnjOyjxnWt5lNmZh"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 0C5.37 0 0 5.37 0 12C0 18.63 5.37 24 12 24C18.63 24 24 18.63 24 12C24 5.37 18.63 0 12 0ZM17.84 8.12C17.72 9.2 16.24 15.1 15.5 17.76C15.18 18.88 14.56 19.24 14 19.24C12.8 19.24 11.88 18.32 10.72 17.52C8.92 16.24 7.96 15.44 6.24 14.2C4.28 12.8 5.44 12 6.48 10.96C6.76 10.68 12.44 5.6 12.56 5.12C12.58 5.06 12.58 4.84 12.44 4.72C12.3 4.6 12.1 4.64 11.96 4.66C11.76 4.7 9.34 6.34 4.72 9.56C4.02 10.04 3.38 10.28 2.82 10.26C2.2 10.24 1.02 9.88 0.14 9.58C-0.92 9.2 -0.86 8.52 0.22 8.14C5.14 6.02 8.5 4.64 10.28 4C15.32 2.16 16.38 1.8 17.1 1.8C17.26 1.8 17.64 1.84 17.88 2.04C18.08 2.2 18.16 2.42 18.18 2.58C18.18 2.7 18.2 3.02 17.84 8.12Z" />
                </svg>
                Join Community
              </a>
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-28 md:grid-cols-[2fr_1fr]">
            <div className="flex w-[90%] flex-col gap-8">
              {isWSA && (
                <div className="flex flex-col gap-8">
                  {/* <VideoCarousel3D videos={videos} /> */}
                  {/* <ImageRing3D images={images} /> */}
                  <VideoCarousel3D data={videos} />
                </div>
              )}
              {!isWSA && (
                <div className="relative aspect-square overflow-hidden rounded-xl">
                  <img
                    src={nft.image}
                    alt={nft.name}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
            </div>

            <div className="flex flex-col gap-6">
              <Card className="border-0 bg-[#1E1B2E]/60 shadow-xl backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-medium text-white">
                    About
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-6">
                  <div>
                    <h3 className="mb-2 text-sm font-medium text-gray-400">
                      Description
                    </h3>
                    <p className="text-white">{nft.description}</p>
                  </div>
                  <div>
                    <h3 className="mb-2 text-sm font-medium text-gray-400">
                      Collection
                    </h3>
                    <p className="text-white">{nft.collection}</p>
                  </div>
                  {nft.attributes && (
                    <div>
                      <h3 className="mb-3 text-sm font-medium text-gray-400">
                        Attributes
                      </h3>
                      <div className="grid grid-cols-2 gap-3">
                        {Object.entries(nft.attributes).map(([key, value]) => (
                          <div
                            key={key}
                            className="rounded-lg bg-gradient-to-br from-pink-500/10 to-purple-500/10 p-3 backdrop-blur-sm"
                          >
                            <p className="text-sm capitalize text-gray-400">
                              {key}
                            </p>
                            <p className="font-medium text-white">{value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Collection view (default)
  return (
    <div className="from-theme-background via-theme-background-secondary to-theme-background flex min-h-screen flex-1 flex-col bg-gradient-to-br">
      <Header profile={profile} />
      <div className="container py-12">
        <Button
          asChild
          variant="ghost"
          className="hover:bg-theme-card/60 group mb-8"
        >
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-400 transition-colors group-hover:text-gray-200"
          >
            <ChevronLeft
              size={16}
              className="transition-transform group-hover:-translate-x-0.5"
            />
            Back to Home
          </Link>
        </Button>

        <Assets assets={profile.assets} />
      </div>
    </div>
  );
}

function ShareButton({ url }: { url: string }) {
  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`,
    instagram: `https://www.instagram.com/?url=${encodeURIComponent(url)}`,
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600">
          <Share className="mr-2 h-4 w-4" />
          Share
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 border-0 bg-[#1E1B2E]/95 p-2 shadow-xl backdrop-blur-sm">
        <div className="flex flex-col gap-2">
          <Button
            variant="ghost"
            className="justify-start text-white hover:bg-white/10"
            onClick={() => window.open(shareUrls.facebook, "_blank")}
          >
            <Facebook className="mr-2 h-4 w-4" />
            Facebook
          </Button>
          <Button
            variant="ghost"
            className="justify-start text-white hover:bg-white/10"
            onClick={() => window.open(shareUrls.twitter, "_blank")}
          >
            <Twitter className="mr-2 h-4 w-4" />
            Twitter
          </Button>
          <Button
            variant="ghost"
            className="justify-start text-white hover:bg-white/10"
            onClick={() => window.open(shareUrls.instagram, "_blank")}
          >
            <Instagram className="mr-2 h-4 w-4" />
            Instagram
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

function Header({
  profile,
}: {
  profile: (typeof mockProfiles)[keyof typeof mockProfiles];
}) {
  const [description, setDescription] = React.useState(
    "This is the company description...",
  );
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <div className="relative flex h-80 flex-col justify-end bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-blue-500/20 py-8">
      {/* <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" /> */}
      <div className="container relative">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex w-full flex-col justify-start gap-6 md:flex-row md:items-center">
            <Avatar className="h-24 w-24 border-4 border-purple-500/20 shadow-xl">
              <AvatarImage src={profile.avatar} />
              <AvatarFallback className="bg-gradient-to-br from-pink-500 to-purple-500">
                {profile.name
                  .split(" ")
                  .map((word) => word[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-1 flex-col gap-2">
              <h1 className="text-3xl font-bold text-white">{profile.name}</h1>
              <p className="text-gray-300">{profile.subtitle}</p>
            </div>
          </div>

          <ShareButton url={currentUrl} />
        </div>
      </div>
    </div>
  );
}

function Assets({
  assets,
}: {
  assets: (typeof mockProfiles)[keyof typeof mockProfiles]["assets"];
}) {
  return (
    <div className="flex h-full flex-1 flex-col gap-5 py-5">
      <div className="">
        <h2 className="mb-4 text-xl font-semibold text-white">
          Unlockable Content
        </h2>
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {assets.map((asset) => (
            <NFTCard
              key={asset.id}
              id={asset.id}
              name={asset.name}
              collection={asset.collection}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
