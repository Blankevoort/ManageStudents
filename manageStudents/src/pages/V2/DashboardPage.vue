<template>
  <!-- in page ba kami fasele az do samte rast o chap gharar migire -->
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

            <q-card-section class="q-mt-md text-white text-center">
              <div class="text-h4">{{ dashboard.classes_count }}</div>
              <div>کلاس ها</div>
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

            <q-card-section class="q-mt-md text-white text-center">
              <div class="text-h4">{{ dashboard.students_count }}</div>
              <div>دانش آموزان</div>
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

            <q-card-section class="q-mt-md text-white text-center">
              <div class="text-h4">{{ dashboard.staff_count }}</div>
              <div>کارکنان</div>
            </q-card-section>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- pop up baraye vared kardane etelaate class -->

    <q-dialog v-model="addClass">
      <div class="row">
        <q-card square class="shadow-24" style="width: 300px; height: 350px">
          <q-card-section class="bg-primary">
            <h4 class="text-h5 text-white q-my-md">افزودن کلاس</h4>
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
                v-model.number="classId"
                label="کد کلاس"
                autofocus
                :rules="[(val) => !!val || 'کد کلاس لازم است']"
                type="number"
              >
                <template v-slot:prepend>
                  <q-icon name="badge" />
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
              @click="AddNewClass()"
            />
          </q-card-actions>
        </q-card>
      </div>
    </q-dialog>

    <!-- didane class haye mojod dar safheie joda -->

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

        <!-- afzodane card -->

        <q-btn
          class="float-right"
          color="accent"
          icon="add"
          label="افزودن کلاس"
          @click="addClass = true"
        />
      </div>

      <!-- dropdown baraye list class ha va danesh amozane dar in class -->

      <div>
        <q-btn-dropdown
          v-for="(classInfo, index) in Class"
          :key="'classInfo-' + index + 1"
          class="col-12 full-width q-my-sm"
          align="left"
          :label="'کلاس' + classInfo.class_id"
        >
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
              <tbody
                v-for="(student, index) in classInfo.students"
                :key="'classInfo-' + index + 1"
              >
                <tr>
                  <td class="text-left">
                    {{ student.full_name }}
                  </td>
                  <td class="text-right">
                    {{ student.student_id }}
                  </td>
                  <td class="text-right">
                    {{ student.serial_code }}
                  </td>
                  <td class="text-right">
                    {{ student.number }}
                  </td>
                </tr>
              </tbody>
            </q-markup-table>
          </q-card>
        </q-btn-dropdown>
      </div>
    </div>
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
    const dashboard = ref([]);
    const classId = ref();
    const addClass = ref(false);
    const Class = ref([]);

    // Tarife dastorat

    // add kardane class

    function AddNewClass() {
      var id = {
        class_id: classId.value,
      };
      api
        .post("classes/", id, {
          headers: {
            Authorization: "Token " + $q.cookies.get("token"),
          },
        })
        .then((r) => {
          addClass.value = false;
          location.reload();
        });
    }

    // gereftane data haye morede niaz baraye in safhe

    function getData() {
      api
        .get("dashboard/", {
          headers: {
            Authorization: "Token " + $q.cookies.get("token"),
          },
        })
        .then((r) => {
          dashboard.value = r.data;
          Class.value = r.data.classes;
        });
    }
    // in dastor ghabl az bala amadane webapp in dastorat ro ejra mikone

    onBeforeMount(() => {
      // gereftane data haye morede niaz baraye in safhe
      getData();
    });

    // tarife zarf ha va dastorat

    return {
      classId,
      dashboard,
      Class,
      addClass,
      AddNewClass,
    };
  },
};
</script>
