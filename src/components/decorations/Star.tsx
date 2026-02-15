import { cn } from "@/lib/utils";

interface StarProps {
  className?: string;
  delay?: string;
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-8 h-8",
};

export default function Star({
  className,
  delay = "0s",
  size = "md",
}: StarProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn(sizes[size], "animate-twinkle", className)}
      style={{ animationDelay: delay }}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8l-6.2 4.5 2.4-7.4L2 9.4h7.6L12 2z"
        fill="#bf9b6e"
      />
    </svg>
  );
}
