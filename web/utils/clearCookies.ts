import Cookies from "js-cookie";
import { COOKIES } from "../types";

export default function clearCookies() {
  // Clear previous cookies
  Object.values(COOKIES).forEach((cookieName) => {
    Cookies.remove(cookieName);
  });
}
