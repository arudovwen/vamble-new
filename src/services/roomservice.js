import urls from "../helpers/url_helpers";
import { put, del, post, get } from "../helpers/api_helpers";

const config = {};
//Authentication

export async function getRoomTypes() {
  return await get(`${urls.GET_ROOM_TYPES}`, config);
}
export async function getRoomCategories() {
  return await get(`${urls.GET_ROOM_CATEGORIES}`, config);
}

export async function checkAvailability(data) {
  return await post(`${urls.CHECK_AVAILABILITY}`, data, config);
}

export async function checkCoupon(data) {
  return await post(`${urls.CHECK_COUPON}`, data, config);
}

export async function payAtHotel(data) {
  return await post(`${urls.HANDLE_RESERVE}`, data, config);
}

export async function getReservations(data) {
  return await get(
    `${urls.GET_RESERVATIONS}?page=${data.pageNumber}&pageSize=${data.pageSize}&search=${data.search}`,
    config
  );
}
export async function dropReservation(id) {
  return await del(`${urls.DROP_RESERVATION}/${id}`, config);
}

export async function addTransaction(data) {
  return await post(`${urls.POST_TRANSACTION}`, data, config);
}

export async function findBooking(booking) {
  return await get(`${urls.FIND_BOOKING}/${booking}`, config);
}

export async function findBookings(data) {
  return await get(
    `${urls.FIND_BOOKINGS}?page=${data.pageNumber}&pageSize=${data.pageSize}`,
    config
  );
}
export async function getRooms(data) {
  return await get(
    `${urls.ROOM}?page=${data.pageNumber}&pageSize=${data.pageSize}&search=${data.search}`,
    config
  );
}
export async function addRoom(data) {
  return await post(`${urls.ROOM}`, data, config);
}

export async function deleteRoom(id) {
  return await del(`${urls.ROOM}/${id}`, config);
}

export async function updateRoom(data) {
  return await put(`${urls.ROOM}/${data.id}`, data, config);
}
