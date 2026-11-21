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
  return (
    <ScheduleActionsContext value={actions}>{children}</ScheduleActionsContext>
  );
}
