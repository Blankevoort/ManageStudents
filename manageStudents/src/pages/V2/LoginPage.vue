<template>
  <!-- tamami design haye in safhe dar vasate an gharar migirand -->
  <q-page class="fit row justify-around items-center content-center">
    <div
      class="q-my-md col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 flex justify-center content-center align-center"
    >
      <!-- form vorode karkonan -->

      <q-form @submit="Login">
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

        <!-- dokmeie vorode karkonan -->

        <div class="q-mt-md">
          <q-btn
            label="ورود به پنل"
            type="submit"
            color="primary"
            style="width: 350px; height: 55px; font-size: 22px"
          />
        </div>
      </q-form>
      <div class="q-my-md text-negative" v-if="error">
        {{ error }}
      </div>
    </div>

    <!-- tozihe ghabliat haye in application va khobi haye an -->

    <!-- in design dar dastgah haye bozorg tar neshan dade mishavad -->

    <div
      class="q-my-md col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 flex justify-center content-center align-center gt-sm"
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

    <!-- in design dar dastgah haye besiat kochak manande mobile neshan dade mishavad -->

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
// baraye tarife zarf ha va vasl shodan be backend bayad in gozine ha tarif shavand
import { ref, onBeforeMount, computed } from "vue";
import { api } from "src/boot/axios";

import { useRouter } from "vue-router";
import { useQuasar, Cookies } from "quasar";

export default {
  setup() {
    // tarife zard haye morede niaz
    const $q = useQuasar();
    const $router = useRouter();
    const error = ref();

    const username = ref();
    const password = ref();

    // Tarife dastorat

    // dastore vorod be panel

    function Login() {
      api
        .post("auth/token/login/", {
          username: username.value,
          password: password.value,
        })
        .then((r) => {
          if (r.data.auth_token) {
            $q.cookies.set("token", r.data.auth_token);
            $router.push("/");
          }
        })
        .catch((err) => {
          console.log(err.response.data.non_field_errors);
          error.value = err.response.data.non_field_errors;
        });
    }

    // tarife zarf ha va dastorat

    return {
      username,
      password,
      error,
      Login,
    };
  },
};
</script>
