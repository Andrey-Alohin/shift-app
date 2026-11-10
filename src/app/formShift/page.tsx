"use client";

import { ShiftType } from "@/shared/api";
import React, { SubmitEventHandler, useState } from "react";

export default function ShiftForm() {
  const [formValues, setFormValues] = useState({
    type: "",
    date: "",
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

  const handleSubmit: SubmitEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    const startAt = new Date(
      formValues.date + formValues.startAt,
    ).toISOString();
    const endAt = new Date(formValues.date + formValues.endAt).toISOString();
    console.log({
      _id: "1",
      ...formValues,
      startAt,
      endAt,
    });
  };
  return (
    <div className="p-5 m-auto">
      <form className="flex flex-col">
        <label htmlFor="type">Тип зміни</label>
        <select name="type" value={formValues.type} onChange={handleChange}>
          <option defaultValue={""}>Оберіть</option>
          <option value={ShiftType.Work}>Робочий</option>
          <option value={ShiftType.DayOff}>Вихідний</option>
          <option value={ShiftType.SickLeave}>Лікарняний</option>
          <option value={ShiftType.Vacation}>Лікарняний</option>
        </select>
        <label htmlFor="date">День</label>
        <input
          min="2026-11-09"
          max="2026-11-15"
          type="date"
          name="date"
          value={formValues.date}
          onChange={handleChange}
        />
        <label htmlFor="startAt">Початок зміни</label>
        <input type="range" name="" id="" />
        <input
          type="time"
          min="08:00"
          max="21:00"
          name="startAt"
          value={formValues.startAt}
          onChange={handleChange}
        />
        <label htmlFor="endAt">Кінець зміни</label>
        <input
          min="08:00"
          max="21:00"
          type="time"
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
        <button type="submit" onSubmit={() => handleSubmit}>
          Зберегти
        </button>
      </form>
    </div>
  );
}
