"use client";

import { WeekView } from "@/features/Week/types";
import { useScheduleEditor } from "../model/useScheduleEditor";
import { getServerUser } from "@/entities/user/api/getServerUser";
import { getServerSchedule } from "@/entities/shift/api/getServerSchedule";
import { Shift, User } from "@/shared/api";
import Week from "@/features/Week/Week";

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
  console.log(backendData);
  const {
    uiShifts,
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
    </div>
  );
}
