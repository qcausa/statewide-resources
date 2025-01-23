"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import { VideoEmbed } from "./VideoEmbed";
import { cn } from "@/lib/utils";
import { useState } from "react";

type Video = {
  id: string;
  platform: "vimeo" | "youtube";
  title: string;
};

type VideoCarouselProps = {
  videos: Video[];
};

export function VideoCarousel({ videos }: VideoCarouselProps) {
  const [activeVideo, setActiveVideo] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      y: 0,
      opacity: 0,
      rotateY: direction > 0 ? 45 : -45,
      scale: 0.8,
    }),
    center: {
      x: 0,
      y: 0,
      opacity: 1,
      rotateY: 0,
      scale: 1,
      zIndex: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      y: 0,
      opacity: 0,
      rotateY: direction < 0 ? 45 : -45,
      scale: 0.8,
      zIndex: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setActiveVideo(
      (prev) => (prev + newDirection + videos.length) % videos.length,
    );
  };

  return (
    <div className="relative">
      {/* Navigation Buttons */}
      <div className="absolute left-4 right-4 top-1/2 z-20 flex -translate-y-1/2 justify-between">
        <button
          onClick={() => paginate(-1)}
          className="rounded-full bg-black/20 p-2 text-white backdrop-blur-sm transition-colors hover:bg-black/40"
        >
          <ChevronLeftIcon size={24} />
        </button>
        <button
          onClick={() => paginate(1)}
          className="rounded-full bg-black/20 p-2 text-white backdrop-blur-sm transition-colors hover:bg-black/40"
        >
          <ChevronRightIcon size={24} />
        </button>
      </div>

      {/* Video Carousel */}
      <div className="perspective-[1200px] relative h-[600px]">
        <div className="bg-theme-card/40 absolute inset-0 rounded-3xl shadow-2xl">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={activeVideo}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.3 },
                rotateY: { type: "spring", stiffness: 200, damping: 30 },
                scale: { type: "spring", stiffness: 200, damping: 30 },
              }}
              className="preserve-3d absolute inset-0 origin-center"
              style={{ transformStyle: "preserve-3d" }}
            >
              <Card className="h-full border-0 bg-transparent">
                <CardHeader>
                  <CardTitle className="text-xl font-medium text-white">
                    {videos[activeVideo].title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-full">
                  <div className="aspect-video w-full overflow-hidden rounded-lg">
                    <VideoEmbed
                      videoId={videos[activeVideo].id}
                      platform={videos[activeVideo].platform}
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Video Indicators */}
      <div className="mt-6 flex justify-center gap-2">
        {videos.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              const newDirection = index > activeVideo ? 1 : -1;
              setDirection(newDirection);
              setActiveVideo(index);
            }}
            className={cn(
              "h-2 w-2 rounded-full transition-all",
              activeVideo === index
                ? "w-6 bg-white"
                : "bg-white/20 hover:bg-white/40",
            )}
          />
        ))}
      </div>
    </div>
  );
}
