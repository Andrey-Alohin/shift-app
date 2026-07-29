import { cn } from "../utils";
import { ComponentPropsWithRef, ReactNode } from "react";

interface RangeBarProps extends ComponentPropsWithRef<"div"> {
  start: number;
  length: number;
  className: string;
  children: ReactNode;
}

function RangeBar({
  start,
  length,
  className,
  children,
  ...restProps
}: RangeBarProps) {
  return (
    <>
      <div
        className={cn(
          "absolute flex items-center justify-center rounded-lg px-0.5 h-full bg-indigo-400",
          className,
        )}
        style={{ left: `${start}%`, width: `${length}%` }}
        {...restProps}
      >
        {children}
      </div>
    </>
  );
}

export default RangeBar;
