import { Group, ShiftType, User, WeeklySchedule } from "@/shared/api";

// 1. Мокові групи
export const mockMainGroup: Group = {
  _id: "group-main-01",
  name: "Відділ А (Основний)",
};

export const mockPodilGroup: Group = {
  _id: "group-podil-02",
  name: "Відділ Б (Поділ)",
};

export const mockPecherskGroup: Group = {
  _id: "group-pechersk-03",
  name: "Відділ В (Печерськ)",
};

// 2. Мокові користувачі
export const mockCurrentUser: User = {
  _id: "user-me",
  name: "Андрій (Я)",
  groupId: mockMainGroup,
};

export const mockColleague1: User = {
  _id: "user-colleague-1",
  name: "Олексій Коваленко",
  groupId: mockMainGroup,
};

export const mockColleague2: User = {
  _id: "user-colleague-2",
  name: "Марія Мельник",
  groupId: mockMainGroup,
};

export const mockGuestUser: User = {
  _id: "user-guest-1",
  name: "Дмитро Сидоренко (Аутстаф)",
  groupId: mockPodilGroup,
};

// 3. Межі тижня (Понеділок - Неділя)
export const mockWeekBounds = {
  startAt: "2026-07-20T00:00:00.000Z", // Понеділок
  endAt: "2026-07-26T23:59:59.000Z", // Неділя
};

// 4. Список сирих змін для тестування
export const mockRawSchedule: WeeklySchedule = [
  // --- ПОНЕДІЛОК (2026-07-20) ---
  // Сценарій: Перевірка сортування isMe (твоя зміна о 10:00 має стати вище ніж зміна о 08:00)
  {
    _id: "shift-101",
    user: mockColleague1,
    type: ShiftType.Work,
    originGroupId: mockMainGroup,
    actualGroupId: mockMainGroup,
    startAt: "2026-07-20T08:00:00.000Z",
    endAt: "2026-07-20T17:00:00.000Z",
  },
  {
    _id: "shift-102",
    user: mockCurrentUser, // 👈 Твоя зміна (isMe: true)
    type: ShiftType.Work,
    originGroupId: mockMainGroup,
    actualGroupId: mockMainGroup,
    startAt: "2026-07-20T05:00:00.000Z",
    endAt: "2026-07-20T19:00:00.000Z",
  },
  {
    _id: "shift-103",
    user: mockColleague2,
    type: ShiftType.Work,
    originGroupId: mockMainGroup,
    actualGroupId: mockMainGroup,
    startAt: "2026-07-20T12:00:00.000Z",
    endAt: "2026-07-20T18:00:00.000Z",
  },

  // --- ВІВТОРОК (2026-07-21) ---
  // Сценарій: Аутстаф до нас (isOutstaffIn: true)
  {
    _id: "shift-201",
    user: mockGuestUser, // Юзер із Подільського відділу
    type: ShiftType.Work,
    originGroupId: mockPodilGroup,
    actualGroupId: mockMainGroup, // Працює у нас
    startAt: "2026-07-21T09:00:00.000Z",
    endAt: "2026-07-21T18:00:00.000Z",
  },
  {
    _id: "shift-202",
    user: mockColleague1,
    type: ShiftType.Work,
    originGroupId: mockMainGroup,
    actualGroupId: mockMainGroup,
    startAt: "2026-07-21T08:00:00.000Z",
    endAt: "2026-07-21T17:00:00.000Z",
  },

  // --- СЕРЕДА (2026-07-22) ---
  // Сценарій: Аутстаф від нас (isOutstaffOut: true)
  {
    _id: "shift-301",
    user: mockColleague2, // Наш юзер
    type: ShiftType.Work,
    originGroupId: mockMainGroup,
    actualGroupId: mockPecherskGroup, // Пішов працювати на Печерськ
    startAt: "2026-07-22T08:00:00.000Z",
    endAt: "2026-07-22T17:00:00.000Z",
  },
  {
    _id: "shift-302",
    user: mockCurrentUser, // 👈 Твоя зміна
    type: ShiftType.Work,
    originGroupId: mockMainGroup,
    actualGroupId: mockMainGroup,
    startAt: "2026-07-22T08:00:00.000Z",
    endAt: "2026-07-22T17:00:00.000Z",
  },

  // --- ЧЕТВЕР (2026-07-23) ---
  // Сценарій: Вихідний день (DayOff)
  {
    _id: "shift-401",
    user: mockColleague1,
    type: ShiftType.DayOff,
    originGroupId: mockMainGroup,
    actualGroupId: mockMainGroup,
    startAt: "2026-07-23T00:00:00.000Z",
    endAt: "2026-07-23T23:59:59.000Z",
  },
  {
    _id: "shift-402",
    user: mockCurrentUser, // 👈 Твоя зміна
    type: ShiftType.Work,
    originGroupId: mockMainGroup,
    actualGroupId: mockMainGroup,
    startAt: "2026-07-23T09:00:00.000Z",
    endAt: "2026-07-23T18:00:00.000Z",
  },

  // --- П'ЯТНИЦЯ (2026-07-24) ---
  // Сценарій: Звичайна робоча п'ятниця
  {
    _id: "shift-501",
    user: mockColleague1,
    type: ShiftType.Work,
    originGroupId: mockMainGroup,
    actualGroupId: mockMainGroup,
    startAt: "2026-07-24T08:00:00.000Z",
    endAt: "2026-07-24T17:00:00.000Z",
  },
  {
    _id: "shift-502",
    user: mockColleague2,
    type: ShiftType.Work,
    originGroupId: mockMainGroup,
    actualGroupId: mockMainGroup,
    startAt: "2026-07-24T09:00:00.000Z",
    endAt: "2026-07-24T18:00:00.000Z",
  },

  // --- СУБОТА (2026-07-25) ---
  // Сценарій: Чергування у вихідний
  {
    _id: "shift-601",
    user: mockGuestUser,
    type: ShiftType.Work,
    originGroupId: mockPodilGroup,
    actualGroupId: mockMainGroup,
    startAt: "2026-07-25T10:00:00.000Z",
    endAt: "2026-07-25T16:00:00.000Z",
  },

  // --- НЕДІЛЯ (2026-07-26) ---
  // Порожній день (без змін у масиві) для перевірки створення порожнього дня в скелеті
];

// 5. Готовий об'єкт аргументів під твою функцію
export const mockNormalizeArguments = {
  schedule: mockRawSchedule,
  weekBounds: mockWeekBounds,
  currentUser: mockCurrentUser,
};
