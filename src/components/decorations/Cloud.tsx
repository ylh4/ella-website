import { cn } from "@/lib/utils";

interface CloudProps {
  className?: string;
  delay?: string;
}

export default function Cloud({ className, delay = "0s" }: CloudProps) {
  return (
    <svg
      viewBox="0 0 120 60"
      className={cn("w-20 h-10 animate-float", className)}
      style={{ animationDelay: delay }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse cx="60" cy="40" rx="50" ry="18" fill="#f3ebe0" />
      <ellipse cx="40" cy="30" rx="25" ry="20" fill="#f3ebe0" />
      <ellipse cx="75" cy="30" rx="22" ry="18" fill="#f3ebe0" />
      <ellipse cx="55" cy="22" rx="20" ry="16" fill="#f3ebe0" />
    </svg>
  );
}
