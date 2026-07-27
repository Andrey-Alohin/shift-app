import { User } from "@/shared/api";
import { NormalizedShift } from "@/shared/utils/normalizeAndGroupWeekScheudle";
import Avatar from "@/shared/ui/Avatar";
import ShiftBlock from "./ShiftBlock";

interface UserTimelineRowProps {
  user: User;
  shifts: NormalizedShift[];
}

export default function UserTimelineRow({
  user,
  shifts,
}: UserTimelineRowProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Avatar
          src={user.avatarUrl}
          name={user.name}
          className="w-6 h-6 text-xs shrink-0"
        />
        <p className="text-sm font-medium text-foreground truncate">
          {user.name}
        </p>
      </div>
      <div className="relative h-8 bg-muted/50 rounded-md overflow-hidden">
        {/* Таймлайн для робочих змін */}
        {shifts.map((shift) => (
          <ShiftBlock key={shift._id} shift={shift} isSmall={true} />
        ))}
      </div>
    </div>
  );
}
