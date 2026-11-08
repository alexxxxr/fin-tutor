"use client";

import { deleteLesson } from "@/app/schedule/lesson/actions";
import { Trash } from "lucide-react";
import { useFormState, useFormStatus } from "react-dom";

type Props = {
  eventId: number;
};

function SubmitIcon() {
  const { pending } = useFormStatus();

  return (
    <Trash
      className={`cursor-pointer w-5 h-5 ${pending ? "opacity-50" : ""}`}
    />
  );
}

export default function DeleteLessonForm({ eventId }: Props) {
  const [state, formAction] = useFormState(deleteLesson, { message: "" });

  return (
    <form
      action={formAction}
      onClick={(e) => {
        e.currentTarget.requestSubmit();
      }}
    >
      <SubmitIcon />
      <input type="hidden" name="eventId" value={eventId} />
    </form>
  );
}
