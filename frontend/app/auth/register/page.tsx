"use client";

import { Button } from "@/components/ui/button";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { register } from "../actions";
import { useFormState, useFormStatus } from "react-dom";
import SubmitButton from "@/components/SubmitButton";
import Link from "next/link";

export default function Page() {
  const [state, formAction] = useFormState(register, { message: "" });

  return (
    <div className="flex flex-row justify-center">
      <form action={formAction}>
        <Card key="1" className="w-full max-w-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Регистрация</CardTitle>
            <CardDescription>Заполните форму, чтобы продолжить</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Логин</Label>
              <Input name="login" placeholder="Введите логин" required />
            </div>
            <div className="space-y-2">
              <Label>Почта</Label>
              <Input
                name="email"
                placeholder="Введите email"
                required
                type="email"
              />
            </div>
            <div className="space-y-2">
              <Label>Пароль</Label>
              <Input
                name="password"
                required
                type="password"
                placeholder="Используйте надежный пароль"
              />
            </div>
            <div className="space-y-2">
              <Label>Роль</Label>
              <Select name="role">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Репетитор/ученик" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tutor">Репетитор</SelectItem>
                  <SelectItem value="student">Ученик</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-5">
            <SubmitButton>Зарегистрироваться</SubmitButton>
            <Link className="underline" href="/auth/login">
              Уже зарегистрированы?
            </Link>
            <CardDescription>{state?.message}</CardDescription>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
