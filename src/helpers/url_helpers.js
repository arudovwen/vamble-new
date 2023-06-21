const urls = {
  //Auth urls
  LOGIN_USER: "/api/login",
  LOGOUT: "/api/logout",
  FORGOT_PASSWORD: "/api/forgot-password",
  RESET_PASSWORD: "/api/reset-password",
  SEND_MESSAGE: "/api/enquire",

  // Room
  ROOM: "/api/rooms",
  GET_ROOM_TYPES: "/api/room/types",
  GET_ROOM_CATEGORIES: "/api/room/categories",
  CHECK_AVAILABILITY: "/api/check-availability",
  CHECK_COUPON: "/api/check-coupon",
  HANDLE_RESERVE: "/api/reserve",
  POST_TRANSACTION: "/api/transactions/add",

  COUPONS: "/api/coupons",
  FIND_BOOKING: "/api/find/booking",
  FIND_BOOKINGS: "/api/find/bookings",

  // Users
  ADMIN_USERS: "/api/users",

  GET_TRANSACTIONS: "/api/transactions",

  GET_RESERVATIONS: "/api/reservations",

  CUSTOMER_CHECKIN: "/api/customer/checkin",
  CUSTOMER_CHECKOUT: "/api/customer/checkout",

  NOTIFICATIONS: "/api/notifications",
  MARK_NOTIFICATION: "/api/marknotification",

  DROP_RESERVATION: "/api/admin/reserve",

  METRICS: "/api/metrics",
};
export default urls;
