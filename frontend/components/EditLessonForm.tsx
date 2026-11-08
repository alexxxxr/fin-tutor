"use client";

import { editLesson } from "@/app/schedule/lesson/actions";
import { useFormState } from "react-dom";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import SubmitButton from "./SubmitButton";
import { CardDescription, CardFooter } from "./ui/card";

type Props = {
  event: {
    id: number;
    date: string;
    startTime: string;
    length: number;
    pricePerHour: number;
  };
};

export default function EditLessonForm({ event }: Props) {
  const [state, formAction] = useFormState(editLesson, { message: "" });

  return (
    <div className="max-w-md mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Редактирование занятия</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Заполните форму, чтобы отредактировать занятие
        </p>
      </div>
      <form action={formAction} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Дата занятия</Label>
            <Input name="data" type="date" defaultValue={event.date} />
          </div>
          <div className="space-y-2">
            <Label>Время</Label>
            <Input
              name="start_time"
              type="time"
              defaultValue={event.startTime}
            />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="space-y-2">
            <Label>Продолжительность</Label>
            <Input name="length" type="number" defaultValue={event.length} />
          </div>
          <div className="space-y-2">
            <Label>Цена за час</Label>
            <Input
              name="price_per_hour"
              type="number"
              defaultValue={event.pricePerHour}
            />
          </div>
        </div>
        <input type="hidden" name="eventId" value={event.id} />
        <SubmitButton>Отредактировать</SubmitButton>
      </form>
      <CardFooter>
        <CardDescription>{state?.message}</CardDescription>
      </CardFooter>
    </div>
  );
}
