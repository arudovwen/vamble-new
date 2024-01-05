const { defineConfig } = require("@vue/cli-service");
const routes = [
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
    path: "/enquiry",
    name: "enquiry",
    component: () =>
      import(/* webpackChunkName: "enquiry" */ "../views/client/ContactView"),
    meta: {
      title: "enquiry - Vamble Apartments & Suites",
      metaTags: [
        {
          name: "description",
          content: "enquiry - Vamble Apartments & Suites",
        },
        {
          property: "og:description",
          content: "enquiry - Vamble Apartments & Suites",
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
];

module.exports = defineConfig({
  transpileDependencies: true,
  pluginOptions: {
    sitemap: {
      baseURL: "https://vambleapartments.com",
      routes,
    },
  },
});
