import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/client/LandingView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: {
      title: "Welcome - Vamble Apartments & Suites",
      metaTags: [
        {
          name: "description",
          content:
            "Vamble Apartments and Suites is a sweet spot to relax and enjoy the splendor and exquisite feeling of a home away from home. It's perculiarity is second to none.",
        },
        {
          property: "og:description",
          content:
            "Vamble Apartments and Suites is a sweet spot to relax and enjoy the splendor and exquisite feeling of a home away from home. It's perculiarity is second to none.",
        },
      ],
      isClient: true,
    },
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(
        /* webpackChunkName: "login" */ "@/components/auth/LoginComponent"
      ),
    meta: {
      title: "Login - Vamble Apartments & Suites",
      metaTags: [
        {
          name: "description",
          content:
            "Vamble Apartments and Suites is a sweet spot to relax and enjoy the splendor and exquisite feeling of a home away from home. It's perculiarity is second to none.",
        },
        {
          property: "og:description",
          content:
            "Vamble Apartments and Suites is a sweet spot to relax and enjoy the splendor and exquisite feeling of a home away from home. It's perculiarity is second to none.",
        },
      ],
      isClient: true,
    },
  },
  {
    path: "/forgot-password",
    name: "Forgot password",
    component: () =>
      import(
        /* webpackChunkName: "forgotpassword" */ "@/components/auth/ForgotComponent"
      ),
    meta: {
      title: "Forgot password - Vamble Apartments & Suites",
      metaTags: [
        {
          name: "description",
          content:
            "Vamble Apartments and Suites is a sweet spot to relax and enjoy the splendor and exquisite feeling of a home away from home. It's perculiarity is second to none.",
        },
        {
          property: "og:description",
          content:
            "Vamble Apartments and Suites is a sweet spot to relax and enjoy the splendor and exquisite feeling of a home away from home. It's perculiarity is second to none.",
        },
      ],
      isClient: true,
    },
  },
  {
    path: "/reset-password/:code",
    name: "Reset password",
    component: () =>
      import(
        /* webpackChunkName: "resetpassword" */ "@/components/auth/ResetComponent"
      ),
    meta: {
      title: "Reset password - Vamble Apartments & Suites",
      metaTags: [
        {
          name: "description",
          content:
            "Vamble Apartments and Suites is a sweet spot to relax and enjoy the splendor and exquisite feeling of a home away from home. It's perculiarity is second to none.",
        },
        {
          property: "og:description",
          content:
            "Vamble Apartments and Suites is a sweet spot to relax and enjoy the splendor and exquisite feeling of a home away from home. It's perculiarity is second to none.",
        },
      ],
      isClient: true,
    },
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/client/AboutView"),
    meta: {
      title: "About - Vamble Apartments & Suites",
      metaTags: [
        {
          name: "description",
          content:
            "Vamble Apartments and Suites is a sweet spot to relax and enjoy the splendor and exquisite feeling of a home away from home. It's perculiarity is second to none.",
        },
        {
          property: "og:description",
          content:
            "Vamble Apartments and Suites is a sweet spot to relax and enjoy the splendor and exquisite feeling of a home away from home. It's perculiarity is second to none.",
        },
      ],
      isClient: true,
    },
  },
  {
    path: "/services",
    name: "Services",
    component: () =>
      import(/* webpackChunkName: "services" */ "../views/client/ServiceView"),
    meta: {
      title: "Services - Vamble Apartments & Suites",
      metaTags: [
        {
          name: "description",
          content: "Services - Vamble Apartments & Suites",
        },
        {
          property: "og:description",
          content: "Services - Vamble Apartments & Suites",
        },
      ],
      isClient: true,
    },
  },
  {
    path: "/enquiries",
    name: "enquiries",
    component: () =>
      import(/* webpackChunkName: "enquiries" */ "../views/client/ContactView"),
    meta: {
      title: "Enquiries - Vamble Apartments & Suites",
      metaTags: [
        {
          name: "description",
          content: "Enquiries - Vamble Apartments & Suites",
        },
        {
          property: "og:description",
          content: "Enquiries - Vamble Apartments & Suites",
        },
      ],
      isClient: true,
    },
  },

  {
    path: "/rooms",
    name: "rooms",
    component: () =>
      import(/* webpackChunkName: "rooms" */ "../views/client/RoomsView"),
    meta: {
      title: "Rooms & Apartments - Vamble Apartments & Suites",
      metaTags: [
        {
          name: "description",
          content:
            "A look at our rooms, apartments, sitting rooms and so much more, so you will have a clue of what to expect - Vamble Apartments & Suites",
        },
        {
          property: "og:description",
          content:
            "A look at our rooms, apartments, sitting rooms and so much more, so you will have a clue of what to expect - Vamble Apartments & Suites",
        },
      ],
      isClient: true,
    },
  },
  {
    path: "/bookings",
    name: "bookings",
    component: () =>
      import(/* webpackChunkName: "bookings" */ "../views/client/BookingsView"),
    meta: {
      title: "Bookings - Vamble Apartments & Suites",
      metaTags: [
        {
          name: "description",
          content: "Bookings - Vamble Apartments & Suites",
        },
        {
          property: "og:description",
          content: "Bookings - Vamble Apartments & Suites",
        },
      ],
      isClient: true,
    },
  },
  {
    path: "/booking",
    name: "booking",
    component: () =>
      import(/* webpackChunkName: "booking" */ "../views/client/BookingView"),
    meta: {
      title: "Booking - Vamble Apartments & Suites",
      metaTags: [
        {
          name: "description",
          content: "Booking - Vamble Apartments & Suites",
        },
        {
          property: "og:description",
          content: "Booking - Vamble Apartments & Suites",
        },
      ],
      isClient: true,
    },
  },

  // admin route
  {
    path: "/admin",
    name: "Dashboard",

    component: () =>
      import(
        /* webpackChunkName: "admindashboard" */ "../views/admin/DashboardView.vue"
      ),
    meta: {
      title: "Dashboard - Vamble Apartments & Suites",
      metaTags: [
        {
          name: "description",
          content: "Dashboard",
        },
        {
          property: "og:description",
          content: "Dashboard",
        },
      ],
      isAdmin: true,
    },
  },
  {
    path: "/admin/transactions",
    name: "Transactions",

    component: () =>
      import(
        /* webpackChunkName: "admindtransactionashboard" */ "../views/admin/TransactionView.vue"
      ),
    meta: {
      title: "Transaction - Vamble Apartments & Suites",
      metaTags: [
        {
          name: "description",
          content: "Transaction - Vamble Apartments & Suites",
        },
        {
          property: "og:description",
          content: "Transaction - Vamble Apartments & Suites",
        },
      ],
      isAdmin: true,
    },
  },
  {
    path: "/admin/reservations",
    name: "reservations",

    component: () =>
      import(
        /* webpackChunkName: "admindasreservationshboard" */ "../views/admin/ReservationView.vue"
      ),
    meta: {
      title: "Reservations - Vamble Apartments & Suites",
      metaTags: [
        {
          name: "description",
          content: "Reservations",
        },
        {
          property: "og:description",
          content: "Reservations",
        },
      ],
      isAdmin: true,
    },
  },
  {
    path: "/admin/calendar",
    name: "Calendar",

    component: () =>
      import(
        /* webpackChunkName: "Calendar" */ "../views/admin/CalendarView.vue"
      ),
    meta: {
      title: "Calendar - Vamble Apartments & Suites",
      metaTags: [
        {
          name: "description",
          content: "Calendar",
        },
        {
          property: "og:description",
          content: "Calendar",
        },
      ],
      isAdmin: true,
    },
  },
  {
    path: "/admin/coupons",
    name: "Coupons",

    component: () =>
      import(/* webpackChunkName: "Coupon" */ "../views/admin/CouponView.vue"),
    meta: {
      title: "Coupons - Vamble Apartments & Suites",
      metaTags: [
        {
          name: "description",
          content: "Coupons",
        },
        {
          property: "og:description",
          content: "Coupons",
        },
      ],
      isAdmin: true,
    },
  },
  {
    path: "/admin/rooms",
    name: "Rooms & apartment",

    component: () =>
      import(
        /* webpackChunkName: "admindashroomsboard" */ "../views/admin/RoomsView.vue"
      ),
    meta: {
      title: "Rooms & Apartment - Vamble Apartments & Suites",
      metaTags: [
        {
          name: "description",
          content: "Rooms & Apartment",
        },
        {
          property: "og:description",
          content: "Rooms & Apartment",
        },
      ],
      isAdmin: true,
    },
  },
  {
    path: "/admin/user-management",
    name: "User Management",

    component: () =>
      import(
        /* webpackChunkName: "adminUserdashboard" */ "../views/admin/UserView.vue"
      ),
    meta: {
      title: "User Management - Vamble Apartments & Suites",
      metaTags: [
        {
          name: "description",
          content: "User Management",
        },
        {
          property: "og:description",
          content: "User Management",
        },
      ],
      isAdmin: true,
    },
  },
  {
    path: "/:catchAll(.*)",
    name: "Not found",
    component: () =>
      import(/* webpackChunkName: "notfound" */ "../views/NotFound"),
  },
];

