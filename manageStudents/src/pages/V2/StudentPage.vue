<template>
  <q-page class="q-pa-md">
    <div>
      <div class="flex justify-center">
        <q-avatar size="128px">
          <q-img src="https://cdn.quasar.dev/img/boy-avatar.png" />
        </q-avatar>
      </div>
      <div class="row text-center q-pt-md">
        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-4 q-py-sm">
          کد ملی: 1112223334
        </div>
        <div
          class="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-4 q-py-sm text-h6"
        >
          نام خانوادگی: نام دانش آموز
        </div>
        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-4 q-py-sm">
          شماره سریال شناسنامه: 111222-33
        </div>
        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-12 col-12 q-py-sm">
          شماره تماس: 09379608155
        </div>
      </div>
    </div>

    <div>
      <q-form class="row">
        <q-input
          class="col-xs-12 col-sm-12 col-md-6 col-6 q-pa-md"
          filled
          v-model="name"
          label="نام و نام خانوادگی"
        />

        <q-input
          class="col-xs-12 col-sm-12 col-md-6 col-6 q-pa-md"
          filled
          v-model="phone"
          label="شماره تلفن"
        />

        <q-input
          class="col-xs-12 col-sm-12 col-md-6 col-6 q-pa-md"
          filled
          v-model="code"
          label="کدملی"
        />

        <q-input
          class="col-xs-12 col-sm-12 col-md-6 col-6 q-pa-md"
          filled
          v-model="serialCode"
          label="سریال شناسنامه"
        />

        <q-uploader
          url="http://localhost:4444/upload"
          label="عکس دانش آموز"
          style="max-width: 300px"
        />

        <q-space />

        <div>
          <q-btn label="Submit" type="submit" color="primary" />
        </div>
      </q-form>
    </div>
  </q-page>
</template>
