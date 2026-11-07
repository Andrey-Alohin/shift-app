"use client";

import { WeekView } from "@/features/Week/types";
import { useScheduleEditor } from "../model/useScheduleEditor";
import { getServerUser } from "@/entities/user/api/getServerUser";
import { getServerSchedule } from "@/entities/shift/api/getServerSchedule";
import { Group, Role, Shift, User } from "@/shared/api";
import Week from "@/features/Week/Week";
import ShiftCreatePage from "@/features/shiftForm/ui/ShiftForm";

interface ScheduleEditorProps {
  mondayStr: string;
  view: WeekView;
  activeDay: string;
  currentUser: User;
  backendData: {
    shifts: Shift[];
    weekBounds: { start: string; end: string };
  };
}

export function ScheduleEditor({
  mondayStr,
  view,
  activeDay,
  currentUser,
  backendData,
}: ScheduleEditorProps) {
  const users: User[] = [
    {
      _id: "1",
      firstName: "Kavin",
      lastName: "Laster",
      middleName: "Monster",
      email: "sss@d",
      role: Role.User,
      groupId: "sac",
    },
  ];
  const groups: Group[] = [
    { _id: "2", name: "Відділення №3", managerId: "312", schedule: [] },
  ];

  const {
    uiShifts,
    clipShift,
    isFormOpen,
    handleSetCreateOperation,
    handleSetUpdateOperation,
    handleSetDeleteOperation,
  } = useScheduleEditor({
    rawShifts: backendData.shifts,
    currentUser,
    weekBounds: backendData.weekBounds,
  });
  return (
    <div>
      <Week weekSchedule={uiShifts} view={view} day={activeDay} />
      <button onClick={() => handleSetCreateOperation(currentUser)}>
        Створити нову зміну
      </button>
      {isFormOpen && <ShiftCreatePage users={users} groups={groups} />}
    </div>
  );
}
