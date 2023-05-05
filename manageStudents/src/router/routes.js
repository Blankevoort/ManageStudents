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
      RoleAll: true,
    },
  },
  {
    path: "/classes",
    component: () => import("layouts/ManagmentPanel.vue"),
    children: [
      { path: "", component: () => import("src/pages/V2/ClassesPage.vue") },
    ],
    meta: {
      RoleAll: true,
    },
  },
  {
    path: "/students",
    component: () => import("layouts/ManagmentPanel.vue"),
    children: [
      { path: "", component: () => import("src/pages/V2/StudentsPage.vue") },
    ],
    meta: {
      RoleHeadMaster: true,
      RoleDeputy: true,
    },
  },
  {
    path: "/class/:id",
    component: () => import("layouts/ManagmentPanel.vue"),
    children: [
      { path: "", component: () => import("src/pages/V2/ClassPage.vue") },
    ],
    meta: {
      RoleHeadMaster: true,
      RoleDeputy: true,
    },
  },
  {
    path: "/student/:id",
    component: () => import("layouts/ManagmentPanel.vue"),
    children: [
      { path: "", component: () => import("src/pages/V2/StudentPage.vue") },
    ],
    meta: {
      RoleHeadMaster: true,
      RoleDeputy: true,
    },
  },
  {
    path: "/users",
    component: () => import("layouts/ManagmentPanel.vue"),
    children: [
      { path: "", component: () => import("src/pages/V2/UsersPage.vue") },
    ],
    meta: {
      RoleHeadMaster: true,
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
