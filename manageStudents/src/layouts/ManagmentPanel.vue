<template>
  <q-layout view="hHh lpR lFr">
    <q-header
      :class="
        $q.dark.isActive
          ? 'bg-dark'
          : 'bg-primary' + 'flex justify-between content-center align-center'
      "
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

        <q-toggle
          v-model="darkMode"
          checked-icon="dark_mode"
          color="grey-10"
          unchecked-icon="light_mode"
          @click="toggleDarkMode"
        />

        <q-btn
          class="lt-sm"
          flat
          @click="drawer = !drawer"
          round
          dense
          icon="menu"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawer"
      show-if-above
      :mini="!drawer || miniState"
      @click.capture="drawerClick"
      :width="250"
      :breakpoint="500"
      :class="$q.dark.isActive ? 'bg-dark' : 'bg-grey-3'"
    >
      <div class="q-my-md row">
        <q-avatar class="col-12 q-mini-drawer-hide">
          <img
            src="https://cdn.quasar.dev/img/boy-avatar.png"
            style="width: 85px; height: 85px"
          />
        </q-avatar>
        <div class="col-12 text-center q-mt-md">{{ user.username }}</div>
      </div>

      <q-list class="q-my-md q-mx-sm" :horizontal-thumb-style="{ opacity: 0 }">
        <q-item to="/" clickable v-ripple>
          <q-item-section avatar>
            <q-icon
              :color="$q.dark.isActive ? 'white' : 'grey-9'"
              name="dashboard"
            />
          </q-item-section>

          <q-item-section>داشبورد</q-item-section>
        </q-item>

        <q-item to="/about" clickable v-ripple>
          <q-item-section avatar>
            <q-icon
              :color="$q.dark.isActive ? 'white' : 'grey-9'"
              name="help"
            />
          </q-item-section>

          <q-item-section>درباره ما</q-item-section>
        </q-item>
      </q-list>

      <q-separator inset />

      <q-list class="q-my-md q-mx-sm" :horizontal-thumb-style="{ opacity: 0 }">
        <q-item to="classes" class="q-my-sm" clickable v-ripple>
          <q-item-section avatar>
            <q-icon
              :color="$q.dark.isActive ? 'white' : 'grey-9'"
              name="folder_special"
            />
          </q-item-section>

          <q-item-section>کلاس ها</q-item-section>
        </q-item>

        <q-item to="students" class="q-my-sm" clickable v-ripple>
          <q-item-section avatar>
            <q-icon
              :color="$q.dark.isActive ? 'white' : 'grey-9'"
              name="backpack"
            />
          </q-item-section>

          <q-item-section>دانش آموزان</q-item-section>
        </q-item>

        <q-item to="users" class="q-my-sm" clickable v-ripple>
          <q-item-section avatar>
            <q-icon
              :color="$q.dark.isActive ? 'white' : 'grey-9'"
              name="person"
            />
          </q-item-section>

          <q-item-section>کارکنان</q-item-section>
        </q-item>
      </q-list>

      <div
        class="absolute-bottom q-ma-md flex justify-center content-center align-center"
      >
        <q-btn
          round
          unelevated
          color="secondary"
          icon="chevron_left"
          @click="miniState = true"
        />
      </div>

      <q-separator inset />

      <q-list class="q-my-md q-mx-sm" :horizontal-thumb-style="{ opacity: 0 }">
        <q-item class="q-my-sm bg-red-3" clickable v-ripple @click="logout">
          <q-item-section avatar>
            <q-icon
              :color="$q.dark.isActive ? 'white' : 'grey-9'"
              name="logout"
            />
          </q-item-section>

          <q-item-section>خروج از حساب</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

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
    const miniState = ref(false);

    const $q = useQuasar();
    const darkMode = ref(false);
    const dark = ref(localStorage.getItem("dark"));

    const user = ref([]);

    function toggleDarkMode() {
      if ($q.dark.isActive) {
        $q.dark.set(false);
        localStorage.removeItem("dark");
      } else {
        $q.dark.set(true);
        localStorage.setItem("dark", $q.dark.mode);
      }
    }

    function checkDark() {
      if (dark.value) {
        $q.dark.set(true);
        darkMode.value = true;
      } else {
        $q.dark.set(false);
        darkMode.value = false;
      }
    }

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
        });
    }

    // Function logout user

    function logout() {
      api
        .post("auth/token/logout/", {
          headers: {
            Authorization: "Token " + $q.cookies.get("token"),
          },
        })
        .then($q.cookies.remove("token"))
        .then(location.reload());
    }

    onBeforeMount(() => {
      getUser();
      checkDark();
    });

    return {
      user,
      logout,
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
