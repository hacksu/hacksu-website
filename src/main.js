import { ViteSSG } from "vite-ssg";

import { routes } from "./router";
import App from "./App.vue";

import { loggedIn, attemptedLogin, showingNavigationMenu } from "./globals.js";

export const createApp = ViteSSG(
  // the root component
  App,
  // vue-router options
  {
    routes,
    scrollBehavior() {
      document.querySelector("#app").scrollIntoView();
      return { x: 0, y: 0 };
    },
  },
  // function to have custom setups
  ({ app, router, routes, isClient, initialState }) => {
    if (isClient) {
      // TO DISABLE AUTH: Comment out the if block below and only keep next()
      router.beforeEach((to, from, next) => {
        if (to.meta?.admin && !loggedIn.value && attemptedLogin.value) {
          window.location.href = "/discord-login";
        } else {
          next();
        }
      });
      router.afterEach(() => {
        showingNavigationMenu.value = false;
      });
    }
  }
);
