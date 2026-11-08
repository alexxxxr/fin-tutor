"use client";

import { deleteAccount } from "@/app/auth/actions";
import { useFormState } from "react-dom";
import SubmitButton from "./SubmitButton";
import { CardDescription } from "./ui/card";

export default function DeleteAccountForm() {
  const [state, formAction] = useFormState(deleteAccount, { message: "" });

  return (
    <form action={formAction}>
      <SubmitButton>Удалить аккаунт</SubmitButton>
      <CardDescription>{state?.message}</CardDescription>
    </form>
  );
}
