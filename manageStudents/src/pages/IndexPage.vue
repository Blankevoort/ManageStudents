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

        <q-dialog v-model="addClass">
          <div class="row">
            <q-card
              square
              class="shadow-24"
              style="width: 300px; height: 385px"
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
                  <q-input square clearable v-model="className" label="نام">
                    <template v-slot:prepend>
                      <q-icon name="badge" />
                    </template>
                  </q-input>
                  <q-input
                    v-model.number="Students"
                    type="number"
                    style="max-width: 300px"
                  >
                    <template v-slot:prepend>
                      <q-icon name="group" />
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
                  @click="SendNew()"
                />
              </q-card-actions>
            </q-card>
          </div>
        </q-dialog>

        <!-- pop up baraye taghir dar class ha -->

        <q-dialog v-model="edit">
          <div class="row">
            <q-card
              square
              class="shadow-24"
              style="width: 300px; height: 300px"
            >
              <q-card-section class="bg-primary">
                <h4 class="text-h5 text-white q-my-md">تغییر در کلاس</h4>
                <div
                  class="absolute-bottom-right q-pr-md"
                  style="transform: translateY(50%)"
                ></div>
              </q-card-section>
              <q-card-section>
                <q-form class="q-px-sm q-pt-md">
                  <q-input
                    v-model.number="Students"
                    type="number"
                    style="max-width: 300px"
                  >
                    <template v-slot:prepend>
                      <q-icon name="group" />
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
                  label="ثبت تغییرات"
                  @click="SendNew()"
                />
              </q-card-actions>
            </q-card>
          </div>
        </q-dialog>

        <!-- in div baraye card ha ast -->

        <div class="my-default bg-secondary q-px-md text-white">
          <q-list style="max-width: 388px">
            <q-item class="q-py-md">
              <q-item-section>
                <q-item-label lines="1">
                  <span class="text-weight-medium">کلاس 902</span>
                </q-item-label>
                <q-item-label caption class="text-grey" lines="1">
                  30 دانش آموز
                </q-item-label>
              </q-item-section>

              <q-item-section side>
                <div class="q-gutter-xs text-white">
                  <q-btn
                    flat
                    dense
                    round
                    icon="delete"
                    @click="confirm()"
                  ></q-btn>
                  <q-btn
                    flat
                    dense
                    round
                    icon="edit"
                    @click="edit = true"
                  ></q-btn>
                </div>
              </q-item-section>
            </q-item>
          </q-list>
        </div>

        <div class="my-default bg-secondary q-px-md text-white">
          <q-list style="max-width: 388px">
            <q-item class="q-py-md">
              <q-item-section>
                <q-item-label lines="1">
                  <span class="text-weight-medium">کلاس 902</span>
                </q-item-label>
                <q-item-label caption class="text-grey" lines="1">
                  30 دانش آموز
                </q-item-label>
              </q-item-section>

              <q-item-section side>
                <div class="q-gutter-xs text-white">
                  <q-btn
                    flat
                    dense
                    round
                    icon="delete"
                    @click="confirm()"
                  ></q-btn>
                  <q-btn
                    flat
                    dense
                    round
                    icon="edit"
                    @click="edit = true"
                  ></q-btn>
                </div>
              </q-item-section>
            </q-item>
          </q-list>
        </div>

        <div class="my-default bg-secondary q-px-md text-white">
          <q-list style="max-width: 388px">
            <q-item class="q-py-md">
              <q-item-section>
                <q-item-label lines="1">
                  <span class="text-weight-medium">کلاس 902</span>
                </q-item-label>
                <q-item-label caption class="text-grey" lines="1">
                  30 دانش آموز
                </q-item-label>
              </q-item-section>

              <q-item-section side>
                <div class="q-gutter-xs text-white">
                  <q-btn
                    flat
                    dense
                    round
                    icon="delete"
                    @click="confirm()"
                  ></q-btn>
                  <q-btn
                    flat
                    dense
                    round
                    icon="edit"
                    @click="edit = true"
                  ></q-btn>
                </div>
              </q-item-section>
            </q-item>
          </q-list>
        </div>

        <div class="my-default bg-secondary q-px-md text-white">
          <q-list style="max-width: 388px">
            <q-item class="q-py-md">
              <q-item-section>
                <q-item-label lines="1">
                  <span class="text-weight-medium">کلاس 902</span>
                </q-item-label>
                <q-item-label caption class="text-grey" lines="1">
                  30 دانش آموز
                </q-item-label>
              </q-item-section>

              <q-item-section side>
                <div class="q-gutter-xs text-white">
                  <q-btn
                    flat
                    dense
                    round
                    icon="delete"
                    @click="confirm()"
                  ></q-btn>
                  <q-btn
                    flat
                    dense
                    round
                    icon="edit"
                    @click="edit = true"
                  ></q-btn>
                </div>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </div>
    </div>

    <!-- safeie login baraye modiran va moaven ha -->

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
                  v-model="email"
                  type="email"
                  label="email"
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
                @click="loggedIn = true"
              />
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref, onMounted } from "vue";
import { api } from "src/boot/axios";

import { useRouter } from "vue-router";
import { useQuasar } from "quasar";

export default {
  setup() {
    const $q = useQuasar();

    const loggedIn = ref(false);
    const email = ref();
    const password = ref();
    const edit = ref(false);
    const Students = ref(30);
    const addClass = ref(false);
    const className = ref();

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

    // function checkLoggin() {
    //   if(){

    //   }
    // }

    // function RemoveClass() {

    // }

    // function SendNew() {

    // }

    // onMounted(() => {
    //   checkLoggin()
    // })

    return {
      email,
      password,
      loggedIn,
      confirm,
      addClass,
      edit,
      Students,
      className,
      // checkLoggin,
    };
  },
};
</script>

<style scoped></style>
