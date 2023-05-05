<template>
  <!-- in page ba kami fasele az do samte rast o chap gharar migire -->
  <q-page class="q-mx-md">
    <!-- nam class -->
    <div class="text-h5 q-py-md">
      کلاس {{ Class.class_id }}

      <!-- hazfe class -->

      <q-btn
        class="float-right q-mx-md"
        color="red-5"
        unelevated
        @click="RemoveClass"
      >
        <q-icon left size="2em" name="delete" />
        <div>حذف کلاس</div>
      </q-btn>

      <!-- afzodane danesh amoz be in class -->

      <q-btn
        class="float-right q-mx-md"
        color="accent"
        icon="add"
        label="افزودن دانش آموز"
        @click="addStudent = true"
      />
    </div>

    <!-- pop up baraye afzodane danesh amoz -->

    <q-dialog v-model="addStudent">
      <div class="row">
        <q-card square class="shadow-24" style="width: 300px; height: 660px">
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
            <div
              class="text-negative text-center q-my-sm"
              v-for="err in error"
              :key="err"
            >
              {{ err }}
            </div>
          </q-card-actions>
        </q-card>
      </div>
    </q-dialog>

    <!-- neshon dadane list danesh amozan -->
    <div v-if="Students.length != 0">
      <q-list
        v-for="(student, index) in Students"
        :key="'classInfo-' + index + 1"
      >
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
          <q-item-section
            >{{ student.full_name }}
            <q-item-label caption
              >شماره تلفن: {{ student.number }}</q-item-label
            ></q-item-section
          >
          <q-item-section side>
            <q-item-label>
              <q-btn flat dense round icon="more_vert" to="student"></q-btn>
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-separator class="q-my-md" />
      </q-list>
    </div>
    <div class="text-center text-h5" v-else>
      دانش آموزی در این کلاس وجود ندارد
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
    const Students = ref([]);
    const addStudent = ref(false);
    const Class = ref([]);
    const error = ref();

    const first_name = ref();
    const last_name = ref();
    const number = ref();
    const serialCode = ref();
    const studentId = ref();

    // Tarife dastorat

    // hazf kardane in class

    function RemoveClass() {
      api
        .delete("classes/" + $route.params.id + "/", {
          headers: {
            Authorization: "Token " + $q.cookies.get("token"),
          },
        })
        .then((r) => {
          $router.push("/classes");
        });
    }

    // afzodane danesh amoz be in class

    function AddNewStudent() {
      var data = {
        first_name: first_name.value,
        last_name: last_name.value,
        number: number.value,
        serial_code: serialCode.value,
        student_id: studentId.value,
        class_room: $route.params.id,
      };
      api
        .post("students/", data, {
          headers: {
            Authorization: "Token " + $q.cookies.get("token"),
          },
        })
        .then((r) => {
          addStudent.value = false;
          location.reload();
        })
        .catch((err) => {
          error.value = err.response.data;
        });
    }

    // gereftane class baraye neshan dadane etelaate dakhele on

    function getClass() {
      api
        .get("classes/" + $route.params.id, {
          headers: {
            Authorization: "Token " + $q.cookies.get("token"),
          },
        })
        .then((r) => {
          Class.value = r.data;
          Students.value = r.data.students;
        })
        .catch((err) => {
          if (err.response.status === 404) {
            $router.push("/404");
          }
        });
    }

    // in dastor ghabl az bala amadane webapp in dastorat ro ejra mikone

    onBeforeMount(() => {
      // gereftane class baraye neshan dadane etelaate dakhele on
      getClass();
    });

    // tarife zarf ha va dastorat

    return {
      Class,
      first_name,
      last_name,
      number,
      serialCode,
      studentId,
      addStudent,
      error,
      Students,
      RemoveClass,
      AddNewStudent,
    };
  },
};
</script>
