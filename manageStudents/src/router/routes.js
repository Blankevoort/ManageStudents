const routes = [
  {
    path: "/login",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("src/pages/V2/LoginPage.vue") },
    ],
    meta: {
      login: true,
    },
  },
  {
    path: "/",
    component: () => import("layouts/ManagmentPanel.vue"),
    children: [
      { path: "", component: () => import("src/pages/V2/DashboardPage.vue") },
    ],
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/classes",
    component: () => import("layouts/ManagmentPanel.vue"),
    children: [
      { path: "", component: () => import("src/pages/V2/ClassesPage.vue") },
    ],
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/students",
    component: () => import("layouts/ManagmentPanel.vue"),
    children: [
      { path: "", component: () => import("src/pages/V2/StudentsPage.vue") },
    ],
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/class/:id",
    component: () => import("layouts/ManagmentPanel.vue"),
    children: [
      { path: "", component: () => import("src/pages/V2/ClassPage.vue") },
    ],
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/student/:id",
    component: () => import("layouts/ManagmentPanel.vue"),
    children: [
      { path: "", component: () => import("src/pages/V2/StudentPage.vue") },
    ],
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/users",
    component: () => import("layouts/ManagmentPanel.vue"),
    children: [
      { path: "", component: () => import("src/pages/V2/UsersPage.vue") },
    ],
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/about",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("src/pages/V2/AboutPage.vue") },
    ],
  },

  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
