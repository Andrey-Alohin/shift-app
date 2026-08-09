import { Role, User } from "@/shared/api";
import { NormalizedShift } from "@/shared/utils/normalizeAndGroupWeekScheudle";

export function canManageShift(user: User | null, shift: NormalizedShift) {
  if (!user) return false;

  if (user.role === Role.Manager && user._id === shift.originGroup.managerId)
    return true;

  return false;
}
