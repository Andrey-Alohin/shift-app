"use client";

import { WeekView } from "@/features/Week/types";
import { useScheduleEditor } from "../model/useScheduleEditor";
import { Group, PopulatedUser, Role, Shift, User } from "@/shared/api";
import Week from "@/features/Week/Week";
import ShiftCreatePage from "@/features/shiftForm/ui/ShiftForm";
import UnassignedUsersList from "./UnassignedUsersList";
import ScheduleActionsProvider from "@/features/manage-shift/ScheduleActionsProvider";

interface ScheduleEditorProps {
  mondayStr: string;
  view: WeekView;
  activeDay: string;
  currentUser: PopulatedUser;
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
      groupId: "2",
    },
  ];
  const groups: Group[] = [
    {
      _id: "2",
      name: "Відділення №3",
      managerId: "312",
      schedule: [
        { day: 1, isOpen: true, openTime: "08:00", closeTime: "21:00" },
        { day: 2, isOpen: true, openTime: "08:00", closeTime: "21:00" },
        { day: 3, isOpen: true, openTime: "08:00", closeTime: "21:00" },
        { day: 4, isOpen: true, openTime: "08:00", closeTime: "21:00" },
        { day: 5, isOpen: true, openTime: "08:00", closeTime: "21:00" },
        { day: 6, isOpen: true, openTime: "08:00", closeTime: "19:00" },
        { day: 7, isOpen: true, openTime: "08:00", closeTime: "19:00" },
      ],
    },
    { _id: "3", name: "Відділення №4", managerId: "312", schedule: [] },
  ];

  const {
    uiShifts,
    clipShift,
    unassignedUsersByDate,
    handleSetOperationsShifts,
    isModalOpen,
    closeModal,
    handleSetCreateOperation,
    handleSetUpdateOperation,
    handleSetDeleteOperation,
  } = useScheduleEditor({
    rawShifts: backendData.shifts,
    currentUser,
    weekBounds: backendData.weekBounds,
    groupUsers: users,
  });
  return (
    <ScheduleActionsProvider
      actions={{
        openCreateShift: handleSetCreateOperation,
        openEditShift: handleSetUpdateOperation,
        openDeleteShift: handleSetDeleteOperation,
        closeModal,
      }}
    >
      <Week weekSchedule={uiShifts} view={view} day={activeDay} />
      <UnassignedUsersList unassignedUsers={unassignedUsersByDate} />
      {/* <ShiftCreatePage
        users={users}
        groups={groups}
        clipShift={clipShift}
        onSubmit={handleSetOperationsShifts}
      /> */}
    </ScheduleActionsProvider>
  );
}
