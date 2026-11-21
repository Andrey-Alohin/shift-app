import { Avatar } from "@/entities/user/ui";
import { User } from "@/shared/api";

interface UnassignedUsersListProps {
  unassignedUsers: Record<string, User[]>;
  createShiftFunc?: (args: unknown) => void;
}

export default function UnassignedUsersList({
  unassignedUsers,
  createShiftFunc,
}: UnassignedUsersListProps) {
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
                    {createShiftFunc && (
                      <>
                        <button onClick={() => createShiftFunc(user, date)}>
                          Призначити зміну
                        </button>
                      </>
                    )}
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
