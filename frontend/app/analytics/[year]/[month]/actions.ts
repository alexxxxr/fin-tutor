"use server";

import { backendURL } from "@/settings";
import { cookies } from "next/headers";

type AnalyticsResponse =
  | {
      status: "error";
    }
  | {
      status: "success";
      response: {
        total_earning: number;
        lesson_price_mean: number;
        most_profitable_month: number;
        most_profitable_month_income: number;
        least_profitable_month: number;
        least_profitable_month_income: number;
        most_profitable_student: string;
        most_profitable_student_income: number;
        least_profitable_student: string;
        least_profitable_student_income: number;
      };
    };

export async function getAnanytics(year: number, month: number) {
  const cookieStorage = cookies();
  let result: AnalyticsResponse;
  const today = new Date();
  try {
    const response = await fetch(`${backendURL}analytics/month`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({
        tutor_login: cookieStorage.get("login")?.value,
        password: cookieStorage.get("password")?.value,
        year: today.getFullYear(),
        month: today.getMonth() + 1,
      }),
    });
    result = {
      status: "success",
      response: await response.json(),
    };
  } catch (error) {
    console.log(error);
    result = { status: "error" };
  }
  return result;
}

type LinearRegressionResponse =
  | {
      status: "error";
    }
  | {
      status: "success";
      response: {
        past_month_income: number;
        previous_month_income: number;
        current_month_income: number;
        next_month_income: number;
        following_month_income: number;
      };
    };

export async function getLinearRegression(year: number, month: number) {
  const cookieStorage = cookies();
  let result: LinearRegressionResponse;
  try {
    const response = await fetch(`${backendURL}/analytics/linear_regression`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({
        tutor_login: cookieStorage.get("login")?.value,
        year: year,
        month: month,
      }),
    });
    result = {
      status: "success",
      response: await response.json(),
    };
  } catch (error) {
    console.log(error);
    result = { status: "error" };
  }
  return result;
}
