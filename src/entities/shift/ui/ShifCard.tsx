import { ShiftType } from "@/shared/api";
import { NormalizedShift } from "@/shared/utils/normalizeAndGroupWeekScheudle";
import { ShiftStatusBadge } from "./ShiftStatusBadge";
import { ShiftRangeBar } from "./ShiftRangeBar";
import Avatar from "@/shared/ui/Avatar";
import Link from "next/link";
import { getShiftCardStyles } from "@/shared/lib/styles/shift-styles";

interface ShiftCardProps {
  shift: NormalizedShift;
}

export default function ShiftCard({ shift }: ShiftCardProps) {
  const {
    startAt,
    endAt,
    user,
    type,
    timelineBounds,
    isOutstaffIn,
    isOutstaffOut,
    relatedGroup,
  } = shift;
  return (
    <li className={getShiftCardStyles(shift)}>
      <div className="flex flex-wrap relative items-center gap-2 truncate">
        <Avatar
          src={user.avatarUrl}
          name={user.lastName + " " + user.firstName}
          className="size-6 text-xs shrink-0 text-stone-800"
        />
        <p className="text-sm font-medium text-foreground truncate">
          {user.lastName}
        </p>
        <ShiftStatusBadge
          type={type}
          isOutIn={isOutstaffIn}
          isOutOut={isOutstaffOut}
          groupName={relatedGroup?.name}
        />
        {shift.canEdit && (
          <>
            <Link href={`/schedule?mode=edit`}>Edit</Link>
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
