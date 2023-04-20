const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
  },
  {
    path: "/class",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/ClassesPage.vue") }],
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/about",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("src/pages/AboutUsPage.vue") },
    ],
  },
  {
    path: "/login",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("src/pages/V2/LoginPage.vue") },
    ],
  },
  {
    path: "/dashboard",
    component: () => import("layouts/ManagmentPanel.vue"),
    children: [
      { path: "", component: () => import("src/pages/V2/DashboardPage.vue") },
    ],
  },
  {
    path: "/classes",
    component: () => import("layouts/ManagmentPanel.vue"),
    children: [
      { path: "", component: () => import("src/pages/V2/ClassesPage.vue") },
    ],
  },
  {
    path: "/students",
    component: () => import("layouts/ManagmentPanel.vue"),
    children: [
      { path: "", component: () => import("src/pages/V2/StudentsPage.vue") },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
