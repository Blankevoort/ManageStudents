<template>
  <q-page>
    <div v-if="loggedIn">
      <q-img src="/MainImages/MainPageImage.png" />

      <div class="mx-default my-default">
        <q-btn
          color="accent"
          icon="add"
          label="افزودن کلاس"
          @click="addClass = true"
        />

        <!-- pop up baraye afzodane class ha ast -->

        <q-dialog v-model="addClass">
          <div class="row">
            <q-card
              square
              class="shadow-24"
              style="width: 300px; height: 325px"
            >
              <q-card-section class="bg-primary">
                <h4 class="text-h5 text-white q-my-md">افزودن کلاس</h4>
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
                    v-model.number="classId"
                    label="نام"
                  >
                    <template v-slot:prepend>
                      <q-icon name="badge" />
                    </template>
                  </q-input>
                </q-form>
              </q-card-section>
              <q-card-actions class="q-px-lg">
                <q-btn
                  unelevated
                  size="lg"
                  color="purple-4"
                  class="full-width text-white"
                  label="افزودن"
                  @click="AddNewClass()"
                />
              </q-card-actions>
            </q-card>
          </div>
        </q-dialog>
      </div>

      <!-- pop up baraye taghir dar class ha ast -->

      <q-dialog v-model="edit">
        <div class="row">
          <q-card square class="shadow-24" style="width: 300px; height: 325px">
            <q-card-section class="bg-primary">
              <h4 class="text-h5 text-white q-my-md">تغییر در کلاس</h4>
              <div
                class="absolute-bottom-right q-pr-md"
                style="transform: translateY(50%)"
              ></div>
            </q-card-section>
            <q-card-section>
              <q-form class="q-px-sm q-pt-xl">
                <q-input square clearable v-model.number="classId" label="نام">
                  <template v-slot:prepend>
                    <q-icon name="badge" />
                  </template>
                </q-input>
              </q-form>
            </q-card-section>
            <q-card-actions class="q-px-lg">
              <q-btn
                unelevated
                size="lg"
                color="purple-4"
                class="full-width text-white"
                label="تغییر"
                @click="EditClass()"
              />
            </q-card-actions>
          </q-card>
        </div>
      </q-dialog>

      <!-- in div baraye card class ha ast -->

      <div class="mx-default">
        <div
          class="my-default bg-secondary q-px-md text-white"
          v-for="classInfo in Classes"
          :key="classInfo.id"
        >
          <q-list style="max-width: 388px">
            <q-item class="q-py-md">
              <q-item-section @click="setCurrent(classInfo)">
                <q-item-label lines="1">
                  <span class="text-weight-medium"
                    >کلاس <span>{{ classInfo.class_id }}</span></span
                  >
                </q-item-label>

                <q-item-label caption class="text-grey" lines="1">
                  {{ classInfo.students_count }} دانش آموز
                </q-item-label>
              </q-item-section>

              <q-item-section side>
                <div class="q-gutter-xs text-white">
                  <q-btn
                    flat
                    dense
                    round
                    icon="delete"
                    @click="confirm(), setCurrentRemove(classInfo.class_id)"
                  ></q-btn>
                  <q-btn
                    flat
                    dense
                    round
                    icon="edit"
                    @click="edit = true, setCurrentRemove(classInfo.class_id)"
                  ></q-btn>
                </div>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </div>
    </div>

    <!-- safeie login baraye modiran -->

    <div
      class="bg-accent window-height window-width row justify-center items-center"
      v-else
    >
      <div class="column">
        <div class="row">
          <h5 class="text-h5 text-white q-my-md">شهیدان منا</h5>
        </div>
        <div class="row">
          <q-card square bordered class="q-pa-lg shadow-1">
            <q-card-section>
              <q-form class="q-gutter-md">
                <q-input
                  square
                  filled
                  clearable
                  v-model="username"
                  type="text"
                  label="username"
                />
                <q-input
                  square
                  filled
                  clearable
                  v-model="password"
                  type="password"
                  label="password"
                />
              </q-form>
            </q-card-section>
            <q-card-actions class="q-px-md">
              <q-btn
                unelevated
                color="accent"
                size="lg"
                class="full-width"
                label="Login"
                @click="Login()"
              />
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref, onBeforeMount, computed } from "vue";
import { api } from "src/boot/axios";

import { useRouter } from "vue-router";
import { useQuasar, Cookies } from "quasar";

import { removeClass } from "src/stores/currentID";
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

    const storeRemove = removeClass();
    const remove = computed(() => storeRemove.remove);
    const setCurrentRemove = (data) => storeRemove.setCurrentRemove(data);
    const showCurrentRemove = computed(() => storeRemove.showCurrent);
    const storeRemoveID = removeClass();

    const loggedIn = ref(false);
    const username = ref();
    const password = ref();
    const edit = ref(false);
    const addClass = ref(false);

    const classId = ref();

    function confirm() {
      $q.dialog({
        title: "تایید",
        message: "آیا مطمعن هستید که می خواهید این کلاس را حذف کنید؟",
        cancel: true,
        persistent: false,
      }).onOk(() => {
        RemoveClass();
      });
    }

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

    function EditClass() {
      var editID = {
        class_id: classId.value,
      };
      var editId = {
        class_id: remove.value,
      };
      api.put("classes/" + { editId } + "/", editID, {
        headers: {
          Authorization: "Token " + $q.cookies.get("token"),
        },
      });
    }

    function RemoveClass() {
      var classid = {
        class_id: remove.value,
      };
      api.delete("classes/" + { classid } + "/", {
        headers: {
          Authorization: "Token " + $q.cookies.get("token"),
        },
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
      EditClass,
      classId,
      username,
      user,
      password,
      loggedIn,
      confirm,
      edit,
      Classes,
      getUser,
      addClass,
      AddNewClass,
      RemoveClass,
      Login,
      setCurrent,
      setCurrentRemove,
    };
  },
};
</script>
