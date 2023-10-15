import Home from "../views/Home.vue";
import Alumni from "../views/Staff.vue";
import Contact from "../views/Contact.vue";
import Constitution from "../views/Constitution.vue";
import HotCard from "../views/HotCard.vue";
import Events from "../views/Events.vue";

export const routes = [
  {
    path: "/",
    name: "Home",
    meta: {
      title: "HacKSU: Helping Kent State University Learn To Code",
      scrollNav: true,
    },
    component: Home,
  },
  {
    path: "/staff",
    name: "Staff",
    meta: {
      title: "HacKSU Alumni & Staff",
    },
    component: Alumni,
  },
  {
    path: "/contact",
    name: "Contact",
    meta: {
      title: "Contact HacKSU Leadership",
    },
    component: Contact,
  },
  {
    path: "/constitution",
    name: "Constitution",
    meta: {
      title: "HacKSU Constitution & Bylaws",
    },
    component: Constitution,
  },
  {
    path: "/hotcard",
    name: "Hot Card",
    meta: {
      title: "HacKSU HotCard",
    },
    component: HotCard,
  },
  {
    path: '/events',
    name: "Events",
    meta: {
      title: "HacKSU Events",
    },
    component: Events,
  },
];
