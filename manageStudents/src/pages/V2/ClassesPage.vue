<template>
  <q-page class="q-mx-xl">
    <div>
      <div class="text-h4 q-py-md q-mb-lg">تمامی کلاس ها</div>

      <div>
        <q-list>
          <q-item clickable v-ripple @click="setCurrent()">
            <q-item-section>کلاس 902</q-item-section>
            <q-item-section side>
              <q-item-label>
                <q-btn flat dense round icon="description" to="edit"></q-btn>
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-separator class="q-my-md" />
          <q-item clickable v-ripple @click="setCurrent()">
            <q-item-section>کلاس 902</q-item-section>
            <q-item-section side>
              <q-item-label>
                <q-btn flat dense round icon="description" to="edit"></q-btn>
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-separator class="q-my-md" />
          <q-item clickable v-ripple @click="setCurrent()">
            <q-item-section>کلاس 902</q-item-section>
            <q-item-section side>
              <q-item-label>
                <q-btn flat dense round icon="description" to="edit"></q-btn>
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-separator class="q-my-md" />
          <q-item clickable v-ripple @click="setCurrent()">
            <q-item-section>کلاس 902</q-item-section>
            <q-item-section side>
              <q-item-label>
                <q-btn flat dense round icon="description" to="edit"></q-btn>
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-separator class="q-my-md" />
        </q-list>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref, onBeforeMount, computed } from "vue";
import { api } from "src/boot/axios";

import { useRouter } from "vue-router";
import { useQuasar, Cookies } from "quasar";

import { currentClassID } from "src/stores/classID";
import { storeToRefs } from "pinia";

export default {
  setup() {
    const $q = useQuasar();
    const Classes = ref();
    const user = ref([]);

    const store = currentClassID();
    const current = computed(() => store.current);
    const setCurrent = (data) => store.setCurrent(data);
    const showCurrent = computed(() => store.showCurrent);
    const storeClassID = currentClassID();

    const loggedIn = ref(false);
    const username = ref();
    const password = ref();
    const addClass = ref(false);

    const classId = ref();

    function AddNewClass() {
      var id = {
        class_id: classId.value,
      };
      api
        .post("classes/", id, {
          headers: {
            Authorization: "Token " + $q.cookies.get("token"),
          },
        })
        .then((r) => {
          addClass.value = false;
          location.reload();
        });
    }

    function RemoveClass(index) {
      api
        .delete("classes/" + Classes.value[index].class_id + "/", {
          headers: {
            Authorization: "Token " + $q.cookies.get("token"),
          },
        })
        .then((r) => {
          location.reload();
        });
    }

    function Login() {
      api
        .post("auth/token/login/", {
          username: username.value,
          password: password.value,
        })
        .then((r) => {
          if (r.data.auth_token) {
            $q.cookies.set("token", r.data.auth_token);
            loggedIn.value = false;
            location.reload();
          }
        });
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
          loggedIn.value = true;
        });
    }

    function getClasses() {
      api
        .get("classes/", {
          headers: {
            Authorization: "Token " + $q.cookies.get("token"),
          },
        })
        .then((r) => {
          Classes.value = r.data;
        });
    }

    onBeforeMount(() => {
      getUser();
      getClasses();
    });

    return {
      classId,
      username,
      user,
      password,
      loggedIn,
      confirm,
      Classes,
      getUser,
      addClass,
      AddNewClass,
      RemoveClass,
      Login,
      setCurrent,
    };
  },
};
</script>
