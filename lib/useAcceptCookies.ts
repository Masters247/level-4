import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { initGA } from "./ga-utils";

const COOKIE_NAME = "accept_cookies";

export const useAcceptCookies = () => {
  const [acceptedCookies, setAcceptedCookies] = useState(false);
  const [declinedCookies, setDeclinedCookies] = useState(false);

  useEffect(() => {
    if (Cookies.get(COOKIE_NAME)) {
      setAcceptedCookies(true);
    }
  }, []);

  const acceptCookies = () => {
    setAcceptedCookies(true);
    Cookies.set(COOKIE_NAME, "accepted", { expires: 1 });
    if (process.env.NODE_ENV === "production") {
      // Google
      initGA();
    }
  };

  const declineCookies = () => {
    setDeclinedCookies(true);
    Cookies.set(COOKIE_NAME, "declined", { expires: 1 });
  };

  return {
    acceptedCookies,
    onAcceptCookies: acceptCookies,
    declineCookies,
    declinedCookies,
  };
};
