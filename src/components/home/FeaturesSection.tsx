"use client";

import { AnimatePresence, motion } from "framer-motion";
import { LockIcon, PlayCircleIcon, Users2Icon } from "lucide-react";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { useState } from "react";

const features = [
  {
    title: "Community Pages",
    description:
      "The HQ for every NFT project. Join the conversation with your NFT community. Flex your NFTs, create gated experiences and more.",
    icon: Users2Icon,
    image: "/features/community-pages.png",
  },
  {
    title: "NFT Profiles",
    description:
      "Hey Anon, we scrapped profiles and let your favorite NFT represent you. For the first time, make it more than a PFP, make it your identity.",
    icon: LockIcon,
    image: "/features/nft-profiles.png",
  },
  {
    title: "Gated Content",
    description:
      "Movies, Shows, Videos, Art, Articles, Events & More! Only for you and your community.",
    icon: PlayCircleIcon,
    image: "/features/gated-content.png",
  },
];

export function FeaturesSection() {
  const [activeFeature, setActiveFeature] = useState(0);
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
    setActiveFeature(
      (prev) => (prev + newDirection + features.length) % features.length,
    );
  };

  return (
    <div className="container py-24">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr]">
        {/* Features List */}
        <div className="flex flex-col gap-6">
          {features.map((feature, index) => (
            <motion.button
              key={index}
              onClick={() => {
                const newDirection = index > activeFeature ? 1 : -1;
                setDirection(newDirection);
                setActiveFeature(index);
              }}
              className={cn(
                "group flex cursor-pointer flex-col gap-4 rounded-3xl p-8 text-left transition-all",
                "bg-theme-card/40 hover:bg-theme-card/60",
                activeFeature === index &&
                  "bg-theme-card/60 ring-1 ring-purple-500/20",
              )}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className="flex items-start gap-4"
                initial={false}
                animate={{
                  opacity: activeFeature === index ? 1 : 0.7,
                }}
              >
                <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-purple-500 text-white shadow-lg">
                  <feature.icon size={24} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-white">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-400">{feature.description}</p>
                </div>
              </motion.div>
            </motion.button>
          ))}
        </div>

        {/* 3D Feature Image Carousel */}
        <div className="perspective-[1200px] relative h-[600px]">
          <div className="bg-theme-card/40 absolute inset-0 rounded-3xl shadow-2xl">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={activeFeature}
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
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);
                  if (swipe < -swipeConfidenceThreshold) {
                    paginate(1);
                  } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1);
                  }
                }}
                className="preserve-3d absolute inset-0 origin-center"
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Background Glow Effect */}
                <motion.div
                  className="absolute -inset-4 rounded-[inherit] bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  exit={{ opacity: 0 }}
                />

                {/* Image Container */}
                <motion.div
                  className="absolute inset-0 overflow-hidden rounded-3xl"
                  style={{
                    backfaceVisibility: "hidden",
                  }}
                >
                  <Image
                    src={features[activeFeature].image}
                    alt={features[activeFeature].title}
                    fill
                    className="object-cover"
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  />
                </motion.div>

                {/* Feature Title Overlay */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 p-8"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="text-2xl font-bold text-white">
                    {features[activeFeature].title}
                  </h3>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
