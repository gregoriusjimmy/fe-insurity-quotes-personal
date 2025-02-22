import cn from "@lib/cn";
import { type ComponentPropsWithRef, forwardRef } from "react";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SkeletonProps extends ComponentPropsWithRef<"div"> {}

const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, ...otherProps }, ref) => {
    return (
      <div
        className={cn("animate-pulse bg-slate-300", className)}
        ref={ref}
        {...otherProps}
      />
    );
  },
);

export default Skeleton;
