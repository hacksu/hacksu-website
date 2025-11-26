import Home from "../views/Home.vue";
import Leadership from "../views/Leadership.vue";
import Contact from "../views/Contact.vue";
import Constitution from "../views/Constitution.vue";
import HotCard from "../views/HotCard.vue";
import Meetings from "../views/Meetings.vue";
import Lessons from "../views/Lessons.vue";
import LessonDetail from "../views/LessonDetail.vue";
import Redirects from "../views/Redirects.vue";
import Admin from "../views/Admin.vue";
import EditStaff from "../views/EditStaff.vue";
import EditEvents from "../views/EditEvents.vue";
import EditNotes from "../views/EditNotes.vue";
import AdminMeetings from "../views/AdminMeetings.vue";
import FallFest from "../views/FallFest.vue";
import HelpPage from "../views/HelpPage.vue";
import AdminInformation from "../views/AdminInformation.vue";

export const routes = [
  {
    path: "/",
    name: "Home",
    meta: {
      title: "HacKSU",
      description: "HacKSU exists to connect Kent State University with the tools and " +
        "technologies that hobbyist and professional programmers use to get stuff done.",
      image: "/logo.png",
      scrollNav: true,
    },
    component: Home,
  },
  {
    path: "/leadership",
    name: "Leadership",
    meta: {
      title: "Leadership - HacKSU",
      description: "Past and present leaders of HacKSU"
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
      title: "Meetings - HacKSU",
      description: "A record of our activities."
    },
    component: Meetings,
  },
  {
    path: '/lessons',
    name: "Lessons",
    meta: {
      title: "Lessons - HacKSU",
      description: "Explore our collection of programming lessons and tutorials."
    },
    component: Lessons,
  },
  {
    path: '/lessons/detail/:pathMatch(.*)*',
    name: "LessonDetail",
    meta: {
      title: "Lesson - HacKSU",
    },
    component: LessonDetail,
  },
  {
    path: '/lessons/:pathMatch(.*)*',
    name: "LessonsCategory",
    meta: {
      title: "Lessons - HacKSU",
    },
    component: Lessons,
  },
  {
    path: '/ibm',
    name: "IBM Fall Fest",
    meta: {
      title: "IBM Fall Fest!",
      description: "Infomration about our collaboration with IBM, Case Western Reserve University, and Cleveland State University."
    },
    component: FallFest,
  },
  {
    path: '/helpful_info',
    name: "Useful Links and Information",
    meta: {
      title: "Links and Resources!",
      description: "A collection of useful links and information for students."
    },
    component: HelpPage,
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
  },
  {
    path: "/admin/informations",
    name: "Information Editor",
    component: AdminInformation,
    meta: {
      admin: true
    }
  },
];
