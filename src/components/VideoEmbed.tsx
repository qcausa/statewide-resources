type VideoEmbedProps = {
  videoId: string;
  platform: "youtube" | "vimeo";
};

export function VideoEmbed({ videoId, platform }: VideoEmbedProps) {
  const embedUrl =
    platform === "youtube"
      ? `https://www.youtube.com/embed/${videoId}`
      : `https://player.vimeo.com/video/${videoId}`;

  return (
    <iframe
      className="h-full w-full"
      src={embedUrl}
      title="Video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  );
}
