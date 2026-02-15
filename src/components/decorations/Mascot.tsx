import Image from "next/image";
import { cn } from "@/lib/utils";

interface MascotProps {
  variant?: "happy" | "reading" | "painting" | "waving";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizes = {
  sm: { className: "w-16 h-16", px: 64 },
  md: { className: "w-24 h-24", px: 96 },
  lg: { className: "w-32 h-32", px: 128 },
};

export default function Mascot({
  size = "md",
  className,
}: MascotProps) {
  const s = sizes[size];

  return (
    <div
      className={cn(
        s.className,
        "relative rounded-full overflow-hidden bg-lavender-100",
        className
      )}
    >
      <Image
        src="/images/mascot_new.png"
        alt="Ella's dog mascot reading a book"
        width={s.px}
        height={s.px}
        className="w-full h-full object-cover object-center"
        priority
      />
    </div>
  );
}
