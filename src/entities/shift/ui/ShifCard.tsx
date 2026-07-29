import { ShiftType } from "@/shared/api";
import Avatar from "@/shared/ui/Avatar";
import RangeBar from "@/shared/ui/RangeBar";
import { cn } from "@/shared/utils";
import { NormalizedShift } from "@/shared/utils/normalizeAndGroupWeekScheudle";

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
  let bgClass = "bg-gray-100 text-gray-800 border-gray-300";
  const start = Number(
    startAt.split(":")[0] + "." + Number(startAt.split(":")[1]) / 60,
  );
  const end = Number(
    endAt.split(":")[0] + "." + Number(endAt.split(":")[1]) / 60,
  );
  const { left, width } = funcCalcRenge(start, end);

  if (shift.type === ShiftType.Work) {
    bgClass = "bg-emerald-50 text-emerald-800 border-emerald-200";
  } else if (shift.type === ShiftType.SickLeave) {
    bgClass = "bg-amber-50 text-amber-800 border-amber-200";
  } else if (shift.type === ShiftType.Vacation) {
    bgClass = "bg-sky-50 text-sky-800 border-sky-200";
  }
  return (
    <li className={cn("space-y-2 p-0.5", isMe && "border-l-2 border-accent")}>
      <div className="flex relative items-center gap-2">
        <Avatar
          src={user.avatarUrl}
          name={user.name}
          className="size-6 text-xs shrink-0 border-cyan-400 text-amber-800"
        />
        <p className="text-sm font-medium text-foreground truncate">
          {user.name}
        </p>
        {isOutstaffIn && (
          <p className="p-1.5 text-sm bg-orange-300 text-orange-700 rounded-full">
            Аутстаф
          </p>
        )}
        {isOutstaffOut && (
          <p className="text-sm bg-accent-foreground text-accent rounded-md p-0.5">
            <span className="font-semibold">Працює на</span>{" "}
            {relatedGroup?.name}
          </p>
        )}
      </div>
      {type === ShiftType.Work && (
        <div className="relative h-8 bg-muted/50 rounded-md overflow-hidden">
          <RangeBar
            start={left}
            length={width}
            className="text-sm"
          >{`${startAt}-${endAt}`}</RangeBar>
        </div>
      )}
    </li>
  );
}
