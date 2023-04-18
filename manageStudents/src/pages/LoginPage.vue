<template>
  <q-page class="fit row justify-around items-center content-center">
    <div class="col-6 flex justify-center">
      <q-form>
        <div class="text-h4 text-center">ورود کارکنان</div>
        <div class="q-mt-xl">
          <div class="q-my-md" style="font-size: 18px">نام کاربری</div>
          <q-input
            class="text-wieght-bold"
            filled
            label="نام کاربری خود را وارد کنید"
            style="width: 350px; height: 68px"
          >
            <template v-slot:append> <q-icon name="person" /> </template
          ></q-input>
        </div>

        <div class="q-mt-md">
          <div class="q-my-md" style="font-size: 18px">رمز ورود</div>
          <q-input
            filled
            type="number"
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
    <div class="gt-md col-6 flex justify-center">
      <div>
        <div>
          <q-img
          class="q-ml-xl"
            src="/MainImages/School.png"
            style="width: 335px; height: 225px"
          />
        </div>
        <div class="text-h4 text-center">نرم افزار مدیریت مدرسه</div>
        <q-list
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

            <q-item-section
              >دسترسی به اطلاعات دانش آموزان ، کارکنان ، معلمان و ... توسط مدیر
              مدرسه</q-item-section
            >
          </q-item>
        </q-list>
      </div>
    </div>
  </q-page>
</template>
