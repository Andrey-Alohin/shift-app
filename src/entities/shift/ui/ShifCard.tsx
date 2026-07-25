import { ShiftType } from "@/shared/api";
import Avatar from "@/shared/ui/Avatar";
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
  // 2. Визначаємо колір картки залежно від типу зміни
  let bgClass = "bg-gray-100 text-gray-800 border-gray-300"; // дефолт (вихідний)

  if (shift.type === ShiftType.Work) {
    bgClass = "bg-emerald-50 text-emerald-800 border-emerald-200"; // робота
  } else if (shift.type === ShiftType.SickLeave) {
    bgClass = "bg-amber-50 text-amber-800 border-amber-200"; // лікарняний
  } else if (shift.type === ShiftType.Vacation) {
    bgClass = "bg-sky-50 text-sky-800 border-sky-200"; // відпустка
  }
  return (
    <div className={clsx(bgClass, "relative")}>
      {isMe && <div className="sticky w-2 h-2 bg-indigo-700 rounded-full" />}

      {type === ShiftType.Work && (
        <h3>
          {startAt} - {endAt}
        </h3>
      )}
      <Avatar
        src={user.avatarUrl}
        name={user.name}
        className="border-cyan-400"
      />
      <p>{user.name}</p>
    </div>
  );
}
