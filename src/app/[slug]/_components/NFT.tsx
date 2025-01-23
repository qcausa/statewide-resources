import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Assets } from "./Assets";
import { NFTLinks } from "./NFTLinks";
import { useGetNftByAddressQuery } from "~/graphql/generated";

export function NFT({ nftAddress }: { nftAddress: string }) {
  nftAddress = decodeURIComponent(nftAddress);
  console.log("NFT Address:", decodeURIComponent(nftAddress));
  const { data: nftData, isLoading: isNftLoading } = useGetNftByAddressQuery({
    nftAddress,
  });
  console.log("NFT Data:", nftData);
  //   const nft = nftData?.nftByAddress;
  //   console.log("NFT:", nft);

  //   if (isNftLoading) {
  //     return <div>Loading...</div>;
  //   }

  //   if (!nft) {
  //     return <div>NFT not found</div>;
  //   }

  return (
    <div className="grid grid-cols-1 gap-28 md:grid-cols-[2fr_1fr]">
      {/* <div>
        <Card className="bg-theme-card/40 border-0">
          <CardHeader>
            <CardTitle>Description</CardTitle>
          </CardHeader>
          <CardContent>
            <div dangerouslySetInnerHTML={{ __html: nft.excerpt ?? "" }} />
          </CardContent>
        </Card>
        <NFTLinks links={Array.isArray(nft.nftLinks) ? nft.nftLinks : []} />
      </div> */}
      <Assets nftAddress={nftAddress} />
    </div>
  );
}
