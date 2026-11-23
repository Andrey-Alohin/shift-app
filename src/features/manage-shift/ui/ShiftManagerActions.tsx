import { NormalizedShift } from "@/shared/utils/normalizeAndGroupWeekSchedule";
import { useScheduleActions } from "../ScheduleActionsContext";
import { PencilIcon } from "@/shared/ui/icons/PencilIcon";
import { DeleteIcon } from "@/shared/ui/icons/DeleteIcon";
import { Operation } from "@/widgets/schedule-editor/model/schedule-merge";

interface ShiftManagerActionsProps {
  shift: NormalizedShift;
}

export default function ShiftManagerActions({
  shift,
}: ShiftManagerActionsProps) {
  const { openEditShift, openDeleteShift } = useScheduleActions();

  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        onClick={() => openEditShift(shift)}
        aria-label="Редагувати зміну"
        className="p-1 rounded hover:scale-125 transition-transform cursor-pointer"
      >
        <PencilIcon className="size-6" />
      </button>
      <button
        type="button"
        onClick={() =>
          openDeleteShift({
            _id: shift._id,
            version:
              shift.status !== Operation.Create ? shift.version : undefined,
          })
        }
        aria-label="Видалити зміну"
        className="p-1 rounded hover:scale-125 transition-transform cursor-pointer"
      >
        <DeleteIcon className="size-6" />
      </button>
    </div>
  );
}
