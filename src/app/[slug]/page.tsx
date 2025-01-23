"use client";

import { Brand } from "./_components/Brand";
import ListingHeader from "./_components/Header";
import { NFT } from "./_components/NFT";
import { Reviews } from "./_components/Reviews";

export default function Page({ params }: { params: { slug: string } }) {
  const brandSlug = params.slug;

  console.log(brandSlug);

  return (
    <div>
      {brandSlug && <Brand brandSlug={brandSlug} />}

      {/* {secondParam && secondParam !== "reviews" && (
        <NFT nftAddress={secondParam} />
      )} */}
    </div>
  );
}
