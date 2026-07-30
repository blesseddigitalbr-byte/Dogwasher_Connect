import { InputHTMLAttributes, forwardRef } from "react";
import { clsx } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  labelClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, id, className, labelClassName, ...props }, ref) => {
    const inputId = id ?? props.name;
    return (
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor={inputId}
          className={clsx("text-sm font-medium text-[var(--dw-gray-900)]", labelClassName)}
        >
          {label}
        </label>
        <input
          ref={ref}
          id={inputId}
          className={clsx(
            "rounded-[var(--dw-radius-sm)] border border-[var(--dw-gray-200)] bg-white px-3.5 py-2.5 text-sm text-[var(--dw-gray-900)] placeholder:text-[var(--dw-gray-500)]",
            "focus:outline-none focus:ring-2 focus:ring-[var(--dw-navy)] focus:border-transparent",
            error && "border-red-500",
            className
          )}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="text-sm text-red-600">
            {error}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";
