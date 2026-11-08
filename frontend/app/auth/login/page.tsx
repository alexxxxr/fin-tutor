"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useFormState } from "react-dom";
import { login } from "../actions";
import SubmitButton from "@/components/SubmitButton";

export default function Page({
  searchParams,
}: {
  searchParams: { ref: string };
}) {
  const [state, formAction] = useFormState(login, { message: "" });

  return (
    <div className="flex flex-row justify-center">
      <form action={formAction}>
        <Card className="mx-auto max-w-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Вход</CardTitle>
            <CardDescription>Заполните форму, чтобы продолжить</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Логин</Label>
              <Input name="login" required placeholder="Введите ваш логин" />
            </div>
            <div className="space-y-2">
              <Label>Пароль</Label>
              <Input
                name="password"
                required
                type="password"
                placeholder="Введите ваш пароль"
              />
            </div>
            <SubmitButton>Войти</SubmitButton>
          </CardContent>
          <CardFooter className="text-center space-y-2 flex flex-col gap-5">
            <Link className="underline" href="/auth/register">
              Еще не зарегистрированы?
            </Link>
            <CardDescription>{state?.message}</CardDescription>
          </CardFooter>
        </Card>
        <input type="hidden" name="ref" value={searchParams.ref} />
      </form>
    </div>
  );
}
