"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useMemo } from "react";

import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import VideoCarousel3D from "~/components/VideoCarousel3D";
import { useGetNftByAddressQuery } from "~/graphql/generated";

function NFTLinks({ links }: { links: string[] }) {
  if (!links?.length) return null;

  return (
    <div className="mt-8">
      <Card className="bg-theme-card/40 border-0">
        <CardHeader>
          <CardTitle>Links</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
          {links.map((link, index) => (
            <Button
              key={index}
              asChild
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600"
            >
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                Link {index + 1}
              </a>
            </Button>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

// function Assets({ nftAddress }: { nftAddress: string }) {
//   const { data, isLoading } = useGetAssetsByNftIdQuery({
//     nftId: nftAddress,
//     postFormat: "video",
//   });

//   const videos = useMemo(() => {
//     if (!data?.assets?.nodes) return [];

//     return data.assets.nodes.map((asset, index) => ({
//       id: `video-${index}`,
//       title: asset.title ?? "Untitled",
//       videoUrl: asset.content ?? "",
//       bgColor: "#000000",
//     }));
//   }, [data]);

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (!videos.length) {
//     return <div>No videos found</div>;
//   }

//   return (
//     <div className="mt-8">
//       <VideoCarousel3D data={videos} />
//     </div>
//   );
// }

export default function NFTPage({
  params,
}: {
  params: { nftAddress: string };
}) {
  const nftAddress = decodeURIComponent(params.nftAddress);
  const { data, isLoading } = useGetNftByAddressQuery({ nftAddress });
  const nft = data?.nftByAddress;

  // Check if NFT is claimed by a brand and has listings
  const hasBrandClaim = Boolean(nft?.nftListings?.nodes?.[0]);
  const brandSlug = hasBrandClaim ? nft?.nftListings?.nodes?.[0]?.slug : null;

  // If NFT is claimed by a brand, redirect to the brand's page
  useEffect(() => {
    if (hasBrandClaim && brandSlug) {
      // Extract token ID from NFT address (after the colon)

      window.location.href = `/u/${brandSlug}/${nftAddress}`;
    }
  }, [hasBrandClaim, brandSlug, nftAddress]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!nft) {
    return <div>NFT not found</div>;
  }

  // If we're still here and have a brand claim, show loading while redirect happens
  if (hasBrandClaim) {
    return <div>Redirecting to brand page...</div>;
  }

  return (
    <div className="from-theme-background via-theme-background-secondary to-theme-background flex min-h-screen flex-1 flex-col bg-gradient-to-br">
      <div className="container py-12">
        <Button
          asChild
          variant="ghost"
          className="hover:bg-theme-card/60 group mb-8"
        >
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-400 transition-colors hover:text-gray-200"
          >
            <ChevronLeft
              size={16}
              className="transition-transform group-hover:-translate-x-0.5"
            />
            Back
          </Link>
        </Button>

        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-center">
          <h2 className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-3xl font-bold text-transparent">
            {nft.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-28 md:grid-cols-[2fr_1fr]">
          <div>
            <Card className="bg-theme-card/40 border-0">
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <div dangerouslySetInnerHTML={{ __html: nft.excerpt ?? "" }} />
              </CardContent>
            </Card>
            <NFTLinks links={Array.isArray(nft.nftLinks) ? nft.nftLinks : []} />
          </div>
        </div>
        {/* <Assets nftAddress={nftAddress} /> */}
      </div>
    </div>
  );
}
