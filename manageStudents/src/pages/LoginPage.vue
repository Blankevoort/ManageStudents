<template>
  <q-page class="fit row justify-around items-center content-center">
    <div
      class="q-my-md col-sm-12 col-md-6 col-lg-6 col-xl-6 flex justify-center content-center align-center"
    >
      <q-form>
        <div class="text-h4 text-center">ورود کارکنان</div>
        <div class="q-mt-xl full-width">
          <div class="q-my-md" style="font-size: 18px">نام کاربری</div>
          <q-input
            class="text-wieght-bold"
            filled
            v-model="username"
            label="نام کاربری خود را وارد کنید"
            style="width: 350px; height: 68px"
          >
            <template v-slot:append> <q-icon name="person" /> </template
          ></q-input>
        </div>

        <div class="q-mt-md full-width">
          <div class="q-my-md" style="font-size: 18px">رمز ورود</div>
          <q-input
            filled
            v-model="password"
            label="رمز عبور خود را وارد کنید"
            style="width: 350px; height: 68px"
          >
            <template v-slot:append> <q-icon name="key" /> </template
          ></q-input>
        </div>

        <div class="q-mt-md">
          <q-btn
            label="ورود به پنل"
            type="submit"
            color="primary"
            style="width: 350px; height: 55px; font-size: 22px"
          />
        </div>
      </q-form>
    </div>
    <div
      class="q-my-md col-sm-12 col-md-6 col-lg-6 col-xl-6 flex justify-center content-center align-center gt-md"
    >
      <div>
        <div>
          <q-img
            class="q-ml-xl"
            src="/MainImages/School.png"
            style="width: 335px; height: 225px"
          />
          <div class="text-h4 text-center q-ml-md">نرم افزار مدیریت مدرسه</div>
        </div>
        <q-list class="q-ml-md"
          ><q-item clickable v-ripple>
            <q-item-section avatar>
              <q-avatar
                color="positive"
                text-color="white"
                font-size="25px"
                icon="done"
              />
            </q-item-section>

            <q-item-section
              >مدیریت دانش آموزان با قابلیت افزودن ، حذف کردن و ویرایش
              کردن</q-item-section
            > </q-item
          ><q-item clickable v-ripple>
            <q-item-section avatar>
              <q-avatar
                color="positive"
                text-color="white"
                font-size="25px"
                icon="done"
              />
            </q-item-section>

            <q-item-section
              >دسترسی های مختلف مدیر ، معلم و معاونین</q-item-section
            > </q-item
          ><q-item clickable v-ripple>
            <q-item-section avatar>
              <q-avatar
                color="positive"
                text-color="white"
                font-size="25px"
                icon="done"
              />
            </q-item-section>

            <q-item-section
              >قابلیت تنظیم برنامه های هفتگی کلاس ها</q-item-section
            > </q-item
          ><q-item clickable v-ripple>
            <q-item-section avatar>
              <q-avatar
                color="positive"
                text-color="white"
                font-size="25px"
                icon="done"
              />
            </q-item-section>

            <q-item-section>دسترسی مدیر به اطلاعات دانش آموزان</q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
    <div
      class="q-my-md col-sm-12 flex justify-center content-center align-center lt-md"
    >
      <div>
        <div>
          <q-img
            class="q-ml-md"
            src="/MainImages/School.png"
            style="width: 335px; height: 225px"
          />
          <div class="text-h4 text-center">نرم افزار مدیریت مدرسه</div>
        </div>
        <q-list class="q-ml-md"
          ><q-item clickable v-ripple>
            <q-item-section avatar>
              <q-avatar
                color="positive"
                text-color="white"
                font-size="25px"
                icon="done"
              />
            </q-item-section>

            <q-item-section
              >مدیریت دانش آموزان با قابلیت افزودن ، حذف کردن و ویرایش
              کردن</q-item-section
            > </q-item
          ><q-item clickable v-ripple>
            <q-item-section avatar>
              <q-avatar
                color="positive"
                text-color="white"
                font-size="25px"
                icon="done"
              />
            </q-item-section>

            <q-item-section
              >دسترسی های مختلف مدیر ، معلم و معاونین</q-item-section
            > </q-item
          ><q-item clickable v-ripple>
            <q-item-section avatar>
              <q-avatar
                color="positive"
                text-color="white"
                font-size="25px"
                icon="done"
              />
            </q-item-section>

            <q-item-section
              >قابلیت تنظیم برنامه های هفتگی کلاس ها</q-item-section
            > </q-item
          ><q-item clickable v-ripple>
            <q-item-section avatar>
              <q-avatar
                color="positive"
                text-color="white"
                font-size="25px"
                icon="done"
              />
            </q-item-section>

            <q-item-section>دسترسی مدیر به اطلاعات دانش آموزان</q-item-section>
          </q-item>
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
            location.reload();
            $router.push("/panel")
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
