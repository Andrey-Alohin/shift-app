import { ShiftType } from "@/shared/api";
import Avatar from "@/shared/ui/Avatar";
import TimeLine from "@/shared/ui/TimeLine";
import { NormalizedShift } from "@/shared/utils/normalizeAndGroupWeekScheudle";
import clsx from "clsx";
import { use } from "react";

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
    isOutstaffIn,
    isOutstaffOut,
    relatedGroup,
  } = shift;
  let bgClass = "bg-gray-100 text-gray-800 border-gray-300";

  if (shift.type === ShiftType.Work) {
    bgClass = "bg-emerald-50 text-emerald-800 border-emerald-200";
  } else if (shift.type === ShiftType.SickLeave) {
    bgClass = "bg-amber-50 text-amber-800 border-amber-200";
  } else if (shift.type === ShiftType.Vacation) {
    bgClass = "bg-sky-50 text-sky-800 border-sky-200";
  }
  return (
    <div className="relative flex-col px-0.5 gap-2 items-center ">
      {type === ShiftType.Work && <TimeLine start={startAt} end={endAt} full />}
      <Avatar
        src={user.avatarUrl}
        name={user.name}
        className="border-cyan-400"
      />
      <div>
        {isMe && (
          <span className="absolute top-1 w-2 h-2 bg-indigo-700 rounded-full" />
        )}
        {type === ShiftType.Work && (
          <h3>
            {startAt} - {endAt}
          </h3>
        )}
        <p>{user.name}</p>
      </div>
    </div>
  );
}
