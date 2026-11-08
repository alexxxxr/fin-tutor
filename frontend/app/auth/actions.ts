"use server";

import { backendURL } from "@/settings";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

function validateEmail(email: string): boolean {
  return Boolean(
    email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      ),
  );
}

export async function register(
  prevState: {
    message: string;
  },
  formData: FormData,
) {
  const [login, email, password, role] = [
    formData.get("login"),
    formData.get("email"),
    formData.get("password"),
    formData.get("role"),
  ];

  let response: Response;

  try {
    response = await fetch(backendURL + "auth/register", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({
        login: login,
        email: email,
        password: password,
        user_type: role == "student" ? 1 : 0,
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

  const cookieStorage = cookies();
  const json = await response.json();
  cookieStorage.set("id", String(json.id));
  cookieStorage.set("login", String(login));
  cookieStorage.set("email", String(email));
  cookieStorage.set("password", String(password));
  cookieStorage.set("role", String(role));

  redirect("/schedule");
}

export async function login(
  prevState: {
    message: string;
  },
  formData: FormData,
) {
  const [login, password, ref] = [
    formData.get("login"),
    formData.get("password"),
    formData.get("ref"),
  ];

  let response: Response;

  try {
    response = await fetch(backendURL + "auth/login", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({
        login: login,
        password: password,
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

  const cookieStorage = cookies();
  const json = await response.json();
  cookieStorage.set("id", String(json.id));
  cookieStorage.set("login", String(login));
  cookieStorage.set("password", String(password));

  redirect(`/${ref}`);
}

export async function logout() {
  for (const cookie of cookies().getAll()) {
    cookies().delete(cookie.name);
  }

  redirect("/auth/login");
}

export async function deleteAccount(
  prevState: {
    message: string;
  },
  formData: FormData,
) {
  const cookieStorage = cookies();
  try {
    const response = await fetch(backendURL + "auth/logout", {
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

  logout();
  redirect("/");
}
