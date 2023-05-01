<template>
  <!-- in page ba kami fasele az tamame samt ha gharar migire -->
  <q-page class="q-pa-md">
    <!-- neshan dadane etelaate danesh amoz -->

    <div v-if="student.length != 0">
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
          نام و نام خانوادگی: {{ student.full_name }}
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
      </div>
    </div>

    <div class="text-center text-h5" v-else>همچین دانش آموزی وجود ندارد</div>

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
            :rules="[(val) => !!val || 'نام دانش آموز اجباری است']"
          />

          <q-input
            class="col-xs-12 col-sm-12 col-md-6 col-6 q-pa-md"
            filled
            v-model="lastName"
            label="نام خانوادگی"
            :rules="[(val) => !!val || 'نام خانوادگی دانش آموز اجباری است']"
          />

          <q-input
            class="col-xs-12 col-sm-12 col-md-6 col-6 q-pa-md"
            filled
            v-model="number"
            label="شماره تلفن"
            :rules="[(val) => !!val || 'شماره تلفن دانش آموز اجباری است']"
          />

          <q-input
            class="col-xs-12 col-sm-12 col-md-6 col-6 q-pa-md"
            filled
            v-model="studentId"
            label="کدملی"
            :rules="[(val) => !!val || 'کد ملی دانش آموز اجباری است']"
          />

          <q-input
            class="col-xs-12 col-sm-12 col-md-6 col-6 q-pa-md"
            filled
            v-model="serialCode"
            label="سریال شناسنامه"
            :rules="[(val) => !!val || 'سریال شناسنامه دانش آموز اجباری است']"
          />

          <q-input
            class="col-xs-12 col-sm-12 col-md-6 col-6 q-pa-md"
            filled
            v-model="classRoom"
            label="کلاس دانش آموز"
            :rules="[(val) => !!val || 'کلاس دانش آموز اجباری است']"
          />

          <!-- taghir dadane etelaate danesh amoz ba tavajoh be vorodi ha -->

          <div>
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

    const firstName = ref();
    const lastName = ref();
    const number = ref();
    const serialCode = ref();
    const studentId = ref();
    const classRoom = ref();

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
      };
      api
        .patch("students/" + student.value.id + "/", data, {
          headers: {
            Authorization: "Token " + $q.cookies.get("token"),
          },
        })
        .then((r) => {
          location.reload();
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
      serialCode,
      studentId,
      EditStudent,
      RemoveClass,
      classRoom,
    };
  },
};
</script>
