"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

type NFTCardProps = {
  id?: string | number;
  name?: string;
  image?: string;
  collection?: string;
  className?: string;
  contractAddress?: string;
  tokenId?: string;
};

export function NFTCard({
  id = "0",
  name = "Create project",
  image = "https://nft.wsatraining.com/wp-content/uploads/2021/09/wsa_nft_5dc_klueart-scaled.jpeg",
  collection = "Deploy your new project in one-click.",
  className,
  contractAddress,
  tokenId,
}: NFTCardProps) {
  const pathname = usePathname();

  // If we have contract address and token ID, use those for the URL
  const href =
    contractAddress && tokenId
      ? `/u/${contractAddress}/${tokenId}`
      : pathname === "/"
        ? `/u/${id}`
        : `${pathname}/${id}`;

  return (
    <Link
      href={href}
      className={cn(
        "block transition-all duration-300 hover:scale-[1.02]",
        className,
      )}
    >
      <Card className="overflow-hidden border-0 bg-[#1E1B2E]/60 shadow-xl backdrop-blur-sm">
        <CardHeader className="border-b border-white/[0.08]">
          <CardTitle className="text-lg font-medium text-white">
            {name}
          </CardTitle>
          <p className="text-sm text-gray-400">{collection}</p>
        </CardHeader>
        <CardContent className="p-0">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <Image
              src={image}
              alt={name}
              height={300}
              width={300}
              className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute bottom-3 left-3">
              <span className="inline-flex items-center rounded-full bg-gradient-to-r from-pink-500 to-purple-500 px-3 py-1 text-sm font-medium text-white ring-1 ring-white/10">
                EXCLUSIVE
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
