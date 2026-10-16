import { cn } from "@/lib/utils";

export function Sparkle({ className }: { className?: string }) {
  return (
    <svg className={cn("sparkle", className)} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 0c.65 7.28 4.72 11.35 12 12-7.28.65-11.35 4.72-12 12C11.35 16.72 7.28 12.65 0 12 7.28 11.35 11.35 7.28 12 0Z" fill="currentColor" />
    </svg>
  );
}
