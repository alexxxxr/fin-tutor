"use client";

import { pay } from "@/app/schedule/lesson/actions";
import { useFormState } from "react-dom";
import { Badge } from "./ui/badge";
import { useRef } from "react";

type Props = {
  eventId: number;
  payed: boolean;
  upcoming: boolean;
};

export default function PaymentStatus({ eventId, payed, upcoming }: Props) {
  const [state, formAction] = useFormState(pay, { message: "" });
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form action={formAction} ref={formRef}>
      {upcoming ? (
        payed ? (
          <Badge variant="green">Оплачен</Badge>
        ) : (
          <Badge
            className="cursor-pointer"
            variant="outline"
            onClick={() => formRef.current?.requestSubmit()}
          >
            Не оплачен
          </Badge>
        )
      ) : payed ? (
        <Badge variant="green">Оплачен</Badge>
      ) : (
        <Badge
          className="cursor-pointer"
          variant="destructive"
          onClick={() => formRef.current?.requestSubmit()}
        >
          Не оплачен
        </Badge>
      )}
      <input type="hidden" name="eventId" value={eventId} />
      <p>{state?.message != "success" ? state?.message : null}</p>
    </form>
  );
}
