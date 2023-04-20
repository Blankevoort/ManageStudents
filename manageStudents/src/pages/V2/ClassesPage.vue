<template>
  <q-page class="q-mx-xl">
    <div>
      <div class="text-h4 q-my-md q-mb-lg">تمامی کلاس ها</div>

      <div class="row justify-around align-center content-center items-center">
        <div class="text-h5 q-my-lg col-12 text-center">کلاس 902</div>
        <div class="col-6">
          <q-card flat bordered>
            <q-markup-table>
              <thead>
                <tr>
                  <th class="text-left">روز</th>
                  <th class="text-right">زنگ اول</th>
                  <th class="text-right">زنگ دوم</th>
                  <th class="text-right">زنگ سوم</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="text-left">شنبه</td>
                  <td class="text-right">ریاضی</td>
                  <td class="text-right">آمادگی</td>
                  <td class="text-right">قرآن</td>
                </tr>
                <tr>
                  <td class="text-left">یکشنبه</td>
                  <td class="text-right">علوم</td>
                  <td class="text-right">اجتماعی</td>
                  <td class="text-right">علوم/اجتماعی</td>
                </tr>
                <tr>
                  <td class="text-left">دوشنبه</td>
                  <td class="text-right">زبان انگلیسی</td>
                  <td class="text-right">عربی</td>
                  <td class="text-right">کار و فناوری</td>
                </tr>
                <tr>
                  <td class="text-left">سه شنبه</td>
                  <td class="text-right">ریاضی</td>
                  <td class="text-right">ورزش</td>
                  <td class="text-right">هنر</td>
                </tr>
                <tr>
                  <td class="text-left">چهارشنبه</td>
                  <td class="text-right">پیام های آسمانی</td>
                  <td class="text-right">فارسی</td>
                  <td class="text-right">نگارش</td>
                </tr>
              </tbody>
            </q-markup-table>
          </q-card>
        </div>
        <q-btn-dropdown
          style="width: 350px; height: 50px"
          class="col-6 q-my-sm"
          align="left"
          label="کلاس 902"
        >
          <q-list>
            <q-item clickable v-ripple @click="setCurrent()">
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
                  <q-btn flat dense round icon="more_vert" to="edit"></q-btn>
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </div>

      <q-separator class="q-my-lg" />
    </div>
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
