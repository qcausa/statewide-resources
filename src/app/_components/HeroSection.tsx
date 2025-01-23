import * as React from "react";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { NFTCard } from "./NFTCard";

export function HeroSection() {
  return (
    <div className="grid grid-cols-5 items-center gap-4">
      <div className="col-span-3 space-y-10">
        <Image
          src="https://nft.wsatraining.com/wp-content/uploads/2021/09/wsa_nft_5dc_klueart-scaled.jpeg"
          alt=""
          height={600}
          width={600}
          className="h-auto w-[200px] rounded-full"
        />
        <h1 className="text-6xl font-extrabold tracking-tight">
          Wall Street Academy
          <span className="text-[hsl(280,100%,70%)]"> 5 Day Class</span> NFT
          Edition
        </h1>
        <div className="space-x-5">
          <Button>Learn More</Button>
          <Button>Learn More</Button>
          <Button>Learn More</Button>
        </div>
      </div>
      <div className="col-span-2">
        <NFTCard />
      </div>
    </div>
  );
}
