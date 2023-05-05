import { Cookies } from "quasar";
import { api } from "src/boot/axios";
import { route } from "quasar/wrappers";
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import routes from "./routes";

export default route(function () {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === "history"
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  const checkHeadMaster = (to, from, next) => {
    const user = api
      .get("auth/users/me/", {
        headers: {
          Authorization: "Token " + Cookies.get("token"),
        },
      })
      .then((r) => {
        if (r.data.type_display == "HeadMaster") {
          next();
        }
      });
  };

  Router.beforeEach((to, from, next) => {
    if (to.meta.RoleAll) {
      if (Cookies.get("token")) {
        next();
      } else if(to.meta.RoleHeadMaster) {
        if (to.matched.some((record) => record.meta.RoleHeadMaster)) {
          checkHeadMaster(to, from, next);
        } else {
          next();
        }
      } else {
        next({
          path: "/login",
          query: {
            redirect: to.fullPath,
          },
        });
      }
    } else if (to.meta.login) {
      if (Cookies.get("token")) {
        next({
          path: "/",
          query: {
            redirect: to.fullPath,
          },
        });
      } else {
        next();
      }
    } else {
      next();
    }
  });
  return Router;
});
