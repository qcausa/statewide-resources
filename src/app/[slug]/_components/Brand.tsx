import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Nft, useGetListingBySlugQuery } from "~/graphql/generated";

import { NFTList } from "./NFTList";

export function Brand({ brandSlug }: { brandSlug: string }) {
  const { data: listingData, isLoading } = useGetListingBySlugQuery({
    slug: brandSlug,
  });
  const listing = listingData?.customListing;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!listing) {
    return <div>Brand not found</div>;
  }

  return (
    <div className="from-theme-background via-theme-background-secondary to-theme-background flex min-h-screen flex-1 flex-col bg-gradient-to-br">
      {/* <ListingHeader profile={listing.id} /> */}
      <div className="container py-12">
        test
        <NFTList
          nfts={listing.nfts?.nodes as Partial<Nft>[]}
          brandSlug={brandSlug}
        />
      </div>
    </div>
  );
}
