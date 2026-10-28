import { cn } from "@/shared/utils";
import { NormalizedShift } from "@/shared/utils/normalizeAndGroupWeekScheudle";
import { Operation } from "@/widgets/schedule-editor/model/schedule-merge";

export function getShiftCardStyles(shift: NormalizedShift): string {
  return cn(
    "flex flex-row flex-wrap items-center gap-3 px-2 py-1.5 rounded-xl border transition-all min-w-0 overflow-hidden",
    {
      "border-l-4": shift.status,
      "border-l-emerald-500": shift.status === Operation.Create,
      "border-l-amber-500 ": shift.status === Operation.Update,
      "border-l-rose-500 opacity-60": shift.status === Operation.Delete,
    },

    shift.isMe && "ring-2 ring-indigo-500/30 font-medium",
  );
}
