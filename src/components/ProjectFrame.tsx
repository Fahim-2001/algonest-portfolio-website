import Image from "next/image";
import { Globe, LockSimple } from "@phosphor-icons/react/dist/ssr";
import type { Project } from "@/content/projects";
import { HeroMotion } from "./HeroMotion";

/**
 * Browser chrome around a project visual: three dots and an address pill. The
 * address is the public URL, or a note that the build is private.
 */
export function BrowserFrame({
  address,
  isPublic,
  children,
  compact = false,
  className = "",
}: {
  address: string;
  isPublic: boolean;
  children: React.ReactNode;
  compact?: boolean;
  className?: string;
}) {
  const Icon = isPublic ? Globe : LockSimple;
  return (
    <div className={`overflow-hidden rounded-[20px] border border-line bg-surface-2 ${className}`}>
      <div className={`flex items-center gap-3 border-b border-line px-4 ${compact ? "h-8" : "h-10"}`}>
        <span className="flex shrink-0 gap-1.5" aria-hidden="true">
          {[0, 1, 2].map((n) => (
            <span key={n} className="size-2.5 rounded-full bg-muted/30" />
          ))}
        </span>
        <span className="mx-auto flex min-w-0 items-center gap-1.5 rounded-full bg-surface px-3 py-0.5 font-mono text-xs text-muted">
          <Icon size={12} aria-hidden="true" className="shrink-0" />
          <span className="truncate">{address}</span>
        </span>
        {/* Balances the dots so the address sits in the middle. */}
        <span className="w-[42px] shrink-0" aria-hidden="true" />
      </div>
      <div className="relative aspect-[16/9] overflow-hidden bg-[var(--art-bg)]">{children}</div>
    </div>
  );
}

/**
 * What a project looks like: its screenshot when it is public, its scene when
 * it is not. Fills the frame it sits in.
 */
export function ProjectVisual({
  project: p,
  sizes,
  priority = false,
  still = false,
  decorative = false,
}: {
  project: Pick<Project, "shot" | "scene">;
  sizes: string;
  priority?: boolean;
  /** One frame of the scene instead of the loop. */
  still?: boolean;
  /** The visual sits inside a link that already names the project. */
  decorative?: boolean;
}) {
  if (p.shot)
    return (
      <Image
        src={p.shot.src}
        alt={decorative ? "" : p.shot.alt}
        width={p.shot.width}
        height={p.shot.height}
        sizes={sizes}
        priority={priority}
        className="absolute inset-0 size-full object-cover object-left-top"
      />
    );
  if (p.scene) return <HeroMotion scene={p.scene} still={still} className="absolute inset-0" />;
  return null;
}
