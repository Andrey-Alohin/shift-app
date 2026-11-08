"use client";

import { ShiftType } from "@/shared/api";
import axios from "axios";
import { useEffect, useState } from "react";

export default function ShiftForm() {
  const [formValues, setFormValues] = useState({
    type: "",
    startAt: "",
    endAt: "",
    actualGroupId: "",
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <div className="p-5 m-auto">
      <form>
        <label htmlFor="type">Тип зміни</label>
        <select name="type" value={formValues.type} onChange={handleChange}>
          <option defaultValue={""}>Оберіть</option>
          <option value={ShiftType.Work}>Робочий</option>
          <option value={ShiftType.DayOff}>Вихідний</option>
          <option value={ShiftType.SickLeave}>Лікарняний</option>
          <option value={ShiftType.Vacation}>Лікарняний</option>
        </select>
        <label htmlFor="startAt">Початок зміни</label>
        <input
          type="datetime-local"
          name="startAt"
          value={formValues.startAt}
          onChange={handleChange}
        />
        <label htmlFor="endAt">Початок зміни</label>
        <input
          type="datetime-local"
          name="endAt"
          value={formValues.endAt}
          onChange={handleChange}
        />
        <select
          name="actualGroupId"
          value={formValues.actualGroupId}
          onChange={handleChange}
        >
          <option defaultValue={""}>Оберіть групу</option>
          <option value="1">Відділення 1</option>
          <option value="2">Відділення 2</option>
          <option value="3">Відділення 3</option>
        </select>
      </form>
    </div>
  );
}
