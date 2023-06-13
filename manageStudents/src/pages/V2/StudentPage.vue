<template>
  <!-- in page ba kami fasele az tamame samt ha gharar migire -->
  <q-page class="q-pa-md">
    <!-- neshan dadane etelaate danesh amoz -->

    <div>
      <div class="flex justify-center">
        <q-avatar size="128px">
          <q-img src="https://cdn.quasar.dev/img/boy-avatar.png" />
        </q-avatar>
      </div>
      <div class="row text-center q-pt-md">
        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-4 q-py-sm">
          کد ملی:{{ student.student_id }}
        </div>
        <div
          class="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-4 q-py-sm text-h6"
        >
          {{ student.full_name }}
        </div>
        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-4 q-py-sm">
          شماره سریال شناسنامه: {{ student.serial_code }}
        </div>
        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-4 q-py-sm">
          شماره تماس: {{ student.number }}
        </div>
        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-4 q-py-sm">
          شماره کلاس: {{ student.class_room }}
        </div>
        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-4 q-py-sm">
          وضعیت دانش آموز:
          <q-avatar
            class="q-mx-sm"
            style="margin-bottom: 5px"
            size="16px"
            :color="student.discipline"
          />
        </div>
      </div>
    </div>

    <!-- vorodie etelaate delkhah va jadid baraye danesh amoza -->
    <div v-if="student.length != 0">
      <div class="text-h5 q-my-md">ویرایش اطلاعات</div>

      <div>
        <q-form class="row">
          <q-input
            class="col-xs-12 col-sm-12 col-md-6 col-6 q-pa-md"
            filled
            v-model="firstName"
            label="نام"
          />

          <q-input
            class="col-xs-12 col-sm-12 col-md-6 col-6 q-pa-md"
            filled
            v-model="lastName"
            label="نام خانوادگی"
          />

          <q-input
            class="col-xs-12 col-sm-12 col-md-6 col-6 q-pa-md"
            filled
            v-model="number"
            label="شماره تلفن"
          />

          <q-input
            class="col-xs-12 col-sm-12 col-md-6 col-6 q-pa-md"
            filled
            v-model="studentId"
            label="کدملی"
          />

          <q-input
            class="col-xs-12 col-sm-12 col-md-6 col-6 q-pa-md"
            filled
            v-model="serialCode"
            label="سریال شناسنامه"
            mask="#####-#"
          />

          <q-input
            class="col-xs-12 col-sm-12 col-md-6 col-6 q-pa-md"
            filled
            v-model="classRoom"
            label="کلاس دانش آموز"
          />

          <q-select
            class="col-xs-12 col-sm-12 col-md-6 col-6 q-pa-md"
            v-model="discipline"
            label="Select Color"
            :options="colorOptions"
            filled
            emit-value
          ></q-select>

          <!-- taghir dadane etelaate danesh amoz ba tavajoh be vorodi ha -->

          <div class="col-12 q-pa-md">
            <q-btn
              class="q-mx-md q-my-md"
              label="ویرایش"
              type="submit"
              color="primary"
              icon-right="edit"
              @click="EditStudent"
            />

            <!-- hazfe danesh amoz -->

            <q-btn
              class="q-mx-md"
              color="red-5"
              unelevated
              @click="RemoveClass"
              icon-right="delete"
              label="حذف دانش آموز"
            />
          </div>
        </q-form>
      </div>

      <div class="text-red-5 text-center q-mt-md">
        {{ error }}
      </div>
    </div>
  </q-page>
</template>

<script>
// baraye tarife zarf ha va vasl shodan be backend bayad in gozine ha tarif shavand
import { ref, onBeforeMount, computed } from "vue";
import { api } from "src/boot/axios";

import { useRouter, useRoute } from "vue-router";
import { useQuasar, Cookies } from "quasar";

export default {
  setup() {
    // tarife zard haye morede niaz

    const $q = useQuasar();
    const $route = useRoute();
    const $router = useRouter();
    const student = ref([]);
    const error = ref();

    const firstName = ref();
    const lastName = ref();
    const number = ref();
    const serialCode = ref();
    const studentId = ref();
    const classRoom = ref();
    const discipline = ref();
    const colorOptions = [
      { label: "Green", value: "G" },
      { label: "White", value: "W" },
      { label: "Yellow", value: "Y" },
      { label: "Red", value: "R" },
    ];

    // Tarife dastorat

    // dastore hazf kardane class

    function RemoveClass() {
      api
        .delete("students/" + $route.params.id + "/", {
          headers: {
            Authorization: "Token " + $q.cookies.get("token"),
          },
        })
        .then((r) => {
          $router.push("/students");
        });
    }

    // dastore taghir dar danesh amoz

    function EditStudent() {
      var data = {
        first_name: firstName.value,
        last_name: lastName.value,
        number: number.value,
        serial_code: serialCode.value,
        student_id: studentId.value,
        class_room: classRoom.value,
        discipline: discipline.value,
      };
      api
        .patch("students/" + student.value.id + "/", data, {
          headers: {
            Authorization: "Token " + $q.cookies.get("token"),
          },
        })
        .then((r) => {
          getStudent();
        })
        .catch((err) => {
          if (err.response) {
            if (err.response.status === 400) {
              error.value = "اطلاعات وارد شده معتبر نیستند.";
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

    // gereftane danesh amozane in class

    function getStudent() {
      api
        .get("students/" + $route.params.id, {
          headers: {
            Authorization: "Token " + $q.cookies.get("token"),
          },
        })
        .then((r) => {
          student.value = r.data;
        })
        .catch((err) => {
          if (err.response.status === 404) {
            $router.push("/404");
          }
        });
    }
    // in dastor ghabl az bala amadane webapp in dastorat ro ejra mikone

    onBeforeMount(() => {
      // gereftane danesh amozane in class
      getStudent();
    });

    // tarife zarf ha va dastorat

    return {
      student,
      lastName,
      firstName,
      number,
      discipline,
      serialCode,
      studentId,
      EditStudent,
      RemoveClass,
      classRoom,
      error,
      colorOptions,
    };
  },
};
</script>
