import React from "react";
import clsx from "clsx";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "tertiary";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  className?: string;
  fullWidth?: boolean; // Control full width behavior
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  disabled,
  className,
  fullWidth = false,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-medium rounded-[2.5rem] cursor-pointer transition disabled:opacity-50 disabled:cursor-not-allowed";

  const focus = "focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    primary: "bg-[#003EFF] text-white hover:bg-[#002BCC] focus:ring-[#003EFF]",
    secondary:
      "bg-white text-primary border border-[#E3E6EF] hover:bg-gray-50 focus:ring-[#E3E6EF]",
    tertiary:
      "bg-white text-[#003EFF] border border-[#E3E6EF] focus:ring-[#003EFF]",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 sm:px-6 lg:px-8 py-2 sm:py-2.5 lg:py-3 text-xs sm:text-sm",
    lg: "px-6 sm:px-8 lg:px-10 py-3 sm:py-3.5 lg:py-4 text-sm sm:text-base",
  };

  return (
    <button
      className={clsx(
        base,
        focus,
        variants[variant],
        sizes[size],
        fullWidth && "w-full",
        className
      )}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
}
