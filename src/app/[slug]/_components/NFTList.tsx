import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { type Nft, type GetNftByAddressQuery } from "~/graphql/generated";

// type Nft = NonNullable<GetNftByAddressQuery["nftByAddress"]>;

interface NFTListProps {
  nfts?: Partial<Nft>[] | null | undefined;
  brandSlug: string;
}

export function NFTList({ nfts, brandSlug }: NFTListProps) {
  if (!nfts?.length) {
    return <div>No NFTs found</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {nfts.map((nft) => (
        <Link
          key={nft.id}
          href={`/${brandSlug}/${nft.nftAddress}`}
          className={cn(
            "from-theme-card/40 to-theme-card-secondary/40 hover:from-theme-card/60 hover:to-theme-card-secondary/60 group relative overflow-hidden rounded-lg bg-gradient-to-br p-2 transition-all",
            "hover:border-theme-card/60 border border-transparent",
          )}
        >
          <Card className="overflow-hidden border-0 bg-[#1E1B2E]/60 shadow-xl backdrop-blur-sm">
            {nft.featuredImage?.node?.sourceUrl && (
              <CardContent className="p-0">
                <div className="aspect-square">
                  <Image
                    src={nft.featuredImage.node.sourceUrl}
                    alt={nft.title ?? ""}
                    fill
                    className="object-cover"
                  />
                </div>
              </CardContent>
            )}
            <CardHeader>
              <CardTitle>{nft.title}</CardTitle>
            </CardHeader>
          </Card>
        </Link>
      ))}
    </div>
  );
}
