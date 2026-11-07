import { Group, ShiftType, User } from "@/shared/api";
import { HtmlHTMLAttributes } from "react";

interface IShiftForm {
  _id: string;
  user: User | null;
  actualGroupId: Group | null;
  type: ShiftType | null;
  startAt: string | null;
  endAt: string | null;
  version?: number;
}

const fields = [
  {
    name: "user",
    type: "select",
    value: 
  },
];
