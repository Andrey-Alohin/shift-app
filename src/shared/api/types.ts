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

export interface Group {
  _id: string;
  name: string;
  managerId: string | User;
}

export interface User {
  _id: string;
  name: string;
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
  user: string | User;
  actualGroupId: string | Group;
  originGroupId: string | Group;
  type: ShiftType;
  startAt: string;
  endAt: string;
  version: number;
  createdBy: string | User;
}

export type WeeklySchedule = Shift[];
