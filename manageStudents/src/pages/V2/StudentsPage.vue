<template>
  <!-- in page ba kami fasele az do samte rast o chap gharar migire -->
  <q-page class="q-mx-md">
    <div class="text-h5 q-py-md q-mb-lg">
      تمامی دانش آموزان

      <!-- dokme baraye afozdane danesh mozaye webapplication -->
      <q-btn
        class="float-right"
        color="accent"
        icon="add"
        label="افزودن دانش آموز"
        @click="addStudent = true"
      />
    </div>
    <!-- pop up baraye vared kardane etelaate danesh amoza -->

    <q-dialog v-model="addStudent">
      <div class="row">
        <q-card square class="shadow-24" style="width: 300px; height: 738px">
          <q-card-section class="bg-primary">
            <h4 class="text-h5 text-white q-my-md">افزودن دانش آموز</h4>
            <div
              class="absolute-bottom-right q-pr-md"
              style="transform: translateY(50%)"
            ></div>
          </q-card-section>
          <q-card-section>
            <q-form class="q-px-sm q-pt-xl">
              <q-input
                square
                clearable
                v-model="first_name"
                label="نام"
                autofocus
                :rules="[(val) => !!val || 'نام دانش آموز اجباری است']"
              >
                <template v-slot:prepend>
                  <q-icon name="person" />
                </template>
              </q-input>
              <q-input
                square
                clearable
                v-model="last_name"
                label="نام خانوادگی"
                autofocus
                :rules="[(val) => !!val || 'نام خانوادگی دانش آموز اجباری است']"
              >
                <template v-slot:prepend>
                  <q-icon name="groups" />
                </template>
              </q-input>
              <q-input
                v-model="number"
                style="max-width: 300px"
                label="شماره دانش آموز"
                :rules="[(val) => !!val || 'شماره تلفن دانش آموز اجباری است']"
                type="number"
              >
                <template v-slot:prepend>
                  <q-icon name="phone" />
                </template>
              </q-input>
              <q-input
                v-model="serialCode"
                style="max-width: 300px"
                label="سریال شناسنامه"
                :rules="[
                  (val) => !!val || 'سریال شناسنامه دانش آموز اجباری است',
                ]"
                type="number"
                mask="#####-#"
              >
                <template v-slot:prepend>
                  <q-icon name="sort" />
                </template>
              </q-input>
              <q-input
                v-model="studentId"
                style="max-width: 300px"
                label="کدملی"
                :rules="[(val) => !!val || 'کد ملی دانش آموز اجباری است']"
                type="number"
              >
                <template v-slot:prepend>
                  <q-icon name="mail_lock" />
                </template>
              </q-input>
              <q-input
                v-model="class_room"
                style="max-width: 300px"
                label="کلاس"
                :rules="[(val) => !!val || 'کلاس دانش آموز اجباری است']"
                type="number"
              >
                <template v-slot:prepend>
                  <q-icon name="school" />
                </template>
              </q-input>
            </q-form>
          </q-card-section>

          <q-card-actions class="q-px-lg flex justify-center">
            <q-btn
              unelevated
              size="lg"
              :color="$q.dark.isActive ? 'dark' : 'grey-9'"
              class="full-width"
              label="افزودن"
              @click="AddNewStudent()"
            />
            <div class="text-red-5 text-center q-mt-md">
              {{ error }}
            </div>
          </q-card-actions>
        </q-card>
      </div>
    </q-dialog>

    <!-- listi az danesh amozan va etelaati darmorede anha -->

    <q-list
      v-for="(student, index) in Students"
      :key="'classInfo-' + index + 1"
    >
      <!-- in code baraye joda kardan va khat gozari beine list ha ast -->
      <q-separator class="q-my-md" />

      <q-item
        class="col-12 q-my-sm full-width"
        clickable
        v-ripple
        :to="'/student/' + student.id"
      >
        <q-item-section avatar>
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
        </q-item-section>
        <q-item-section v-if="student.class_room">
          {{ student.full_name }}
          ({{ student.class_room }})
          <q-item-label caption>شماره تلفن: {{ student.number }}</q-item-label>
        </q-item-section>
        <q-item-section v-else>
          {{ student.full_name }}
          (کلاسی ندارد)
          <q-item-label caption>شماره تلفن: {{ student.number }}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-item-label>
            <q-btn flat dense round icon="description" to="student"></q-btn>
          </q-item-label>
        </q-item-section>
      </q-item>

      <!-- in code baraye joda kardan va khat gozari beine list ha ast -->

      <q-separator class="q-my-md" />
    </q-list>
  </q-page>
</template>

<script>
// baraye tarife zarf ha va vasl shodan be backend bayad in gozine ha tarif shavand

import { ref, onBeforeMount, computed } from "vue";
import { api } from "src/boot/axios";

import { useRouter } from "vue-router";
import { useQuasar, Cookies } from "quasar";

export default {
  setup() {
    // tarife zard haye morede niaz

    const $q = useQuasar();
    const Students = ref([]);
    const addStudent = ref(false);
    const error = ref();

    const first_name = ref();
    const last_name = ref();
    const number = ref();
    const serialCode = ref();
    const studentId = ref();
    const class_room = ref();

    // Tarife dastorat

    // dastore afzodane danesh amoze jadid be kelasi moshakhas

    function AddNewStudent() {
      var data = {
        first_name: first_name.value,
        last_name: last_name.value,
        number: number.value,
        serial_code: serialCode.value,
        student_id: studentId.value,
        class_room: class_room.value,
      };
      api
        .post("students/", data, {
          headers: {
            Authorization: "Token " + $q.cookies.get("token"),
          },
        })
        .then((r) => {
          addStudent.value = false;
          getStudents();
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

    // gereftane tamami danesh amoza

    function getStudents() {
      api
        .get("students/", {
          headers: {
            Authorization: "Token " + $q.cookies.get("token"),
          },
        })
        .then((r) => {
          Students.value = r.data;
        });
    }

    // in dastor ghabl az bala amadane webapp in dastorat ro ejra mikone

    onBeforeMount(() => {
      // gereftane tamami danesh amoza

      getStudents();
    });

    // tarife zarf ha va dastorat

    return {
      first_name,
      last_name,
      number,
      serialCode,
      studentId,
      class_room,
      Students,
      error,
      addStudent,
      AddNewStudent,
    };
  },
};
</script>
