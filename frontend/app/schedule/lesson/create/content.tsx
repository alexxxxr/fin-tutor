"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormState } from "react-dom";
import { postLesson } from "../actions";
import SubmitButton from "@/components/SubmitButton";
import { CardDescription, CardFooter } from "@/components/ui/card";

export default function Content() {
  const [state, formAction] = useFormState(postLesson, { message: "" });

  return (
    <div className="max-w-md mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Планирование занятия</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Заполните форму, чтобы запланировать занятие
        </p>
      </div>
      <form action={formAction} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Дата начала недели (пн)</Label>
            <Input name="startWeekDay" type="date" />
          </div>
          <div className="space-y-2">
            <Label>Время</Label>
            <Input name="startTime" type="time" />
          </div>
          <div className="flex flex-row w-full gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox name="mon" />
              <Label>Пн</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox name="tue" />
              <Label>Вт</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox name="wed" />
              <Label>Ср</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox name="thu" />
              <Label>Чт</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox name="fri" />
              <Label>Пт</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox name="sat" />
              <Label>Сб</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox name="sun" />
              <Label>Вс</Label>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="space-y-2">
            <Label>Длительность (в минутах)</Label>
            <Input
              name="length"
              placeholder="Введите длительность"
              type="number"
            />
          </div>
          <div className="space-y-2">
            <Label>Цена за час (в рублях)</Label>
            <Input
              name="pricePerHour"
              placeholder="Введите цену"
              type="number"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Адрес электронной почты ученика</Label>
          <Input
            name="studentEmail"
            placeholder="Введите email ученика"
            type="text"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cost">Повторять в течение ... недель</Label>
          <Input
            name="repeatForWeeks"
            placeholder="Введите сколько недель будет повторяться занятие"
            type="number"
          />
        </div>
        <br />
        <SubmitButton>Запланировать занятие</SubmitButton>
      </form>
      <CardFooter>
        <CardDescription>{state?.message}</CardDescription>
      </CardFooter>
    </div>
  );
}
