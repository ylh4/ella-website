import { cn } from "@/lib/utils";

interface BearProps {
  variant?: "happy" | "reading" | "painting" | "waving";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizes = {
  sm: "w-16 h-16",
  md: "w-24 h-24",
  lg: "w-32 h-32",
};

export default function Bear({
  variant = "happy",
  size = "md",
  className,
}: BearProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={cn(sizes[size], className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Ears */}
      <circle cx="25" cy="20" r="15" fill="#d8b4fe" />
      <circle cx="75" cy="20" r="15" fill="#d8b4fe" />
      <circle cx="25" cy="20" r="8" fill="#f3e8ff" />
      <circle cx="75" cy="20" r="8" fill="#f3e8ff" />

      {/* Head */}
      <circle cx="50" cy="50" r="35" fill="#e9d5ff" />

      {/* Eyes */}
      {variant === "happy" || variant === "waving" ? (
        <>
          <ellipse cx="38" cy="45" rx="3" ry="4" fill="#581c87" />
          <ellipse cx="62" cy="45" rx="3" ry="4" fill="#581c87" />
          <circle cx="39" cy="43" r="1" fill="white" />
          <circle cx="63" cy="43" r="1" fill="white" />
        </>
      ) : (
        <>
          {/* Closed/reading eyes */}
          <path
            d="M33 45 Q38 41 43 45"
            stroke="#581c87"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M57 45 Q62 41 67 45"
            stroke="#581c87"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
        </>
      )}

      {/* Nose */}
      <ellipse cx="50" cy="55" rx="5" ry="3.5" fill="#c084fc" />

      {/* Mouth */}
      <path
        d="M44 60 Q50 66 56 60"
        stroke="#581c87"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Blush */}
      <circle cx="32" cy="55" r="5" fill="#f9a8d4" opacity="0.4" />
      <circle cx="68" cy="55" r="5" fill="#f9a8d4" opacity="0.4" />

      {/* Variant-specific accessories */}
      {variant === "reading" && (
        <rect
          x="30"
          y="70"
          width="40"
          height="25"
          rx="3"
          fill="#a855f7"
          opacity="0.6"
        />
      )}
      {variant === "painting" && (
        <>
          <line
            x1="75"
            y1="55"
            x2="95"
            y2="35"
            stroke="#7e22ce"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="95" cy="33" r="3" fill="#f472b6" />
        </>
      )}
      {variant === "waving" && (
        <path
          d="M80 35 Q90 25 85 15"
          stroke="#e9d5ff"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />
      )}
    </svg>
  );
}
