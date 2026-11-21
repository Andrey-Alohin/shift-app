import { useMemo } from "react";
import {
  ScheduleActionsContext,
  ScheduleActionsType,
} from "./ScheduleActionsContext";

interface ScheduleActionsProviderProps {
  actions: ScheduleActionsType;
  children: React.ReactNode;
}

export default function ScheduleActionsProvider({
  actions,
  children,
}: ScheduleActionsProviderProps) {
  const { openCreateShift, openEditShift, openDeleteShift, closeModal } =
    actions;

  const memoizedActions = useMemo<ScheduleActionsType>(
    () => ({
      openCreateShift,
      openEditShift,
      openDeleteShift,
      closeModal,
    }),
    [openCreateShift, openEditShift, openDeleteShift, closeModal],
  );
  return (
    <ScheduleActionsContext value={memoizedActions}>
      {children}
    </ScheduleActionsContext>
  );
}
