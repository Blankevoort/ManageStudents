<template>
  <q-page>
    <!-- Card haye balaye safhe -->
    <div class="row justify-around">
      <q-card
        class="flex justify-around items-center align-center content-center q-mx-md q-my-md row-sm-12 col-md-4 col-lg-4 col-xl-4 bg-green-5"
        flat
        bordered
        style="width: 350px; height: 150px"
      >
        <q-card-section horizontal>
          <q-avatar
            square
            text-color="green-7"
            icon="folder_special"
            size="128px"
          />

          <q-card-section class="q-mt-md">
            <div>کلاس ها:</div>
            <div class="text-subtitle3 q-mt-sm">(تعداد کلاس)</div>
          </q-card-section>
        </q-card-section>
      </q-card>

      <q-card
        class="flex justify-around items-center align-center content-center q-mx-md q-my-md row-sm-12 col-md-4 col-lg-4 col-xl-4 bg-red-5"
        flat
        bordered
        style="width: 350px; height: 150px"
      >
        <q-card-section horizontal>
          <q-avatar
            square
            text-color="red-7"
            icon="folder_special"
            size="128px"
          />

          <q-card-section class="q-mt-md">
            <div>دانش آموزان:</div>
            <div class="text-subtitle3 q-mt-sm">(تعداد دانش آموزان)</div>
          </q-card-section>
        </q-card-section>
      </q-card>

      <q-card
        class="flex justify-around items-center align-center content-center q-mx-md q-my-md row-sm-12 col-md-4 col-lg-4 col-xl-4 bg-amber-5"
        flat
        bordered
        style="width: 350px; height: 150px"
      >
        <q-card-section horizontal>
          <q-avatar
            square
            text-color="amber-7"
            icon="folder_special"
            size="128px"
          />

          <q-card-section class="q-mt-md">
            <div>کاربران:</div>
            <div class="text-subtitle3 q-mt-sm">(تعداد کاربران)</div>
          </q-card-section>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>
