import Image from "next/image";

type LogoProps = {
  className?: string;
  variant?: "default" | "light";
  size?: "sm" | "md" | "lg";
};

// Logo Nebulari cropada (whitespace removido): 1034×288 → aspect 3.59:1
const RATIO = 3.59;
const SIZES: Record<NonNullable<LogoProps["size"]>, number> = {
  sm: 32,
  md: 40,
  lg: 56,
};

export default function Logo({
  className = "",
  variant = "default",
  size = "md",
}: LogoProps) {
  const h = SIZES[size];
  const w = Math.round(h * RATIO);
  const glow =
    variant === "light"
      ? "drop-shadow-[0_0_22px_rgba(192,132,252,0.55)]"
      : "drop-shadow-[0_2px_8px_rgba(91,33,182,0.18)]";

  return (
    <div className={`relative inline-flex items-center ${className}`}>
      <Image
        src="/logo-tight.png"
        alt="Nebulari"
        width={w}
        height={h}
        priority
        className={glow}
        style={{ height: h, width: w }}
      />
    </div>
  );
}
