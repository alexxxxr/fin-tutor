"use server";

import { backendURL } from "@/settings";
import { cookies } from "next/headers";

export async function getProfile() {
  const cookieStorage = cookies();

  const response = await fetch(backendURL + "auth/get_profile", {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json",
    }),
    body: JSON.stringify({
      login: cookieStorage.get("login")?.value,
      password: cookieStorage.get("password")?.value,
    }),
  });

  if (!response.ok) {
    throw new Error("error getting profile: " + response.status);
  }

  return response.json();
}
