<template>
  <!-- in page ba kami fasele az do samte rast o chap gharar migire -->
  <q-page class="q-mx-md">
    <div class="text-h5 q-py-md q-mb-lg">
      تمامی کارکنان

      <!-- dokme baraye afozdane karkonane webapplication -->

      <q-btn
        class="float-right"
        color="accent"
        icon="add"
        label="افزودن کارکن"
        @click="addUser = true"
      />
    </div>

    <!-- pop up baraye vared kardane etelaate karkonan -->

    <q-dialog v-model="addUser">
      <div class="row">
        <q-card square class="shadow-24" style="width: 300px; height: 400px">
          <q-card-section class="bg-primary">
            <h4 class="text-h5 text-white q-my-md">افزودن کارکن</h4>
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
                v-model="username"
                label="نام کاربری"
                autofocus
                :rules="[(val) => !!val || 'نام کاربری کارکن اجباری است']"
              >
                <template v-slot:prepend>
                  <q-icon name="person" />
                </template>
              </q-input>
              <q-input
                square
                clearable
                v-model="password"
                label="رمز عبور"
                autofocus
                :rules="[(val) => !!val || ' رمز عبور کارکن اجباری است']"
              >
                <template v-slot:prepend>
                  <q-icon name="enhanced_encryption" />
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
              @click="AddNewUser()"
            />
          </q-card-actions>
        </q-card>
      </div>
    </q-dialog>

    <!-- tamami in code ha baraye neshan dadane karkonan mibashad -->

    <q-list v-for="(user, index) in Users" :key="'classInfo-' + index + 1">
      <q-separator class="q-my-md" />

      <q-item class="col-12 q-my-sm full-width" clickable v-ripple>
        <q-item-section avatar>
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
        </q-item-section>
        <q-item-section>{{ user.username }} </q-item-section>
        <q-item-section @click="RemoveUser(index)" side>
          <q-item-label>
            <q-btn color="red-5" unelevated>
              <q-icon left size="2em" name="delete" />
              <div>حذف کارکن</div>
            </q-btn>
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

import { useQuasar } from "quasar";

export default {
  setup() {
    // tarife zard haye morede niaz

    const $q = useQuasar();
    const Users = ref([]);
    const addUser = ref(false);

    const username = ref();
    const password = ref();

    // Tarife dastorat

    // dastore hazf karkonan

    function RemoveUser(index) {
      api
        .delete("auth/users/" + Users.value[index].username + "/", {
          headers: {
            Authorization: "Token " + $q.cookies.get("token"),
          },
        })
        .then((r) => {
          location.reload();
        });
    }

    // dastore afzodane karkonan

    function AddNewUser() {
      var data = {
        username: username.value,
        password: password.value,
      };
      api
        .post("auth/users/", data, {
          headers: {
            Authorization: "Token " + $q.cookies.get("token"),
          },
        })
        .then((r) => {
          location.reload();
        });
    }

    // dastore gereftane karkonan

    function getUsers() {
      api
        .get("auth/users/", {
          headers: {
            Authorization: "Token " + $q.cookies.get("token"),
          },
        })
        .then((r) => {
          Users.value = r.data;
        });
    }

    // in dastor ghabl az bala amadane webapp in dastorat ro ejra mikone

    onBeforeMount(() => {
      // dastore gereftane karkonan

      getUsers();
    });

    // tarife zarf ha va dastorat

    return {
      username,
      password,
      addUser,
      Users,
      AddNewUser,
      RemoveUser,
    };
  },
};
</script>
