<template>
  <!-- in page ba kami fasele az do samte rast o chap gharar migire -->
  <q-page class="q-mx-xl">
    <div>
      <div class="text-h4 q-py-md q-mb-lg">
        تمامی کلاس ها

<!-- dokmeie afzodane class jadid -->

        <q-btn
          class="float-right"
          color="accent"
          icon="add"
          label="افزودن کلاس"
          @click="addClass = true"
        />
      </div>

      <!-- pop up baraye afzodane class jadid -->

      <q-dialog v-model="addClass">
        <div class="row">
          <q-card square class="shadow-24" style="width: 300px; height: 325px">
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
                  label="نام"
                  autofocus
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

      <!-- list baraye neshan dadane class ha va etelaate on -->

      <div>
        <q-list
          v-for="(classInfo, index) in Classes"
          :key="'classInfo-' + index + 1"
        >
          <q-item clickable v-ripple @click="setCurrent(classInfo.class_id)">
            <q-item-section>کلاس {{ classInfo.class_id }}</q-item-section>
            <q-item-section side>
              <q-item-label>
                <q-btn flat dense round icon="description" to="edit"></q-btn>
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-separator />
        </q-list>
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

import { currentClassID } from "src/stores/classID";
import { storeToRefs } from "pinia";

export default {
  setup() {
    // tarife zard haye morede niaz
    const Classes = ref();
    const addClass = ref(false);
    const classId = ref();

    const $q = useQuasar();

    const store = currentClassID();
    const current = computed(() => store.current);
    const setCurrent = (data) => store.setCurrent(data);
    const showCurrent = computed(() => store.showCurrent);
    const storeClassID = currentClassID();

    // Tarife dastorat

    // afzodane class jadid

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

    // gereftane class ha

    function getClasses() {
      api
        .get("classes/", {
          headers: {
            Authorization: "Token " + $q.cookies.get("token"),
          },
        })
        .then((r) => {
          Classes.value = r.data;
        });
    }
    // in dastor ghabl az bala amadane webapp in dastorat ro ejra mikone

    onBeforeMount(() => {
      // gereftane class ha
      getClasses();
    });
      // tarife zarf ha va dastorat

    return {
      classId,
      Classes,
      addClass,
      AddNewClass,
      setCurrent,
    };
  },
};
</script>
