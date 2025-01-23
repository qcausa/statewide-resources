"use client";

import VideoCarousel3D from "~/components/VideoCarousel3D";
import { useGetAssetsByNftAddressQuery } from "~/graphql/generated";
import { useMemo } from "react";

interface AssetType {
  name?: string | null;
}

interface Asset {
  id: string;
  title?: string | null;
  content?: string | null;
  assetTypes?: {
    nodes: Array<AssetType>;
  } | null;
}

export function Assets({ nftAddress }: { nftAddress: string }) {
  console.log("assets address2:", nftAddress);
  const { data, isLoading } = useGetAssetsByNftAddressQuery({
    nftAddress,
  });
  console.log("Data:", data);

  const videos = useMemo(() => {
    if (!data?.assets?.nodes) return [];

    return data.assets.nodes
      .filter(
        (asset: Asset) =>
          asset.assetTypes?.nodes.some((type) => type.name === "Video") &&
          asset.content,
      )
      .map((asset: Asset, index: number) => ({
        id: `video-${index}`,
        title: asset.title ?? "Untitled",
        videoUrl: asset.content ?? "",
        bgColor: "#000000",
      }));
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!videos.length) {
    return <div>No videos found</div>;
  }

  return (
    <div className="mt-8">
      <VideoCarousel3D data={videos} />
    </div>
  );
}
