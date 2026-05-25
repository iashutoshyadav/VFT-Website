import Link from "next/link";
import type { ReactNode, CSSProperties } from "react";

interface DashCardProps {
  title: string;
  /** Internal href for the "View all" link — omit to hide the link */
  linkHref?: string;
  /** Label for the action link — defaults to "View all →" */
  linkLabel?: string;
  children: ReactNode;
  /** Extra styles merged onto the outer wrapper (e.g. marginBottom) */
  style?: CSSProperties;
}

/**
 * Reusable white card used throughout the member dashboard.
 * Handles the card shell + title/link header so pages only describe content.
 */
export default function DashCard({
  title,
  linkHref,
  linkLabel = "View all →",
  children,
  style,
}: DashCardProps) {
  return (
    <div
      className="bg-white border border-[#e5e7eb] rounded-2xl p-5"
      style={style}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-['Outfit',sans-serif] font-extrabold text-base text-[#0f172a] m-0">
          {title}
        </h2>
        {linkHref && (
          <Link
            href={linkHref}
            className="text-[#00a85d] text-[0.78rem] font-bold no-underline"
          >
            {linkLabel}
          </Link>
        )}
      </div>
      {children}
    </div>
  );
}
