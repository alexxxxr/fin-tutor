"use server";

import { backendURL } from "@/settings";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function postLesson(
  prevState: { message: string },
  formData: FormData,
) {
  let [
    startWeekDay,
    startTime,
    length,
    pricePerHour,
    studentEmail,
    repeatForWeeks,
  ] = [
    formData.get("startWeekDay"),
    formData.get("startTime"),
    formData.get("length"),
    formData.get("pricePerHour"),
    formData.get("studentEmail"),
    formData.get("repeatForWeeks"),
  ];
  let repeatDays = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"].map(
    (weekday) => (formData.get(weekday) == "on" ? weekday : null),
  );
  repeatDays = repeatDays.filter((val) => val ?? false);
  const cookieStorage = cookies();
  try {
    startWeekDay =
      startWeekDay?.slice(8, 10) +
      "." +
      startWeekDay?.slice(5, 7) +
      "." +
      startWeekDay?.slice(0, 4);
    const promise = fetch(backendURL + "post_lesson", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({
        tutor_id: Number(cookieStorage.get("id")?.value),
        student_email: studentEmail,
        start_week_day: startWeekDay,
        repeat_for_weeks: Number(repeatForWeeks),
        repeat_days: repeatDays,
        price_per_hour: Number(pricePerHour),
        start_time: startTime,
        length: Number(length),
      }),
    });
    const response = await promise;
    if (!response.ok) {
      console.error(await response.json());
      return {
        message: `error (${response.status}): ${JSON.stringify(
          await response.json(),
        )}`,
      };
    }
  } catch (error) {
    console.error(error);
    return {
      message: `unexpected server action error: ${error}`,
    };
  }

  revalidatePath("/schedule");
  redirect("/schedule");
}

export async function pay(prevState: { message: string }, formData: FormData) {
  const eventId = formData.get("eventId");

  try {
    const response = await fetch(backendURL + "payment", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({
        id: eventId,
      }),
    });
    if (!response.ok) {
      return {
        message: `error (${response.status}): ${JSON.stringify(
          await response.json(),
        )}`,
      };
    }
  } catch (error) {
    console.error(error);
    return {
      message: `unexpected server action error: ${error}`,
    };
  }

  revalidatePath("/schedule");
  return {
    message: "success",
  };
}

export async function deleteLesson(
  prevState: { message: string },
  formData: FormData,
) {
  const eventId = formData.get("eventId");
  try {
    const response = await fetch(backendURL + "delete_lesson", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({
        id: eventId,
      }),
    });
    if (!response.ok) {
      return {
        message: `error (${response.status}): ${JSON.stringify(
          await response.json(),
        )}`,
      };
    }
  } catch (error) {
    console.error(error);
    return {
      message: `unexpected server action error: ${error}`,
    };
  }

  revalidatePath("/schedule");
  return {
    message: "success",
  };
}

// async function putLesson(id: number, key: string, value: string | number) {
//   const body: any = {
//     id: id,
//     type: key,
//   };
//   body[`new_${key}`] = value;
//   return await fetch(backendURL + "put_lesson", {
//     method: "POST",
//     headers: new Headers({
//       "Content-Type": "application/json",
//     }),
//     body: JSON.stringify(body),
//   });
// }

export async function editLesson(
  prevState: { message: string },
  formData: FormData,
) {
  const eventId = Number(formData.get("eventId"));

  try {
    const body: any = {
      id: eventId,
      type: ["data", "start_time", "length", "price_per_hour"],
    };
    for (const key of body.type) {
      const value = formData.get(key) as Exclude<FormDataEntryValue, File>;
      body[`new_${key}`] = value;
    }
    const date = new Date(formData.get("data") as string);
    const pyDate = [
      date.getDate().toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      }),
      (date.getMonth() + 1).toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      }),
      date.getFullYear(),
    ].join(".");
    body["new_data"] = pyDate;
    const response = await fetch(backendURL + "put_lesson", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      return {
        message: `error (${response.status}): ${JSON.stringify(
          await response.json(),
        )}`,
      };
    }
  } catch (error) {
    console.error(error);
    return {
      message: `unexpected server action error: ${error}`,
    };
  }

  revalidatePath("/schedule");
  redirect("/schedule");
}
