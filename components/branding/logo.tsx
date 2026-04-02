import Image from "next/image";

type LogoVariant = "square" | "text";
type LogoTheme = "dark" | "white";

interface LogoProps {
  variant?: LogoVariant;
  theme?: LogoTheme;
  size?: number;
  className?: string;
}

const DIMENSIONS = {
  square: { width: 129.5, height: 93.5 },
  text: { width: 800, height: 160 },
};

export function Logo({
  variant = "text",
  theme = "dark",
  size = 45,
  className,
}: LogoProps) {
  const src =
    variant === "square"
      ? theme === "white"
        ? "/logo-square-white.svg"
        : "/logo-square.svg"
      : theme === "white"
        ? "/logo-text-white.svg"
        : "/logo-text.svg";

  const { width: naturalWidth, height: naturalHeight } = DIMENSIONS[variant];
  const aspectRatio = naturalWidth / naturalHeight;

  return (
    <Image
      src={src}
      alt="openboxoffice"
      width={size * aspectRatio}
      height={size}
      className={className}
    />
  );
}
