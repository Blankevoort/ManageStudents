const routes = [
  {
    path: "/login",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("src/pages/LoginPage.vue") },
    ],
    meta: {
      login: true,
    },
  },
  {
    path: "/dashboard",
    component: () => import("layouts/ManagmentPanel.vue"),
    children: [
      { path: "", component: () => import("src/pages/DashboardPage.vue") },
    ],
    meta: {
      requireAuth: true,
      headmasterAccess: true,
      deputyAccess: true,
      teacherAccess: true,
    },
  },
  {
    path: "/classes",
    component: () => import("layouts/ManagmentPanel.vue"),
    children: [
      { path: "", component: () => import("src/pages/ClassesPage.vue") },
    ],
    meta: {
      requireAuth: true,
      teacherAccess: true,
      deputyAccess: true,
      headmasterAccess: true,
    },
  },
  {
    path: "/students",
    component: () => import("layouts/ManagmentPanel.vue"),
    children: [
      { path: "", component: () => import("src/pages/StudentsPage.vue") },
    ],
    meta: {
      requireAuth: true,
      headmasterAccess: true,
      deputyAccess: true,
    },
  },
  {
    path: "/class/:id",
    component: () => import("layouts/ManagmentPanel.vue"),
    children: [
      { path: "", component: () => import("src/pages/ClassPage.vue") },
    ],
    meta: {
      requireAuth: true,
      teacherAccess: true,
      deputyAccess: true,
      headmasterAccess: true,
    },
  },
  {
    path: "/student/:id",
    component: () => import("layouts/ManagmentPanel.vue"),
    children: [
      { path: "", component: () => import("src/pages/StudentPage.vue") },
    ],
    meta: {
      requireAuth: true,
      headmasterAccess: true,
      deputyAccess: true,
    },
  },
  {
    path: "/users",
    component: () => import("layouts/ManagmentPanel.vue"),
    children: [
      { path: "", component: () => import("src/pages/UsersPage.vue") },
    ],
    meta: {
      requireAuth: true,
      headmasterAccess: true,
      deputyAccess: true,
    },
  },
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("src/pages/LandingPage.vue") },
    ],
  },

  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
