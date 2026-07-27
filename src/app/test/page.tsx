import Week from "@/features/Week/Week";
import normalizeAndGroupWeekScheudle from "@/shared/utils/normalizeAndGroupWeekScheudle";
import { mockNormalizeArguments } from "./mockData";

export default function Test() {
  const shiftsObj = normalizeAndGroupWeekScheudle(mockNormalizeArguments);
  console.log(shiftsObj);
  return (
    <main>
      <div className=" container m-auto">
        <Week weekSchedule={shiftsObj} />
      </div>
    </main>
  );
}
