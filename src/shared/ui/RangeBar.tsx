import { ComponentPropsWithRef } from "react";

interface RangeBarProps extends ComponentPropsWithRef<"div"> {
  start: number;
  length: number;
}

function RangeBar({ start, length, ...restProps }: RangeBarProps) {
  return (
    <>
      <div
        className="absolute rounded-lg px-2 flex items-center h-10 bg-indigo-300"
        style={{ left: `${start}%`, width: `${length}%` }}
        {...restProps}
      ></div>
    </>
  );
}

export default RangeBar;
