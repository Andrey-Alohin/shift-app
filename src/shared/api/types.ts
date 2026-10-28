export interface ApiError {
  status: number;
  message: string | string[];
  error?: string;
}

export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

export enum Role {
  User = "user",
  Manager = "manager",
}

interface DaySchedule {
  day: number;
  isOpen: boolean;
  openTime: string;
  closeTime: string;
}

export interface Group {
  _id: string;
  name: string;
  managerId: string | User;
  schedule: DaySchedule[];
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  middleName: string;
  email: string;
  role: Role;
  avatarUrl?: string;
  groupId: string | Group;
}

export enum ShiftType {
  Work = "work",
  DayOff = "day_off",
  SickLeave = "sick_leave",
  Vacation = "vacation",
}

export interface Shift {
  _id: string;
  user: User;
  actualGroupId: Group;
  originGroupId: Group;
  type: ShiftType;
  startAt: string;
  endAt: string;
  version: number;
  createdBy: User;
}

export type ShiftApiPayload = Omit<
  Shift,
  "user" | "actualGroupId" | "originGroupId" | "originGroupId" | "version"
> & {
  user: string;
  actualGroupId: string;
  originGroupId: string;
  version?: number;
};

export type WeeklySchedule = {
  shifts: Shift[];
  weekBounds: {
    start: string;
    end: string;
  };
};
