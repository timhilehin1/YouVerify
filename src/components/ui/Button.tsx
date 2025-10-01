import React from "react";
import clsx from "clsx"; // Using clsx is cleaner for conditional classes

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "tertiary";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  className?: string;
  // ADDED: New prop to accept any Tailwind width utility (e.g., 'w-1/2', 'max-w-xs', 'w-auto')
  widthClass?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  disabled,
  className,
  widthClass, // Destructure the new prop
  ...props
}: ButtonProps) {
  // 1. UPDATED BASE: Removed hardcoded w-full and max-w-[230px]
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
    sm: "px-3 py-1.5 text-sm",
    // Ensure padding is applied to maintain minimum size
    md: "px-[1.5rem] lg:px-[2.5rem] py-[0.875rem] text-sm",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={clsx(
        base,
        focus,
        variants[variant],
        sizes[size],

        // 2. APPLY WIDTH LOGIC:
        // Default to w-full (block behavior) AND apply the custom widthClass
        // If widthClass is provided (e.g., 'w-auto'), it will override w-full.
        widthClass || "w-full max-w-[230px]", // If no width is provided, revert to the original default.

        className // Pass through any other classes if you extend props with a className
      )}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
}
