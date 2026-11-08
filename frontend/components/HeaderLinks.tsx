"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { logout } from "@/app/auth/actions";
import { useLoginStatus } from "@/lib/hooks";

export default function HeaderLinks() {
  const loggedIn = useLoginStatus();

  return (
    <nav className="ml-auto flex flex-1 justify-end gap-4 lg:gap-6 items-center">
      <Link className="font-medium underline" href="/">
        Главная
      </Link>
      {!loggedIn ? (
        <Link className="font-medium underline" href="/auth/login?ref=schedule">
          Войти
        </Link>
      ) : (
        <>
          <Link className="font-medium underline" href="/profile">
            Профиль
          </Link>
          <Link className="font-medium underline" href="/schedule">
            Расписание
          </Link>
          <Link className="font-medium underline" href="/analytics">
            Аналитика
          </Link>
          <Button
            className="font-medium underline"
            onClick={() => {
              logout();
            }}
          >
            Выйти
          </Button>
        </>
      )}
    </nav>
  );
}
