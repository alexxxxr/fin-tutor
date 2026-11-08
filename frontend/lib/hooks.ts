import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export function useLoginStatus(): boolean {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const login = Cookies.get("login");

  useEffect(() => {
    setLoggedIn(Boolean(Cookies.get("login")));
  }, [login]);

  return loggedIn;
}
