import { Shift, ShiftType } from "@/shared/api";

interface ShiftCardProps {
  shift: Shift;
}

export default function ShiftCard({ shift }: ShiftCardProps) {
  const { startAt, endAt, user, type } = shift;
  const userName = typeof user === "object" ? user.name : "Користувач";
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
    <div className={bgClass}>
      <p>{userName}</p>
      {type === ShiftType.Work && (
        <h3>
          {new Date(startAt).toLocaleString()} -{" "}
          {new Date(endAt).toLocaleString()}
        </h3>
      )}
    </div>
  );
}
