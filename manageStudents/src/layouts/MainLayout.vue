<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="bg-primary">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="/MainImages/logo.png" />
          </q-avatar>
          <span class="q-px-sm">شهیدان منا</span>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref, onBeforeMount } from "vue";
import { api } from "src/boot/axios";

import { useQuasar, Cookies } from "quasar";

export default {
  setup() {
    // Taarife zarf ha

    const $q = useQuasar();
    const toggleLeftDrawer = ref(false);

    const user = ref([]);
    const loggedin = ref(false);

    // Gereftane User as backend

    function getUser() {
      api
        .get("auth/users/me/", {
          headers: {
            Authorization: "Token " + $q.cookies.get("token"),
          },
        })
        .then((r) => {
          user.value = r.data;
          loggedin.value = true;
        });
    }

    // Function logout user

    function logout() {
      api
        .post("auth/token/logout/")
        .then($q.cookies.remove("token"))
        .then(location.reload());
    }

    onBeforeMount(() => {
      getUser();
    });

    return {
      user,
      loggedin,
      logout,
      toggleLeftDrawer,
      ToggleLeftDrawer() {
        toggleLeftDrawer.value = !toggleLeftDrawer.value;
      },
    };
  },
};
</script>

<!-- in style ha tanha dar in file ghabele dastresi mibashand -->

<style scoped>
.footer-img {
  height: 166px !important;
}

.footer-margin {
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 40px;
}

#q-app > div > footer {
  position: absolute;
}
</style>
