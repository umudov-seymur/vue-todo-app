import Vue from "vue";
import VueRouter from "vue-router";
import { store } from "@/store/index";

Vue.use(VueRouter);

const ifNotAuthenticated = (to, from, next) => {
  if (store.getters["auth/isLoggedIn"]) {
    next({ name: "home" });
  }
  next();
};

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/LandingPage.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/todo",
    name: "todo",
    component: () => import("../App.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../views/About.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/auth/Login.vue"),
    beforeEnter: ifNotAuthenticated,
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/auth/Register.vue"),
    beforeEnter: ifNotAuthenticated,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.getters["auth/isLoggedIn"]) {
      next({
        path: "/login",
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next(); // make sure to always call next()!
  }
});

export default router;
