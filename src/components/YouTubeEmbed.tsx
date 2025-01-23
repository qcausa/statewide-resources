type YouTubeEmbedProps = {
  videoId: string;
};

export function YouTubeEmbed({ videoId }: YouTubeEmbedProps) {
  return (
    <iframe
      className="h-full w-full"
      src={`https://www.youtube.com/embed/${videoId}`}
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  );
}
