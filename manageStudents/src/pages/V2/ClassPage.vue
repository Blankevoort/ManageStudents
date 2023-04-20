<template>
  <q-page class="q-mx-md">
    <div class="text-h5 q-py-md">کلاس 902</div>

    <div>
      <q-card flat bordered>
        <q-markup-table>
          <thead>
            <tr>
              <th class="text-left text-grey-6">روز</th>
              <th class="text-right text-grey-6">زنگ اول</th>
              <th class="text-right text-grey-6">زنگ دوم</th>
              <th class="text-right text-grey-6">زنگ سوم</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="text-left text-grey-6">شنبه</td>
              <td class="text-right">ریاضی</td>
              <td class="text-right">آمادگی</td>
              <td class="text-right">قرآن</td>
            </tr>
            <tr>
              <td class="text-left text-grey-6">یکشنبه</td>
              <td class="text-right">علوم</td>
              <td class="text-right">اجتماعی</td>
              <td class="text-right">علوم/اجتماعی</td>
            </tr>
            <tr>
              <td class="text-left text-grey-6">دوشنبه</td>
              <td class="text-right">زبان انگلیسی</td>
              <td class="text-right">عربی</td>
              <td class="text-right">کار و فناوری</td>
            </tr>
            <tr>
              <td class="text-left text-grey-6">سه شنبه</td>
              <td class="text-right">ریاضی</td>
              <td class="text-right">ورزش</td>
              <td class="text-right">هنر</td>
            </tr>
            <tr>
              <td class="text-left text-grey-6">چهارشنبه</td>
              <td class="text-right">پیام های آسمانی</td>
              <td class="text-right">فارسی</td>
              <td class="text-right">نگارش</td>
            </tr>
          </tbody>
        </q-markup-table>
      </q-card>
    </div>
    <q-list>
      <q-item
        class="col-12 q-my-sm full-width"
        clickable
        v-ripple
        @click="setCurrent()"
      >
        <q-item-section avatar>
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
        </q-item-section>
        <q-item-section
          >نام دانش آموز
          <q-item-label caption
            >شماره تلفن: 09379608155</q-item-label
          ></q-item-section
        >
        <q-item-section side>
          <q-item-label>
            <q-btn flat dense round icon="more_vert" to="student"></q-btn>
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
    <q-separator class="q-my-md" />
  </q-page>
</template>

<script>
import { ref, onBeforeMount, computed } from "vue";
import { api } from "src/boot/axios";

import { useRouter } from "vue-router";
import { useQuasar, Cookies } from "quasar";

import { currentStudentID } from "src/stores/StudentId";
import { storeToRefs } from "pinia";

export default {
  setup() {
    const $q = useQuasar();
    const Classes = ref();
    const user = ref([]);

    const store = currentStudentID();
    const current = computed(() => store.current);
    const setCurrent = (data) => store.setCurrent(data);
    const showCurrent = computed(() => store.showCurrent);
    const storeStudentID = currentStudentID();

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
