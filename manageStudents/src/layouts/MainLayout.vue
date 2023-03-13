<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="bg-primary text-white">
      <div class="row justify-between">
        <q-toolbar>
          <q-btn
            class="col-1"
            dense
            flat
            round
            icon="menu"
            @click="ToggleLeftDrawer"
          />

          <q-toolbar-title class="col-6 offset-5">
            <span class="q-px-sm">شهیدان منا</span>
            <q-avatar>
              <img src="/MainImages/Logo.png" />
            </q-avatar>
          </q-toolbar-title>
        </q-toolbar>
      </div>
    </q-header>

    <q-drawer v-model="toggleLeftDrawer" side="left" behavior="mobile">
      <!-- drawer content -->
      <q-scroll-area
        style="
          height: calc(100% - 150px);
          margin-top: 150px;
          border-right: 1px solid #ddd;
        "
      >
        <q-list padding class="q-ml-md">
          <q-item clickable>
            <q-item-section>
              <q-btn flat to="/" class="font-big">صفحه اصلی</q-btn>
            </q-item-section>
          </q-item>

          <q-item clickable>
            <q-item-section>
              <q-btn flat to="/about" class="font-big">درباره ما</q-btn>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>

      <div class="text-center">
        <q-img
          class="absolute-top"
          src="https://cdn.quasar.dev/img/material.png"
          style="height: 150px"
        >
          <div class="absolute-bottom bg-transparent">
            <q-avatar size="56px" class="q-mb-sm">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
            <div class="text-weight-bold">{{ user.username }}</div>
          </div>
        </q-img>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="bg-transparent">
      <q-img src="/MainImages/Footer.png" class="position-relative footer-img">
        <div class="bg-transparent row items-center q-mt-xl footer-margin">
          <div class="col-6">
            <q-list>
              <q-item clickable>
                <q-item-section>
                  <q-btn flat to="/" class="font-small">صفحه اصلی</q-btn>
                </q-item-section>
              </q-item>

              <q-item clickable>
                <q-item-section>
                  <q-btn flat to="/about" class="font-small">درباره ما</q-btn>
                </q-item-section>
              </q-item>
            </q-list>
          </div>

          <div class="col-6">
            این برنامه توسط دانش آموزان شهیدان منا و تنها برای استفاده ی مدیران
            ساخته شده است.
          </div>
        </div>
      </q-img>
    </q-footer>
  </q-layout>
</template>

<script>
import { ref, onBeforeMount } from "vue";
import { api } from "src/boot/axios";

import { useQuasar, Cookies } from "quasar";

export default {
  setup() {
    const $q = useQuasar();
    const toggleLeftDrawer = ref(false);

    const user = ref([]);

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
</style>
