"use client";

import React, { useState } from "react";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface CarouselItem {
  id: string;
  title: string;
  description?: string;
  videoUrl: string;
  bgColor: string;
}

interface VideoCarousel3DProps {
  data?: CarouselItem[];
  activeSlide?: number;
}

interface SlideContentProps extends CarouselItem {
  isActive: boolean;
  isPlaying: boolean;
}

const extractVimeoId = (content: string) => {
  const match = content.match(/video\/(\d+)/);
  return match ? match[1] : null;
};

const SlideContent = ({
  title,
  description,
  videoUrl,
  isActive,
  isPlaying,
}: SlideContentProps) => {
  const iframeRef = React.useRef<HTMLIFrameElement>(null);
  const vimeoId = extractVimeoId(videoUrl);

  // Stop video when slide becomes inactive
  React.useEffect(() => {
    if (!isActive && iframeRef.current) {
      // Post message to Vimeo player to pause
      iframeRef.current.contentWindow?.postMessage(
        JSON.stringify({ method: "pause" }),
        "*",
      );
    }
  }, [isActive]);

  if (!vimeoId) return null;

  const embedUrl = `https://player.vimeo.com/video/${vimeoId}?controls=1&background=0&title=0&byline=0&portrait=0&playsinline=0`;

  return (
    <div className="sliderContent relative h-full">
      <iframe
        ref={iframeRef}
        src={embedUrl}
        className="h-full w-full rounded-lg"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
      />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/80 to-transparent p-4">
        <h2 className="text-xl font-bold text-white">{title}</h2>
        {description && <p className="text-sm text-gray-200">{description}</p>}
      </div>
    </div>
  );
};

export default function VideoCarousel3D({
  data = [],
  activeSlide = 0,
}: VideoCarousel3DProps) {
  console.log(data);
  const [currentSlide, setCurrentSlide] = useState(activeSlide);

  const next = () => {
    if (currentSlide < data.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const getStyles = (index: number) => {
    if (currentSlide === index)
      return {
        opacity: 1,
        transform: "translateX(0px) translateZ(0px) rotateY(0deg)",
        zIndex: 10,
      };
    else if (currentSlide - 1 === index)
      return {
        opacity: 0.4,
        transform:
          "translateX(min(-120px, -15vw)) translateZ(-200px) rotateY(35deg)",
        zIndex: 9,
      };
    else if (currentSlide + 1 === index)
      return {
        opacity: 0.4,
        transform:
          "translateX(min(120px, 15vw)) translateZ(-200px) rotateY(-35deg)",
        zIndex: 9,
      };
    else if (currentSlide - 2 === index)
      return {
        opacity: 0.2,
        transform:
          "translateX(min(-240px, -30vw)) translateZ(-400px) rotateY(35deg)",
        zIndex: 8,
      };
    else if (currentSlide + 2 === index)
      return {
        opacity: 0.2,
        transform:
          "translateX(min(240px, 30vw)) translateZ(-400px) rotateY(-35deg)",
        zIndex: 8,
      };
    else if (index < currentSlide - 2)
      return {
        opacity: 0,
        transform:
          "translateX(min(-240px, -30vw)) translateZ(-400px) rotateY(35deg)",
        zIndex: 7,
      };
    else if (index > currentSlide + 2)
      return {
        opacity: 0,
        transform:
          "translateX(min(240px, 30vw)) translateZ(-400px) rotateY(-35deg)",
        zIndex: 7,
      };
  };

  return (
    <div className="perspective-1000 relative w-full">
      {/* carousel */}
      <div className="relative w-full pb-[56.25%]">
        {" "}
        {/* 16:9 aspect ratio */}
        <div className="slideC absolute inset-0">
          {data.map((item, i) => (
            <React.Fragment key={item.id}>
              <div
                className="slide absolute inset-0 transition-all duration-500 ease-out"
                style={{
                  background: item.bgColor,
                  boxShadow: `0 5px 20px ${item.bgColor}30`,
                  ...getStyles(i),
                }}
              >
                <SlideContent
                  {...item}
                  isActive={currentSlide === i}
                  isPlaying={currentSlide === i}
                />
              </div>
              <div
                className="reflection absolute left-0 top-full h-20 w-full transition-all duration-500 ease-out"
                style={{
                  background: `linear-gradient(to bottom, ${item.bgColor}40, transparent)`,
                  ...getStyles(i),
                }}
              />
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="mt-8 flex justify-center gap-4">
        <button
          className="btn rounded-full bg-white/10 p-2 transition-colors hover:bg-white/20"
          onClick={prev}
          disabled={currentSlide === 0}
        >
          <FontAwesomeIcon
            icon={faChevronLeft}
            className="h-6 w-6 text-white"
          />
        </button>
        <button
          className="btn rounded-full bg-white/10 p-2 transition-colors hover:bg-white/20"
          onClick={next}
          disabled={currentSlide === data.length - 1}
        >
          <FontAwesomeIcon
            icon={faChevronRight}
            className="h-6 w-6 text-white"
          />
        </button>
      </div>
    </div>
  );
}
