import { Group, ShiftType, User } from "@/shared/api";

export enum ItemStatus {
  Unchanged = "unchanged",
  Added = "added",
  Edited = "edited",
  Deleted = "deleted",
}

export interface ShiftItem {
  _id: string;
  user: User;
  type: ShiftType;
  isOutstaffIn: boolean;
  isOutstaffOut: boolean;
  isMe: boolean;
  timelineBounds: {
    startHour: string;
    endHour: string;
  };
  originGroup: Group;
  canEdit: boolean;
  startAt: string;
  endAt: string;
  relatedGroup?: Group;
  status?: ItemStatus;
}
