import { Avatar } from "@/entities/user/ui";
import { useScheduleActions } from "@/features/manage-shift/ScheduleActionsContext";
import { User } from "@/shared/api";

interface UnassignedUsersListProps {
  unassignedUsers: Record<string, User[]>;
}

export default function UnassignedUsersList({
  unassignedUsers,
}: UnassignedUsersListProps) {
  const { openCreateShift } = useScheduleActions();
  return (
    <div>
      <ul className="flex justify-between">
        {Object.entries(unassignedUsers).map(([date, users]) => {
          return (
            <li key={date} className="p-4">
              <h3>{date}</h3>
              <ul>
                {users.map((user) => (
                  <li key={user._id} className="flex align-middle items-center">
                    <Avatar
                      name={user.firstName}
                      src={user.avatarUrl}
                      className=""
                    />
                    <p>{user.lastName + " " + user.firstName}</p>
                    <button onClick={() => openCreateShift(user, date)}>
                      Призначити зміну
                    </button>
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
