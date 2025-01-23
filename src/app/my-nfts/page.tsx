"use client";

import { Alchemy, Network, type OwnedNft } from "alchemy-sdk";
import { useEffect, useState } from "react";

import { Card } from "@/components/ui/card";
import { ConnectKitButton } from "connectkit";
import Link from "next/link";
import { useAccount } from "wagmi";

interface NFT {
  title: string | null;
  tokenId: string;
  contract: {
    address: string;
  };
  media: Array<{
    gateway: string;
  }>;
  description: string | null;
  tokenType: string;
  balance: string;
}

function NFTCard({ nft }: { nft: NFT }) {
  return (
    <div className="group relative block overflow-hidden rounded-xl bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-blue-500/10 p-[1px] transition-all hover:scale-105">
      <div className="relative h-full overflow-hidden rounded-xl bg-[#1E1B2E]/60 backdrop-blur-sm">
        <div className="aspect-square">
          {nft.media?.[0]?.gateway ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={nft.media[0].gateway}
              alt={nft.title?.toString() ?? ""}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-blue-500/20">
              <span className="text-xl font-bold text-white">No Image</span>
            </div>
          )}
        </div>
        <div className="p-4">
          <h2 className="mb-2 text-lg font-semibold text-white">
            {nft.title ?? `NFT #${nft.tokenId}`}
          </h2>
          {nft.description && (
            <p className="mb-4 line-clamp-2 text-sm text-gray-400">
              {nft.description}
            </p>
          )}
          <Link
            href={`/create/${nft.contract.address}/${nft.tokenId}`}
            className="inline-flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:from-pink-600 hover:to-purple-600"
          >
            Token Gate Content
          </Link>
        </div>

        {/* <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-blue-500/10 opacity-0 transition-opacity group-hover:opacity-100" /> */}
      </div>
    </div>
  );
}

function transformNftData(nft: OwnedNft): NFT {
  return {
    title: nft.name ?? null,
    tokenId: nft.tokenId,
    contract: {
      address: nft.contract.address,
    },
    media: [
      {
        gateway: nft.image?.cachedUrl ?? "",
      },
    ],
    description: nft.description ?? null,
    tokenType: nft.tokenType,
    balance: nft.balance,
  };
}

export default function MyNFTsPage() {
  const { address, isConnected } = useAccount();
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNFTs = async () => {
      if (!address) return;

      setLoading(true);
      try {
        const config = {
          apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
          network: Network.ETH_MAINNET,
        };
        const alchemy = new Alchemy(config);

        // Fetch NFTs for the address
        const response = await alchemy.nft.getNftsForOwner(address);
        console.log("NFTs:", response);

        // Transform the response to match our NFT interface
        const transformedNfts = response.ownedNfts.map(transformNftData);
        setNfts(transformedNfts);
      } catch (error) {
        console.error("Error fetching NFTs:", error);
      } finally {
        setLoading(false);
      }
    };

    if (isConnected) {
      void fetchNFTs();
    }
  }, [address, isConnected]);

  if (!isConnected) {
    return (
      <div className="from-theme-background via-theme-background-secondary to-theme-background flex min-h-screen flex-col items-center justify-center bg-gradient-to-br">
        <div className="text-center">
          <h1 className="mb-6 text-3xl font-bold text-white">
            Connect Your Wallet
          </h1>
          <p className="mb-8 text-gray-400">
            Connect your wallet to view your NFTs
          </p>
          <ConnectKitButton />
        </div>
      </div>
    );
  }
  console.log(nfts);

  return (
    <div className="from-theme-background via-theme-background-secondary to-theme-background min-h-screen bg-gradient-to-br p-8">
      <div className="container mx-auto">
        <h1 className="mb-8 text-3xl font-bold text-white">My NFTs</h1>

        {loading ? (
          <div className="text-center text-white">Loading your NFTs...</div>
        ) : nfts.length === 0 ? (
          <div className="text-center text-white">
            No NFTs found in this wallet
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {nfts.map((nft) => (
              <NFTCard
                key={`${nft.contract.address}-${nft.tokenId}`}
                nft={nft}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
