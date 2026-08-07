import { ShiftType } from "@/shared/api";
import Avatar from "@/shared/ui/Avatar";
import RangeBar from "@/shared/ui/RangeBar";
import { NormalizedShift } from "@/shared/utils/normalizeAndGroupWeekScheudle";
import { ShiftStatusBadge } from "./ShiftStatusBadge";

interface ShiftCardProps {
  shift: NormalizedShift;
  funcCalcRenge(start: number, end: number): { left: number; width: number };
}

export default function ShiftCard({ shift, funcCalcRenge }: ShiftCardProps) {
  const {
    startAt,
    endAt,
    user,
    type,
    isMe,
    isOutstaffIn,
    isOutstaffOut,
    relatedGroup,
  } = shift;
  const start =
    Number(startAt.split(":")[0]) + Number(startAt.split(":")[1]) / 60;
  const end = Number(endAt.split(":")[0]) + Number(endAt.split(":")[1]) / 60;
  const { left, width } = funcCalcRenge(start, end);
  return (
    <li
      className={`flex flex-row flex-wrap items-center gap-3 px-2 py-1.5 rounded-xl border transition-all min-w-0 overflow-hidden ${
        isMe
          ? "border-primary/30 bg-primary/6"
          : "border-border bg-card hover:border-white/12"
      }`}
    >
      <div className="flex flex-wrap relative items-center gap-2 truncate">
        <Avatar
          src={user.avatarUrl}
          name={user.name}
          className="size-6 text-xs shrink-0 text-stone-800"
        />
        <p className="text-sm font-medium text-foreground truncate">
          {user.name}
        </p>
        <ShiftStatusBadge
          type={type}
          isOutIn={isOutstaffIn}
          isOutOut={isOutstaffOut}
          groupName={relatedGroup?.name}
        />
      </div>
      {type === ShiftType.Work && (
        <>
          <div className="relative w-full h-2 text-[10px] text-slate-400 font-mono select-none">
            <span className="absolute left-0 border-l-2 border-l-muted h-7 p-0.5">
              8:00
            </span>
            <span className="absolute right-0 border-r-2 border-r-muted h-7 p-0.5">
              21:00
            </span>
          </div>
          <div className="relative w-full h-6 md:h-9 bg-muted rounded-md overflow-hidden">
            <RangeBar
              start={left}
              length={width}
              className="text-xs md:text-sm"
            >{`${startAt}-${endAt}`}</RangeBar>
          </div>
        </>
      )}
    </li>
  );
}
