import { type ComponentPropsWithRef, forwardRef } from "react";
import { cva } from "class-variance-authority";
import cn from "@lib/cn";

export interface ButtonLinkProps extends ComponentPropsWithRef<"a"> {
  color?: "grey" | "red" | "primary" | "green" | "primary-gradient";
  isLoading?: boolean;
  variant?: "contained" | "outlined";
  hoverContracting?: boolean;
  size?: "sm" | "md" | "lg";
  active?: boolean;
  href: string;
}

const buttonLinkVariants = cva(
  "text-center transition-all text-base inline-flex justify-center items-center relative group",
  {
    variants: {
      size: {
        sm: "px-6.5 py-2.5 rounded-md text-sm",
        md: "px-7 py-4 rounded-[2.1875rem] text-sm font-extrabold",
        lg: "py-5 px-10 rounded-[2.1875rem] text-lg font-bold",
      },
      hoverContracting: {
        true: "hover",
      },
      active: {
        true: "bg-active",
      },
      variant: {
        contained: "border-none",
        outlined: "",
      },
      color: {
        grey: "bg-grey8-600 text-text disabled:bg-grey8-700 disabled:text-grey7-400",
        red: "bg-red-500 text-text",
        primary:
          "bg-primary-500 text-foreground-50 disabled:bg-primary-400 hover:bg-primary-700",
        "primary-gradient":
          "bg-gradient-primary text-white disabled:opacity-50",
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
        color: "primary-gradient",
        variant: "contained",
        className: "hover:bg-gradient-primary-hovered  duration-500",
      },
      {
        color: "primary-gradient",
        variant: "outlined",
        className:
          "bg-white hover:bg-gradient-primary hover:text-white text-primary-500 font-normal",
      },
      {
        active: true,
        color: "primary-gradient",
        variant: "outlined",
        className: "bg-gradient-primary text-white font-normal",
      },
    ],
    defaultVariants: {
      variant: "contained",
      color: "primary",
      size: "lg",
    },
  },
);

const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  (
    {
      children,
      color = "primary-gradient",
      isLoading = false,
      hoverContracting,
      variant = "contained",
      size = "lg",
      active,
      className,
      href,
      ...otherProps
    },
    ref,
  ) => {
    return (
      <a
        ref={ref}
        href={href}
        className={cn(
          buttonLinkVariants({
            color,
            isLoading,
            variant,
            size,
            active,
            hoverContracting,
          }),
          className,
        )}
        {...otherProps}
      >
        <div
          className={cn(
            "absolute z-10 w-full h-full inset-0 flex -top-[0.4375rem] -left-[0.4375rem] rounded-[2.1875rem] box-content bg-[rgba(103,157,221,0.1)] p-1.75",
            variant === "outlined" &&
              "bg-transparent border-[7px] border-[rgba(103,157,221,0.1)] -p-0 rounded-[3.1875rem] -top-[0.5375rem] -left-[0.5375rem]",
          )}
        />
        {isLoading ? <span className="loader animate-spin" /> : null}
        <span
          className={cn("inline-flex text-center justify-center items-center", {
            invisible: isLoading,
          })}
        >
          {children}
        </span>
      </a>
    );
  },
);

export default ButtonLink;
