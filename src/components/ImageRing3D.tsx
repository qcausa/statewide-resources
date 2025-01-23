"use client";

import { useEffect, useRef } from "react";

import gsap from "gsap";

type ImageRing3DProps = {
  images: string[];
};

export function ImageRing3D({ images }: ImageRing3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  let xPos = 0;

  function getBgPos(i: number) {
    if (!ringRef.current) return "0px 0px";
    const rotation = gsap.getProperty(ringRef.current, "rotationY") as number;
    return (
      100 -
      (gsap.utils.wrap(0, 360, rotation - 180 - i * 36) / 360) * 500 +
      "px 0px"
    );
  }

  function dragStart(e: MouseEvent | TouchEvent) {
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    xPos = Math.round(clientX);
    gsap.set(ringRef.current, { cursor: "grabbing" });
    window.addEventListener("mousemove", drag);
    window.addEventListener("touchmove", drag);
  }

  function drag(e: MouseEvent | TouchEvent) {
    const clientX =
      "touches" in e
        ? (e as TouchEvent).touches[0].clientX
        : (e as MouseEvent).clientX;

    gsap.to(ringRef.current, {
      rotationY: "-=" + ((Math.round(clientX) - xPos) % 360),
      onUpdate: () => {
        document.querySelectorAll(".img").forEach((img, i) => {
          gsap.set(img, { backgroundPosition: getBgPos(i) });
        });
      },
    });

    xPos = Math.round(clientX);
  }

  function dragEnd() {
    window.removeEventListener("mousemove", drag);
    window.removeEventListener("touchmove", drag);
    gsap.set(ringRef.current, { cursor: "grab" });
  }

  useEffect(() => {
    if (!ringRef.current) return;

    const tl = gsap.timeline();

    tl.set(ringRef.current, { rotationY: 180, cursor: "grab" })
      .set(".img", {
        rotateY: (i) => i * -36,
        transformOrigin: "50% 50% 500px",
        z: -500,
        backgroundImage: (i) => `url(${images[i % images.length]})`,
        backgroundPosition: (i) => getBgPos(i),
        backfaceVisibility: "hidden",
      })
      .from(".img", {
        duration: 1.5,
        y: 200,
        opacity: 0,
        stagger: 0.1,
        ease: "expo",
      })
      .add(() => {
        const imgs = document.querySelectorAll(".img");
        imgs.forEach((img) => {
          img.addEventListener("mouseenter", () => {
            gsap.to(".img", {
              opacity: (_, t) => (t === img ? 1 : 0.5),
              ease: "power3",
            });
          });
          img.addEventListener("mouseleave", () => {
            gsap.to(".img", { opacity: 1, ease: "power2.inOut" });
          });
        });
      }, "-=0.5");

    window.addEventListener("mousedown", dragStart);
    window.addEventListener("touchstart", dragStart);
    window.addEventListener("mouseup", dragEnd);
    window.addEventListener("touchend", dragEnd);

    return () => {
      window.removeEventListener("mousedown", dragStart);
      window.removeEventListener("touchstart", dragStart);
      window.removeEventListener("mouseup", dragEnd);
      window.removeEventListener("touchend", dragEnd);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="perspective-[2000px] relative mx-auto h-[400px] w-[300px]"
    >
      <div ref={ringRef} className="preserve-3d h-full w-full ring">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="img preserve-3d absolute h-full w-full" />
        ))}
      </div>
    </div>
  );
}
