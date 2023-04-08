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
          <q-card square class="shadow-24" style="width: 300px; height: 435px">
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
                >
                  <template v-slot:prepend>
                    <q-icon name="person" />
                  </template>
                </q-input>
                <q-input
                  v-model="number"
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
                @click="AddNewStudent()"
              />
            </q-card-actions>
          </q-card>
        </div>
      </q-dialog>

      <!-- didane tamame danesh amozane class -->

      <div
        class="my-default bg-secondary q-px-md text-white"
        v-for="(student, index) in Students"
        :key="'student-' + index + 1"
      >
        <q-list class="q-py-md" style="max-width: 388px">
          <q-item class="q-py-md">
            <q-item-section avatar>
              <q-avatar>
                <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label lines="1">
                <span class="text-weight-medium">{{ student.full_name }}</span>
              </q-item-label>
              <q-item-label caption class="text-grey" lines="1"
                >شماره تلفن: {{ student.number }}</q-item-label
              >
            </q-item-section>

            <q-item-section side>
              <div class="q-gutter-xs text-white">
                <q-btn
                  flat
                  dense
                  round
                  icon="delete"
                  @click="RemoveStudent(index)"
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
import { ref, onBeforeMount, computed } from "vue";
import { api } from "src/boot/axios";

import { useQuasar, Cookies } from "quasar";

import { currentClassID } from "src/stores/classID";
import { storeToRefs } from "pinia";

export default {
  setup() {
    const $q = useQuasar();
    const Students = ref();
    const user = ref([]);

    const fullname = ref();
    const number = ref();
    const first_name = ref();
    const last_name = ref();

    const store = currentClassID();
    const current = computed(() => store.current);

    const loggedIn = ref(false);
    const addStudent = ref(false);

    function AddNewStudent() {
      var data = {
        first_name: first_name.value,
        last_name: last_name.value,
        number: number.value,
        class_room: current.value.class_id,
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
        });
    }

    function RemoveStudent(index) {
      api
        .delete("students/" + Students.value[index].id + "/", {
          headers: {
            Authorization: "Token " + $q.cookies.get("token"),
          },
        })
        .then((r) => {
          location.reload();
        });
    }

    function getUser() {
      api
        .get("auth/users/me/", {
          headers: {
            Authorization: "Token " + $q.cookies.get("token"),
          },
        })
        .then((r) => {
          user.value = r.data;
          loggedIn.value = true;
        });
    }

    function getStudents() {
      api
        .get("classes/" + current.value.class_id + "/", {
          headers: {
            Authorization: "Token " + $q.cookies.get("token"),
          },
        })
        .then((r) => {
          Students.value = r.data.students;
        });
    }

    onBeforeMount(() => {
      getUser();
      getStudents();
    });

    return {
      user,
      confirm,
      Students,
      getUser,
      addStudent,
      AddNewStudent,
      RemoveStudent,
      current,
      fullname,
      number,
      first_name,
      last_name,
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
