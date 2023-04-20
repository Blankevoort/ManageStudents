const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
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
  {
    path: "/class",
    component: () => import("layouts/ManagmentPanel.vue"),
    children: [
      { path: "", component: () => import("src/pages/V2/ClassPage.vue") },
    ],
  },
  {
    path: "/student",
    component: () => import("layouts/ManagmentPanel.vue"),
    children: [
      { path: "", component: () => import("src/pages/V2/StudentPage.vue") },
    ],
  },
  {
    path: "/about",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("src/pages/V2/AboutPage.vue") },
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
