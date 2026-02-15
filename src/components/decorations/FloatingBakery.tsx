"use client";

import Image from "next/image";

const breadImages = [
  "/images/bread/round-bread.png",
  "/images/bread/croissant.png",
  "/images/bread/sesame-bread.png",
  "/images/bread/pretzel.png",
  "/images/bread/loaf-slice.png",
  "/images/bread/toast.png",
  "/images/bread/twisted-bread.png",
  "/images/bread/bread-roll.png",
];

const items = [
  // Left side - spread from edge toward middle
  { img: 1, style: { top: "1%", left: "3%" }, size: 70, rotate: -15, delay: 0, opacity: 0.5 },
  { img: 6, style: { top: "15%", left: "12%" }, size: 60, rotate: 10, delay: 2.5, opacity: 0.4 },
  { img: 3, style: { top: "30%", left: "5%" }, size: 65, rotate: -8, delay: 1.2, opacity: 0.45 },
  { img: 0, style: { top: "46%", left: "15%" }, size: 55, rotate: 20, delay: 3.8, opacity: 0.38 },
  { img: 2, style: { top: "60%", left: "2%" }, size: 72, rotate: -22, delay: 0.8, opacity: 0.5 },
  { img: 5, style: { top: "74%", left: "10%" }, size: 58, rotate: 5, delay: 4.2, opacity: 0.4 },
  { img: 7, style: { top: "88%", left: "4%" }, size: 64, rotate: -12, delay: 1.8, opacity: 0.45 },

  // Right side - spread from edge toward middle
  { img: 4, style: { top: "6%", right: "4%" }, size: 66, rotate: 12, delay: 1.5, opacity: 0.48 },
  { img: 0, style: { top: "22%", right: "13%" }, size: 58, rotate: -10, delay: 3.5, opacity: 0.38 },
  { img: 1, style: { top: "38%", right: "3%" }, size: 68, rotate: 8, delay: 0.4, opacity: 0.5 },
  { img: 7, style: { top: "52%", right: "14%" }, size: 56, rotate: -18, delay: 2.2, opacity: 0.4 },
  { img: 3, style: { top: "68%", right: "5%" }, size: 70, rotate: 15, delay: 4.8, opacity: 0.45 },
  { img: 6, style: { top: "82%", right: "11%" }, size: 60, rotate: -5, delay: 1, opacity: 0.42 },
  { img: 5, style: { top: "94%", right: "3%" }, size: 62, rotate: 22, delay: 2.8, opacity: 0.48 },

  // Middle scattered - subtle, smaller
  { img: 2, style: { top: "8%", left: "25%" }, size: 48, rotate: -30, delay: 2, opacity: 0.25 },
  { img: 4, style: { top: "35%", right: "28%" }, size: 44, rotate: 14, delay: 5, opacity: 0.22 },
  { img: 7, style: { top: "58%", left: "22%" }, size: 46, rotate: -10, delay: 3, opacity: 0.2 },
  { img: 1, style: { top: "80%", right: "24%" }, size: 50, rotate: 25, delay: 1.2, opacity: 0.22 },
];

export default function FloatingBakery() {
  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden hidden md:block" aria-hidden="true">
      {items.map((item, i) => (
        <div
          key={i}
          className="absolute animate-float"
          style={{
            ...item.style,
            opacity: item.opacity,
            animationDelay: `${item.delay}s`,
            animationDuration: `${6 + (i % 4) * 1.5}s`,
            transform: `rotate(${item.rotate}deg)`,
          }}
        >
          <Image
            src={breadImages[item.img]}
            alt=""
            width={item.size}
            height={item.size}
            className="object-contain"
          />
        </div>
      ))}
    </div>
  );
}
