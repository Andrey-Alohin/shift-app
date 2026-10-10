import Week from "@/features/Week/Week";
import normalizeAndGroupWeekScheudle from "@/shared/utils/normalizeAndGroupWeekScheudle";
import { mockNormalizeArguments } from "../mockData";
import { WeekView } from "@/features/Week/types";

interface PageProps {
  params: Promise<{ currentMonday: string }>;
  searchParams: Promise<{ view?: WeekView; date?: string; mode?: string }>;
}

export default async function Schedule({ params, searchParams }: PageProps) {
  const { currentMonday: mondayStr } = await params;
  const { view = WeekView.Week, date, mode } = await searchParams;
  const activeDay = date || mondayStr;
  console.log(new Date(mondayStr).toUTCString());
  const shiftsObj = normalizeAndGroupWeekScheudle(mockNormalizeArguments);
  console.log(shiftsObj);
  return (
    <main>
      <div className=" container m-auto">
        <Week weekSchedule={shiftsObj} view={view} day={activeDay} />
      </div>
    </main>
  );
}
