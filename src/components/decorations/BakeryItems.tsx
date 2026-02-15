import { cn } from "@/lib/utils";

interface BakeryItemProps {
  className?: string;
  size?: number;
}

export function Baguette({ className, size = 40 }: BakeryItemProps) {
  return (
    <svg viewBox="0 0 80 30" width={size} height={size * 0.375} className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M8 15 Q4 8 12 5 Q40 -2 68 5 Q76 8 72 15 Q76 22 68 25 Q40 32 12 25 Q4 22 8 15Z" fill="#d4b896" />
      <path d="M20 8 Q35 12 50 8" stroke="#bf9b6e" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M18 14 Q35 18 52 14" stroke="#bf9b6e" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <path d="M22 20 Q37 24 48 20" stroke="#bf9b6e" strokeWidth="1" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function Croissant({ className, size = 36 }: BakeryItemProps) {
  return (
    <svg viewBox="0 0 50 40" width={size} height={size * 0.8} className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M10 30 Q5 20 15 12 Q22 6 30 8 Q35 4 42 8 Q48 14 40 22 Q35 28 25 30 Q18 34 10 30Z" fill="#d4b896" />
      <path d="M15 25 Q20 18 28 16" stroke="#bf9b6e" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <path d="M18 28 Q24 22 32 20" stroke="#bf9b6e" strokeWidth="1" fill="none" strokeLinecap="round" />
      <path d="M30 10 Q36 12 38 18" stroke="#bf9b6e" strokeWidth="1" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function BreadLoaf({ className, size = 34 }: BakeryItemProps) {
  return (
    <svg viewBox="0 0 50 45" width={size} height={size * 0.9} className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M8 25 L8 38 Q8 42 12 42 L38 42 Q42 42 42 38 L42 25" fill="#c09b6e" />
      <ellipse cx="25" cy="25" rx="18" ry="12" fill="#d4b896" />
      <path d="M16 20 Q25 15 34 20" stroke="#bf9b6e" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <line x1="25" y1="17" x2="25" y2="30" stroke="#bf9b6e" strokeWidth="0.8" strokeLinecap="round" />
    </svg>
  );
}

export function Pretzel({ className, size = 32 }: BakeryItemProps) {
  return (
    <svg viewBox="0 0 44 44" width={size} height={size} className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M22 6 Q14 2 8 10 Q3 18 10 24 Q4 30 10 36 Q16 42 22 36 Q28 42 34 36 Q40 30 34 24 Q41 18 36 10 Q30 2 22 6Z" fill="none" stroke="#d4b896" strokeWidth="5" strokeLinecap="round" />
      <path d="M22 6 Q14 2 8 10 Q3 18 10 24 Q4 30 10 36 Q16 42 22 36 Q28 42 34 36 Q40 30 34 24 Q41 18 36 10 Q30 2 22 6Z" fill="none" stroke="#c09b6e" strokeWidth="3" strokeLinecap="round" />
      <circle cx="12" cy="14" r="1.2" fill="#a67c52" />
      <circle cx="32" cy="14" r="1" fill="#a67c52" />
      <circle cx="22" cy="28" r="1.2" fill="#a67c52" />
      <circle cx="15" cy="34" r="0.8" fill="#a67c52" />
      <circle cx="30" cy="34" r="1" fill="#a67c52" />
    </svg>
  );
}

export function WheatStalk({ className, size = 44 }: BakeryItemProps) {
  return (
    <svg viewBox="0 0 24 60" width={size * 0.4} height={size} className={className} xmlns="http://www.w3.org/2000/svg">
      <line x1="12" y1="58" x2="12" y2="8" stroke="#a67c52" strokeWidth="1.5" strokeLinecap="round" />
      <ellipse cx="8" cy="12" rx="4" ry="2.5" fill="#d4b896" transform="rotate(-30 8 12)" />
      <ellipse cx="16" cy="16" rx="4" ry="2.5" fill="#d4b896" transform="rotate(30 16 16)" />
      <ellipse cx="8" cy="22" rx="4" ry="2.5" fill="#d4b896" transform="rotate(-30 8 22)" />
      <ellipse cx="16" cy="26" rx="4" ry="2.5" fill="#d4b896" transform="rotate(30 16 26)" />
      <ellipse cx="8" cy="32" rx="4" ry="2.5" fill="#d4b896" transform="rotate(-30 8 32)" />
      <ellipse cx="16" cy="36" rx="4" ry="2.5" fill="#d4b896" transform="rotate(30 16 36)" />
      <ellipse cx="12" cy="8" rx="3" ry="4" fill="#bf9b6e" />
    </svg>
  );
}

export function Donut({ className, size = 30 }: BakeryItemProps) {
  return (
    <svg viewBox="0 0 44 44" width={size} height={size} className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="22" cy="22" r="18" fill="#d4b896" />
      <circle cx="22" cy="22" r="7" fill="#faf5ef" />
      <path d="M8 18 Q14 10 22 8 Q30 6 36 12 Q40 16 38 22" fill="#c09b6e" opacity="0.5" />
    </svg>
  );
}
