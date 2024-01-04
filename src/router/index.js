import Home from "../views/Home.vue";
import Leadership from "../views/Leadership.vue";
import Contact from "../views/Contact.vue";
import Constitution from "../views/Constitution.vue";
import HotCard from "../views/HotCard.vue";
import Meetings from "../views/Meetings.vue";
import Redirects from "../views/Redirects.vue";
import Admin from "../views/Admin.vue";
import EditStaff from "../views/EditStaff.vue";
import EditEvents from "../views/EditEvents.vue";
import EditNotes from "../views/EditNotes.vue";
import AdminMeetings from "../views/AdminMeetings.vue"

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
    path: "/leadership",
    name: "Leadership",
    meta: {
      title: "HacKSU Leadership",
    },
    component: Leadership,
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
    path: '/meetings',
    name: "Meetings",
    meta: {
      title: "HacKSU Meetings",
    },
    component: Meetings,
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
    path: "/admin/redirects",
    name: "Redirects", 
    component: Redirects,
    meta: {
      admin: true
    }
  },
  {
    path: "/admin/staff",
    name: "Edit Staff", 
    component: EditStaff,
    meta: {
      admin: true
    }
  },
  {
    path: "/admin/events",
    name: "Edit Events", 
    component: EditEvents,
    meta: {
      admin: true
    }
  },
  {
    path: "/admin/notes",
    name: "Edit Notes",
    component: EditNotes,
    meta: {
      admin: true
    }
  },
  {
    path: "/admin/meetings",
    name: "Admin Meetings",
    component: AdminMeetings,
    meta: {
      admin: true
    }
  }
];
