import { mockNormalizeArguments } from "@/app/test/mockData";
import normalizeAndGroupWeekScheudle from "@/shared/utils/normalizeAndGroupWeekScheudle";
import WeekView from "@/entities/weekScheudle/lib/WeekView";

export default function SchedulePage() {
  const normalizedWeek = normalizeAndGroupWeekScheudle(mockNormalizeArguments);

  return (
    <main className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Тижневий графік
        </h1>
        <p className="text-muted-foreground">
          Візуальне представлення змін співробітників за тиждень.
        </p>
      </div>

      <div className="mt-8">
        <WeekView weekSchedule={normalizedWeek} />
      </div>
    </main>
  );
}
