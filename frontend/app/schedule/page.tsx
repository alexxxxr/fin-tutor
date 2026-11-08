import DeleteLessonForm from "@/components/DeleteLessonForm";
import PaymentStatus from "@/components/PaymentStatus";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { shimmer } from "@/components/ui/shimmer";
import { backendURL } from "@/settings";
import { Pencil } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { getProfile } from "../profile/actions";

export default async function Page() {
  const cookieStorage = cookies();

  if (!cookieStorage.get("login")) {
    redirect("/auth/login?ref=schedule");
  }

  const today = new Date();

  const response = await fetch(backendURL + "get_events_by_month", {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json",
    }),
    body: JSON.stringify({
      login: cookieStorage.get("login")?.value,
      year: today.getFullYear(),
      month: today.getMonth() + 1,
    }),
  });

  if (!response.ok) {
    return (
      <Card>
        <CardContent>
          <CardTitle>Произошла ошибка</CardTitle>
          <CardDescription>
            {await JSON.stringify(response.json())}
          </CardDescription>
        </CardContent>
      </Card>
    );
  }

  const events = (await response.json()) as {
    id: number;
    tutor: number;
    student: number;
    date: string;
    price: number;
    is_payed: boolean;
    start_time: string;
    length: number;
  }[];

  events.forEach((event, index) => {
    let date: any = event.date;
    date = date.split(".");
    date = [date[1], date[0], date[2]].join("-");
    events[index].date = date;
  });

  const passedEvents = events.filter(
    (event) => new Date() > new Date(event.date),
  );
  const upcomingEvents = events.filter(
    (event) => new Date() <= new Date(event.date),
  );

  let user_type;
  try {
    user_type = (await getProfile()).user_type;
  } catch (error) {
    return (
      <Card>
        <CardContent>
          <CardTitle>Произошла ошибка</CardTitle>
          <CardDescription>{(error as any).toString()}</CardDescription>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="mx-auto w-fit px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Предстоящие занятия</h1>
        <Suspense
          fallback={<div className={`h-2 w-40 rounded-md ${shimmer}`}></div>}
        >
          {user_type == 0 && (
            <Link href="/schedule/lesson/create">
              <Button size="sm">Запланировать занятия</Button>
            </Link>
          )}
        </Suspense>
      </div>
      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm dark:border-gray-800">
        <table className="w-full table-auto">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                Ученик
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                Дата
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                Стоимость
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                Статус оплаты
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                Время начала
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                Продолжительность
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                {" "}
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                {" "}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-800 dark:bg-gray-950">
            <Suspense
              fallback={
                <div className={`w-full rounded-md h-5 ${shimmer}`}></div>
              }
            >
              {upcomingEvents.map((event) => (
                <tr key={event.id}>
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-50">
                    {event.student}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {event.date}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {event.price}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    <PaymentStatus
                      eventId={event.id}
                      payed={event.is_payed}
                      upcoming={true}
                    />
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {event.start_time}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {event.length} минут
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    <DeleteLessonForm eventId={event.id} />
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    <Link href={`/schedule/lesson/${event.id}/edit`}>
                      <Pencil className="cursor-pointer w-5 h-5" />
                    </Link>
                  </td>
                </tr>
              ))}
            </Suspense>
          </tbody>
        </table>
      </div>
      <div className="h-10"></div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Прошедшие занятия</h1>
      </div>
      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm dark:border-gray-800">
        <table className="w-full table-auto">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                Ученик
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                Дата
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                Стоимость
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                Статус оплаты
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                Время начала
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                Продолжительность
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                {" "}
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                {" "}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-800 dark:bg-gray-950">
            <Suspense
              fallback={
                <div className={`w-full rounded-md h-5 ${shimmer}`}></div>
              }
            >
              {passedEvents.map((event) => (
                <tr key={event.id}>
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-50">
                    {event.student}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {event.date}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {event.price}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    <PaymentStatus
                      eventId={event.id}
                      payed={event.is_payed}
                      upcoming={false}
                    />
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {event.start_time}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {event.length} минут
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    <DeleteLessonForm eventId={event.id} />
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    <Link href={`/schedule/lesson/${event.id}/edit`}>
                      <Pencil className="cursor-pointer w-5 h-5" />
                    </Link>
                  </td>
                </tr>
              ))}
            </Suspense>
          </tbody>
        </table>
      </div>
    </div>
  );
}
