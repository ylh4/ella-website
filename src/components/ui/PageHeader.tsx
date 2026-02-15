import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  decoration?: ReactNode;
  className?: string;
}

export default function PageHeader({
  title,
  subtitle,
  decoration,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn("text-center py-12 relative", className)}>
      {decoration && (
        <div className="absolute top-0 right-0 opacity-20">{decoration}</div>
      )}
      <h1 className="text-4xl md:text-5xl font-bold font-display text-lavender-800 mb-3">
        {title}
      </h1>
      {subtitle && (
        <p className="text-lg text-lavender-600 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
