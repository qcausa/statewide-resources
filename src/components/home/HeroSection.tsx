"use client";

import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <div className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden">
      <div className="bg-grid-pattern absolute inset-0 opacity-20" />
      <div className="bg-gradient-radial absolute inset-0 from-purple-500/20 via-transparent to-transparent" />

      <div className="container relative flex flex-col items-center gap-12 text-center">
        <h1 className="max-w-3xl bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-5xl font-bold text-transparent sm:text-6xl">
          Your Content,
          <br />
          Locked behind your NFT.
        </h1>
        <p className="max-w-2xl text-lg text-gray-300">
          Create and enjoy gated experiences from your NFT communities. Movies,
          Shows, Videos, Art, Articles, Events & More!
        </p>

        <div className="flex gap-4">
          <Button
            size="lg"
            className="bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600"
          >
            Get Started
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="bg-theme-card/60 hover:bg-theme-card/80 border-purple-500/20 text-white backdrop-blur-sm"
          >
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
}
