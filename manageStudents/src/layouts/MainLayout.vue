<template>
  <q-layout view="hHh lpR fFf">
    <q-header
      class="bg-primary flex justify-between content-center align-center"
    >
      <q-toolbar>
        <q-toolbar-title>
          <q-btn flat to="/">
            <q-avatar>
              <img src="/MainImages/logo.png" />
            </q-avatar>
            <span class="q-px-sm text-h5">شهدای منا</span>
          </q-btn>
        </q-toolbar-title>

        <q-btn v-if="!userloggedIn" flat label="ورود" to="/login" />
        <q-btn v-else flat label="داشبورد" to="/dashboard" />
        <q-toggle
          v-model="darkMode"
          checked-icon="dark_mode"
          color="grey-9"
          unchecked-icon="light_mode"
          @click="toggleDarkMode"
        />
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

import { useQuasar, Cookies, Dark } from "quasar";

export default {
  setup() {
    // Taarife zarf ha
    const miniState = ref(false);

    const $q = useQuasar();
    const darkMode = ref(false);
    const dark = ref(localStorage.getItem("dark"));

    const user = ref([]);
    const userloggedIn = ref(false);

    // function ha

    function toggleDarkMode() {
      if ($q.dark.isActive) {
        $q.dark.set(false);
        localStorage.removeItem("dark");
      } else {
        $q.dark.set(true);
        localStorage.setItem("dark", $q.dark.mode);
      }
    }

    // Function baraye check kardane localstorage

    function checkDark() {
      if (dark.value) {
        $q.dark.set(true);
        darkMode.value = true;
      } else {
        $q.dark.set(false);
        darkMode.value = false;
      }
    }

    function getUser() {
      api
        .get("auth/users/me/", {
          headers: {
            Authorization: "Token " + $q.cookies.get("token"),
          },
        })
        .then((r) => {
          user.value = r.data;
          userloggedIn.value = true;
        });
    }

    onBeforeMount(() => {
      getUser();
      checkDark();
    });

    return {
      user,
      userloggedIn,
      toggleDarkMode,
      darkMode,
      dark,
      checkDark,

      drawer: ref(false),
      miniState,

      drawerClick(e) {
        if (miniState.value) {
          miniState.value = false;
          e.stopPropagation();
        }
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
