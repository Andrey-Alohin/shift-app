import ShiftCard from "@/entities/shift/ui/ShifCard";
import {
  User,
  Group,
  Role,
  ShiftType,
  WeeklySchedule,
  ApiResponse,
} from "@/shared/api/index";
import normalizeAndGroupWeekScheudle from "@/shared/utils/normalizeAndGroupWeekScheudle";

// 1. Створюємо мокового Менеджера та його Групу
export const mockManager: User = {
  _id: "usr_manager_99",
  name: "Олексій (Менеджер)",
  email: "manager@schedule.com",
  role: Role.Manager,
  groupId: "group_alpha", // на старті просто ID
};

export const mockGroup: Group = {
  _id: "group_alpha",
  name: "Команда Розробки №1",
  managerId: mockManager, // а тут передаємо повний об'єкт менеджера
};

// Оновлюємо зв'язок у менеджера, щоб посилався на повний об'єкт групи
mockManager.groupId = mockGroup;

// 2. Створюємо звичайних користувачів (твою команду)
export const mockUsers: User[] = [
  {
    _id: "usr_andrey",
    name: "Андрій",
    email: "andrey@schedule.com",
    role: Role.User,
    groupId: mockGroup,
  },
  {
    _id: "usr_olga",
    name: "Ольга",
    email: "olga@schedule.com",
    role: Role.User,
    groupId: mockGroup,
  },
  {
    _id: "usr_dmytro",
    name: "Дмитро",
    email: "dmytro@schedule.com",
    role: Role.User,
    groupId: mockGroup,
  },
];

// 3. Генеруємо тижневий графік (WeeklySchedule) з різними типами змін
export const mockWeeklySchedule: WeeklySchedule = [
  {
    _id: "shift_01",
    user: mockUsers[0], // Андрій працює вдень
    actualGroupId: mockGroup,
    originGroupId: mockGroup,
    type: ShiftType.Work,
    startAt: "2026-07-20T08:00:00.000Z",
    endAt: "2026-07-20T20:00:00.000Z",
    version: 1,
    createdBy: mockManager,
  },
  {
    _id: "shift_02",
    user: mockUsers[1], // Ольга на лікарняному
    actualGroupId: mockGroup,
    originGroupId: mockGroup,
    type: ShiftType.SickLeave,
    startAt: "2026-07-20T00:00:00.000Z",
    endAt: "2026-07-20T23:59:59.000Z",
    version: 1,
    createdBy: mockManager,
  },
  {
    _id: "shift_03",
    user: mockUsers[2], // Дмитро у відпустці
    actualGroupId: mockGroup,
    originGroupId: mockGroup,
    type: ShiftType.Vacation,
    startAt: "2026-07-21T00:00:00.000Z",
    endAt: "2026-07-27T23:59:59.000Z", // тижнева відпустка
    version: 1,
    createdBy: mockManager,
  },
  {
    _id: "shift_04",
    user: mockUsers[0], // Андрій має вихідний наступного дня
    actualGroupId: mockGroup,
    originGroupId: mockGroup,
    type: ShiftType.DayOff,
    startAt: "2026-07-21T00:00:00.000Z",
    endAt: "2026-07-21T23:59:59.000Z",
    version: 1,
    createdBy: mockManager,
  },
];

// 4. Імітація повноцінної відповіді від твого BFF / Бекенду
export const mockScheduleApiResponse: ApiResponse<WeeklySchedule> = {
  status: 200,
  message: "Графік на тиждень успішно згенеровано",
  data: mockWeeklySchedule,
};

export default function Test() {
  const shiftsObj = normalizeAndGroupWeekScheudle({
    schedule: mockWeeklySchedule,
  });
  console.log(shiftsObj);
  return (
    <main>
      {mockWeeklySchedule.map((shift) => (
        <ShiftCard key={shift._id} shift={shift} />
      ))}
    </main>
  );
}
