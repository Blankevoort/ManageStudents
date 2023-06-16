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
            autofocus
            class="text-wieght-bold"
            filled
            :rules="[(val) => !!val || 'نام کاربری اجباری است']"
            v-model="identity"
            label="نام کاربری خود را وارد کنید"
            style="width: 350px; height: 68px"
          >
            <template v-slot:append> <q-icon name="person" /> </template
          ></q-input>
        </div>

        <div class="q-mt-md full-width">
          <div class="q-my-md" style="font-size: 18px">رمز ورود</div>
          <q-input
            v-model="password"
            filled
            :rules="[(val) => !!val || 'رمز عبور اجباری است']"
            :type="isPwd ? 'password' : 'text'"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
        </div>

        <!-- dokmeie vorode karkonan -->

        <div class="q-mt-md">
          <q-btn
            label="ورود به پنل"
            type="submit"
            color="primary"
            style="width: 350px; height: 55px; font-size: 22px"
            @click="Login()"
          />

          <q-dialog v-if="!destroy" v-model="wait" seamless position="bottom">
            <q-card class="bg-positive full-width">
              <div class="text-h5 text-center q-my-md">
                لطفا تا پایان عملیات منتظر بمانید.
              </div>
            </q-card>
          </q-dialog>
        </div>
        <div class="text-red-5 text-center q-mt-md">
          {{ error }}
        </div>
      </q-form>
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

    const identity = ref();
    const password = ref();

    const error = ref();

    const wait = ref(false);
    const destroy = ref(false);

    // Tarife dastorat

    // dastore vorod be panel

    function Login() {
      wait.value = true;
      api
        .post("auth/token/login/", {
          identity: identity.value,
          password: password.value,
        })
        .then((r) => {
          if (r.data.auth_token) {
            $q.cookies.set("token", r.data.auth_token);
            $router.push("/dashboard");
          }
        })
        .catch((err) => {
          if (err.response) {
            destroy.value = true;
            if (err.response.status === 400) {
              error.value = "با اطلاعات وارد شده نمیتوان وارد شد.";
            } else if (err.response.status === 401) {
              error.value = "اطلاعات وارد شده معتبر نیستند.";
            } else if (err.response.status === 403) {
              error.value = "دسترسی غیرمجاز.";
            } else {
              error.value = "خطای سمت سرور: درخواست نامعتبر.";
            }
          } else if (err.request) {
            error.value = "خطای سمت سرور: درخواست ارسال نشد.";
          } else {
            error.value = "خطای سمت سرور: خطای نامشخص رخ داد.";
          }
        });
    }

    // tarife zarf ha va dastorat

    return {
      identity,
      password,
      error,
      wait,
      destroy,
      isPwd: ref(true),
      Login,
    };
  },
};
</script>
