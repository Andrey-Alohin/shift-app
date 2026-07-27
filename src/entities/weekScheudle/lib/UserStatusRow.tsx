import { User } from "@/shared/api";
import { NormalizedShift } from "@/shared/utils/normalizeAndGroupWeekScheudle";
import Avatar from "@/shared/ui/Avatar";
import ShiftPill from "./ShiftPill";

interface UserStatusRowProps {
  user: User;
  shifts: NormalizedShift[];
}

export default function UserStatusRow({ user, shifts }: UserStatusRowProps) {
  return (
    <div className="flex items-center gap-2">
      <Avatar
        src={user.avatarUrl}
        name={user.name}
        className="w-6 h-6 text-xs shrink-0"
      />
      <div className="flex-1 flex items-center justify-between gap-2">
        <p className="text-sm font-medium text-foreground truncate">
          {user.name}
        </p>
        <div className="flex flex-wrap gap-1 justify-end shrink-0">
          {shifts.map((shift) => (
            <ShiftPill key={shift._id} shift={shift} />
          ))}
        </div>
      </div>
    </div>
  );
}
