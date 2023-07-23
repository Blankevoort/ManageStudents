<template>
  <!-- in page ba kami fasele az do samte rast o chap gharar migire -->
  <q-page class="q-mx-md">
    <div class="text-h5 q-py-md q-mb-lg">
      تمامی کارکنان

      <!-- dokme baraye afozdane karkonane webapplication -->

      <q-btn
        class="float-right"
        color="accent"
        icon="add"
        label="افزودن کارکن"
        @click="addUser = true"
        v-if="user.type != 'معاون'"
      />
    </div>

    <!-- pop up baraye vared kardane etelaate karkonan -->

    <q-dialog v-model="addUser">
      <div class="row">
        <q-card square class="shadow-24" style="width: 300px; height: 495px">
          <q-card-section class="bg-primary">
            <h4 class="text-h5 text-white q-my-md">افزودن کارکن</h4>
            <div
              class="absolute-bottom-right q-pr-md"
              style="transform: translateY(50%)"
            ></div>
          </q-card-section>
          <q-card-section>
            <q-form class="q-px-sm q-pt-xl">
              <q-input
                square
                clearable
                v-model="username"
                label="نام کاربری"
                autofocus
                :rules="[(val) => !!val || 'نام کاربری کارکن اجباری است']"
              >
                <template v-slot:prepend>
                  <q-icon name="person" />
                </template>
              </q-input>
              <q-input
                square
                clearable
                v-model="password"
                label="رمز عبور"
                autofocus
                :rules="[(val) => !!val || ' رمز عبور کارکن اجباری است']"
              >
                <template v-slot:prepend>
                  <q-icon name="enhanced_encryption" />
                </template>
              </q-input>

              <q-select
                class="col-xs-12 col-sm-12 col-md-6 col-6 q-pa-md"
                v-model="discipline"
                label="انتخاب نقش"
                :options="userRole"
                filled
                emit-value
              ></q-select>
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-lg flex justify-center">
            <q-btn
              unelevated
              size="lg"
              :color="$q.dark.isActive ? 'dark' : 'grey-9'"
              class="full-width"
              label="افزودن"
              @click="AddNewUser()"
            />
          </q-card-actions>
        </q-card>
      </div>
    </q-dialog>

    <!-- tamami in code ha baraye neshan dadane karkonan mibashad -->

    <div v-if="!isLoading">
      <q-list v-for="(user, index) in Users" :key="'classInfo-' + index + 1">
        <q-separator class="q-my-md" />

        <q-item class="col-12 q-my-sm full-width" clickable v-ripple>
          <q-item-section avatar>
            <q-avatar>
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
          </q-item-section>
          <q-item-section
            >{{ user.identity }}
            <q-item-label caption>نقش: {{ user.type }}</q-item-label>
          </q-item-section>
          <q-item-section
            @click="RemoveUser(index)"
            side
            v-if="(user.type = 'مدیر')"
          >
            <q-item-label>
              <q-btn color="red-5" unelevated>
                <q-icon left size="2em" name="delete" />
                <div>حذف کارکن</div>
              </q-btn>
            </q-item-label>
          </q-item-section>
        </q-item>

        <!-- in code baraye joda kardan va khat gozari beine list ha ast -->

        <q-separator class="q-my-md" />
      </q-list>
    </div>

    <div v-if="isLoading">
      <q-separator class="q-my-md" />

      <q-skeleton height="80px" class="col-12 full-width q-my-sm" />

      <q-separator class="q-my-md" />

      <q-separator class="q-my-md" />

      <q-skeleton height="80px" class="col-12 full-width q-my-sm" />

      <q-separator class="q-my-md" />

      <q-separator class="q-my-md" />

      <q-skeleton height="80px" class="col-12 full-width q-my-sm" />

      <q-separator class="q-my-md" />
    </div>
  </q-page>
</template>

<script>
// baraye tarife zarf ha va vasl shodan be backend bayad in gozine ha tarif shavand

import { ref, onBeforeMount, computed } from "vue";
import { api } from "src/boot/axios";

import { useQuasar } from "quasar";

export default {
  setup() {
    // tarife zard haye morede niaz

    const $q = useQuasar();
    const user = ref([]);
    const Users = ref([]);
    const addUser = ref(false);
    const error = ref();
    const isLoading = ref(true);
    const discipline = ref();
    const userRole = [
      { label: "مدیر", value: "H" },
      { label: "معاون", value: "S" },
      { label: "معلم", value: "T" },
    ];

    const username = ref();
    const password = ref();

    // Tarife dastorat

    // dastore hazf karkonan

    function RemoveUser(index) {
      api
        .delete("auth/users/" + Users.value[index].identity + "/", {
          headers: {
            Authorization: "Token " + $q.cookies.get("token"),
          },
        })
        .then((r) => {
          getUsers();
          getUser();
        });
    }

    // dastore afzodane karkonan

    function AddNewUser() {
      var data = {
        identity: username.value,
        password: password.value,
        type: discipline.value,
      };
      api
        .post("auth/users/", data, {
          headers: {
            Authorization: "Token " + $q.cookies.get("token"),
          },
        })
        .then((r) => {
          getUsers();
          getUser();
          addUser.value = false;
        })
        .catch((err) => {
          if (err.response) {
            if (err.response.status === 400) {
              error.value = "اطلاعات وارد شده معتبر نیستند.";
              triggerError();
            } else if (err.response.status === 401) {
              error.value = "اطلاعات وارد شده معتبر نیستند.";
              triggerError();
            } else if (err.response.status === 403) {
              error.value = "دسترسی غیرمجاز.";
            } else {
              error.value = "خطای سمت سرور: درخواست نامعتبر.";
              triggerError();
            }
          } else if (err.request) {
            error.value = "خطای سمت سرور: درخواست ارسال نشد.";
            triggerError();
          } else {
            error.value = "خطای سمت سرور: خطای نامشخص رخ داد.";
            triggerError();
          }
        });
    }

    // dastore gereftane karkonan

    function getUsers() {
      api
        .get("auth/users/", {
          headers: {
            Authorization: "Token " + $q.cookies.get("token"),
          },
        })
        .then((r) => {
          Users.value = r.data;
        });
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

    // in dastor ghabl az bala amadane webapp in dastorat ro ejra mikone

    onBeforeMount(() => {
      // dastore gereftane karkonan

      getUsers();

      // Gereftane User as backend

      getUser();

      setTimeout(() => {
        isLoading.value = false;
      }, 2000);
    });

    function triggerError() {
      $q.notify({
        position: "top-left",
        type: "negative",
        message: error.value,
        badgeStyle: "opacity: 0",
      });
    }

    // tarife zarf ha va dastorat

    return {
      userRole,
      discipline,
      isLoading,
      username,
      password,
      addUser,
      Users,
      error,
      user,
      AddNewUser,
      RemoveUser,
    };
  },
};
</script>
