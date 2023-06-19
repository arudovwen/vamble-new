import urls from "../helpers/url_helpers";
import { post, get } from "../helpers/api_helpers";

//Authentication
export async function loginUser(user, config = {}) {
  return await post(urls.LOGIN_USER, user, config);
}
export async function logOut() {
  localStorage.clear();
  window.location.href = "/";
}

export async function forgotPassword(user, config = {}) {
  return await post(urls.FORGOT_PASSWORD, user, config);
}

export async function resetPassword(user, config = {}) {
  return await post(urls.RESET_PASSWORD, user, config);
}

export async function sendMessage(user, config = {}) {
  return await post(urls.SEND_MESSAGE, user, config);
}

export async function confirmemail({ userId, code }, config = {}) {
  return await get(
    `${urls.CONFIRM_EMAIL}?userId=${userId}&code=${code}`,
    config
  );
}
