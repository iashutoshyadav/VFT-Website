import Link from "next/link";

interface VftLogoProps {
  /** href for the wrapping link — defaults to "/" */
  href?: string;
  /** Height in px — width scales automatically — defaults to 36 */
  size?: number;
  /** "white" inverts the dark logo for use on dark backgrounds */
  theme?: "white" | "dark";
  className?: string;
}

/**
 * VFT logo mark — uses /vft-full-logo.svg
 * theme="white"  → white version for dark backgrounds (sidebar, login hero)
 * theme="dark"   → original dark version for light backgrounds (navbar, forms)
 */
export default function VftLogo({
  href = "/",
  size = 36,
  theme = "dark",
  className = "",
}: VftLogoProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center no-underline ${className}`}
    >
      <img
        src="/vft-full-logo.svg"
        alt="Vitality Fitness Tavistock"
        style={{
          height: `${size}px`,
          width: "auto",
          display: "block",
          filter: theme === "white"
            ? "brightness(0) invert(1)"          // dark SVG → white
            : "none",
        }}
      />
    </Link>
  );
}
