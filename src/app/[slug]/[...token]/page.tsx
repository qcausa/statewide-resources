"use client";

import { NFT } from "../_components/NFT";

export default function TokenPage({
  params,
}: {
  params: { slug: string; token: string[] };
}) {
  const nftAddress = params.token[0];
  return <NFT nftAddress={nftAddress} />;
}
