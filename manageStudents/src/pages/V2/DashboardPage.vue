<template>
  <q-page class="q-mx-xl">
    <!-- Card haye balaye safhe -->
    <div class="col-12">
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
              <div class="text-white">کلاس ها:</div>
              <div class="text-white q-mt-sm">(تعداد کلاس)</div>
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
            <q-avatar square text-color="red-7" icon="backpack" size="128px" />

            <q-card-section class="q-mt-md">
              <div class="text-white">دانش آموزان:</div>
              <div class="text-white q-mt-sm">(تعداد دانش آموزان)</div>
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
            <q-avatar square text-color="amber-7" icon="person" size="128px" />

            <q-card-section class="q-mt-md">
              <div class="text-white">کارکنان:</div>
              <div class="text-white q-mt-sm">(تعداد کارکنان)</div>
            </q-card-section>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <div>
      <div class="text-h4 q-my-md q-mb-lg">
        کلاس ها
        <q-btn
          flat
          icon-right="arrow_back"
          color="primary"
          class="q-px-md"
          to="/classes"
          >مشاهده کلاس ها</q-btn
        >
      </div>

      <q-btn-dropdown
        class="col-12 full-width q-my-sm"
        align="left"
        label="کلاس 902"
      >
        <div>
          <q-card flat bordered>
            <q-markup-table>
              <thead>
                <tr>
                  <th class="text-left">نام خانوادگی</th>
                  <th class="text-right">کدملی</th>
                  <th class="text-right">سریال شناسنام خانوادگیه</th>
                  <th class="text-right">شماره تلفن</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="text-left">معین صداقتی</td>
                  <td class="text-right">1112223334</td>
                  <td class="text-right">111111-111</td>
                  <td class="text-right">09379608155</td>
                </tr>
                <tr>
                  <td class="text-left">معین صداقتی</td>
                  <td class="text-right">1112223334</td>
                  <td class="text-right">111111-111</td>
                  <td class="text-right">09379608155</td>
                </tr>
                <tr>
                  <td class="text-left">معین صداقتی</td>
                  <td class="text-right">1112223334</td>
                  <td class="text-right">111111-111</td>
                  <td class="text-right">09379608155</td>
                </tr>
                <tr>
                  <td class="text-left">معین صداقتی</td>
                  <td class="text-right">1112223334</td>
                  <td class="text-right">111111-111</td>
                  <td class="text-right">09379608155</td>
                </tr>
              </tbody>
            </q-markup-table>
          </q-card>
        </div>
      </q-btn-dropdown>

      <q-btn-dropdown
        class="col-12 full-width q-my-sm"
        align="left"
        label="کلاس 803"
      >
        <div>
          <q-card flat bordered>
            <q-markup-table>
              <thead>
                <tr>
                  <th class="text-left">نام و نام خانوادگی</th>
                  <th class="text-right">کدملی</th>
                  <th class="text-right">سریال شناسنامه</th>
                  <th class="text-right">شماره تلفن</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="text-left">عبدالرحمان کیانی</td>
                  <td class="text-right">1112223334</td>
                  <td class="text-right">111111-111</td>
                  <td class="text-right">09379608155</td>
                </tr>
                <tr>
                  <td class="text-left">عبدالرحمان کیانی</td>
                  <td class="text-right">1112223334</td>
                  <td class="text-right">111111-111</td>
                  <td class="text-right">09379608155</td>
                </tr>
                <tr>
                  <td class="text-left">عبدالرحمان کیانی</td>
                  <td class="text-right">1112223334</td>
                  <td class="text-right">111111-111</td>
                  <td class="text-right">09379608155</td>
                </tr>
                <tr>
                  <td class="text-left">عبدالرحمان کیانی</td>
                  <td class="text-right">1112223334</td>
                  <td class="text-right">111111-111</td>
                  <td class="text-right">09379608155</td>
                </tr>
                <tr>
                  <td class="text-left">عبدالرحمان کیانی</td>
                  <td class="text-right">1112223334</td>
                  <td class="text-right">111111-111</td>
                  <td class="text-right">09379608155</td>
                </tr>
                <tr>
                  <td class="text-left">عبدالرحمان کیانی</td>
                  <td class="text-right">1112223334</td>
                  <td class="text-right">111111-111</td>
                  <td class="text-right">09379608155</td>
                </tr>
                <tr>
                  <td class="text-left">عبدالرحمان کیانی</td>
                  <td class="text-right">1112223334</td>
                  <td class="text-right">111111-111</td>
                  <td class="text-right">09379608155</td>
                </tr>
              </tbody>
            </q-markup-table>
          </q-card>
        </div>
      </q-btn-dropdown>
    </div>
  </q-page>
</template>
