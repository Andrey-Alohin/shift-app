import RangeBar from "@/shared/ui/RangeBar";
import { calculateRange, TimeLineBounds } from "../lib/calculateRange";

interface ShiftRangeBarProps {
  startAt: string;
  endAt: string;
  bounds: TimeLineBounds;
  className?: string;
}

export function ShiftRangeBar({
  startAt,
  endAt,
  bounds,
  className = "",
}: ShiftRangeBarProps) {
  const { start, width } = calculateRange(startAt, endAt, bounds);

  return (
    <div className={`w-full flex flex-col gap-1 ${className}`}>
      <div className="relative w-full h-2 text-[10px] text-slate-400 font-mono select-none">
        <span className="absolute left-0 border-l-2 border-l-muted h-7 p-0.5">
          {bounds.startHour}
        </span>
        <span className="absolute right-0 border-r-2 border-r-muted h-7 p-0.5">
          {bounds.endHour}
        </span>
      </div>
      <div className="relative w-full h-6 md:h-9 bg-muted rounded-md overflow-hidden">
        <RangeBar
          start={start}
          length={width}
          className="text-xs md:text-sm"
        >{`${startAt}-${endAt}`}</RangeBar>
      </div>
    </div>
  );
}
