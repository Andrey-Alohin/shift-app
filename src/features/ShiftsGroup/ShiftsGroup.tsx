import ShiftCard from "@/entities/shift/ui/ShifCard";
import { splitShiftByList } from "@/entities/weekScheudle/lib/splitShiftsByList";
import { NormalizedShift } from "@/shared/utils/normalizeAndGroupWeekScheudle";

interface ShiftsGroupProps {
  shifts: NormalizedShift[];
}

function ShiftsGroup({ shifts }: ShiftsGroupProps) {
  const { topList, bottomList } = splitShiftByList(shifts);
  return (
    <div className="bg-amber-300">
      <div className="bg-pink-300 p-1.5">
        {topList.map((shift) => (
          <ShiftCard key={shift._id} shift={shift} />
        ))}
      </div>
      <div className="bg-green-700">
        {bottomList.map((shift) => (
          <ShiftCard key={shift._id} shift={shift} />
        ))}
      </div>
    </div>
  );
}

export default ShiftsGroup;
