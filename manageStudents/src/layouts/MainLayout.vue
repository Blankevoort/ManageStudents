<template>
  <q-layout view="hHh lpR fFf" class="text">
    <q-header
      class="flex justify-between content-center align-center"
      style="background-color: #f19181"
    >
      <q-toolbar>
        <q-toolbar-title>
          <q-btn flat to="/">
            <q-avatar>
              <img src="../assets/Logo.png" />
            </q-avatar>
            <span class="q-px-sm text-h5">شهدای منا</span>
          </q-btn>
        </q-toolbar-title>

        <div v-if="!isLoading">
          <q-btn v-if="!userloggedIn" flat label="ورود" to="/login" />
          <q-btn v-else flat label="داشبورد" to="/dashboard" />
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref, onMounted } from "vue";
import { api } from "src/boot/axios";

import { useQuasar, Cookies, Dark } from "quasar";

export default {
  setup() {
    // Taarife zarf ha
    const miniState = ref(false);

    const $q = useQuasar();

    const user = ref([]);
    const userloggedIn = ref(false);
    const isLoading = ref(true);

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

    // in dastor ghabl az bala amadane webapp in dastorat ro ejra mikone

    onMounted(() => {
      getUser();

      setTimeout(() => {
        isLoading.value = false;
      }, 2000);
    });

    return {
      isLoading,
      user,
      userloggedIn,

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
.fixed,
.fixed-full,
.fullscreen,
.fixed-center,
.fixed-bottom,
.fixed-left,
.fixed-right,
.fixed-top,
.fixed-top-left,
.fixed-top-right,
.fixed-bottom-left,
.fixed-bottom-right {
  position: absolute;
}

.footer-margin {
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 40px;
}

#q-app > div > footer {
  position: absolute;
}

.text {
  color: #eceaea;
}
</style>
