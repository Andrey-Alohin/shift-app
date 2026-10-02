import { ShiftType } from "@/shared/api";
import { NormalizedShift } from "@/shared/utils/normalizeAndGroupWeekScheudle";
import { ShiftStatusBadge } from "./ShiftStatusBadge";
import { ShiftRangeBar } from "./ShiftRangeBar";
import Avatar from "@/shared/ui/Avatar";

interface ShiftCardProps {
  shift: NormalizedShift;
}

export default function ShiftCard({ shift }: ShiftCardProps) {
  const {
    startAt,
    endAt,
    user,
    type,
    isMe,
    timelineBounds,
    isOutstaffIn,
    isOutstaffOut,
    relatedGroup,
  } = shift;
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
        {shift.canEdit && (
          <>
            <button onClick={}>Edit</button>
          </>
        )}
      </div>
      {type === ShiftType.Work && (
        <ShiftRangeBar
          startAt={startAt}
          endAt={endAt}
          bounds={timelineBounds}
        />
      )}
    </li>
  );
}
