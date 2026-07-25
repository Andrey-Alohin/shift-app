import { NormalizedShift } from "@/shared/utils/normalizeAndGroupWeekScheudle";

interface ShiftsGroupProps {
  shifts: NormalizedShift[];
}

function ShiftsGroup({ shifts }: ShiftsGroupProps) {
  return (
    <div className="bg-amber-300">
      {shifts.map(
        (shift) =>
          shift.isOutstaffIn && <h3 key={shift._id}>{shift.startAt}</h3>,
      )}
    </div>
  );
}

export default ShiftsGroup;