// handle scroll
const scrollBehavior = (to, from, savedPosition) => {
  return savedPosition || { top: 0, left: 0 };
};

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior,
});

// handle page title, meta tags
router.beforeEach((to, from, next) => {
  const nearestWithTitle = to.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.title);

  const titleFromParams = to.params.name;

  const nearestWithMeta = to.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.metaTags);

  const previousNearestWithMeta = from.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.metaTags);

  if (nearestWithTitle) {
    if (titleFromParams) {
      document.title = `${titleFromParams} - ${nearestWithTitle.meta.title}`;
    } else {
      document.title = nearestWithTitle.meta.title;
    }
  } else if (previousNearestWithMeta) {
    document.title = previousNearestWithMeta.meta.title;
  }

  // Remove any stale meta tags from the document using the key attribute we set below.
  Array.from(document.querySelectorAll("[data-vue-router-controlled]")).map(
    (el) => el.parentNode.removeChild(el)
  );

  // Skip rendering meta tags if there are none.
  if (!nearestWithMeta) return next();

  // Turn the meta tag definitions into actual elements in the head.
  nearestWithMeta.meta.metaTags
    .map((tagDef) => {
      const tag = document.createElement("meta");

      Object.keys(tagDef).forEach((key) => {
        tag.setAttribute(key, tagDef[key]);
      });

      // We use this to track which meta tags we create so we don't interfere with other ones.
      tag.setAttribute("data-vue-router-controlled", "");

      return tag;
    })
    // Add the meta tags to the document head.
    .forEach((tag) => document.head.appendChild(tag));

  next();
});

export default router;
