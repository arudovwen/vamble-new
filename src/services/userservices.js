import urls from "../helpers/url_helpers";
import { post, get } from "../helpers/api_helpers";
import store from "../store";

const config = {
  headers: { Authorization: `Bearer ${store.getters.accessToken}` },
};
//Authentication

export async function inviteUsers(data) {
  return await post(urls.INVITE_USERS, data, config);
}

export async function deleteInvite(data) {
  return await post(
    `${urls.DELETE_INVITES}?invitationId=${data.invitationId}`,
    data,
    config
  );
}
export async function resendInvite(data) {
  return await post(`${urls.RESEND_INVITE_USERS}`, data, config);
}

export async function deleteUser(data) {
  return await post(`${urls.DELETE_USER}?email=${data.email}`, data, config);
}
export async function changeUserRole(data) {
  return await post(urls.CHANGE_ROLE, data, config);
}
export async function getInvites({
  Status,
  PageNumber = 1,
  PageSize = 10,
  Role,
  Search = "",
}) {
  return await get(
    `${urls.GET_INVITES}?Search=${Search}&Status=${Status}&Role=${Role}&PageNumber=${PageNumber}&PageSize=${PageSize}`,
    config
  );
}
export async function getRoles() {
  return await get(`${urls.GET_ROLES}`, config);
}
