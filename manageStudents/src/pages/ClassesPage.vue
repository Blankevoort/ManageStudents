<template>
  <q-page>
    <q-img src="/MainImages/ClassesPageImage.png" />

    <div class="mx-default my-default">
      <q-btn
        color="accent"
        icon="add"
        label="افزودن دانش آموز"
        @click="addStudent = true"
      />

      <!-- pop up baraye afzodane daneshamoz ha ast -->

      <q-dialog v-model="addStudent">
        <div class="row">
          <q-card square class="shadow-24" style="width: 300px; height: 385px">
            <q-card-section class="bg-primary">
              <h4 class="text-h5 text-white q-my-md">افزودن دانش آموز</h4>
              <div
                class="absolute-bottom-right q-pr-md"
                style="transform: translateY(50%)"
              ></div>
            </q-card-section>
            <q-card-section>
              <q-form class="q-px-sm q-pt-xl">
                <q-input square clearable v-model="Name" label="نام">
                  <template v-slot:prepend>
                    <q-icon name="person" />
                  </template>
                </q-input>
                <q-input
                  v-model.number="Number"
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
          <q-card square class="shadow-24" style="width: 300px; height: 350px">
            <q-card-section class="bg-primary">
              <h4 class="text-h5 text-white q-my-md">تغییر در دانش آموز</h4>
              <div
                class="absolute-bottom-right q-pr-md"
                style="transform: translateY(50%)"
              ></div>
            </q-card-section>
            <q-card-section>
              <q-form class="q-px-sm q-pt-md">
                <q-input
                  v-model.number="currentName"
                  type="number"
                  style="max-width: 300px"
                >
                  <template v-slot:prepend>
                    <q-icon name="person" />
                  </template>
                </q-input>
                <q-input
                  v-model.number="currentNumber"
                  type="number"
                  style="max-width: 300px"
                >
                  <template v-slot:prepend>
                    <q-icon name="call" />
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
        <q-list class="q-py-md" style="max-width: 388px">
          <q-item class="q-py-md">
            <q-item-section avatar>
              <q-avatar>
                <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label lines="1">
                <span class="text-weight-medium">معین صداقتی</span>
              </q-item-label>
              <q-item-label caption class="text-grey" lines="1"
                >شماره تلفن: 09379608155</q-item-label
              >
            </q-item-section>

            <q-item-section side>
              <div class="q-gutter-xs text-white">
                <q-btn
                  flat
                  dense
                  round
                  @click="confirm()"
                  icon="delete"
                ></q-btn>
                <q-btn
                  flat
                  dense
                  round
                  @click="edit = true"
                  icon="edit"
                ></q-btn>
              </div>
            </q-item-section>
          </q-item>
        </q-list>
      </div>

      <div class="my-default bg-secondary q-px-md text-white">
        <q-list class="q-py-md" style="max-width: 388px">
          <q-item class="q-py-md">
            <q-item-section avatar>
              <q-avatar>
                <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label lines="1">
                <span class="text-weight-medium">معین صداقتی</span>
              </q-item-label>
              <q-item-label caption class="text-grey" lines="1"
                >شماره تلفن: 09379608155</q-item-label
              >
            </q-item-section>

            <q-item-section side>
              <div class="q-gutter-xs text-white">
                <q-btn
                  flat
                  dense
                  round
                  @click="confirm()"
                  icon="delete"
                ></q-btn>
                <q-btn
                  flat
                  dense
                  round
                  @click="edit = true"
                  icon="edit"
                ></q-btn>
              </div>
            </q-item-section>
          </q-item>
        </q-list>
      </div>

      <div class="my-default bg-secondary q-px-md text-white">
        <q-list class="q-py-md" style="max-width: 388px">
          <q-item class="q-py-md">
            <q-item-section avatar>
              <q-avatar>
                <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label lines="1">
                <span class="text-weight-medium">معین صداقتی</span>
              </q-item-label>
              <q-item-label caption class="text-grey" lines="1"
                >شماره تلفن: 09379608155</q-item-label
              >
            </q-item-section>

            <q-item-section side>
              <div class="q-gutter-xs text-white">
                <q-btn
                  flat
                  dense
                  round
                  @click="confirm()"
                  icon="delete"
                ></q-btn>
                <q-btn
                  flat
                  dense
                  round
                  @click="edit = true"
                  icon="edit"
                ></q-btn>
              </div>
            </q-item-section>
          </q-item>
        </q-list>
      </div>

      <div class="my-default bg-secondary q-px-md text-white">
        <q-list class="q-py-md" style="max-width: 388px">
          <q-item class="q-py-md">
            <q-item-section avatar>
              <q-avatar>
                <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label lines="1">
                <span class="text-weight-medium">معین صداقتی</span>
              </q-item-label>
              <q-item-label caption class="text-grey" lines="1"
                >شماره تلفن: 09379608155</q-item-label
              >
            </q-item-section>

            <q-item-section side>
              <div class="q-gutter-xs text-white">
                <q-btn
                  flat
                  dense
                  round
                  @click="confirm()"
                  icon="delete"
                ></q-btn>
                <q-btn
                  flat
                  dense
                  round
                  @click="edit = true"
                  icon="edit"
                ></q-btn>
              </div>
            </q-item-section>
          </q-item>
        </q-list>
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

    const Name = ref();
    const Number = ref();
    const edit = ref(false);
    const currentName = ref();
    const currentNumber = ref(1);
    const addStudent = ref(false);
    const studentName = ref();

    function confirm() {
      $q.dialog({
        title: "تایید",
        message: "آیا مطمعن هستید که می خواهید این دانش آموز را حذف کنید؟",
        cancel: true,
        persistent: false,
      }).onOk(() => {
        RemoveStudent();
      });
    }

    // function RemoveStudent() {

    // }

    // function SendNew() {

    // }

    // onMounted(() => {

    // })

    return {
      Name,
      Number,
      confirm,
      addStudent,
      edit,
      currentName,
      currentNumber,
      studentName,
    };
  },
};
</script>

<style scoped>
#q-app
  > div
  > div.q-page-container
  > main
  > div.mx-default.my-default
  > div
  > div
  > div {
  padding: 0 !important;
}
</style>
