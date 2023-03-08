<template>
  <q-page>
    <q-img src="/MainImages/ClassesPageImage.png" />

    <div class="mx-default my-default">
      <q-btn color="accent" icon="add" label="افزودن دانش آموز" />

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
                <q-btn flat dense round icon="delete"></q-btn>
                <q-btn flat dense round icon="edit"></q-btn>
              </div>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "IndexPage",
});
</script>

<style scoped>

#q-app > div > div.q-page-container > main > div.mx-default.my-default > div > div > div {
  padding: 0 !important;
}

</style>
