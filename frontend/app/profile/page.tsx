import DeleteAccountForm from "@/components/DeleteAccountForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { shimmer } from "@/components/ui/shimmer";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SVGProps, Suspense } from "react";
import { getProfile } from "./actions";

export default async function Page() {
  const cookieStore = cookies();

  if (!cookieStore.get("login")) {
    redirect("/auth/login?ref=profile");
  }

  let login, email, user_type, join_date;
  try {
    ({ login, email, user_type, join_date } = await getProfile());
    console.log(login, email, user_type, join_date);
  } catch (error) {
    return (
      <Card>
        <CardContent>
          <CardTitle>Произошла ошибка</CardTitle>
          <CardDescription>{(error as Error).message}</CardDescription>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="flex flex-col items-center">
        <CardTitle>Ваша учетная запись</CardTitle>
        <CardDescription>Информация о вашей учётной записи.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
            <UserIcon className="w-6 h-6" />
          </div>
          <div className="grid gap-0.5">
            <h2 className="text-sm font-bold tracking-wide uppercase text-gray-500 dark:text-gray-400">
              Логин
            </h2>
            <Suspense fallback={<p className={`${shimmer} w-40 rounded`}></p>}>
              <p className="text-sm font-medium">{login}</p>
            </Suspense>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
            <MailIcon className="w-6 h-6" />
          </div>
          <div className="grid gap-0.5">
            <h2 className="text-sm font-bold tracking-wide uppercase text-gray-500 dark:text-gray-400">
              Почта
            </h2>
            <Suspense fallback={<p className={`${shimmer} w-40 rounded`}></p>}>
              <p className="text-sm font-medium">{email}</p>
            </Suspense>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
            <UserIcon className="w-6 h-6" />
          </div>
          <div className="grid gap-0.5">
            <h2 className="text-sm font-bold tracking-wide uppercase text-gray-500 dark:text-gray-400">
              Роль
            </h2>
            <Suspense fallback={<p className={`${shimmer} w-40 rounded`}></p>}>
              <p className="text-sm font-medium">
                {user_type == 1 ? "ученик" : "учитель"}
              </p>
            </Suspense>
          </div>
        </div>
      </CardContent>
      <CardFooter className="w-full justify-end">
        <DeleteAccountForm />
      </CardFooter>
    </Card>
  );
}

function UserIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function MailIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function CalendarIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  );
}
