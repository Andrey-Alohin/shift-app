"use client";

import { User } from "@/shared/api";
import { NormalizedShift } from "@/shared/utils/normalizeAndGroupWeekSchedule";
import { createContext, use } from "react";

export interface ScheduleActionsType {
  openCreateShift(user: User, date: string): void;
  openEditShift(shift: NormalizedShift): void;
  openDeleteShift({ _id, version }: { _id: string; version?: number }): void;
  closeModal(): void;
}

export const ScheduleActionsContext = createContext<ScheduleActionsType | null>(
  null,
);

export const useScheduleActions = (): ScheduleActionsType => {
  const context = use(ScheduleActionsContext);

  if (!context) {
    throw new Error(
      "useScheduleActions must be used within a ScheduleActionsProvider!",
    );
  }
  return context;
};
