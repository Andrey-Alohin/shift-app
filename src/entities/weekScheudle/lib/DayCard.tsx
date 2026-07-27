import {
  NormalizedShift,
  normalizedDay,
} from "@/shared/utils/normalizeAndGroupWeekScheudle";
import { splitShiftByList } from "./splitShiftsByList";
import { User } from "@/shared/api";
// import { cn } from "@/shared/lib/utils";
import UserTimelineRow from "./UserTimelineRow";
import UserStatusRow from "./UserStatusRow";
import clsx from "clsx";

interface DayCardProps {
  day: normalizedDay;
}

// Допоміжна функція для групування змін за користувачем для відображення в картці
const groupShiftsByUser = (
  shifts: NormalizedShift[],
): { user: User; shifts: NormalizedShift[] }[] => {
  const userMap = new Map<string, { user: User; shifts: NormalizedShift[] }>();
  shifts.forEach((shift) => {
    if (!userMap.has(shift.user._id)) {
      userMap.set(shift.user._id, { user: shift.user, shifts: [] });
    }
    userMap.get(shift.user._id)!.shifts.push(shift);
  });
  return Array.from(userMap.values());
};

const formatDayHeader = (uiDate: string) => {
  const date = new Date(uiDate);
  return date.toLocaleDateString("uk-UA", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
};

export default function DayCard({ day }: DayCardProps) {
  const { topList, bottomList } = splitShiftByList(day.shifts);

  const topListUsers = groupShiftsByUser(topList);
  const bottomListUsers = groupShiftsByUser(bottomList);

  return (
    <div className="w-80 md:w-96 shrink-0 rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col">
      {/* Header */}
      <div
        className={clsx(
          "p-4 border-b font-semibold",
          day.isToday && "text-primary",
        )}
      >
        <h3 className="capitalize">{formatDayHeader(day.uiDate)}</h3>
      </div>

      <div className="grow overflow-y-auto">
        {/* Top List (Working) */}
        <div className="p-4 space-y-4">
          <h4 className="text-sm font-medium text-muted-foreground">
            На зміні
          </h4>
          {topListUsers.length > 0 ? (
            topListUsers.map(({ user, shifts }) => (
              <UserTimelineRow key={user._id} user={user} shifts={shifts} />
            ))
          ) : (
            <p className="text-sm text-muted-foreground italic">
              Ніхто не працює
            </p>
          )}
        </div>

        {/* Bottom List (Other) */}
        {bottomListUsers.length > 0 && (
          <div className="p-4 border-t space-y-3">
            <h4 className="text-sm font-medium text-muted-foreground">
              Інші статуси
            </h4>
            {bottomListUsers.map(({ user, shifts }) => (
              <UserStatusRow key={user._id} user={user} shifts={shifts} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
