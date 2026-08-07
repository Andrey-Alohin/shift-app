import ShiftCard from "@/entities/shift/ui/ShifCard";
import { splitShiftByList } from "@/entities/weekScheudle/lib/splitShiftsByList";
import { createRangeCalculator } from "@/shared/lib/range";
import { cn } from "@/shared/utils";
import { normalizedDay } from "@/shared/utils/normalizeAndGroupWeekScheudle";

interface DayCardProps {
  day: normalizedDay;
}

const formatDayHeader = (uiDate: string) => {
  const date = new Date(uiDate);
  return date.toLocaleDateString("uk-UA", {
    weekday: "long",
    day: "numeric",
    month: "short",
  });
};

export default function DayCard({ day }: DayCardProps) {
  const { isToday, uiDate, shifts } = day;
  const { topList, bottomList } = splitShiftByList(shifts);
  const calculateStartLength = createRangeCalculator(8, 21);
  return (
    <li
      className={cn(
        " shrink-0 rounded-lg flex flex-col text-card-foreground shadow-sm border",
        isToday && "border-primary/40",
      )}
    >
      <div
        className={cn("p-4 border-b font-semibold", isToday && "text-primary")}
      >
        <h3 className="capitalize">
          {formatDayHeader(uiDate).split(",")[0]}
          <br />
          {formatDayHeader(uiDate).split(",")[1]}
        </h3>
      </div>
      <section className="grow p-4 md:p-2 space-y-4">
        <h4 className="text-sm font-medium text-muted-foreground">На зміні</h4>
        {topList.length > 0 ? (
          <ul className="flex gap-2 flex-col">
            {topList.map((shift) => (
              <ShiftCard
                key={shift._id}
                shift={shift}
                funcCalcRenge={calculateStartLength}
              />
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground italic">
            Ніхто не працює
          </p>
        )}
      </section>
      {bottomList.length > 0 && (
        <section className="p-4 md:p-2 border-t border-border/40 bg-muted/10">
          <h4 className="text-sm font-medium text-muted-foreground mb-2">
            Поза відділенням
          </h4>
          <ul className="opacity-85">
            {bottomList.map((shift) => (
              <ShiftCard
                key={shift._id}
                shift={shift}
                funcCalcRenge={calculateStartLength}
              />
            ))}
          </ul>
        </section>
      )}
    </li>
  );
}
