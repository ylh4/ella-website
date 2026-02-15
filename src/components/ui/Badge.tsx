import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "filled" | "outlined";
  className?: string;
}

export default function Badge({
  children,
  variant = "filled",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        variant === "filled" &&
          "bg-lavender-100 text-lavender-800",
        variant === "outlined" &&
          "border border-lavender-300 text-lavender-700",
        className
      )}
    >
      {children}
    </span>
  );
}
