<template>
  <q-page>
    <div>
      <div
        class="fit row justify-around items-center content-center"
        style="margin-top: 200px"
      >
        <!-- tozihe ghabliat haye in application va khobi haye an -->

        <div
          class="q-my-md col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 flex justify-center content-center align-center q-my-xl"
        >
          <div>
            <div class="text-h2">برنامه مدیریت مدرسه</div>
            <div
              class="q-mr-xl q-px-sm q-mt-md border q-ml-lg"
              style="width: 225px"
            >
              <div style="color: #777676; font-size: 18px">
                هدف این برنامه آسان تر نمودن دسترسی مدیر و معاون مدرسه به تمامی
                کلاس ها و دانش آموزان و برنامه کلاس آنهاست.دسترسی به این برنامه
                اکنون تنها برای مدیران و معاونان و معلمان موجود است.
              </div>
            </div>
          </div>
        </div>

        <div
          class="q-my-md col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 flex justify-center content-center align-center q-my-xl"
        >
          <img
            src="../assets/LandingPageImage.jpg"
            style="border-radius: 50%; width: 320px; height: 320px"
          />
        </div>
      </div>

      <div
        class="row justify-around items-center content-center"
        style="margin-top: 200px; margin-bottom: 200px"
      >
        <q-card
          class="col-xs-12 col-sm-12 col-md-5 col-lg-5 col-xl-5 q-mx-sm q-my-xl flex justify-center text-center"
          flat
          bordered
        >
          <q-icon name="android" size="325px" />

          <q-card-section>
            <div class="text-h5 q-mt-sm q-mb-xs">اندروید</div>
            <div class="text-grey">
              ورژن اندروید این برنامه برای راحتی کار کارمندان ساخته شده که
              بتوانند بدون نیاز به استفاده از کامپیوتر و یا سایت به راحتی از این
              برنامه استفاده کنند.
            </div>
            <q-btn class="q-ma-sm" flat color="primary" label="دانلود" />
          </q-card-section>
        </q-card>

        <q-card
          class="col-xs-12 col-sm-12 col-md-5 col-lg-5 col-xl-5 q-mx-sm q-my-xl flex justify-center text-center"
          flat
          bordered
        >
          <q-icon name="monitor" size="325px" />

          <q-card-section>
            <div class="text-h5 q-mt-sm q-mb-xs">کامپیوتر</div>
            <div class="text-grey">
              ورژن کامپیوتر این برنامه برای دیدن بهتر و راحتی کار با این برنامه
              ساخته شده که خود تیم سازنده به شما ورژن کامپیوتر را پیشنهاد می
              دهد.
            </div>
            <q-btn class="q-ma-sm" flat color="primary" label="دانلود" />
          </q-card-section>
        </q-card>
      </div>
    </div>

    <div class="row justify-center text-center">
      <div class="text-h4 col-12">روش استفاده</div>

      <q-card class="q-mx-xl q-my-md col-12" style="width: 600px">
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="login" label="صفحه ورود" />
          <q-tab name="dashboard" label="داشبورد" />
          <q-tab name="other" label="صفحات دیگر" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="login">
            <div class="text-h4 text-center">صفحه ورود</div>
            <div class="q-pt-md">
              به سایت مدیریت مدرستون خوش اومدین.به شما توسط مدیر مدرسه نام
              کاربری و رمز عبوری داده شده که باید با زدن دکمه ی ورود در بالای
              صفحه به اون صفحه برید و نام کاربری و رمز عبور رو وارد کنید. به
              صفحه ورود که وارد میشید میتونید قابلیت های این برنامه رو سمت چت
              تصویر بخونید و در سمت راست هم نام کاربری و رمز عبوری که مدیر مدرسه
              به شما داده رو وارد کنید و منتظر ورود باشید.
            </div>
          </q-tab-panel>

          <q-tab-panel name="dashboard">
            <div class="text-h4 text-center">داشبورد</div>
            توی صفحه ی داشبورد می توانید خلاصه ای از اطلاعات موجود توی این سایت
            رو ببینید و اگر مدیر یا معاون هستید میتونید ببینید دانش آموز یا
            کلاسی توی سایت کم هست و اگر هم کمه میتونید به راحتی کلاس رو اضافه
            کنید و با رفتن به بخش دانش اموزان(در صورتی که مدیر یا معلم باشید)
            اضافه کنید.
          </q-tab-panel>

          <q-tab-panel name="other">
            <div class="text-h4 text-center">صفحات دیگر</div>
            دوتا از صفحه هایی که نیاز بود توضیح بدیم بهتون رو توضیح دادیم.توی
            صفحات دیگه سایت میتونید دانش آموزی حذف یا اضافه بکنید (اگر مدیر یا
            معاون باشید) و دیدن صفحات دیگر بستگی به نقش شما در مدرسه دارد.در
            صورتی که شما معلم باشید به بسیاری از صفحان موجود دسترسی ندارید و
            مدیر و معاون به صفحان کاملا دسترسی دارند ولی با قابلیت های کمتر نسبت
            به نقش بالاتر. توی هر صفحه دکمه های زیادی موجوده که کارایی های همشون
            رو براتون نوشتیم و برای پیدا کردن دانش آموز یا کلاسی تنها کافیه به
            بخش کلاس ها یا دانش آموز ها برید.
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    return {
      tab: ref("login"),
    };
  },
};
</script>

<style scoped>
.border {
  border-left-style: solid;
  border-color: #444344;
}
</style>
