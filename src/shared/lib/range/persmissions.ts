import { PopulatedUser, Role } from "@/shared/api";
import { NormalizedShift } from "@/shared/utils/normalizeAndGroupWeekSchedule";

export function canManageShift(
  user: PopulatedUser | null,
  shift: NormalizedShift,
) {
  if (!user) return false;

  if (user.role === Role.Manager && user._id === shift.originGroup.managerId)
    return true;

  return false;
}
