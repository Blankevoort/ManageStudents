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

    <!-- vorodie etelaate delkhah va jadid baraye danesh amoza -->

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
        />

        <q-input
          class="col-xs-12 col-sm-12 col-md-6 col-6 q-pa-md"
          filled
          v-model="classRoom"
          label="کلاس دانش آموز"
        />

        <!-- taghir dadane etelaate danesh amoz ba tavajoh be vorodi ha -->

        <div>
          <q-btn
            class="q-mx-md"
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
  </q-page>
</template>

<script>
// baraye tarife zarf ha va vasl shodan be backend bayad in gozine ha tarif shavand
import { ref, onBeforeMount, computed } from "vue";
import { api } from "src/boot/axios";

import { useRouter } from "vue-router";
import { useQuasar, Cookies } from "quasar";

import { currentStudentID } from "src/stores/StudentId";
import { storeToRefs } from "pinia";

export default {
  setup() {
    // tarife zard haye morede niaz

    const $q = useQuasar();
    const $router = useRouter();
    const student = ref([]);

    const firstName = ref();
    const lastName = ref();
    const number = ref();
    const serialCode = ref();
    const studentId = ref();
    const classRoom = ref();

    const store = currentStudentID();
    const currentStudent = computed(() => store.currentStudent);
    const setCurrent = (data) => store.setCurrent(data);
    const showCurrent = computed(() => store.showCurrent);
    const storeStudentID = currentStudentID();

    // Tarife dastorat

    // dastore hazf kardane class

    function RemoveClass() {
      api
        .delete("students/" + currentStudent.value + "/", {
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
        .get("students/" + currentStudent.value, {
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
      currentStudent,
      EditStudent,
      RemoveClass,
      classRoom,
      setCurrent,
    };
  },
};
</script>
