import { type ComponentPropsWithRef, forwardRef } from "react";
import { cva } from "class-variance-authority";

import cn from "@lib/cn";

export interface ButtonProps extends ComponentPropsWithRef<"button"> {
  color?: "grey" | "red" | "primary" | "green";
  isLoading?: boolean;
  variant?: "contained" | "outlined";
  size?: "sm" | "md" | "lg";
}

const buttonVariants = cva(
  "text-center transition-colors text-base inline-flex justify-center items-center",
  {
    variants: {
      size: {
        sm: "px-6.5 py-2.5 rounded-md text-sm",
        md: "px-9 py-2.5 rounded-md",
        lg: "px-9 py-3 rounded-md",
      },
      variant: {
        contained: "border-none",
        outlined: "border",
      },
      color: {
        grey: "bg-grey8-600 text-text disabled:bg-grey8-700 disabled:text-grey7-400",
        red: "bg-red-500 text-text",
        primary:
          "bg-primary-500 text-foreground-50 disabled:bg-primary-400 hover:bg-primary-700",
        green:
          "bg-green-700 text-text disabled:bg-green-900 disabled:text-grey7-400",
      },
      isLoading: {
        true: "cursor-not-allowed",
        false: "",
      },
    },
    compoundVariants: [
      {
        color: "primary",
        variant: "outlined",
        className:
          "bg-background-1 text-primary-500 hover:bg-primary-50 border-primary-500",
      },
    ],
    defaultVariants: {
      variant: "contained",
      color: "primary",
      size: "md",
    },
  },
);

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      color = "primary",
      isLoading = false,
      variant = "contained",
      size = "md",
      className,
      ...otherProps
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          buttonVariants({ color, isLoading, variant, size }),
          className,
        )}
        disabled={isLoading}
        {...otherProps}
      >
        {isLoading ? <span className="loader animate-spin" /> : null}
        <span
          className={cn("inline-flex text-center justify-center items-center", {
            invisible: isLoading,
          })}
        >
          {children}
        </span>
      </button>
    );
  },
);

export default Button;
