import { Button } from "@/components/ui/button";
import { NFTCard } from "@/components/NFTCard";
import { mockNFTs } from "~/data/mock-nfts";

export function FeaturedCreators() {
  return (
    <div className="container py-24">
      <div className="flex flex-col gap-12">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-2xl font-semibold text-white">
              Featured Creators
            </h4>
            <p className="mt-2 text-gray-400">
              Discover unique NFT collections from top creators
            </p>
          </div>
          <Button
            variant="outline"
            className="bg-theme-card/60 hover:bg-theme-card/80 border-purple-500/20 text-white backdrop-blur-sm"
          >
            View All
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {mockNFTs.map((nft) => (
            <NFTCard
              key={nft.id}
              id={nft.id}
              name={nft.name}
              collection={nft.collection}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
