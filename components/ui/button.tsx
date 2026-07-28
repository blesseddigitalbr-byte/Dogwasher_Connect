import { ButtonHTMLAttributes, forwardRef } from "react";
import { clsx } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-[var(--dw-navy)] text-white hover:opacity-90 focus-visible:ring-[var(--dw-navy)]",
  secondary:
    "bg-[var(--dw-orange)] text-[var(--dw-navy)] hover:opacity-90 focus-visible:ring-[var(--dw-orange)]",
  ghost:
    "bg-transparent text-[var(--dw-navy)] hover:bg-black/5 focus-visible:ring-[var(--dw-navy)]",
  danger:
    "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-600",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(
          "inline-flex items-center justify-center rounded-[var(--dw-radius-md)] px-5 py-2.5 text-sm font-medium transition-opacity",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          variantClasses[variant],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
