import urls from "../helpers/url_helpers";
import { get, post, del, put } from "../helpers/api_helpers";
import store from "../store";

const config = {
  headers: { Authorization: `Bearer ${store.getters.token}` },
};
//Authentication

export async function getUsers({ pageNumber, search, pageSize }) {
  return await get(
    `${urls.ADMIN_USERS}?page=${pageNumber}&search=${search}&limit=${pageSize}`,
    config
  );
}
export async function getTransactions({ pageNumber, search, pageSize }) {
  return await get(
    `${urls.GET_TRANSACTIONS}?page=${pageNumber}&search=${search}&limit=${pageSize}`,
    config
  );
}

export async function getCoupons({ pageNumber, search, pageSize }) {
  return await get(
    `${urls.COUPONS}?page=${pageNumber}&search=${search}&limit=${pageSize}`,
    config
  );
}

export async function addCoupon(data) {
  return await post(`${urls.COUPONS}`, data, config);
}

export async function deleteCoupon(id) {
  return await del(`${urls.COUPONS}/${id}`, config);
}

export async function updateCoupon(data) {
  return await put(`${urls.COUPONS}/${data.id}`, data, config);
}
export async function getReservations({ pageNumber, search, pageSize }) {
  return await get(
    `${urls.GET_RESERVATIONS}?page=${pageNumber}&search=${search}&limit=${pageSize}`,
    config
  );
}

export async function getNotifications({ pageNumber, pageSize }) {
  return await get(
    `${urls.NOTIFICATIONS}?page=${pageNumber}&limit=${pageSize}`,
    config
  );
}
export async function markNotification(id) {
  return await get(`${urls.MARK_NOTIFICATION}/${id}`, config);
}
export async function customerCheckin(id) {
  return await get(`${urls.CUSTOMER_CHECKIN}/${id}`, config);
}
export async function customerCheckout(id) {
  return await get(`${urls.CUSTOMER_CHECKOUT}/${id}`, config);
}
