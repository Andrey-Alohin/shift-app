import { cn } from "../utils";
import { ComponentPropsWithRef } from "react";

interface RangeBarProps extends ComponentPropsWithRef<"div"> {
  start: number;
  length: number;
  className: string;
}

function RangeBar({ start, length, className, ...restProps }: RangeBarProps) {
  return (
    <>
      <div
        className={cn(
          "absolute flex items-center justify-center rounded-lg px-0.5 h-full bg-indigo-400",
          className,
        )}
        style={{ left: `${start}%`, width: `${length}%` }}
        {...restProps}
      ></div>
    </>
  );
}

export default RangeBar;
