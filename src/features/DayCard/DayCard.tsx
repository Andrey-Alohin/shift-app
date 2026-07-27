import ShiftCard from "@/entities/shift/ui/ShifCard";
import { splitShiftByList } from "@/entities/weekScheudle/lib/splitShiftsByList";
import { createRangeCalculator } from "@/shared/lib/range";
import { normalizedDay } from "@/shared/utils/normalizeAndGroupWeekScheudle";
import clsx from "clsx";

interface DayCardProps {
  day: normalizedDay;
}

const formatDayHeader = (uiDate: string) => {
  const date = new Date(uiDate);
  return date.toLocaleDateString("uk-UA", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
};

export default function DayCard({ day }: DayCardProps) {
  const { isToday, uiDate, shifts } = day;
  const { topList, bottomList } = splitShiftByList(shifts);
  const calculateStartLength = createRangeCalculator(8, 21);
  return (
    <div
      className={clsx(
        "w-80 md:w-96 shrink-0 rounded-lg flex flex-col text-card-foreground shadow-sm border",
        isToday && "border-primary/40",
      )}
    >
      <div
        className={clsx(
          "p-4 border-b font-semibold",
          isToday && "text-primary",
        )}
      >
        <h3 className="capitalize">{formatDayHeader(uiDate)}</h3>
      </div>
      <div className="grow overflow-y-auto">
        <div className="p-4 space-y-4">
          <h4 className="text-sm font-medium text-muted-foreground">
            На зміні
          </h4>
          {topList.length > 0 ? (
            <>
              {topList.map((shift) => (
                <ShiftCard
                  key={shift._id}
                  shift={shift}
                  funcCalcRenge={calculateStartLength}
                />
              ))}
            </>
          ) : (
            <p className="text-sm text-muted-foreground italic">
              Ніхто не працює
            </p>
          )}
        </div>
      </div>
      {bottomList.length > 0 && (
        <div className="bg-green-400 p-1.5 rounded-md">
          {bottomList.map((shift) => (
            <ShiftCard
              key={shift._id}
              shift={shift}
              funcCalcRenge={calculateStartLength}
            />
          ))}
        </div>
      )}
    </div>
  );
}
