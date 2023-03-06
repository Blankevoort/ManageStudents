<template>
  <router-view />
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
});
</script>

<style>
.font-big {
  font-size: 16px;
}

.font-small {
  font-size: 11px;
}

.q-item {
  min-width: none !important;
}

.mx-default {
  margin-right: 20px;
  margin-left: 20px;
}

.my-default {
  margin-top: 14px;
}

.my-big {
  margin-top: 20px;
}
</style>
