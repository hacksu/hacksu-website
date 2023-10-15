import Home from "../views/Home.vue";
import Alumni from "../views/Staff.vue";
import Contact from "../views/Contact.vue";
import Constitution from "../views/Constitution.vue";
import HotCard from "../views/HotCard.vue";
import Events from "../views/Events.vue";
import Redirects from "../views/Redirects.vue";
import Admin from "../views/Admin.vue";
import EditStaff from "../views/EditStaff.vue";

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
  {
    path: "/admin",
    name: "Admin Stuff",
    component: Admin,
    meta: {
      admin: true
    }
  },
  {
    path: "/redirects",
    name: "Redirects", 
    component: Redirects,
    meta: {
      admin: true
    }
  },
  {
    path: "/edit-staff",
    name: "Edit Staff", 
    component: EditStaff,
    meta: {
      admin: true
    }
  }
];
